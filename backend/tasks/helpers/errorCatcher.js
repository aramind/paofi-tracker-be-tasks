const handleError = (
  res,
  error,
  status = 500,
  message = "Something went wrong! Try again later."
) => {
  console.log(error);
  res.status(status);
  res.json({
    success: false,
    message,
  });
};

module.exports = handleError;
