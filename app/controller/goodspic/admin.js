'use strict';
// node.js文件操作对象
const fs = require('fs');
// node.js路径操作对象
const path = require('path');
const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsPicController extends Controller {

  async updateGoodsPicAction() {
    const { ctx } = this;
    try {
      const {
        id,
        photos,
      } = ctx.request.body;
      const goods = await ctx.service.goods.admin.query({
        where: {
          id,
        },
      });
      console.log(photos);
      if (goods.length > 0) {
        const good = goods[0];
        const params = {
          photo: photos,
        };
        await good.update(params);
      }
      this.success();

    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('updateGoodsPicAction error:', error);
    }
  }

  async uploadCategoryPicAction() {
    const { ctx } = this;
    try {
      const {
        dir,
      } = ctx.request.body;
      const targetDir = dir ? dir : 'all';
      const file = ctx.request.files[0];
      let { filepath, filename } = file;
      const data = fs.readFileSync(filepath);
      filename = filename.toLocaleLowerCase();
      // console.log(filename);
      const targetPath = path.join(this.config.baseDir, 'app/public/uploads/category/' + targetDir);
      await this.mkdirsSync(targetPath);
      const target = path.join(this.config.baseDir, 'app/public/uploads/category/' + targetDir, filename);
      await fs.writeFileSync(target, data);
      this.success({
        path: `/public/uploads/category/${targetDir}\/${filename}`,
      });
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('uploadCategoryPicAction error:', error);
    }
  }


  async uploadGoodsPicAction() {
    const { ctx } = this;
    try {
      const {
        dir,
      } = ctx.request.body;
      const targetDir = dir ? dir : 'all';
      const file = ctx.request.files[0];
      let { filepath, filename } = file;
      const data = fs.readFileSync(filepath);
      filename = filename.toLocaleLowerCase();
      // console.log(filename);
      const targetPath = path.join(this.config.baseDir, 'app/public/upload/' + targetDir);
      await this.mkdirsSync(targetPath);
      const target = path.join(this.config.baseDir, 'app/public/upload/' + targetDir, filename);
      await fs.writeFileSync(target, data);
      this.success({
        path: `/public/upload/${targetDir}\/${filename}`,
      });
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('uploadGoodsPicAction error:', error);
    }
  }

  async mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (await this.mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }

  }


  async createGoodsAlbum() {
    const { ctx } = this;
    try {
      const {
        name,
        sort,
      } = ctx.request.body;

      const params = {
        name,
        sort,
      };
      const res = await ctx.service.goodspic.admin.createAlbum(params);
      this.success(res);
    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('createGoodsAlbum error:', error);
    }
  }

  async queryGoodsAlbum() {
    const { ctx } = this;
    try {
      const { size, page } = ctx.query;
      const offset = size * (page - 1);
      const limit = parseInt(size, 10);
      if (!page || !size) {
        this.fail('PARAMS_ERROR');
        return;
      }
      const res = await ctx.service.goodspic.admin.queryAlbumList({
        offset,
        limit,
      });
      this.success(res);

    } catch (error) {
      this.fail('API_ERROR');
      ctx.logger.error('queryGoodsAlbum error:', error);
    }
  }
}

module.exports = GoodsPicController;
