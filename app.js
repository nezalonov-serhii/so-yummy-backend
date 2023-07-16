const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();


const swaggerUI = require('swagger-ui-express')
const swaggerjsdoc = require('swagger-jsdoc')

const authRouter = require('./routes/api/authRoutes')
const recipeRouter = require('./routes/api/recipeRoutes')
const ingredientRouter = require('./routes/api/ingredientRoutes')
const searchRouter = require('./routes/api/searchRoutes')
const ownRecipesRouter = require('./routes/api/ownRecipes')
const favoriteRouter = require('./routes/api/favoriteRoutes')
const popularRouter = require("./routes/api/popularRoutes");

const shoppingListRouter = require("./routes/api/shoppingListRouter");

// const shoppingRouter = require("./routes/api/shoppingRouter");
const subscribeRouter = require('./routes/api/subscribeRoutes')


const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "So-Yummy Recipes app",
         version: "1.0.0",
         description: "This app offers more than just a collection of recipes - it is designed to be your very own digital cookbook. You can easily save and retrieve your own recipes at any time."
      },
      components: {
         securitySchemes: {
            bearerAuth: {
               type: "http",
               scheme: "bearer",
               bearerFormat: 'JWT'
            }
         }


      },
      security: [{
         bearerAuth: [],
      }],
      servers: [
         {
            url: "http://localhost:3003/api"
         },
           {
            url: "https://so-yummy-426w.onrender.com/api"
         }
      ],
     
   },
   apis: ["./routes/api/*.js", "./models/*.js"]
}

const swaggerSpec = swaggerjsdoc(options)
const swaggerDocs = (app, port) => {
   
}
const app = express();
app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/search", searchRouter);
app.use("/api/own-recipes", ownRecipesRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/popular-recipe", popularRouter);
app.use("/api/shopping-list", shoppingListRouter);
app.use("/api/subscribe", subscribeRouter)


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

