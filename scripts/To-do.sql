-- create database
CREATE DATABASE test;

--create table
CREATE TABLE Tasks (
    ID int NOT NULL AUTO_INCREMENT,
    Heading varchar(50),
    Body varchar(255),
    StartDate date,
    EndDate date,
    IsActive bool DEFAULT 1,
    PRIMARY KEY (ID)
);