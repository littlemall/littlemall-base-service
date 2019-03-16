'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/spec/admin/query_good_spec_list', controller.spec.admin.queryspeclist);
  router.get('/spec/admin/query_good_spec_detail', controller.spec.admin.querySpecDetail);
  router.post('/spec/admin/add_good_spec', controller.spec.admin.addspecdata);
  router.post('/spec/admin/del_good_spec', controller.spec.admin.delspecdatabyid);
};
