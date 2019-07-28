const Service = require('egg').Service;

/**
 * 商品规格服务对象
 */
class GoodsService extends Service {

    async query(query) {
        return await this.ctx.model.Goods.findAll(query)
    }

    async querylist(query) {
        return await this.ctx.model.Goods.findAndCountAll(query)
    }

    async create(obj) {
        return await this.ctx.model.Goods.create(obj)
    }

    async delete(obj) {
        return await obj.update({
            status: -1,
        })
    }

}

module.exports = GoodsService;