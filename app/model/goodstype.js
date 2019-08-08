
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodstype = app.model.define('goods_type', {
        name: STRING(45),
        sort: INTEGER,
        is_used: INTEGER,
        attrs: STRING(256),
        created_at: DATE,
        updated_at: DATE,
    });


    Goodstype.associate = () => {
        app.model.Goodstype.hasOne(app.model.Goods,{foreignKey: 'type_id', targetKey: 'id'});
    }

    return Goodstype;
};