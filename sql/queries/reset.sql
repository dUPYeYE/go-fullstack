-- name: ResetUsers :exec
DELETE FROM users;

-- name: ResetTokens :exec
DELETE FROM refresh_tokens;
