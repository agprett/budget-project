DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS income;
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  password VARCHAR(100),
  profile_pic TEXT
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  date_due INTEGER,
  date_paid DATE
);

CREATE TABLE budget (
  budget_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  monthly INTEGER,
  entertainment INTEGER,
  personal_care INTEGER,
  groceries INTEGER,
  travel INTEGER,
  other INTEGER
)