const notFound = (req, res, next) => {
  res.status(404).send("404 - Page Not Found");
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong on the server");
};

module.exports = {
  notFound,
  errorHandler
};