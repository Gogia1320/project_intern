-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.62 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for emergencyresponsesystem
CREATE DATABASE IF NOT EXISTS `emergencyresponsesystem` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `emergencyresponsesystem`;

-- Dumping structure for table emergencyresponsesystem.alerts
CREATE TABLE IF NOT EXISTS `alerts` (
  `AlertID` int(11) NOT NULL AUTO_INCREMENT,
  `IncidentID` int(11) DEFAULT NULL,
  `ResponderID` int(11) DEFAULT NULL,
  `Status` varchar(20) NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`AlertID`),
  KEY `IncidentID` (`IncidentID`),
  KEY `ResponderID` (`ResponderID`),
  CONSTRAINT `alerts_ibfk_1` FOREIGN KEY (`IncidentID`) REFERENCES `incidents` (`IncidentID`),
  CONSTRAINT `alerts_ibfk_2` FOREIGN KEY (`ResponderID`) REFERENCES `responders` (`ResponderID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table emergencyresponsesystem.incidents
CREATE TABLE IF NOT EXISTS `incidents` (
  `IncidentID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reportedByID` int(11) DEFAULT NULL,
  PRIMARY KEY (`IncidentID`),
  KEY `ReportedByID` (`reportedByID`) USING BTREE,
  CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`ReportedByID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table emergencyresponsesystem.location
CREATE TABLE IF NOT EXISTS `location` (
  `LocationID` int(11) NOT NULL AUTO_INCREMENT,
  `IncidentID` int(11) DEFAULT NULL,
  `Latitude` decimal(9,6) DEFAULT NULL,
  `Longitude` decimal(9,6) DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`LocationID`),
  KEY `IncidentID` (`IncidentID`),
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`IncidentID`) REFERENCES `incidents` (`IncidentID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table emergencyresponsesystem.responders
CREATE TABLE IF NOT EXISTS `responders` (
  `ResponderID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ResponderID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table emergencyresponsesystem.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL DEFAULT '',
  `role` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `Email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
