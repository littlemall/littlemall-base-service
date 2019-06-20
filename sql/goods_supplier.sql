CREATE TABLE `goods_supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `contact` varchar(128) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `desc` varchar(512) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
