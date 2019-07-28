
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodsbrand = app.model.define('goods_brand', {
        name: STRING(45),
        desc: STRING(256),
        is_recommend: INTEGER,
        photo: STRING(256),
        brand_photo: STRING(256),
        created_at: DATE,
        updated_at: DATE,
    });

    Goodsbrand.associate = () => {
        app.model.Goodsbrand.belongsTo(app.model.Goods,{foreignKey: 'type_id', targetKey: 'id'});
    }

    return Goodsbrand;
};