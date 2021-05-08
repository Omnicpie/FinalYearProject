/* remove any databases with the same name */
DROP DATABASE IF EXISTS `eshop`;
/* create the database */
CREATE DATABASE `eshop`;


/* Create product tables (in order of)
 * ASDA
 * TESCO
 * SAINSBURY`S
 * COOP
 * ALDI
 */
CREATE TABLE `eshop`.`asda`(
    `url` VARCHAR(255) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_price` VARCHAR(25) NOT NULL,
    `product_additionals` VARCHAR(255),
    CONSTRAINT `PK_asda` PRIMARY KEY(`url`)
);

CREATE TABLE `eshop`.`tesco`(
    `url` VARCHAR(255) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_price` VARCHAR(25) NOT NULL,
    `product_additionals` VARCHAR(255),
    CONSTRAINT `PK_tesco` PRIMARY KEY(`url`)
);

CREATE TABLE `eshop`.`sainsburys`(
    `url` VARCHAR(255) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_price` VARCHAR(25) NOT NULL,
    `product_additionals` VARCHAR(255),
    CONSTRAINT `PK_sainsburys` PRIMARY KEY(`url`)
);

CREATE TABLE `eshop`.`coop`(
    `url` VARCHAR(255) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_price` VARCHAR(25) NOT NULL,
    `product_additionals` VARCHAR(255),
    CONSTRAINT `PK_coop` PRIMARY KEY(`url`)
);

CREATE TABLE `eshop`.`aldi`(
    `url` VARCHAR(255) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `product_price` VARCHAR(25) NOT NULL,
    `product_additionals` VARCHAR(255),
    CONSTRAINT `PK_aldi` PRIMARY KEY(`url`)
);

CREATE TABLE `eshop`.`user`(
    `display_name` VARCHAR(25) NOT NULL,
    `email` TEXT NOT NULL,
    `p_hash` VARCHAR(255) NOT NULL,
    CONSTRAINT `PK_user` PRIMARY KEY(`display_name`)
);

CREATE TABLE `eshop`.`saved_basket`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(25),
    `price` varchar(25),
    `name` varchar(255),
    CONSTRAINT `PK_saved_basket` PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `eshop`.`users`(`display_name`)
);

CREATE TABLE `eshop`.`basket_content`(
    `basket_id` INT NOT NULL,
    `item_id_asda` VARCHAR(255),
    `item_id_sainsburys` VARCHAR(255),
    `item_id_coop` VARCHAR(255),
    `item_id_tesco` VARCHAR(255),
    `item_id_aldi` VARCHAR(255),
    `term` varchar(255),
    CONSTRAINT `FK_saved_basket` FOREIGN KEY(`basket_id`) REFERENCES `eshop`.`saved_basket`(`id`) ON DELETE CASCADE,
    CONSTRAINT `FK_asda` FOREIGN KEY(`item_id_asda`) REFERENCES `eshop`.`asda`(`url`)  ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `FK_tesco` FOREIGN KEY(`item_id_tesco`) REFERENCES `eshop`.`tesco`(`url`)  ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `FK_coop` FOREIGN KEY(`item_id_coop`) REFERENCES `eshop`.`coop`(`url`)  ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `FK_sainsburys` FOREIGN KEY(`item_id_sainsburys`) REFERENCES `eshop`.`sainsburys`(`url`)  ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `FK_aldi` FOREIGN KEY(`item_id_aldi`) REFERENCES `eshop`.`aldi`(`url`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `eshop`.`last_modified`(
	`shop` varchar(55) NOT NULL,
    `date` DATETIME NOT NULL,
    CONSTRAINT `PK_last_modified` primary key(`shop`)
);

/*Create Procedures For browse types*/
DROP PROCEDURE IF EXISTS `eshop`.`browseProductsNameAsc`;
CREATE procedure `eshop`.browseProductsNameAsc(ASDA bit, COOP bit, TESCO bit, ALDI bit, SAINS bit, SEARCH varchar(25))
	SELECT 'asda' AS shop, url, product_name,product_price,product_additionals FROM asda WHERE ASDA = 1 && product_name like SEARCH
	union all
	SELECT 'coop' AS shop, url, product_name,product_price,product_additionals FROM coop WHERE COOP = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'aldi' AS shop, url, product_name,product_price,product_additionals FROM aldi WHERE ALDI = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'sains' AS shop, url, product_name,product_price,product_additionals FROM sainsburys WHERE SAINS = 1 && product_name like SEARCH
	UNION ALL
	SELECT 'tesco' AS shop, url,product_name,product_price,product_additionals FROM tesco WHERE TESCO = 1 && product_name like SEARCH
    ORDER BY product_name asc;

DROP PROCEDURE IF EXISTS `eshop`.`browseProductsNameDesc`;
CREATE procedure `eshop`.browseProductsNameDesc(ASDA bit, COOP bit, TESCO bit, ALDI bit, SAINS bit, SEARCH varchar(25))
	SELECT 'asda' AS shop, url, product_name,product_price,product_additionals FROM asda WHERE ASDA = 1 && product_name like SEARCH
	union all
	SELECT 'coop' AS shop, url, product_name,product_price,product_additionals FROM coop WHERE COOP = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'aldi' AS shop, url, product_name,product_price,product_additionals FROM aldi WHERE ALDI = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'sains' AS shop, url, product_name,product_price,product_additionals FROM sainsburys WHERE SAINS = 1 && product_name like SEARCH
	UNION ALL
	SELECT 'tesco' AS shop, url,product_name,product_price,product_additionals FROM tesco WHERE TESCO = 1 && product_name like SEARCH
    ORDER BY product_name desc;


DROP PROCEDURE IF EXISTS `eshop`.`browseProductsPriceAsc`;
CREATE procedure `eshop`.browseProductsPriceAsc(ASDA bit, COOP bit, TESCO bit, ALDI bit, SAINS bit, SEARCH varchar(25))
	SELECT 'asda' AS shop, url, product_name,product_price,product_additionals FROM asda WHERE ASDA = 1 && product_name like SEARCH
	union all
	SELECT 'coop' AS shop, url, product_name,product_price,product_additionals FROM coop WHERE COOP = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'aldi' AS shop, url, product_name,product_price,product_additionals FROM aldi WHERE ALDI = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'sains' AS shop, url, product_name,product_price,product_additionals FROM sainsburys WHERE SAINS = 1 && product_name like SEARCH
	UNION ALL
	SELECT 'tesco' AS shop, url,product_name,product_price,product_additionals FROM tesco WHERE TESCO = 1 && product_name like SEARCH
    ORDER BY product_price asc;

DROP PROCEDURE IF EXISTS `eshop`.`browseProductsPriceDesc`;
CREATE procedure `eshop`.browseProductsPriceDesc(ASDA bit, COOP bit, TESCO bit, ALDI bit, SAINS bit, SEARCH varchar(25))
	SELECT 'asda' AS shop, url, product_name,product_price,product_additionals FROM asda WHERE ASDA = 1 && product_name like SEARCH
	union all
	SELECT 'coop' AS shop, url, product_name,product_price,product_additionals FROM coop WHERE COOP = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'aldi' AS shop, url, product_name,product_price,product_additionals FROM aldi WHERE ALDI = 1 && product_name like SEARCH
	UNION ALL 
	SELECT 'sains' AS shop, url, product_name,product_price,product_additionals FROM sainsburys WHERE SAINS = 1 && product_name like SEARCH
	UNION ALL
	SELECT 'tesco' AS shop, url,product_name,product_price,product_additionals FROM tesco WHERE TESCO = 1 && product_name like SEARCH
    ORDER BY product_price desc;
