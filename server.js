const express = require("express");
const app = require("./app");
const connectDB = require("./config/db_connect");
const path = require("path");
const { HttpError } = require("./helpers");
const configPath = path.join(__dirname, "config", ".env");
require("dotenv").config({ path: configPath });
const { DB_HOST, PORT } = process.env;

// const app = express()
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
// app.use("/api/v1/users", require("./routes/api/authRoutes"));

app.use(HttpError);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
