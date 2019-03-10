const {
    Controller
} = require('egg');
class BaseController extends Controller {
    get user() {
        return this.ctx.session.user;
    }

    //成功方法封装
    success(data) {
        this.ctx.body = {
            code: 200,
            msg: 'success',
            data,
        };
    }

    //异常返回封装
    fail(code,msg){
        this.ctx.body = {
            code: code,
            msg: msg,
        };
    }

    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}
module.exports = BaseController;