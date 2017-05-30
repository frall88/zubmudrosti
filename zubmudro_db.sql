-- phpMyAdmin SQL Dump
-- version 4.0.10.12
-- http://www.phpmyadmin.net
--
-- Хост: zubmudro.mysql.ukraine.com.ua
-- Время создания: Апр 30 2016 г., 15:01
-- Версия сервера: 5.6.27-75.0-log
-- Версия PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `zubmudro_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `clientid` int(11) NOT NULL AUTO_INCREMENT,
  `fio` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `phonenum` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `registerdt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientid`),
  KEY `idx_clients_fio` (`fio`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`clientid`, `fio`, `birthdate`, `gender`, `phonenum`, `email`, `registerdt`) VALUES
(1, 'Фролов Павел Васильевич', '1988-12-19', 'm', '+380667082659', 'frall712@gmail.com', '2016-04-10 16:48:45'),
(2, 'Джубал Харшоу', '1988-09-09', 'f', '+380666667788', 'frall@meta.ua', '2016-04-14 19:17:08');

--
-- Триггеры `clients`
--
DROP TRIGGER IF EXISTS `client_register_tr`;
DELIMITER //
CREATE TRIGGER `client_register_tr` AFTER INSERT ON `clients`
 FOR EACH ROW BEGIN
   INSERT INTO client_for_process Set clientid=NEW.clientid;
END
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `clients_upd_tr` AFTER UPDATE ON `clients`
 FOR EACH ROW BEGIN
   INSERT INTO clients_hist (clientid, fio, birthdate, gender, phonenum, email, registerdt, modtype ) VALUES(OLD.clientid, OLD.fio, OLD.birthdate, OLD.gender, OLD.phonenum, OLD.email, OLD.registerdt, 'U');
END
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `clients_del_tr` AFTER DELETE ON `clients`
 FOR EACH ROW BEGIN
   INSERT INTO clients_hist (clientid, fio, birthdate, gender, phonenum, email, registerdt, modtype ) VALUES(OLD.clientid, OLD.fio, OLD.birthdate, OLD.gender, OLD.phonenum, OLD.email, OLD.registerdt, 'D');
END
//
DELIMITER ;

CREATE TABLE IF NOT EXISTS  `clients_hist` (
 `id` INT( 11 ) NOT NULL AUTO_INCREMENT ,
 `clientid` INT( 11 ) NOT NULL ,
 `fio` VARCHAR( 100 ) COLLATE utf8_unicode_ci NOT NULL ,
 `birthdate` DATE DEFAULT NULL ,
 `gender` VARCHAR( 1 ) COLLATE utf8_unicode_ci NOT NULL ,
 `phonenum` VARCHAR( 20 ) COLLATE utf8_unicode_ci DEFAULT NULL ,
 `email` VARCHAR( 50 ) COLLATE utf8_unicode_ci DEFAULT NULL ,
 `registerdt` TIMESTAMP NOT NULL ,
 `modifydt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `modtype` VARCHAR( 1 ) COLLATE utf8_unicode_ci NOT NULL ,
PRIMARY KEY (  `id` ) ,
KEY  `idx_clients_fio` (  `fio` )
) ENGINE = MYISAM DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `client_for_process`
--

CREATE TABLE IF NOT EXISTS `client_for_process` (
  `clientid` int(11) NOT NULL,
  PRIMARY KEY (`clientid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `visits`
--

CREATE TABLE IF NOT EXISTS `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientid` int(11) NOT NULL,
  `visitdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `opertype` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `toothcode` int DEFAULT NULL,
  `conclusion` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_visits_clid` (`clientid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

ALTER TABLE  `visits` ADD FOREIGN KEY fk_clients( clientid ) REFERENCES clients( clientid )

DELIMITER //
CREATE TRIGGER `visits_upd_tr` AFTER UPDATE ON `visits`
 FOR EACH ROW BEGIN
   INSERT INTO visits_hist (eventid, clientid, visitdate, opertype, toothcode, conclusion, modtype ) VALUES(OLD.id, OLD.clientid, OLD.visitdate, OLD.opertype, OLD.toothcode, OLD.conclusion, 'U');
END
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER `visits_del_tr` AFTER DELETE ON `visits`
 FOR EACH ROW BEGIN
   INSERT INTO visits_hist (eventid, clientid, visitdate, opertype, toothcode, conclusion, modtype) VALUES(OLD.id, OLD.clientid, OLD.visitdate, OLD.opertype, OLD.toothcode, OLD.conclusion, 'D');
END
//
DELIMITER ;
--
-- Дамп данных таблицы `visits`
--

INSERT INTO `visits` (`id`, `clientid`, `visitdate`, `opertype`, `toothcode`, `conclusion`) VALUES
(1, 1, '2016-04-10 00:00:00', 'Осмотр', 'ВП6', 'Назначена установка коронки на зуб'),
(2, 1, '2016-04-17 00:00:00', 'Подготовка зуба', 'ВП6', 'Зуб подготовлен к установке временной коронки'),
(3, 1, '2016-04-18 20:54:28', 'Установка коронки', 'ВП6', 'Установлена временная коронка');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
CREATE TABLE IF NOT EXISTS `visits_hist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventid` int(11) NOT NULL,
  `clientid` int(11) NOT NULL,
  `visitdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `opertype` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `toothcode` int DEFAULT NULL,
  `conclusion` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifydt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `modtype` VARCHAR( 1 ) COLLATE utf8_unicode_ci NOT NULL ,
  PRIMARY KEY (`id`),
  KEY `idx_visits_clid` (`clientid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Структура таблицы `requests`
--

CREATE TABLE IF NOT EXISTS `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fio` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `requestdt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='История запросов от пользователей' AUTO_INCREMENT=2 ;

--
-- Структура таблицы `portfolio`
--

CREATE TABLE IF NOT EXISTS `portfolio` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'порядковый номер',
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'заголовок',
  `description` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'описание',
  `picture` longblob COMMENT 'фото работы',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Работы' AUTO_INCREMENT=1 ;

--
-- MIME-ТИПЫ ТАБЛИЦЫ `portfolio`:
--   `desc`
--       `Text_Plain`
--   `description`
--       `Text_Plain`
--   `picture`
--       `Image_JPEG`
--
