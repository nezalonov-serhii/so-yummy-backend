const checkReqParams = (req, res, next) => {
  const query = req.params.category;

  if (/\d/.test(query)) {
    req.params.id = query;
    next("route");
  } else {
    next();
  }
};

module.exports = checkReqParams;
