'use strict';
module.exports = {
  query_good_spec_list: {
    code: {
      type: 'number',
      required: true
    },
    msg: {
      type: 'string'
    },
    data:{
      type:'Specwrap',required: true
    }
  }
};