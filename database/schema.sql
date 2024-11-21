CREATE DATABASE educase;
use educase;

create table schools(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) not null,
    address varchar(200) not null,
    latitude FLOAT not null,
    longitude FLOAT not null
);

