
'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Session = app.model.define('session_session', {
    name: STRING(256),
    keyword: STRING(128),
    desc: STRING(512),
    photos: STRING(2048),
    banner_pc: STRING(2048),
    banner_mobile: STRING(2048),
    bgcolor: STRING(64),
    start_at: DATE,
    end_at: DATE,
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Session.associate = () => {
    app.model.Session.hasMany(app.model.Sessiongood, { foreignKey: 'seesion_id', targetKey: 'id' });
  };

  return Session;
};
