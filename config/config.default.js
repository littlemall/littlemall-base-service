/* eslint valid-jsdoc: "off" */

'use strict';

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

  config.mysql = {
    // database configuration
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '12345678',
      database: 'niushop_b2c',
    },
    // load into app, default true
    app: true,
    // load into agent, default false
    agent: false,
  }



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};