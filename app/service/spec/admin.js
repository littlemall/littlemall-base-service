const Service = require('egg').Service;

/**
 * 商品规格服务对象
 */
class SpecService extends Service {

   //查询商品规格列表
   async querySpecList(currentPage, pageSize) {
      let offset = (currentPage + currentPage * pageSize) - 1;
      const results = await this.app.mysql.select('ns_goods_spec', { // search posts table
         limit: pageSize, // limit the return rows
         offset: offset, // data offset
      });
      return results
   }

   //根据商品规格ID 查询商品规格数据
   async querySpecBySpecId(specId){
      let SQL = 'SELECT * FROM ns_goods_spec INNER JOIN ns_goods_spec_value ON ns_goods_spec.spec_id = ns_goods_spec_value.spec_id WHERE ns_goods_spec.spec_id='+specId+'';
      const results = await this.app.mysql.query(SQL);
      return results;
   }

   //添加商品规格数据
   async addSpec(data) {
      //持久化商品规格数据
      const result = await this.app.mysql.insert('ns_goods_spec', {
         spec_name: data.specName,
         is_visible: data.isVisible,
         sort: data.sort,
         show_type: data.showType,
         is_screen: data.isScreen,
         spec_des: data.specDesc,
         create_time: data.createTime,
         update_time: data.updateTime
      })
      //const insertSuccess = result.affectedRows === 1;
      return result;
   }

   //添加商品规格属性值
   async addSpecVal(data) {
      //持久化商品规格值数据
      const result = await this.app.mysql.insert('ns_goods_spec_value', {
         spec_value_name: data.specValueName,
         is_visible: data.isVisible,
         spec_id: data.specId,
         sort: data.sort,
         create_time: data.createTime,
         update_time: data.updateTime
      })
      return result;
   }

   //根据规格ID 删除规格
   async delSpecById(specId) {
      const result = await this.app.mysql.delete('ns_goods_spec', {
         spec_id: specId,
      });
      return result;
   }

   //根据规格ID 删除规格属性
   async delSpecValById(specId) {
      const result = await this.app.mysql.delete('ns_goods_spec_value', {
         spec_id: specId,
      });
      return result;
   }
}

module.exports = SpecService;