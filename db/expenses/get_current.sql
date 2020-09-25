SELECT SUM(amount) AS Overall FROM expenses
WHERE user_id = $1 AND date BETWEEN $2 AND $3;