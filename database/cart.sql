CREATE TABLE `e-book`.`cart` (
  `userId` INT(9) NOT NULL,
  `bookId` INT(9) NOT NULL,
  `quantity` INT(9) NOT NULL,
  PRIMARY KEY (`userId`, `bookId`));