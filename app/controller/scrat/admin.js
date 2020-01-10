'use strict';

const Controller = require('../../core/base_controller');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const path = require('path');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const moment = require('moment');
const superagent = require('superagent');

/**
 * @Controller
 */
class ScratController extends Controller {

  async importKaola() {
    const { ctx, app } = this;
    try {
      const { url, categoryId } = ctx.request.body;
      const result = await app.curl(url, {
        method: 'GET',
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const items = $('.goodswrap');
      for (let i = 0; i < items.length; i++) {
        const atag = $(items[i]).find('a');
        const itemUrl = 'https:' + $(atag).attr('href');
        await this.fetchDetail(itemUrl, app, categoryId);
      }
      this.success();
    } catch (error) {
      console.log(error);
      this.fail('API_ERROR');
      ctx.logger.error('importKaola error:', error);
    }
  }

  async fetchCategory() {
    const { ctx, app } = this;
    try {
      const { index } = ctx.query;
      const fetchUrl = 'https://search.kaola.com/frontCategory/2.html';
      const result = await app.curl(fetchUrl, {
        method: 'GET',
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const scriptDom = $('script');
      const categoryHtml = $(scriptDom[7]).html();
      const patt = /(?<=window.__body =).*(?=;)/g;
      const categoryContent = categoryHtml.match(patt);
      const categoryObj = JSON.parse(categoryContent);
      const categoryList = categoryObj.topLevelFrontCategoryVOList;
      const fetchArr = [];
      fetchArr.push(categoryList[index]);
      const resArr = await this.categoryFormatList(fetchArr, [], 0, 0);
      await this.saveCategoryData(resArr);
      this.success({
        length: resArr.length,
        items: resArr,
      });
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('fetchCategory error:', error);
    }
  }

  async saveCategoryData(arr) {
    const { app } = this;
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const targetPath = path.join(this.config.baseDir, 'app/public/uploads/import/category/');
      await this.mkdirsSync(targetPath);
      const target = path.join(this.config.baseDir, 'app/public/uploads/import/category/', `${item.oriId}.jpeg`);
      if (item.oriphoto && item.oriphoto !== '') {
        await request.get({ uri: item.oriphoto, encoding: 'binary' }).pipe(fs.createWriteStream(target));
        const imgPath = app.config.imgprefix + `/public/uploads/import/category/${item.oriId}.jpeg`;
        item.photo = imgPath;
      }
      const categoryRes = await this.ctx.service.goodscategory.admin.query({
        where: {
          name: item.name,
        },
      });
      if (categoryRes.length > 0) {
        await categoryRes[0].update(item);
        console.log('更新商品分类成功！');
      } else {
        await this.ctx.service.goodscategory.admin.create(item);
        console.log('创建商品分类成功！');
      }
    }
  }

  async categoryFormatList(originArr, resArr, level, pid) {
    const clevel = level + 1;
    for (let i = 0; i < originArr.length; i++) {
      resArr.push({
        oid: originArr[i].categoryId,
        name: originArr[i].categoryName,
        name_simple: originArr[i].categoryName,
        level: clevel,
        is_show: 1,
        pid,
        sort: 10,
        photo: '',
        oriphoto: originArr[i].appIcon,
      });
      if (originArr[i].childrenNodeList && originArr[i].childrenNodeList.length > 0) {
        const cresArr = await this.categoryFormatList(originArr[i].childrenNodeList, resArr, clevel, originArr[i].categoryId);
        // console.log(cresArr);
        if (cresArr.length > 0) {
          resArr = resArr.concat(cresArr);
        }
      } else {
        continue;
      }
    }
    return resArr;
  }


  async fetchDetail(url, app, categoryId) {
    const skuUrl = url.split('.html')[0];
    const arrSku = skuUrl.split('/');
    const GoodId = arrSku[arrSku.length - 1];
    const result = await app.curl(url, {
      method: 'GET',
      dataType: 'text',
    });
    const goodDetailUrl = `https://goods.kaola.com/product/getPcGoodsDetailDynamic.json?goodsId=${GoodId}`;
    let goodDetailDynaObj = await superagent.get(goodDetailUrl);
    if (goodDetailDynaObj && goodDetailDynaObj.text) {
      goodDetailDynaObj = JSON.parse(goodDetailDynaObj.text);
    }
    const skuId = goodDetailDynaObj.data.minPriceSkuId;
    const marketPrice = goodDetailDynaObj.data.skuPrice.marketPrice;
    const currentPrice = goodDetailDynaObj.data.skuPrice.currentPrice;
    const promote_price = goodDetailDynaObj.data.skuPrice.kaolaPrice;
    const goodObj = {};
    const skuObj = {};
    const $1 = cheerio.load(result.data);
    const scriptDom = $1('script');
    const goodDetailAll = $1(scriptDom[16]).html();
    const patt2 = /(?<=goodsDetailContent: ).*(?=, \/\/图文详情)/g;
    const goodsDetailContent = goodDetailAll.match(patt2);
    let goodsDetailObj;
    let goddsDetail = '';
    if (goodsDetailContent.length > 0) {
      goodsDetailObj = JSON.parse(goodsDetailContent[0]);
      goddsDetail = goodsDetailObj.detail;
    }
    const imgBox = $1('.litimg_box').find('img');
    let goodName = $1('dt[class=product-title]').html();
    let subName = $1('dt[class=subTit]').html();
    const originPlace = $1('dt[class=orig-country]').find('span');
    let originPlaceStr = $1(originPlace[0]).html();
    goodName = entities.decode(goodName);
    subName = entities.decode(subName);
    originPlaceStr = entities.decode(originPlaceStr);
    const imgArr = [];
    for (let i = 0; i < imgBox.length; i++) {
      let imgUrl = $1(imgBox[i]).attr('src');
      imgUrl = 'https:' + imgUrl.replace('thumbnail=64', 'thumbnail=800');
      const targetPath = path.join(this.config.baseDir, 'app/public/uploads/import/' + GoodId);
      await this.mkdirsSync(targetPath);
      const target = path.join(this.config.baseDir, 'app/public/uploads/import/' + GoodId, `${GoodId}_${i}.jpeg`);
      await request.get({ uri: imgUrl, encoding: 'binary' }).pipe(fs.createWriteStream(target));
      const imgPath = app.config.imgprefix + `/public/uploads/import/${GoodId}/${GoodId}_${i}.jpeg`;
      imgArr.push({
        name: `${GoodId}_${i}.jpeg`,
        url: imgPath,
      });
    }
    goodObj.photo = JSON.stringify(imgArr);
    goodObj.category_id = categoryId;
    goodObj.name = goodName;
    goodObj.promotion = subName;
    goodObj.unit = '件';
    goodObj.supplier_id = 4;
    goodObj.base_sale = 1000;
    goodObj.base_click = 1000;
    goodObj.base_share = 1000;
    goodObj.product_code = skuId;
    goodObj.starttime = moment().format('YYYY-MM-DD hh:mm:ss');
    goodObj.validity_period = 356;
    goodObj.inventory = 10000;
    goodObj.inventory_warn = 10;
    goodObj.place = originPlaceStr;
    goodObj.type_id = 1;
    goodObj.detail = goddsDetail;

    const goodParams = {
      name: goodObj.name,
      category_id: goodObj.category_id,
      promotion: goodObj.promotion,
      keyword: goodObj.keyword,
      unit: goodObj.unit,
      tags: '',
      supplier_id: goodObj.supplier_id,
      base_sale: goodObj.base_sale,
      base_click: goodObj.base_click,
      base_share: goodObj.base_share,
      product_code: goodObj.product_code,
      starttime: goodObj.starttime,
      validity_period: goodObj.validity_period,
      inventory: goodObj.inventory,
      inventory_warn: goodObj.inventory_warn,
      place: goodObj.place,
      photo: goodObj.photo,
      type_id: goodObj.type_id,
      media: '',
      detail: goodObj.detail,
    };

    const goodsRes = await this.ctx.service.goods.admin.query({
      where: {
        product_code: goodObj.product_code,
      },
    });

    let good_id;
    if (goodsRes.length > 0) {
      good_id = goodsRes[0].id;
      await goodsRes[0].update(goodParams);
    } else {
      const goodObj = await this.ctx.service.goods.admin.create(goodParams);
      good_id = goodObj.id;
    }

    skuObj.code = skuId;
    skuObj.name = goodName;
    skuObj.market_price = marketPrice;
    skuObj.price = currentPrice;
    skuObj.promote_price = promote_price;
    skuObj.stocks = 1000;

    const goodskuRes = await this.ctx.service.goods.admin.querySku({
      where: {
        code: skuObj.code,
      },
    });
    const skuParams = {
      goods_id: good_id,
      code: skuObj.code,
      name: skuObj.name,
      market_price: skuObj.market_price,
      price: skuObj.price,
      promote_price: skuObj.promote_price,
      cost_price: skuObj.market_price,
      stock: skuObj.stocks,
    };
    if (goodskuRes.length > 0) {
      await goodskuRes[0].update(skuParams);
      console.log('更新SKU成功！');
    } else {
      await this.ctx.service.goods.admin.createSku(skuParams);
      console.log('添加SKU成功！');
    }
  }

  async mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (await this.mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }

  }
}

module.exports = ScratController;
