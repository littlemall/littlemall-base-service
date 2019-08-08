const Service = require('egg').Service;

/**
 * 商品品牌服务
 */
class GoodsBrandService extends Service {

    async query(query) {
        return await this.ctx.model.Goodsbrand.findAll(query)
    }

    async querylist(query) {
        return await this.ctx.model.Goodsbrand.findAndCountAll(query)
    }

    async create(obj) {
        return await this.ctx.model.Goodsbrand.create(obj)
    }

    async delete(obj) {
        return await obj.update({
            status: -1,
        })
    }

}

module.exports = GoodsBrandService;