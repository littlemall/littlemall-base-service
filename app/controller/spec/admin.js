'use strict';

const Controller = require('../../core/base_controller');

class SpecController extends Controller {
  async queryspeclist() {
    const { ctx } = this;
    let currentPage= ctx.query.currentPage;
    let pageSize = ctx.query.pageSize;
    console.log(currentPage,pageSize);
   let result = await ctx.service.spec.admin.querySpecList(currentPage,pageSize);
    this.success({
      items:result
    })
  }
}

module.exports = SpecController;
