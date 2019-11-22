
'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        TEXT,
        DATE,
    } = app.Sequelize;

    const Goods = app.model.define('good_goods', {
        name: STRING(45),
        category_id: INTEGER,
        promotion: STRING(256),
        keyword: STRING(256),
        unit: STRING(45),
        tags: STRING(256),
        brand_id: INTEGER,
        supplier_id: INTEGER,
        base_sale: INTEGER,
        base_click: INTEGER,
        base_share: INTEGER,
        product_code: STRING(128),
        starttime: DATE,
        validity_period: INTEGER,
        inventory: INTEGER,
        inventory_warn: INTEGER,
        place: STRING(256),
        sku_ids: STRING(512),
        photo: STRING(2048),
        type_id: INTEGER,
        media: STRING(256),
        detail: TEXT,
        status: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });

    Goods.associate = () => {
        app.model.Goods.belongsTo(app.model.Goodscategory, { foreignKey: 'category_id', targetKey: 'id' });
        app.model.Goods.belongsTo(app.model.Goodsbrand, { foreignKey: 'brand_id', targetKey: 'id' });
        app.model.Goods.belongsTo(app.model.Goodssupplier, { foreignKey: 'supplier_id', targetKey: 'id' });
        app.model.Goods.belongsTo(app.model.Goodstype, { foreignKey: 'type_id', targetKey: 'id' });
    }

    return Goods;
};