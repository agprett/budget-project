UPDATE budget
SET monthly = $1, bills = $2, personal = $3, groceries = $4, travel = $5, other = $6
WHERE user_id = $7;