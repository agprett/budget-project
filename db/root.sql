DROP TABLE IF EXISTS debts;
DROP TABLE IF EXISTS savings_goals;
DROP TABLE IF EXISTS savings;
DROP TABLE IF EXISTS recurring;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  password VARCHAR(255)
);

CREATE TABLE budget (
  budget_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  category VARCHAR(25),
  amount INTEGER,
  main BOOLEAN
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  date DATE
);

CREATE TABLE recurring (
  recurring_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  date DATE,
  recurrence varchar(15)
);

CREATE TABLE savings (
  savings_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  amount INTEGER,
  name VARCHAR(20)
);

CREATE TABLE savings_goals (
  goal_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  goal_amount INTEGER,
  saved_amount INTEGER,
  name VARCHAR(20),
  date DATE,
  monthly_amount INTEGER
);

CREATE TABLE debts (
  debt_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  total INTEGER,
  monthly INTEGER,
  paid INTEGER,
  date DATE
);

SELECT * FROM users;
SELECT * FROM budget;
SELECT * FROM expenses;
SELECT * FROM recurring;
SELECT * FROM savings;
SELECT * FROM goals;
SELECT * FROM debts;