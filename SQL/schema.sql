-- CREATE DATABASE chat;

USE chat;


-- /* You can also create more tables, if you need them... */

--   Execute this file from the command line by typing:
--  *    mysql < schema.sql
--  *  to create the database and the tables.

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT(8) NULL AUTO_INCREMENT DEFAULT NULL,
  `username` CHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INT(8) NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(256) NULL DEFAULT NULL,
  `room` CHAR(32) NULL DEFAULT NULL,
  `userid` INT(8) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (userid) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `messages` (`id`,`text`,`room`,`userid`) VALUES
-- ('','','','');

