'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsCategoryController extends Controller {

    async addCategory() {
        const { ctx, app } = this;
        try {
            const {
                pid,         // 必须
                name,
                name_simple,
                goods_type,
                is_show,
                sort,
                photo,
                keyword,
                desc,
            } = ctx.request.body
            if (!pid || !name) {
                this.fail('PARAMS_ERROR');
                return;
            }

            let params = {
                pid,         // 必须
                name,
                name_simple,
                goods_type,
                is_show,
                sort,
                photo,
                keyword,
                desc,
            }
            const res = await ctx.service.goodscategory.admin.create(params);
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('addCategory error:', error);
        }
    }

    async queryGoodsCategoryTree() {
        const { ctx } = this;
        try {
            let arr = await ctx.service.goodscategory.admin.query()
            arr = JSON.parse(JSON.stringify(arr));
            const result = this.arrayToTree(arr,0);
            this.success(result);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodsCategoryTree error:', error);
        }
    }

    arrayToTree(arr, parentId) {
        //  arr 是返回的数据  parendId 父id
        let temp = [];
        let treeArr = arr;
        let _this = this;
        treeArr.forEach((item, index) => {
            if (item.pid == parentId) {
                console.log(_this.arrayToTree(treeArr, treeArr[index].id).length > 0);
                if (_this.arrayToTree(treeArr, treeArr[index].id).length > 0) {
                    // 递归调用此函数
                    treeArr[index].children =  _this.arrayToTree(treeArr, treeArr[index].id);
                }
                treeArr[index].value = treeArr[index].id
                treeArr[index].label = treeArr[index].name
                temp.push(treeArr[index]);
            }
        });
        return temp;
    }

    async queryGoodsCategoryList() {
        const { ctx } = this;
        try {
            const { size, page } = ctx.query;
            const offset = size * (page - 1)
            const limit = parseInt(size, 10);
            if (!page || !size) {
                this.fail('PARAMS_ERROR')
                return;
            }

            const res = await ctx.service.goodscategory.admin.querylist({
                offset,
                limit,
            })
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodsCategoryList error:', error);
        }
    }

    async queryGoodsCategoryById() {
        const { ctx, app } = this;
        try {
            const { id } = ctx.query;
            const res = await ctx.service.goodscategory.admin.query({
                where: {
                    id,
                },
            })
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodsCategoryById error:', error);
        }
    }

    async updateGoodsCategoryById() {
        const { ctx, app } = this;
        try {
            let res = {};
            const {
                id,
                pid,         // 必须
                name,
                name_simple,
                goods_type,
                is_show,
                sort,
                photo,
                keyword,
                desc,
            } = ctx.request.body

            let params = {
                pid,         // 必须
                name,
                name_simple,
                goods_type,
                is_show,
                sort,
                photo,
                keyword,
                desc,
            }
            const categorys = await ctx.service.goodscategory.admin.query({
                where: {
                    id,
                },
            })
            if (categorys.length > 0) {
                const category = categorys[0];
                res = await category.update(params)
            }
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('updateGoodsCategoryById error:', error);
        }
    }





}

module.exports = GoodsCategoryController;