'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsBrandController extends Controller {

  async addBrand() {
    const { ctx } = this;
    try {
      const {
        name,
        desc,
        is_recommend,
        photo,
        brand_photo,
      } = ctx.request.body;
      if (!name) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const params = {
        name,
        desc,
        is_recommend,
        photo,
        brand_photo,
      };
      const res = await ctx.service.goodsbrand.admin.create(params);
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addBrand error:', error);
    }
  }

  async queryGoodsBrandList() {
    const { ctx } = this;
    try {
      const { size, page } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const res = await ctx.service.goodsbrand.admin.querylist({
        offset,
        limit,
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsBrandList error:', error);
    }
  }

  async queryGoodsBrandById() {
    const { ctx } = this;
    try {
      const { id } = ctx.query;
      const res = await ctx.service.goodsbrand.admin.query({
        where: {
          id,
        },
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsBrandById error:', error);
    }
  }

  async updateGoodsBrandById() {
    const { ctx } = this;
    try {
      let res = {};
      const {
        id,
        name,
        desc,
        is_recommend,
        photo,
        brand_photo,
      } = ctx.request.body;

      const params = {
        name,
        desc,
        is_recommend,
        photo,
        brand_photo,
      };
      const brands = await ctx.service.goodsbrand.admin.query({
        where: {
          id,
        },
      });
      if (brands.length > 0) {
        const brand = brands[0];
        res = await brand.update(params);
      }
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateGoodsBrandById error:', error);
    }
  }


}

module.exports = GoodsBrandController;
