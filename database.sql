CREATE DATABASE sleeptracker;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    google_id VARCHAR NOT NULL UNIQUE
);

CREATE TABLE sleep(
    sleep_id SERIAL PRIMARY KEY,
    time INT NOT NULL,
    date DATE NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);

