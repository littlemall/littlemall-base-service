CREATE TABLE `goods_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `sort` int(11) DEFAULT '1',
  `is_used` smallint(2) DEFAULT '1' COMMENT '0 -> not used  1-> used',
  `values` varchar(128) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
