SELECT * from upcoming
WHERE user_id = $1 ORDER BY pay_date ASC LIMIT 3;