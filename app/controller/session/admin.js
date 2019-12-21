'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class SessionController extends Controller {

  // 批量台添加专场与商品关系接口
  async addSessionGood() {
    const { ctx } = this;
    try {
      const {
        arrStr,
      } = ctx.request.body;
      const arr = JSON.parse(arrStr);
      const sessionGoods = await ctx.service.session.admin.createSessionGood(arr);
      this.success(sessionGoods);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addSessionGood error:', error);
    }
  }

  // 批量删除专场商品接口
  async deleteSessionGood() {
    const { ctx } = this;
    try {
      const {
        arrStr,
      } = ctx.request.body;
      const arr = JSON.parse(arrStr);
      await ctx.service.session.admin.deleteSessionGood(arr);
      this.success();
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('deleteSessionGood error:', error);
    }
  }

  // 查询专场数据信息
  async querySession() {
    const { ctx, app } = this;
    try {
      const { session_id } = ctx.query;
      const sessions = await ctx.service.session.admin.query({
        distinct: true,
        where: {
          id: session_id,
        },
        include: [
          {
            model: app.model.Sessiongood,
          },
        ],
      });
      this.success(sessions);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('querySession error:', error);
    }
  }


  // 添加专场接口
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
        status: 0,
      };
      const res = await ctx.service.session.admin.create(params);
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('addSession error:', error);
    }
  }

  // 更新专场接口
  async updateSession() {
    const { ctx } = this;
    try {
      const {
        id,
        name, // 必须
        keyword,
        desc,
        photos,
        banner_pc,
        banner_mobile,
        bgcolor,
        start_at,
        end_at,
        status,
      } = ctx.request.body;
      if (!name) {
        this.fail('PARAMS_ERROR');
        return;
      }
      const sessions = await ctx.service.session.admin.query({
        where: {
          id,
        },
      });

      if (sessions.length > 0) {
        const session = sessions[0];
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
          status,
        };
        await session.update(params);
      }
      this.success();
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateSession error:', error);
    }
  }

  // 查询专场列表接口
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

  async deleteSession() {
    const { ctx } = this;
    try {
      const {
        id,
      } = ctx.request.body;
      const sessions = await ctx.service.session.admin.query({
        where: {
          id,
        },
      });
      if (sessions.length > 0) {
        const session = sessions[0];
        const params = {
          status: -1,
        };
        await session.update(params);
      }
      this.success();
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('deleteSession error:', error);
    }
  }

}

module.exports = SessionController;
