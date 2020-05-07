SELECT monthly, entertainment, groceries, personal_care, travel, other FROM budget
WHERE user_id = $1;