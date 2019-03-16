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
    const {
      ctx
    } = this;
    try {
      let currentPage = ctx.query.currentPage;
      let pageSize = ctx.query.pageSize;
      let result = await ctx.service.spec.admin.querySpecList(currentPage, pageSize);
      this.success({
        items: result
      })
    } catch (error) {
      ctx.logger.error(new Error('queryspeclist controller exception!!!' + error.message));
      this.fail({
        msg: error.message
      })
    }
  }

  /**
   * @Summary 查询商品规格详情
   * @Router GET /spec/admin/query_good_spec_detail
   * @Request body querySpec *body specInfo
   * @Response 200 query_good_spec_detail
   * @Response 400 query_good_spec_detail
   */
  async querySpecDetail(){
    const {
      ctx
    } = this;
    try {
      let specId = ctx.query.specId;
      let specResult = await ctx.service.spec.admin.querySpecBySpecId(specId);
      let specVal = [];
      for(let i = 0; i <specResult.length ; i++){
        specVal.push({
          specValName:specResult[i].spec_value_name,
          specValId:specResult[i].spec_value_id
        })
      }
      let obj = {
        spec_id:specResult[0].spec_id,
        spec_name : specResult[0].spec_name,
        is_visible : specResult[0].is_visible,
        sort : specResult[0].sort,
        show_type : specResult[0].show_type,
        is_screen: specResult[0].is_screen,
        spec_des: specResult[0].spec_des,
        create_time: ctx.helper.getTime(specResult[0].create_time),
        update_time: ctx.helper.getTime(specResult[0].update_time),
        specVal:specVal
      }


      this.success({
       result:obj
      })
    } catch (error) {
      ctx.logger.error(new Error('querySpecDetail controller exception!!!' + error.message));
      this.fail({
        msg: error.message
      })
    }
  }

  /**
   * @Summary 添加商品规格
   * @Router POST /spec/admin/add_good_spec
   * @Request body addSpec *body specInfo
   * @Response 200 add_good_spec
   * @Response 400 add_good_spec
   */
  async addspecdata() {
    const {
      ctx
    } = this;
    try {
      let specName = ctx.request.body.specName; //属性名称
      let isVisible = ctx.request.body.isVisible; //是否可视
      let sort = ctx.request.body.sort; //排序
      let showType = ctx.request.body.showType; //展示方式  1文字  2颜色 3图片
      let isScreen = ctx.request.body.isScreen; //是否参与筛选 0不参与 1参与
      let specDesc = ctx.request.body.specDesc; //属性说明
      let specValues = ctx.request.body.specValues; //商品属性值列表
      let createTime = ctx.helper.currentTime();
      let updateTime = ctx.helper.currentTime();
      //需要持久化的数据
      let addData = {
        specName,
        isVisible,
        sort,
        showType,
        isScreen,
        specDesc,
        createTime,
        updateTime
      }

      //添加商品规格主属性
      let addResult = await ctx.service.spec.admin.addSpec(addData);

      let specId = addResult.insertId;
      let specAddRes = addResult.affectedRows === 1; //商品规格主属性是否添加成功

      let specValuesArr = JSON.parse(specValues);
      for (let i = 0; i < specValuesArr.length; i++) {
        let valData = {
          specValueName: specValuesArr[i].name,
          specId: specId,
          isVisible: addData.isVisible,
          sort: addData.sort,
          createTime,
          updateTime
        }
        let addValResult = await ctx.service.spec.admin.addSpecVal(valData);
      }
      this.success({
        isAdd: true
      })
    } catch (error) {
      ctx.logger.error(new Error('addspecdata controller exception!!!' + error.message));
      this.fail({
        msg: error.message
      })
    }
  }

    /**
   * @Summary 根据商品规格id,删除商品规格
   * @Router POST /spec/admin/del_good_spec
   * @Request body delSpec *body specInfo
   * @Response 200 del_good_spec
   * @Response 400 del_good_spec
   */
  async delspecdatabyid(){
    const {
      ctx
    } = this;
    try {
      let specId = ctx.request.body.specId; //商品规格ID
      let delSpecRes = await ctx.service.spec.admin.delSpecById(specId);
      let delSpecValRes = await ctx.service.spec.admin.delSpecValById(specId);
      this.success({
        isDel: true
      })
    } catch (error) {
      ctx.logger.error(new Error('delspecdatabyid controller exception!!!' + error.message));
      this.fail({
        msg: error.message
      })
    }
  }

}

module.exports = SpecController;