const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require('./routes/api/authRoutes')
const recipeRouter = require('./routes/api/recipeRoutes')
const ingredientRouter = require('./routes/api/ingredientRoutes')
const searchRouter = require('./routes/api/searchRoutes')
const ownRecipesRouter = require('./routes/api/ownRecipes')
const favoriteRouter = require('./routes/api/favoriteRoutes')


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/ingredients', ingredientRouter)
app.use('/api/search', searchRouter)
app.use('/api/own-recipes', ownRecipesRouter)
app.use('/api/favorite', favoriteRouter)


app.use((req, res) => {
   res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
   const { status = 500, message = "Server error" } = err;
   res.status(status).json({
      message,
   });
});

module.exports = app;
