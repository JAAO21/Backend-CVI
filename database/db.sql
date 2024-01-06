create database cviDb

use cviDb;

create table user(
   id int AUTO_INCREMENT primary key,
   email varchar(100),
   name_user varchar(100),
   password varchar(100),
   state_user boolean,
   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   personID int not null
)

create table person(
    id int AUTO_INCREMENT primary key,
    firstName varchar(45),
    firstLastName varchar(45),
    secondName varchar(45),
    secondLastName varchar(45),
    identificationType varchar(45),
    identificationNumber varchar(45),
    age int,
    gender varchar(15)
)

create table seller(
    id int AUTO_INCREMENT primary key,
    firstName varchar(45),
    firstLastName varchar(45),
    secondName varchar(45),
    secondLastName varchar(45),
    nationality varchar(45),
    identificationType varchar(45),
    identificationNumber varchar(45),
    birthDate date,
    age int,
    gender varchar(15),
    type_seller varchar(45),
    location_seller varchar(45),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    userID int not null,
    product varchar(45),
    email varchar(100),
     address varchar(100),
     stateCivil varchar(100),
    stratum varchar(100),
    forcedDisplacement varchar(100),
    etnia varchar(100),
    guard varchar(100),
    eps varchar(100),
    disability varchar(100),
    educativeLevel varchar(100),
    tecnologyAcces varchar(100),
    publicsServices varchar(100),
    familyNucleus varchar(100),
    numberFamilyNucleus int
)

create table product(
    id int AUTO_INCREMENT primary key,
    name_producto varchar(45),
    amount int,
    type_product varchar(45),
    price int,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

create table sale(
    personID int  not null,
    productID int not null,
    amount int,
    total_price int,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (personId, productID))
)

create table  menu(
    id int AUTO_INCREMENT primary key,
    name varchar(45)
)

insert  into menu(name)  values('/');
insert  into menu(name)  values('buscar');
insert  into menu(name)  values('registrar');
insert  into menu(name)  values('información');


//llaves foraneas

ALTER TABLE user
ADD CONSTRAINT fk_user_person
FOREIGN KEY (personID)
REFERENCES person(id);

ALTER TABLE seller
ADD CONSTRAINT fk_user_seller
FOREIGN KEY (userID)
REFERENCES seller(id);