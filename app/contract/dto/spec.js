'use strict';

exports.Spec = {
  spec_id: { type: 'integer', required: true },
  shop_id: { type: 'integer', required: true },
  spec_name: { type: 'string' },
  is_visible: { type: 'integer', required: true },
  sort: { type: 'integer', required: true },
  show_type: { type: 'integer', required: true },
  create_time: { type: 'integer', required: true },
  is_screen: { type: 'integer', required: true },
  spec_des: { type: 'string' },
  goods_id: { type: 'integer', required: true },
};
