const Service = require('egg').Service;

/**
 * 商品类型服务
 */
class GoodsTypeService extends Service {

    async query(query) {
        return await this.ctx.model.Goodstype.findAll(query)
    }

    async querylist(query) {
        return await this.ctx.model.Goodstype.findAndCountAll(query)
    }

    async create(obj) {
        return await this.ctx.model.Goodstype.create(obj)
    }

    async delete(obj) {
        return await obj.update({
            status: -1,
        })
    }

}

module.exports = GoodsTypeService;