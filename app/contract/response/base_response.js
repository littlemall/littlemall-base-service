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
  },
  add_good_spec:{
    code: {
      type: 'number',
      required: true
    },
    msg: {
      type: 'string'
    }
  },
  del_good_spec:{
    code: {
      type: 'number',
      required: true
    },
    msg: {
      type: 'string'
    }
  },
  query_good_spec_detail:{
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