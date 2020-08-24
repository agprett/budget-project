SELECT u.user_id, u.username, u.profile_pic, s.*, b.* FROM users u
JOIN savings s ON s.user_id = u.user_id
JOIN budget b ON b.user_id = u.user_id
WHERE u.user_id = $1;