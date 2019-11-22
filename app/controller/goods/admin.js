'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsController extends Controller {

    // 根据ID 删除商品信息
    async deleteGoodById() {
        const { ctx, app } = this;
        try {
            const { id } = ctx.request.body
            const goods = await ctx.service.goods.admin.query({
                where: {
                    id,
                }
            })
            if (goods.length > 0) {
                const good = goods[0];
                const params = {
                    status: -1,
                }
                await good.update(params)
            }
            this.success();
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('deleteGoodById error:', error);
        }
    }

    // 根据ID查询商品信息
    async queryGoodById() {
        const { ctx, app } = this;
        const { Sequelize } = app.config.sequelizeOp;
        const { Op } = Sequelize;
        try {
            const { id } = ctx.query;
            const res = await ctx.service.goods.admin.query({
                where: {
                    id,
                    status: {
                        [Op.gt]: -1
                    },
                },
            })
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodById error:', error);
        }
    }

    // 查询商品列表
    async  queryGoodsList() {
        const { ctx, app } = this;
        try {
            const { Sequelize } = app.config.sequelizeOp;
            const { Op } = Sequelize;
            const { size, page } = ctx.query;
            const offset = size * (page - 1)
            const limit = parseInt(size, 10);
            if (!page || !size) {
                this.fail('PARAMS_ERROR')
                return;
            }

            const res = await ctx.service.goods.admin.querylist({
                offset,
                limit,
                where: {
                    status: {
                        [Op.gt]: -1
                    },
                }
            })
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodsList error:', error);
        }
    }

    // 添加商品信息接口
    async addGood() {
        const { ctx, app } = this;
        try {
            const {
                name,         // 必须
                category_id,
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
            if (!name) {
                this.fail('PARAMS_ERROR');
                return;
            }

            let params = {
                name,         // 必须
                category_id,
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
                status:0,
            }
            const res = await ctx.service.goods.admin.create(params);
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('addGood error:', error);
        }
    }

}

module.exports = GoodsController;