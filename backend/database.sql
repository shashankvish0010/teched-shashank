CREATE TABLE Customer(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    age BIGINT,
    gender VARCHAR,
    user_address VARCHAR,
    email VARCHAR,
    phone_number BIGINT,
    bio VARCHAR,
    user_language VARCHAR,
    topics VARCHAR
)

CREATE TABLE Education (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR,
    degree VARCHAR,
    college VARCHAR,
    field VARCHAR,
    start_date DATE,
    end_date DATE
)

CREATE TABLE Experience (
    id  VARCHAR PRIMARY KEY,
    user_id VARCHAR,
    job_title VARCHAR,
    company VARCHAR,
    start_date DATE,
    end_date DATE,
    employement_type VARCHAR,
    industry VARCHAR,
    location VARCHAR
)

CREATE TABLE Social (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR,
    linkedin VARCHAR,
    instagram VARCHAR,
    facebook VARCHAR,
    x VARCHAR
)