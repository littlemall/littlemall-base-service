'use strict';
//node.js 文件操作对象
const fs = require('fs');
//node.js 路径操作对象
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const Controller = require('../../core/base_controller');

/**
 * @Controller
 */
class GoodsPicController extends Controller {

    async uploadGoodsPicAction() {
        const { ctx, app } = this;
        try {
            const{
                dir
            } = ctx.request.body;
            let targetDir = dir? dir : "all";
            const file = ctx.request.files[0];
            let { filepath, filename } = file
            const data = fs.readFileSync(filepath)
            filename = filename.toLocaleLowerCase();
            //console.log(filename);
            let targetPath = path.join(this.config.baseDir, 'app/public/upload/'+targetDir);
            await this.mkdirsSync(targetPath)
            let target = path.join(this.config.baseDir, 'app/public/upload/'+targetDir,filename);
            await fs.writeFileSync(target, data);
            this.success({
                path: `/public/upload/${targetDir}\/${filename}`
            })
        } catch (error) {
            this.fail('API_ERROR')
            ctx.logger.error('uploadGoodsPicAction error:', error);
        }
    }

    async mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
          return true;
        } else {
          if (await this.mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
          }
        }
      }




}

module.exports = GoodsPicController;