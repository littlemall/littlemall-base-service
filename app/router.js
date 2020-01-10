'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // goods
  router.get('/goods/admin/query_good_list', controller.goods.admin.queryGoodsList);
  router.post('/goods/admin/addGood', controller.goods.admin.addGood);
  router.get('/goods/admin/query_good', controller.goods.admin.queryGoodById);
  router.post('/goods/admin/del_good', controller.goods.admin.deleteGoodById);
  router.post('/goods/admin/update_good', controller.goods.admin.updateGood);
  router.post('/goods/admin/kaolaimport', controller.scrat.admin.importKaola);

  // category
  router.post('/goods/admin/add_good_category', controller.goodscategory.admin.addCategory);
  router.get('/goods/admin/query_category_list', controller.goodscategory.admin.queryGoodsCategoryList);
  router.get('/goods/admin/query_category', controller.goodscategory.admin.queryGoodsCategoryById);
  router.post('/goods/admin/update_category', controller.goodscategory.admin.updateGoodsCategoryById);
  router.get('/goods/admin/query_category_tree', controller.goodscategory.admin.queryGoodsCategoryTree);


  // brand
  router.post('/goods/admin/add_good_brand', controller.goodsbrand.admin.addBrand);
  router.get('/goods/admin/query_brand_list', controller.goodsbrand.admin.queryGoodsBrandList);
  router.get('/goods/admin/query_brand', controller.goodsbrand.admin.queryGoodsBrandById);
  router.post('/goods/admin/update_brand', controller.goodsbrand.admin.updateGoodsBrandById);

  // supplier
  router.post('/goods/admin/add_good_supplier', controller.goodssupplier.admin.addSupplier);
  router.get('/goods/admin/query_supplier_list', controller.goodssupplier.admin.queryGoodsSupplierList);
  router.get('/goods/admin/query_supplier', controller.goodssupplier.admin.queryGoodsSupplierById);
  router.post('/goods/admin/update_supplier', controller.goodssupplier.admin.updateGoodsSupplierById);

  // type
  router.post('/goods/admin/add_type', controller.goodstype.admin.addType);
  router.get('/goods/admin/query_type_list', controller.goodstype.admin.queryGoodsTypeList);
  router.get('/goods/admin/query_type', controller.goodstype.admin.queryGoodsTypeById);
  router.post('/goods/admin/update_type', controller.goodstype.admin.updateGoodsTypeById);

  // pic
  router.post('/goods/admin/upload_pic', controller.goodspic.admin.uploadGoodsPicAction);
  router.post('/category/admin/upload_pic', controller.goodspic.admin.uploadCategoryPicAction);
  router.post('/goods/admin/create_album', controller.goodspic.admin.createGoodsAlbum);
  router.get('/goods/admin/query_album_list', controller.goodspic.admin.queryGoodsAlbum);
  router.post('/goods/admin/update_goods_pic', controller.goodspic.admin.updateGoodsPicAction);

  // session
  router.post('/session/admin/add_session', controller.session.admin.addSession);
  router.post('/session/admin/update_session', controller.session.admin.updateSession);
  router.get('/session/admin/session_list', controller.session.admin.querySessionList);
  router.post('/session/admin/delete_session', controller.session.admin.deleteSession);
  router.post('/session/admin/add_session_good', controller.session.admin.addSessionGood);
  router.post('/session/admin/delete_session_good', controller.session.admin.deleteSessionGood);
  router.get('/session/admin/query_session', controller.session.admin.querySession);
  router.get('/session/admin/session_good_list', controller.session.admin.querySessionGoods);

  // fetch
  router.get('/scrat/category', controller.scrat.admin.fetchCategory);
};
