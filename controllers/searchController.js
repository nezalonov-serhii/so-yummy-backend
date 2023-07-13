const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers/index");

const searchByQuery = async (req, res, next) => {
   const { query } = req.body;

   const result = await Recipe.find({ title: { $regex: query } }, null, {
      strictQuery: false,
   });
   if (!result) {
      res.status(404).json({
         code: 404,
         message: "No such recipe found",
      });
      return;
   }
   res.status(200).json({
      code: 200,
      message: "Success",
      data: result,
   });
};

module.exports = {
   searchByQuery: ctrlWrapper(searchByQuery),
};
