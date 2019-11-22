'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //goods
  router.get('/goods/admin/query_good_list', controller.goods.admin.queryGoodsList);
  router.post('/goods/admin/addGood', controller.goods.admin.addGood);
  router.get('/goods/admin/query_good', controller.goods.admin.queryGoodById);
  router.post('/goods/admin/del_good', controller.goods.admin.deleteGoodById);

  //category
  router.post('/goods/admin/add_good_category', controller.goodscategory.admin.addCategory);
  router.get('/goods/admin/query_category_list', controller.goodscategory.admin.queryGoodsCategoryList);
  router.get('/goods/admin/query_category', controller.goodscategory.admin.queryGoodsCategoryById);
  router.post('/goods/admin/update_category', controller.goodscategory.admin.updateGoodsCategoryById);

  //brand
  router.post('/goods/admin/add_good_brand', controller.goodsbrand.admin.addBrand);
  router.get('/goods/admin/query_brand_list', controller.goodsbrand.admin.queryGoodsBrandList);
  router.get('/goods/admin/query_brand', controller.goodsbrand.admin.queryGoodsBrandById);
  router.post('/goods/admin/update_brand', controller.goodsbrand.admin.updateGoodsBrandById);

  //supplier
  router.post('/goods/admin/add_good_supplier', controller.goodssupplier.admin.addSupplier);
  router.get('/goods/admin/query_supplier_list', controller.goodssupplier.admin.queryGoodsSupplierList);
  router.get('/goods/admin/query_supplier', controller.goodssupplier.admin.queryGoodsSupplierById);
  router.post('/goods/admin/update_supplier', controller.goodssupplier.admin.updateGoodsSupplierById);

  //type
  router.post('/goods/admin/add_type', controller.goodstype.admin.addType);
  router.get('/goods/admin/query_type_list', controller.goodstype.admin.queryGoodsTypeList);
  router.get('/goods/admin/query_type', controller.goodstype.admin.queryGoodsTypeById);
  router.post('/goods/admin/update_type', controller.goodstype.admin.updateGoodsTypeById);

  //pic
  router.post('/goods/admin/upload_pic', controller.goodspic.admin.uploadGoodsPicAction);
  router.post('/goods/admin/create_album', controller.goodspic.admin.createGoodsAlbum);
  router.get('/goods/admin/query_album_list', controller.goodspic.admin.queryGoodsAlbum);
  router.post('/goods/admin/update_goods_pic', controller.goodspic.admin.updateGoodsPicAction);

  // router.get('/spec/admin/query_good_spec_list', controller.spec.admin.queryspeclist);
  // router.get('/spec/admin/query_good_spec_detail', controller.spec.admin.querySpecDetail);
  // router.post('/spec/admin/add_good_spec', controller.spec.admin.addspecdata);
  // router.post('/spec/admin/del_good_spec', controller.spec.admin.delspecdatabyid);
};
