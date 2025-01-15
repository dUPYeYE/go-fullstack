// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package database

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type RefreshToken struct {
	Token     string
	UserID    uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
	ExpiresAt time.Time
	RevokedAt sql.NullTime
}

type User struct {
	ID        uuid.UUID
	Name      string
	Email     string
	Role      sql.NullString
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}