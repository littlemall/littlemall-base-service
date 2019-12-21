
'use strict';

module.exports = app => {
  const {
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Sessiongood = app.model.define('session_sessiongoodsrelate', {
    goods_id: INTEGER,
    session_id: INTEGER,
    status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Sessiongood.associate = () => {
    app.model.Sessiongood.belongsTo(app.model.Goods, { foreignKey: 'goods_id', targetKey: 'id' });
    app.model.Sessiongood.belongsTo(app.model.Session, { foreignKey: 'session_id', targetKey: 'id' });
  };

  return Sessiongood;
};
