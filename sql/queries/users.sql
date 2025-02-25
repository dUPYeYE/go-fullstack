-- name: GetAllUsers :many
SELECT * FROM users;

-- name: GetUserById :one
SELECT * FROM users WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: GetUserByName :one
SELECT * FROM users WHERE name = $1;


-- name: CreateUser :one
INSERT INTO users (name, email, password, role)
VALUES (
  $1,
  $2,
  $3,
  $4
)
RETURNING *;

-- name: ResetPassword :one
UPDATE users
SET password = $2
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;

-- name: UpdateUser :one
UPDATE users SET
  name = $2,
  email = $3,
  role = $4,
  updated_at = NOW()
WHERE id = $1
RETURNING *;
