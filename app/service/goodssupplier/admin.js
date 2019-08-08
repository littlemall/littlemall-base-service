const Service = require('egg').Service;

/**
 * 商品供应商服务
 */
class GoodsSupplierService extends Service {

    async query(query) {
        return await this.ctx.model.Goodssupplier.findAll(query)
    }

    async querylist(query) {
        return await this.ctx.model.Goodssupplier.findAndCountAll(query)
    }

    async create(obj) {
        return await this.ctx.model.Goodssupplier.create(obj)
    }

    async delete(obj) {
        return await obj.update({
            status: -1,
        })
    }

}

module.exports = GoodsSupplierService;