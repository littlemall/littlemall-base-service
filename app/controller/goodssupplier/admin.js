'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsSupplierController extends Controller {

  async addSupplier() {
    const { ctx } = this;
    try {
      const {
        name,
        contact,
        phone,
        address,
        desc,
      } = ctx.request.body;
      if (!name) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const params = {
        name,
        contact,
        phone,
        address,
        desc,
      };
      const res = await ctx.service.goodssupplier.admin.create(params);
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addSupplier error:', error);
    }
  }

  async queryGoodsSupplierList() {
    const { ctx } = this;
    try {
      const { size, page } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const res = await ctx.service.goodssupplier.admin.querylist({
        offset,
        limit,
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsSupplierList error:', error);
    }
  }

  async queryGoodsSupplierById() {
    const { ctx } = this;
    try {
      const { id } = ctx.query;
      const res = await ctx.service.goodssupplier.admin.query({
        where: {
          id,
        },
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsSupplierById error:', error);
    }
  }

  async updateGoodsSupplierById() {
    const { ctx } = this;
    try {
      let res = {};
      const {
        id,
        name,
        contact,
        phone,
        address,
        desc,
      } = ctx.request.body;

      const params = {
        name,
        contact,
        phone,
        address,
        desc,
      };
      const suppliers = await ctx.service.goodssupplier.admin.query({
        where: {
          id,
        },
      });
      if (suppliers.length > 0) {
        const supplier = suppliers[0];
        res = await supplier.update(params);
      }
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateGoodsSupplierById error:', error);
    }
  }


}

module.exports = GoodsSupplierController;
