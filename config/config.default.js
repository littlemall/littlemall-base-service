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
    database: 'littlemall_base',
    define: {
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true,
    },
  }

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