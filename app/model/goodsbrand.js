
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodsbrand = app.model.define('good_goodsbrand', {
        name: STRING(45),
        desc: STRING(256),
        is_recommend: INTEGER,
        photo: STRING(256),
        brand_photo: STRING(256),
        created_at: DATE,
        updated_at: DATE,
    });

    Goodsbrand.associate = () => {
       app.model.Goodsbrand.hasOne(app.model.Goods,{foreignKey: 'brand_id', targetKey: 'id'});
    }

    return Goodsbrand;
};