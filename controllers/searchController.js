const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers/index");

const searchByQuery = async (req, res, next) => {
  const { query } = req.body;
  const { page, limit } = req.query;
  let pageNumber = page ? page : 1;
 let nPerPage = limit ? parseInt(limit) : 8;
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;


  const result = await Recipe.aggregate([
    { $match: { title: { $regex: query, $options: "i" } } },
    { $sort: { _id: 1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: nPerPage }],
      },
    },
  ]);

  if (!result[0].data.length) {
    res.status(200).json({
      code: 200,
      message: "No such recipe found",
      data: []
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result[0].data,
    qty: result[0].metadata[0],
  });
};

module.exports = {
  searchByQuery: ctrlWrapper(searchByQuery),
};
