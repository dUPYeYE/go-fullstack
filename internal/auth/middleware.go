package auth

import (
	"context"
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"

	"go-fullstack/graph/model"
	"go-fullstack/internal/database"
)

// A private key for context that only this package can access. This is important
// to prevent collisions between different context uses
var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

func Middleware(db database.Service) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			jwtToken, err := GetBearerToken(r.Header)
			if err != nil || jwtToken == "" {
				next.ServeHTTP(w, r)
				return
			}

			userID, err := ValidateJWT(jwtToken, os.Getenv("JWT_SECRET"))
			if err != nil {
				http.Error(w, "Invalid auth header", http.StatusForbidden)
				return
			}

			user, err := db.DBQueries().GetUserById(r.Context(), userID)
			if err != nil {
				http.Error(w, "Invalid user", http.StatusForbidden)
				return
			}

			ctx := context.WithValue(r.Context(), userCtxKey, model.User{
				ID:        user.ID,
				Name:      user.Name,
				Email:     user.Email,
				Role:      user.Role,
				CreatedAt: user.CreatedAt,
				UpdatedAt: user.UpdatedAt,
			})

			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// ForContext finds the user from the context. REQUIRES Middleware to have run.
func ForContext(ctx context.Context) model.User {
	raw, _ := ctx.Value(userCtxKey).(model.User)
	return raw
}
