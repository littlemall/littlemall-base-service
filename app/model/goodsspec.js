
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodsspec = app.model.define('good_goodsspec', {
        name: STRING(45),
        sort: INTEGER,
        is_used: INTEGER,
        values: STRING(128),
        desc: STRING(256),
        created_at: DATE,
        updated_at: DATE,
    });

    return Goodsspec;
};