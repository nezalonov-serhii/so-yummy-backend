const Recipe = require("../models/recipeModel");
const { ctrlWrapper } = require("../helpers/index");

const searchByQuery = async (req, res, next) => {
  const { query } = req.body;
  const pageNumber = 1;
  const nPerPage = 6;
  let skip = pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0;


  // const result = await Recipe.find({ title: { $regex: query, $options: 'i'} }, null, {
  //    strictQuery: false,
  // });

 const result = await Recipe.aggregate([
    { $match: { title: { $regex: query, $options: 'i'}} },
    { $sort: { _id: 1 } },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: nPerPage }],
      },
    },
  ]);

  if (!result[0].data.length) {
    res.status(404).json({
      code: 404,
      message: "No such recipe found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Success",
    data: result[0].data,
     qty: Object.assign({}, result[0].metadata),
  });
};

module.exports = {
  searchByQuery: ctrlWrapper(searchByQuery),
};
