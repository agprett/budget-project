SELECT * FROM recurring
WHERE user_id = $1 ORDER BY date ASC;