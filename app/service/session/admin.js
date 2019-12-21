'use strict';

const Service = require('egg').Service;

/**
 * 活动专场服务
 */
class SessionService extends Service {

  async query(query) {
    return await this.ctx.model.Session.findAll(query);
  }

  async querySessionGood(query) {
    return await this.ctx.model.Sessiongood.findAll(query);
  }

  async querylist(query) {
    return await this.ctx.model.Session.findAndCountAll(query);
  }

  async querySessionGoodList(query) {
    return await this.ctx.model.Sessiongood.findAndCountAll(query);
  }

  async create(obj) {
    return await this.ctx.model.Session.create(obj);
  }

  async createSessionGood(arr) {
    return await this.ctx.model.Sessiongood.bulkCreate(arr, { updateOnDuplicate: [ 'created_at', 'status', 'updated_at' ] });
  }

  async deleteSessionGood(arr) {
    const { Sequelize } = this.app.config.sequelize;
    const { Op } = Sequelize;
    await this.ctx.model.Sessiongood.update(
      {
        status: -1,
      },
      {
        where: {
          id: { [Op.in]: arr },
        },
      });
  }

  async delete(obj) {
    return await obj.update({
      status: -1,
    });
  }

}

module.exports = SessionService;
