DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS upcoming;
DROP TABLE IF EXISTS condensed;
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  password VARCHAR(100),
  profile_pic TEXT
);

CREATE TABLE budget (
  budget_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  monthly INTEGER,
  bills INTEGER,
  personal INTEGER,
  groceries INTEGER,
  travel INTEGER,
  other INTEGER
);

CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  date_paid DATE
);

CREATE TABLE upcoming (
  upcoming_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name VARCHAR(20),
  category VARCHAR(20),
  amount INTEGER,
  pay_date DATE
);

CREATE TABLE condensed (
  condensed_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  personal INTEGER,
  groceries INTEGER,
  travel INTEGER,
  other INTEGER
);

INSERT INTO users (username, password)
VALUES ('b', 'b');

INSERT INTO budget (user_id, monthly, bills, personal, groceries, travel, other)
VALUES (1, 1300, 575, 50, 125, 50, 30);

INSERT INTO expenses (user_id, name, category, amount, date_paid)
VALUES (1, 'groceries', 'groceries', 35, '05/05/2020'), (1, 'rent', 'bills', 575, '05/01/2020'), (1, 'clothes', 'personal', 25, '05/07/2020'), (1, 'gas', 'travel', 35, '05/05/2020'), (1, 'Video games', 'other', 25, '05/06/2020');

INSERT INTO condensed (user_id, personal, groceries, travel, other)
VALUES (1, 0, 0, 0, 0);

UPDATE condensed
SET personal = (SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND category = 'personal'),
groceries = (SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND category = 'groceries'),
travel = (SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND category = 'travel'),
other = (SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND category = 'other')
WHERE user_id = 1;

SELECT * FROM users;
SELECT * FROM budget;
SELECT * FROM expenses;
SELECT * FROM upcoming;
SELECT * FROM condensed;