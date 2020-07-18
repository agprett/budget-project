UPDATE users
SET profile_pic = $2
WHERE user_id = $1;

INSERT INTO budget (user_id, monthly)
VALUES ($1, 0);

INSERT INTO savings (user_id, overall)
VALUES ($1, 0);

SELECT user_id, username, profile_pic FROM users
WHERE user_id = $1;