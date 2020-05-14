SELECT up.*, u.username FROM upcoming up
JOIN users u ON up.user_id = u.user_id
WHERE user_id = $1;