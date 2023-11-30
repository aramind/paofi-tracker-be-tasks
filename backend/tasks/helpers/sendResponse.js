const sendResponse = (res, status = 200, success, message, data = null) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};

module.exports = sendResponse;
