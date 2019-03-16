'use strict';
module.exports = {
  querySpec: {
    currentPage: {
      type: 'number',
      required: true,
      example: '1'
    },
    pageSize: {
      type: 'number',
      required: true,
      example: '10'
    },
  },

  querySpecDetail: {
    specId: {
      type: 'number',
      required: true,
      example: '0'
    }
  },

  addSpec: {
    specName: {
      type: 'string',
      required: true,
      example: '材质'
    },
    isVisibke: {
      type: 'number',
      required: true,
      example: '0'
    },
    sort: {
      type: 'number',
      required: true,
      example: '10'
    },
    showType: {
      type: 'number',
      required: true,
      example: '1'
    },
    isScreen: {
      type: 'number',
      required: true,
      example: '0'
    },
    specDesc: {
      type: 'string',
      required: true,
      example: '这是一个材质属性'
    },

  },
  delSpec: {
    specId: {
      type: 'number',
      required: true,
      example: '0'
    }
  }
};