const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    // console.log('REQBODY instructions before split', req.body.instructions)
    let { instructions, ingredients } = req.body;
    instructions = JSON.parse(instructions)
    ingredients = JSON.parse(ingredients)
    // console.log("Arra is Array", Array.isArray(instructions))
    // // JSON.parse(instructions)
    // console.log('REQBODY instructions', instructions)
    // console.log('REQBODY instructions type', typeof(instructions))
    req.body = {...req.body, instructions, ingredients}
    const { error } = schema.validate(req.body);

    if (error) {
      console.log('ERROR', error)
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = {
  validateBody,
};
