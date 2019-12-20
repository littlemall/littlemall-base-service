'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class SessionController extends Controller {

  async addSession() {
    const { ctx } = this;
    try {
      const {
        name, // 必须
        keyword,
        desc,
        photos,
        banner_pc,
        banner_mobile,
        bgcolor,
        start_at,
        end_at,
      } = ctx.request.body;
      if (!name) {
        this.fail('PARAMS_ERROR');
        return;
      }
      const params = {
        name, // 必须
        keyword,
        desc,
        photos,
        banner_pc,
        banner_mobile,
        bgcolor,
        start_at,
        end_at,
      };
      const res = await ctx.service.goods.admin.create(params);
      this.succes(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addSession error:', error);
    }
  }

  async querySessionList() {
    const { ctx, app } = this;
    try {
      const { Sequelize } = app.config.sequelizeOp;
      const { Op } = Sequelize;
      const { size, page } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }
      const res = await ctx.service.session.admin.querylist({
        offset,
        limit,
        where: {
          status: {
            [Op.gt]: -1,
          },
        },
      });
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('querySessionList error:', error);
    }
  }

}

module.exports = SessionController;
