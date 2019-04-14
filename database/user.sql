CREATE TABLE `e-book`.`user` (
  `userId` INT(9) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `identity` INT(1) NOT NULL,
  `validity` INT(1) NOT NULL,
  PRIMARY KEY (`userId`));
