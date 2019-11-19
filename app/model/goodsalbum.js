
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        TEXT,
        DATE,
    } = app.Sequelize;

    const Goodsalbum = app.model.define('good_goodsalbum', {
        name: STRING(45),
        sort: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });

    return Goodsalbum;
};