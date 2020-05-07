SELECT SUM(amount) AS weekly FROM expenses
WHERE user_id = $1 AND date_paid BETWEEN $2 AND $3 AND category IN ('personal', 'groceries', 'travel', 'other');