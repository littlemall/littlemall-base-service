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
            // const res = await ctx.model.Account.findAndCountAll({
            //     offset,
            //     limit,
            // })
            // this.success(res);
            this.success();
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('queryGoodsList error:', error);
        }
    }

}

module.exports = GoodsController;