SELECT monthly, bills, groceries, personal, travel, other FROM budget
WHERE user_id = $1;