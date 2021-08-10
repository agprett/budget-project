INSERT INTO users (username, password, overall)
VALUES ($1, $2, $3)
returning user_id;