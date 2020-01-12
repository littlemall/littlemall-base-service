'use strict';
const Service = require('egg').Service;

/**
 * 商品分类服务
 */
class GoodsCategoryService extends Service {

  async query(query) {
    return await this.ctx.model.Goodscategory.findAll(query);
  }

  async querylist(query) {
    return await this.ctx.model.Goodscategory.findAndCountAll(query);
  }

  async create(obj) {
    return await this.ctx.model.Goodscategory.create(obj);
  }

  async destroy(id) {
    const { ctx } = this;
    try {
      const collect = await ctx.model.Goodscategory.findAll({
        where: {
          id,
        },
      });
      if (collect.length < 1) {
        ctx.status = 400;
        return Object.assign(500, {
          msg: 'not found collect',
        });
      }
      const res = await collect[0].destroy();
      ctx.status = 200;
      return Object.assign(200, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async delete(obj) {
    return await obj.update({
      status: -1,
    });
  }

}

module.exports = GoodsCategoryService;
