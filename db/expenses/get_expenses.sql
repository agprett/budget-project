SELECT * FROM expenses
WHERE user_id = $1
ORDER BY date DESC LIMIT $2 OFFSET $3;