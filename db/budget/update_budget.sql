UPDATE budget
SET monthly = $1, entertainment = $2, personal_care = $3, groceries = $4, travel = $5, other = $6
WHERE user_id = $7;