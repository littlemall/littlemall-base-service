'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsTypeController extends Controller {

  async addType() {
    const { ctx } = this;
    try {
      const {
        name,
        sort,
        is_used,
        attrs,
      } = ctx.request.body;
      if (!name) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const params = {
        name,
        sort,
        is_used,
        attrs,
      };
      const res = await ctx.service.goodstype.admin.create(params);
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addType error:', error);
    }
  }

  async queryGoodsTypeList() {
    const { ctx } = this;
    try {
      const { size, page } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const res = await ctx.service.goodstype.admin.querylist({
        offset,
        limit,
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsTypeList error:', error);
    }
  }

  async queryGoodsTypeById() {
    const { ctx } = this;
    try {
      const { id } = ctx.query;
      const res = await ctx.service.goodstype.admin.query({
        where: {
          id,
        },
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsTypeById error:', error);
    }
  }

  async updateGoodsTypeById() {
    const { ctx } = this;
    try {
      let res = {};
      const {
        id,
        name,
        sort,
        is_used,
        attrs,
      } = ctx.request.body;

      const params = {
        name,
        sort,
        is_used,
        attrs,
      };
      const types = await ctx.service.goodstype.admin.query({
        where: {
          id,
        },
      });
      if (types.length > 0) {
        const type = types[0];
        res = await type.update(params);
      }
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateGoodsTypeById error:', error);
    }
  }


}

module.exports = GoodsTypeController;
