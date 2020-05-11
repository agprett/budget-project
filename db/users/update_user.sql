UPDATE users
SET profile_pic = $2
WHERE user_id = $1;

INSERT INTO budget (user_id, monthly, bills, personal, groceries, travel, other)
VALUES ($1, 0, 0, 0, 0, 0, 0);

INSERT INTO condensed (user_id, personal, groceries, travel, other)
VALUES ($1, 0, 0, 0, 0);

UPDATE condensed
SET personal = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND category = 'personal'),
groceries = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND category = 'groceries'),
travel = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND category = 'travel'),
other = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND category = 'other')
WHERE user_id = $1;

SELECT user_id, username, profile_pic FROM users
WHERE user_id = $1;