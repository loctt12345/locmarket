
/*
use master
drop database LocMarket
create database LocMarket
*/
use LocMarket
create table Category (
	CategoryID nvarchar(100),
	[Name] nvarchar(255),
	[Image] nvarchar(1000),
	PRIMARY KEY (CategoryID),
)

create table Product(
	ProductID varchar(100),
	[Name] nvarchar(255),
	[Description] nvarchar(max),
	CategoryID nvarchar(100),
	[Image] nvarchar(1000),
	Sell_Price [float],
	[Status] BIT,
 	PRIMARY KEY (ProductID),
	FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
)

