CREATE TABLE `goods_sku` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `attr_values_items` varchar(256) DEFAULT NULL,
  `market_price` decimal(10,0) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `promote_price` decimal(10,0) DEFAULT NULL,
  `cost_price` decimal(10,0) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `photo` varchar(256) DEFAULT NULL,
  `detail` blob,
  `code` varchar(256) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
