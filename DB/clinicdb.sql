CREATE DATABASE  IF NOT EXISTS `clinicdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `clinicdb`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: clinicdb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `Time` varchar(45) NOT NULL,
  `Date` varchar(45) NOT NULL,
  `HCN` int NOT NULL,
  `Prac_ID` int NOT NULL,
  `RNumber` int NOT NULL,
  `Record_ID` int DEFAULT NULL,
  `Comments` mediumtext,
  PRIMARY KEY (`Time`,`Date`,`HCN`,`Prac_ID`,`RNumber`),
  KEY `Appt_HCN_idx` (`HCN`),
  KEY `Prac_ID_idx` (`Prac_ID`),
  KEY `Appt_RNumber_idx` (`RNumber`),
  KEY `Appt_RecID_idx` (`Record_ID`) /*!80000 INVISIBLE */,
  CONSTRAINT `Appt_HCN` FOREIGN KEY (`HCN`) REFERENCES `patient` (`HCN`),
  CONSTRAINT `Appt_Prac_ID` FOREIGN KEY (`Prac_ID`) REFERENCES `practitioner` (`Prac_ID`),
  CONSTRAINT `Appt_RecID` FOREIGN KEY (`Record_ID`) REFERENCES `patient_record` (`Record_ID`),
  CONSTRAINT `Appt_RNumber` FOREIGN KEY (`RNumber`) REFERENCES `room` (`Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES ('11:00 am','April 15 2023',4842485,101,100,4842485,NULL),('2:00 pm','April 15 2023',7953696,104,105,7953696,NULL),('3:30 pm','April 13 2023',4842485,201,100,4842485,NULL);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinic`
--

DROP TABLE IF EXISTS `clinic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic` (
  `Location` varchar(255) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinic`
--

LOCK TABLES `clinic` WRITE;
/*!40000 ALTER TABLE `clinic` DISABLE KEYS */;
INSERT INTO `clinic` VALUES ('2205 51 ST SW Calgary','Glamorgan Clinic');
/*!40000 ALTER TABLE `clinic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `DNo` int NOT NULL,
  `Location` varchar(255) NOT NULL,
  `DName` varchar(255) DEFAULT NULL,
  `Head_ID` int DEFAULT NULL,
  PRIMARY KEY (`DNo`,`Location`),
  KEY `department_ibfk_1` (`Location`),
  KEY `Head_ID_idx` (`Head_ID`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Location`) REFERENCES `clinic` (`Location`),
  CONSTRAINT `Head_ID` FOREIGN KEY (`Head_ID`) REFERENCES `doctor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'2205 51 ST SW Calgary','General',105),(2,'2205 51 ST SW Calgary','Orthopedics',102),(3,'2205 51 ST SW Calgary','Vaccinations',103),(4,'2205 51 ST SW Calgary','Laser',104);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `ID` int NOT NULL,
  `DNum` int DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Specialization` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `DNum_idx` (`DNum`),
  CONSTRAINT `DNum` FOREIGN KEY (`DNum`) REFERENCES `department` (`DNo`),
  CONSTRAINT `Doctor_ID` FOREIGN KEY (`ID`) REFERENCES `practitioner` (`Prac_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (101,1,'Shayan Malik','GP'),(102,2,'Tawfiq Nasim','Orthopedic'),(103,3,'Reginald Topher','Immunology'),(104,4,'Sarah June','Dermatologist'),(105,1,'Sia Olabode','GP');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `ID` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `ID` FOREIGN KEY (`ID`) REFERENCES `practitioner` (`Prac_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (201,'Jerry Smith'),(202,'Angelica Liu'),(203,'Kiki Riki'),(204,'James Jiang');
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `HCN` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Phone` bigint DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`HCN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (3185726,'Ben Rakli',4038832014,'314 13 AVE SE Calgary'),(4842485,'Eli Hilfiger',5874042843,'94 Ricardo ST SW Calgary'),(4876412,'John Smith',4039431358,'2500 University Dr NW Calgary'),(5546813,'Digsy Hull',4038879254,'4921 Not ST SW Calgary'),(7953696,'Salman Malik',5874037734,'832 Franciso ST NW Calgary');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_record`
--

DROP TABLE IF EXISTS `patient_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_record` (
  `HCN` int NOT NULL,
  `Record_ID` int NOT NULL,
  PRIMARY KEY (`HCN`,`Record_ID`),
  KEY `Record_ID_idx` (`Record_ID`),
  CONSTRAINT `Record_HCN` FOREIGN KEY (`HCN`) REFERENCES `patient` (`HCN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_record`
--

LOCK TABLES `patient_record` WRITE;
/*!40000 ALTER TABLE `patient_record` DISABLE KEYS */;
INSERT INTO `patient_record` VALUES (4842485,4842485),(7953696,7953696);
/*!40000 ALTER TABLE `patient_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practitioner`
--

DROP TABLE IF EXISTS `practitioner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practitioner` (
  `Prac_ID` int NOT NULL,
  PRIMARY KEY (`Prac_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practitioner`
--

LOCK TABLES `practitioner` WRITE;
/*!40000 ALTER TABLE `practitioner` DISABLE KEYS */;
INSERT INTO `practitioner` VALUES (101),(102),(103),(104),(105),(201),(202),(203),(204);
/*!40000 ALTER TABLE `practitioner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `Number` int NOT NULL,
  `Location` varchar(255) NOT NULL,
  `Accessible` tinyint DEFAULT NULL,
  `Floor` int DEFAULT NULL,
  PRIMARY KEY (`Number`,`Location`),
  KEY `RLocation_idx` (`Location`),
  CONSTRAINT `RLocation` FOREIGN KEY (`Location`) REFERENCES `clinic` (`Location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (100,'2205 51 ST SW Calgary',1,1),(101,'2205 51 ST SW Calgary',1,1),(105,'2205 51 ST SW Calgary',1,1),(106,'2205 51 ST SW Calgary',1,1),(107,'2205 51 ST SW Calgary',0,1),(201,'2205 51 ST SW Calgary',0,2),(202,'2205 51 ST SW Calgary',0,2),(203,'2205 51 ST SW Calgary',0,2);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works_for`
--

DROP TABLE IF EXISTS `works_for`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works_for` (
  `DNum` int NOT NULL,
  `ID` int NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`DNum`,`ID`,`Location`),
  KEY `WF_ID_idx` (`ID`),
  KEY `WF_Location_idx` (`Location`),
  CONSTRAINT `WF_dnum` FOREIGN KEY (`DNum`) REFERENCES `department` (`DNo`),
  CONSTRAINT `WF_ID` FOREIGN KEY (`ID`) REFERENCES `nurse` (`ID`),
  CONSTRAINT `WF_Location` FOREIGN KEY (`Location`) REFERENCES `department` (`Location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works_for`
--

LOCK TABLES `works_for` WRITE;
/*!40000 ALTER TABLE `works_for` DISABLE KEYS */;
INSERT INTO `works_for` VALUES (1,201,'2205 51 ST SW Calgary'),(3,201,'2205 51 ST SW Calgary'),(2,202,'2205 51 ST SW Calgary'),(3,202,'2205 51 ST SW Calgary'),(4,202,'2205 51 ST SW Calgary'),(3,203,'2205 51 ST SW Calgary'),(4,203,'2205 51 ST SW Calgary'),(3,204,'2205 51 ST SW Calgary');
/*!40000 ALTER TABLE `works_for` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-12 20:20:30
