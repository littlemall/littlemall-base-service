CREATE TABLE `goods_pic` (
  `id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `path` varchar(512) DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL COMMENT '图片尺寸\n',
  `width` varchar(45) DEFAULT NULL,
  `height` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
