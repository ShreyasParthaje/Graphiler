package main

import (
	"os"

	"github.com/gin-contrib/cors" // You will need to run: go get github.com/gin-contrib/cors
	"github.com/gin-gonic/gin"
)

func SchemaToFileHandler(c *gin.Context) {
	c.String(200, "file")
}

func FileToSchemaHandler(c *gin.Context) {
	c.String(200, "schema")
}

func SchemaToCodeHandler(c *gin.Context) {
	c.String(200, "code")
}

func main() {
	router := gin.Default() // Adds logging and crash recovery

	// Configure CORS so Vercel can talk to this API
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"graphiler.vercel.app"},
		AllowMethods: []string{"POST", "GET", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	// Routes
	router.POST("/schemaToFile", SchemaToFileHandler)
	router.POST("/fileToSchema", FileToSchemaHandler)
	router.POST("/schemaToCode", SchemaToCodeHandler)

	// Dynamic port binding for Render
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router.Run(":" + port)
}
