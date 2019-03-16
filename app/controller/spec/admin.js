'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class SpecController extends Controller {


  /**
   * @Summary 查询商品规格列表
   * @Router GET /spec/admin/query_good_spec_list
   * @Request body querySpec *body specInfo
   * @Response 200 query_good_spec_list
   * @Response 400 query_good_spec_list
   */
  async queryspeclist() {
    const {
      ctx
    } = this;
    try {
      let currentPage = ctx.query.currentPage;
      let pageSize = ctx.query.pageSize;
      console.log(currentPage, pageSize);
      let result = await ctx.service.spec.admin.querySpecList(currentPage, pageSize);
      this.success({
        items: result
      })
    } catch (error) {
      ctx.logger.error(new Error('queryspeclist controller exception!!!' + error.message));
      this.fail({
        msg: error.message
      })
    }

  }

  /**
   * @Summary 添加商品规格
   * @Router POST /spec/admin/add_good_spec
   * @Request body addSpec *body specInfo
   * @Response 200 add_good_spec
   * @Response 400 add_good_spec
   */
  async addspecdata() {
    const {
      ctx
    } = this;
    try {
      let specName = ctx.request.body.specName; //属性名称
      let isVisible = ctx.request.body.isVisible; //是否可视
      let sort = ctx.request.body.sort; //排序
      let showType = ctx.request.body.showType; //展示方式  1文字  2颜色 3图片
      let isScreen = ctx.request.body.isScreen; //是否参与筛选 0不参与 1参与
      let specDesc = ctx.request.body.specDesc; //属性说明
      let specValues = ctx.request.body.specValues; //商品属性值列表
      let createTime = ctx.helper.currentTime();
      let updateTime = ctx.helper.currentTime();
      //需要持久化的数据
      let addData = {
        specName,
        isVisible,
        sort,
        showType,
        isScreen,
        specDesc,
        createTime,
        updateTime
      }

      //添加商品规格主属性
      let addResult = await ctx.service.spec.admin.addSpec(addData);

      let specId = addResult.insertId;
      let specAddRes = addResult.affectedRows === 1; //商品规格主属性是否添加成功

      let specValuesArr = JSON.parse(specValues);
      for (let i = 0; i < specValuesArr.length; i++) {
        console.log('is_visible:' + addData.isVisible)
        let valData = {
          specValueName: specValuesArr[i].name,
          specId: specId,
          isVisible: addData.isVisible,
          sort: addData.sort,
          createTime,
          updateTime
        }
        let addValResult = await ctx.service.spec.admin.addSpecVal(valData);
      }
      this.success({
        isAdd: true
      })
    } catch (error) {
      ctx.logger.error(new Error('addspecdata controller exception!!!' + error.message));
      this.fail({
        msg: error.message
      })
    }
  }

}

module.exports = SpecController;