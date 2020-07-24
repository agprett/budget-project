UPDATE expenses
SET name = $1, date = $2, amount = $3
WHERE expense_id = $4;