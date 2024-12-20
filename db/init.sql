CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50),
        password VARCHAR(100)
    );

CREATE TABLE
    sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        token VARCHAR(100)
    );