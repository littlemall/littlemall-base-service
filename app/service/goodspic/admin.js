const Service = require('egg').Service;


class GoodsPicService extends Service {

    async queryAlbum(query) {
        return await this.ctx.model.Goodsalbum.findAll(query)
    }

    async queryAlbumList(query) {
        return await this.ctx.model.Goodsalbum.findAndCountAll(query)
    }

    async createAlbum(obj) {
        return await this.ctx.model.Goodsalbum.create(obj)
    }

    async deleteAlbum(obj) {
        return await obj.update({
            status: -1,
        })
    }

}

module.exports = GoodsPicService;