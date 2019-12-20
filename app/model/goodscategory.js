
'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Goodscategory = app.model.define('good_goodscategory', {
    name: STRING(128),
    pid: INTEGER,
    name_simple: STRING(128),
    goods_type: INTEGER,
    is_show: INTEGER,
    sort: INTEGER,
    photo: STRING(256),
    keyword: STRING(45),
    desc: STRING(256),
    created_at: DATE,
    updated_at: DATE,
  });

  Goodscategory.associate = () => {
    app.model.Goodscategory.hasOne(app.model.Goods, { foreignKey: 'category_id', targetKey: 'id' });
  };

  return Goodscategory;
};
