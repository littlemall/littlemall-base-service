'use strict';
module.exports = {

  "sequelize": {
    enable: true,
    package: 'egg-sequelize',
  },
  'swaggerdoc': {
    enable: true,
    package: 'egg-swagger-doc',
  },
  // for cors request
  'cors': {
    enable: true,
    package: 'egg-cors',
  },

  // 'consulPlus': {
  //   enable: true,
  //   package: 'egg-consul-plus',
  // }
  // 'raven': {
  //   enable: true,
  //   package: 'egg-raven',
  // },
}