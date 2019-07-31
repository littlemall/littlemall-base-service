'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsController extends Controller {

    async  queryGoodsList() {
        const { ctx, app } = this;
        try {
            const { size, page } = ctx.query;
            const offset = size * (page - 1)
            const limit = parseInt(size, 10);
            if (!page || !size) {
                this.fail('PARAMS_ERROR')
                return;
            }

            if (!page || !size) {
                this.fail('PARAMS_ERROR');
                return;
            }
            const res = await ctx.service.goods.admin.querylist({
                offset,
                limit,
            })
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodsList error:', error);
        }
    }

    async addGood() {
        const { ctx, app } = this;
        try {
            const {
                name,         // 必须
                category_id,  // 必须
                promotion,
                keyword,
                unit,
                tags,
                brand_id,
                supplier_id,
                base_sale,
                base_click,
                base_share,
                product_code,
                starttime,
                validity_period,
                inventory,
                inventory_warn,
                place,
                sku_ids,
                photo,
                type_id,
                media,
                detail,
                status,      //defalut 0
            } = ctx.request.body

        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('addGood error:', error);
        }
    }

}

module.exports = GoodsController;