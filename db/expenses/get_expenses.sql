SELECT * FROM expenses
WHERE user_id = $1
ORDER BY expense_id DESC;