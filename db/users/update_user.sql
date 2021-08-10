UPDATE users
SET overall = 0
WHERE user_id = $1;

INSERT INTO savings (user_id, overall)
VALUES ($1, 0);

SELECT user_id, username, overall FROM users
WHERE user_id = $1;