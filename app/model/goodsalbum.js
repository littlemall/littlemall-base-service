
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodsalbum = app.model.define('good_goodsalbum', {
        name: STRING(45),
        sort: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });

    Goodsalbum.associate = () => {
        app.model.Goodsalbum.hasOne(app.model.Goodspic,{foreignKey: 'album_id', targetKey: 'id'});
    }

    return Goodsalbum;
};