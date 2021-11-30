CREATE DATABASE  IF NOT EXISTS `dados212d` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dados212d`;

--
-- Table structure for table `fabricante`
--

DROP TABLE IF EXISTS `fabricante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabricante` (
  `fab_codigo` int NOT NULL AUTO_INCREMENT,
  `fab_ativoinativo` char(1) DEFAULT NULL,
  `fab_nome` varchar(30) DEFAULT NULL,
  `fab_apelido` varchar(20) DEFAULT NULL,
  `fab_cidade` varchar(20) DEFAULT NULL,
  `fab_estado` char(2) DEFAULT NULL,
  `fab_telefone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`fab_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabricante`
--

LOCK TABLES `fabricante` WRITE;
/*!40000 ALTER TABLE `fabricante` DISABLE KEYS */;
INSERT INTO `fabricante` VALUES (1,'A','Wizards of the Coast','Wizards','Sao Paulo','SP','1699998888'),(2,'A','Nike, Inc','Nike','Rio de Janeiro','RJ','1698885555'),(3,'A','Quacker Oats','Quacker','Recife','PE','1698765432');
/*!40000 ALTER TABLE `fabricante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `pro_codigo` int NOT NULL AUTO_INCREMENT,
  `pro_ativoinativo` char(1) DEFAULT NULL,  
  `pro_descricao` varchar(10) DEFAULT NULL,
  `pro_validade` varchar(5) DEFAULT NULL,
  `pro_especie` varchar(15) DEFAULT NULL,
  `fab_codigo` int NOT NULL,
  PRIMARY KEY (`pro_codigo`),
  KEY `fk_produto_fabricante_idx` (`fab_codigo`),
  CONSTRAINT `fk_produto_fabricante` FOREIGN KEY (`fab_codigo`) REFERENCES `fabricante` (`fab_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,'A','VISA','01/10','Brinquedo', 1),(2,'A','ELO','02/11','Tenis', 1),(3,'A','MASTERCARD','03/12','Alimento', 3);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;