package main

import (
	"AIBuilderBackend/handlers"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default() // Adds logging and crash recovery

	// Configure CORS so Vercel can talk to this API
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"graphiler.vercel.app"},
		AllowMethods: []string{"POST", "GET", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	// Routes
	router.POST("/schemaToCode", handlers.SchemaToCode)

	// Dynamic port binding for Render
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router.Run(":" + port)
}
