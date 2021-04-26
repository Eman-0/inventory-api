SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS cs4783_mio755;
CREATE DATABASE IF NOT EXISTS cs4783_mio755;
USE cs4783_mio755;

DROP TABLE IF EXISTS properties;
CREATE TABLE properties (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `address` varchar(255) NOT NULL,
    `city` varchar(50) NOT NULL,
    `state` varchar(2) NOT NULL,
    `zip` varchar(8) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

GRANT SELECT,DELETE,UPDATE,INSERT on cs4783_mio755.* to 'mio755'@'%' identified by 'utsa123';