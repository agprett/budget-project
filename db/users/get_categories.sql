SELECT DISTINCT b.category FROM budget b
WHERE user_id = $1
UNION
SELECT DISTINCT e.category FROM expenses e
WHERE user_id = $1;