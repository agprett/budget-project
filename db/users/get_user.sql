SELECT u.user_id, u.username, u.profile_pic FROM users u
WHERE u.user_id = $1;