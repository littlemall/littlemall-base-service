/* eslint valid-jsdoc: "off" */

'use strict';

const Sequelize = require('sequelize')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552205790785_4986';

  // add your middleware config here
  config.middleware = [];

  //web csrf 安全配置
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    }
  }


  config.cors = { // 解决跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: () => '*', // 这边不能为*号，需要指定明确的、与请求网页一致的域名
  };

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };

  config.sequelizeOp={
    Sequelize,
  }


  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '12345678',
    port: 3306,
    database: 'littlemall',
    define: {
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true,
    },
  }

//   config.consul = {
//     server: {
//         host: '10.18.120.228', // 注册中心ip地址
//         port: 8500 // 注册中心端口号
//     },
//     services: [ // 服务发现列表
//         {
//             referName: 'consulPlusTest', // 引用名，后续可用 app.services.referName 访问服务
//             comment: 'consulPlusTest', // 备注
//             serviceId: 'consul-plus-test' // 服务id
//         }
//     ],
//     register: true, // 是否注册当前模块，默认为false
//     multiInstance: true, // 多实例模式开关，默认为false，注意当开启多实例，务必保证集群中的每个项目的keys不同，或者会导致先启动的项目被隔离(被覆盖)
//     name: 'consul-plus-test', // 注册id
//     tags: ['consul-plus-test'], // 标签信息
//     check: {
//         http: 'http://10.18.124.230:7001', // 健康检测地址
//         interval: '5s', // 健康检测间隔
//         notes: 'http service check',
//         status: 'critical'
//     },
//     address: '10.18.124.230', // 当前模块的注册地址
//     port: 7001 // 当前模块的注册端口号
// }

  // config.mysql = {
  //   // database configuration
  //   client: {
  //     host: '127.0.0.1',
  //     port: '3306',
  //     user: 'root',
  //     password: '12345678',
  //     database: 'littlemall_base',
  //   },
  //   // load into app, default true
  //   app: true,
  //   // load into agent, default false
  //   agent: false,
  // }



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // config.raven = {
  //   dsn: 'https//f89210c311a14869bdd5283868b8c369@127.0.0.1:9000r/littlemall-node-service',
  //   options: {
  //     // refer to https://docs.sentry.io/clients/node/config/#optional-settings for more options detail.
  //     autoBreadcrumbs: {
  //       http: true
  //     },
  //     release: '3936e6c067be11e9b5f30242ac120007'
  //   }
  // }

  return {
    ...config,
    ...userConfig,
  };
};