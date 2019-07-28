
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        DECIMAL,
        TEXT,
    } = app.Sequelize;

    const Goodssku = app.model.define('goods_sku', {
        goods_id: INTEGER,
        name: STRING(128),
        attr_values_items: STRING(256),
        market_price: DECIMAL,
        price: DECIMAL,
        promote_price: DECIMAL,
        cost_price: DECIMAL,
        stock: INTEGER,
        photo: STRING(256),
        detail: TEXT,
        code: STRING(256),
        status: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });

    return Goodssku;
};