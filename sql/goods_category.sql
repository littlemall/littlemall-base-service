CREATE TABLE `goods_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `name_simple` varchar(128) DEFAULT NULL,
  `goods_type` int(11) DEFAULT NULL,
  `is_show` smallint(2) DEFAULT '1',
  `sort` int(11) DEFAULT '1',
  `photo` varchar(256) DEFAULT NULL,
  `keyword` varchar(45) DEFAULT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
