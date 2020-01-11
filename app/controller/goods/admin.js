'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsController extends Controller {

  // 根据ID 删除商品信息
  async deleteGoodById() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      const goods = await ctx.service.goods.admin.query({
        where: {
          id,
        },
      });
      if (goods.length > 0) {
        const good = goods[0];
        const params = {
          status: -1,
        };
        await good.update(params);
      }
      this.success();
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('deleteGoodById error:', error);
    }
  }

  // 根据ID查询商品信息
  async queryGoodById() {
    const { ctx, app } = this;
    const { Sequelize } = app.config.sequelizeOp;
    const { Op } = Sequelize;
    try {
      const { id } = ctx.query;
      const res = await ctx.service.goods.admin.query({
        distinct: true,
        where: {
          id,
          status: {
            [Op.gt]: -1,
          },
        },
        include: [
          {
            model: app.model.Goodssku,
          },
          {
            model: app.model.Goodsbrand,
          },
          {
            model: app.model.Goodssupplier,
          },
          {
            model: app.model.Goodstype,
          },
        ],
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodById error:', error);
    }
  }

  // 查询商品列表
  async queryGoodsList() {
    const { ctx, app } = this;
    try {
      const { Sequelize } = app.config.sequelizeOp;
      const { Op } = Sequelize;
      const {
        size,
        page,
        name,
        category,
      } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const query = {
        status: {
          [Op.gt]: -1,
        },
      };
      if (name) {
        query.name = {
          [Op.like]: `%${name}%`,
        };
      }

      if (category) {
        query.category_id = {
          [Op.like]: `%${category}%`,
        };

      }

      const res = await ctx.service.goods.admin.querylist({
        offset,
        limit,
        distinct: true,
        where: query,
        include: [
          {
            model: app.model.Goodssku,
          },
          {
            model: app.model.Goodsbrand,
          },
          {
            model: app.model.Goodssupplier,
          },
          {
            model: app.model.Goodstype,
          },
        ],
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsList error:', error);
    }
  }

  // 更新商品信息接口
  async updateGood() {
    const { ctx } = this;
    try {
      const {
        id,
        name, // 必须
        category_id,
        promotion,
        keyword,
        unit,
        tags,
        brand_id,
        supplier_id,
        base_sale,
        base_click,
        base_share,
        product_code,
        starttime,
        validity_period,
        inventory,
        inventory_warn,
        place,
        sku_code,
        sku_name,
        sku_attr,
        sku_market_price,
        sku_price,
        sku_promote_price,
        sku_stock,
        photo,
        type_id,
        media,
        detail,
        status, // defalut 0
      } = ctx.request.body;
      if (!id) {
        this.fail('PARAMS_ERROR');
        return;
      }
      const goods = await ctx.service.goods.admin.query({
        where: {
          id,
        },
      });

      const goodsku = await ctx.service.goods.admin.querySku({
        where: {
          goods_id: id,
        },
      });


      if (goods.length > 0) {
        const good = goods[0];
        const params = {
          name, // 必须
          category_id,
          promotion,
          keyword,
          unit,
          tags,
          brand_id,
          supplier_id,
          base_sale,
          base_click,
          base_share,
          product_code,
          starttime,
          validity_period,
          inventory,
          inventory_warn,
          place,
          photo,
          type_id,
          media,
          detail,
          status,
        };
        await good.update(params);
      }

      if (goodsku.length > 0) {
        const goodskuObj = goodsku[0];
        const skuparams = {
          code: sku_code,
          name: sku_name,
          attr_values_items: sku_attr,
          market_price: sku_market_price,
          price: sku_price,
          promote_price: sku_promote_price,
          stocks: sku_stock,
        };
        await goodskuObj.update(skuparams);
      }
      this.success();
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateGood error:', error);
    }
  }

  // 添加商品信息接口
  async addGood() {
    const { ctx } = this;
    try {
      const {
        name, // 必须
        category_id,
        promotion,
        keyword,
        unit,
        tags,
        brand_id,
        supplier_id,
        base_sale,
        base_click,
        base_share,
        product_code,
        starttime,
        validity_period,
        inventory,
        inventory_warn,
        place,
        sku_code,
        sku_name,
        sku_attr,
        sku_market_price,
        sku_price,
        sku_promote_price,
        sku_stock,
        photo,
        type_id,
        media,
        detail,
      } = ctx.request.body;
      if (!name) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const params = {
        name, // 必须
        category_id,
        promotion,
        keyword,
        unit,
        tags,
        brand_id,
        supplier_id,
        base_sale,
        base_click,
        base_share,
        product_code,
        starttime,
        validity_period,
        inventory,
        inventory_warn,
        place,
        photo,
        type_id,
        media,
        detail,
        status: 0,
      };
      const res = await ctx.service.goods.admin.create(params);
      const goods_id = res.id;

      if (sku_code) {
        const skuparams = {
          goods_id,
          code: sku_code,
          name: sku_name,
          attr_values_items: sku_attr,
          market_price: sku_market_price,
          price: sku_price,
          promote_price: sku_promote_price,
          stocks: sku_stock,
        };
        await ctx.service.goods.admin.createSku(skuparams);
      }

      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addGood error:', error);
    }
  }

}

module.exports = GoodsController;
