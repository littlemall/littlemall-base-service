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

  async delete(obj) {
    return await obj.update({
      status: -1,
    });
  }

}

module.exports = GoodsCategoryService;
