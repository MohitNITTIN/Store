const path = require("path");
const express = require("express");
const cloudinary = require("cloudinary");
const app = require("./backend/app");
const connectDatabase = require("./backend/config/database");
const PORT = process.env.PORT || 4000;
const NODE_ENV = 'production'

// UncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

connectDatabase();

// deployment
__dirname = path.resolve();
if (NODE_ENV === "production") {
  console.log("inside production");
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}
console.log(NODE_ENV);
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
