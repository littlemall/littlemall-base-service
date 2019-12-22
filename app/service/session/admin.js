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

  async createSessionGood(arr, sessions) {
    const addArr = [];
    const updateArr = [];
    for (let i = 0; i < arr.length; i++) {
      let isHas = false;
      if (arr[i].id) {
        updateArr.push(arr[i]);
      } else {
        for (let j = 0; j < sessions.length; j++) {
          if (arr[i].goods_id === sessions[j].goods_id) {
            isHas = true;
          }
        }
        if (!isHas) {
          addArr.push(arr[i]);
        }
      }
    }
    if (updateArr.length > 0) {
      await this.ctx.model.Sessiongood.bulkCreate(updateArr, { updateOnDuplicate: [ 'created_at', 'status', 'updated_at' ] });
    }
    if (addArr.length > 0) {
      await this.ctx.model.Sessiongood.bulkCreate(addArr, {});
    }
  }

  async deleteSessionGoodService(arr, Op) {
    const res = await this.ctx.model.Sessiongood.destroy(
      {
        where: {
          id: { [Op.in]: arr },
        },
      });
    console.log(res);
  }

  async delete(obj) {
    return await obj.update({
      status: -1,
    });
  }

}

module.exports = SessionService;
