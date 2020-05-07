SELECT * FROM expenses
WHERE user_id = $1
ORDER BY date_paid DESC LIMIT 5;