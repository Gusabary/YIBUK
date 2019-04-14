CREATE TABLE `e-book`.`order` (
  `orderId` VARCHAR(45) NOT NULL,
  `userId` INT(9) NOT NULL,
  `bookId` INT(9) NOT NULL,
  `quantity` INT(9) NOT NULL,
  `time` DATETIME NOT NULL,
  PRIMARY KEY (`orderId`, `bookId`));
