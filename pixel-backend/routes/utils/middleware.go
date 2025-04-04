package routeutils

import (
	"net/http"

	"github.com/AFK_AlignedFamKernel/afk_monorepo/pixel-backend/core"
)

// Middleware functions for routes
// Return true if middleware stops the request

func NonProductionMiddleware(w http.ResponseWriter, r *http.Request) bool {
	if core.AFKBackend.BackendConfig.Production {
		WriteErrorJson(w, http.StatusNotImplemented, "Route is disabled in production")
		return true
	}

	return false
}

func AuthMiddleware(w http.ResponseWriter, r *http.Request) bool {
	// TODO: Implement authentication
	return false
}

func AdminMiddleware(w http.ResponseWriter, r *http.Request) bool {
	// TODO: Implement admin authentication
	if core.AFKBackend.AdminMode {
		return false
	} else {
		WriteErrorJson(w, http.StatusUnauthorized, "Admin is required")
		return true
	}
}
