CREATE TABLE IF NOT EXISTS `topics` (
  `id` int(11) NOT NULL,
  `title` varchar(80) NOT NULL,
  `description` varchar(120),
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `talk_time` datetime NOT NULL,
  `ip_addr` varchar(20),
  `host_name` varchar(255),
  `os_name` varchar(255),
  `browser_name` varchar(255)
);
 
ALTER TABLE `topics` ADD PRIMARY KEY (`id`);
ALTER TABLE `topics` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
