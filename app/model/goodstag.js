
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodstag = app.model.define('goods_tag', {
        name: STRING(128),
        sort: INTEGER,
        photo: STRING(256),
        desc:STRING(256),
        created_at: DATE,
        updated_at: DATE,
    });

    return Goodstag;
};