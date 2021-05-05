SELECT category, amount, budget_id FROM budget
WHERE user_id = $1;