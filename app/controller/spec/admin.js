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
