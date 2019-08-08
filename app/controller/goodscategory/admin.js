'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsCategoryController extends Controller {

    async addCategory(){
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

            let params= {
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

    async queryGoodsCategoryList(){
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

    async queryGoodsCategoryById(){
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

    async updateGoodsCategoryById(){
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

            let params= {
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
            if(categorys.length > 0){
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