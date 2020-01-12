'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsCategoryController extends Controller {

  async addCategory() {
    const { ctx } = this;
    try {
      const {
        pid, // 必须
        name,
        name_simple,
        goods_type,
        is_show,
        sort,
        photo,
        keyword,
        desc,
      } = ctx.request.body;
      if (!pid || !name) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const parentCa = await ctx.service.goodscategory.admin.query({
        where: {
          id: pid,
        },
      });

      let level;

      if (parentCa && parentCa.length > 0) {
        level = parseInt(parentCa[0].level) + 1;
      }
      const oid = new Date().getTime();
      const params = {
        pid, // 必须
        oid,
        name,
        name_simple,
        goods_type,
        is_show,
        sort,
        photo,
        keyword,
        level,
        desc,
      };
      const res = await ctx.service.goodscategory.admin.create(params);
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addCategory error:', error);
    }
  }

  async queryGoodsCategoryTree() {
    const { ctx } = this;
    try {
      let arr = await ctx.service.goodscategory.admin.query();
      arr = JSON.parse(JSON.stringify(arr));
      const result = this.arrayToTree(arr, 0);
      this.success(result);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsCategoryTree error:', error);
    }
  }

  arrayToTree(arr, parentId) {
    // arr是返回的数据parendId 父id
    const temp = [];
    const treeArr = arr;
    const _this = this;
    treeArr.forEach((item, index) => {
      if (item.pid === parseInt(parentId)) {
        // console.log(_this.arrayToTree(treeArr, treeArr[index].id).length > 0);
        if (_this.arrayToTree(treeArr, treeArr[index].oid).length > 0) {
          // 递归调用此函数
          treeArr[index].children = _this.arrayToTree(treeArr, treeArr[index].oid);
        }
        treeArr[index].value = treeArr[index].oid;
        treeArr[index].label = treeArr[index].name;
        temp.push(treeArr[index]);
      }
    });
    return temp;
  }

  async queryGoodsCategoryList() {
    const { ctx, app } = this;
    const { Sequelize } = app.config.sequelizeOp;
    const { Op } = Sequelize;
    try {
      const {
        size,
        page,
        name,
        level,
        pid,
      } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }

      const query = {
      };
      if (name) {
        query.name = {
          [Op.like]: `%${name}%`,
        };
      }
      if (level) {
        query.level = level;
      }
      if (pid) {
        query.pid = pid;
      }

      const res = await ctx.service.goodscategory.admin.querylist({
        offset,
        limit,
        where: query,
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsCategoryList error:', error);
    }
  }

  async queryGoodsCategoryById() {
    const { ctx } = this;
    try {
      const { id } = ctx.query;
      const res = await ctx.service.goodscategory.admin.query({
        where: {
          id,
        },
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsCategoryById error:', error);
    }
  }

  async deleteCategoryById() {
    const { ctx } = this;
    try {
      const { id } = ctx.request.body;
      await ctx.service.goodscategory.admin.destroy(id);
      this.success();
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('deleteCategoryById error:', error);
    }
  }

  async updateGoodsCategoryById() {
    const { ctx } = this;
    try {
      let res = {};
      const {
        id,
        pid, // 必须
        name,
        name_simple,
        goods_type,
        is_show,
        sort,
        photo,
        keyword,
        desc,
      } = ctx.request.body;

      const params = {
        pid, // 必须
        name,
        name_simple,
        goods_type,
        is_show,
        sort,
        photo,
        keyword,
        desc,
      };
      const categorys = await ctx.service.goodscategory.admin.query({
        where: {
          id,
        },
      });
      if (categorys.length > 0) {
        const category = categorys[0];
        res = await category.update(params);
      }
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateGoodsCategoryById error:', error);
    }
  }


}

module.exports = GoodsCategoryController;
