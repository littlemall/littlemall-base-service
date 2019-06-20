CREATE TABLE `goods_brand` (
  `id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `is_recommend` smallint(2) DEFAULT '0' COMMENT '0 -> no  1-> yes',
  `photo` varchar(256) DEFAULT NULL,
  `brand_photo` varchar(256) DEFAULT NULL COMMENT '品牌推荐广告图\n',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
