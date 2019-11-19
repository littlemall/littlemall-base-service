
'use strict';

module.exports = app => {
    const {
        STRING,
        DATE,
    } = app.Sequelize;

    const Goodssupplier = app.model.define('good_goodssupplier', {
        name: STRING(128),
        contact: STRING(128),
        phone: STRING(45),
        address:STRING(256),
        desc:STRING(512),
        created_at: DATE,
        updated_at: DATE,
    });

    Goodssupplier.associate = () => {
        app.model.Goodssupplier.hasOne(app.model.Goods,{foreignKey: 'supplier_id', targetKey: 'id'});
    }

    return Goodssupplier;
};