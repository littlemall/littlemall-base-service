const Service = require('egg').Service;

/**
 * 商品规格服务对象
 */
class SpecService extends Service {

   //查询商品规格列表
   async querySpecList(currentPage,pageSize){
       let offset = (currentPage + currentPage*pageSize) - 1;
    const results = await this.app.mysql.select('ns_goods_spec', { // search posts table
        limit: pageSize, // limit the return rows
        offset: offset, // data offset
      });
      return results
   }
}

module.exports = SpecService;