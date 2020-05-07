SELECT SUM(amount) AS monthly FROM expenses
WHERE user_id = $1 AND date_paid BETWEEN $2 AND $3;