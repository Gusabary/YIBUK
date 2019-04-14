CREATE TABLE `e-book`.`book` (
  `bookId` INT(9) NOT NULL AUTO_INCREMENT,
  `bookName` VARCHAR(45) NOT NULL,
  `author` VARCHAR(45) NOT NULL,
  `coverPath` VARCHAR(256) NOT NULL,
  `ISBN` VARCHAR(256) NOT NULL,
  `storage` INT(9) NOT NULL,
  `price` FLOAT NOT NULL,
  `introduction` TEXT NOT NULL,
  PRIMARY KEY (`bookId`));