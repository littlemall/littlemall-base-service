
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Goodspic = app.model.define('good_goodspic', {
        album_id: INTEGER,
        path: STRING(512),
        size: STRING(45),
        width: STRING(45),
        height: STRING(45),
        created_at: DATE,
        updated_at: DATE,
    });

    return Goodspic;
};