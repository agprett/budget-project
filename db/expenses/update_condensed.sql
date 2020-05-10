UPDATE condensed
SET personal = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND date_paid BETWEEN $2 AND $3 AND category = 'personal'),
groceries = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND date_paid BETWEEN $2 AND $3 AND category = 'groceries'),
travel = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND date_paid BETWEEN $2 AND $3 AND category = 'travel'),
other = (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND date_paid BETWEEN $2 AND $3 AND category = 'other')
WHERE user_id = $1;