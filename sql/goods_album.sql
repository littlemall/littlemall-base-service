CREATE TABLE `goods_album` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `sort` int(11) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
