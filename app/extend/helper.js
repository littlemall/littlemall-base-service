'use strict';
const moment = require('moment');
exports.currentTime = time => moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
exports.getTime = function(time){
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
}
