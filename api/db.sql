CREATE DATABASE persona;

CREATE TABLE person(
    person_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(254),
    phone VARCHAR(12)
); 