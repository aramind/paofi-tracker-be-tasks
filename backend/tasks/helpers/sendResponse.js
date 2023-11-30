const success = (
  res,
  message = "Request Successful",
  data = null,
  status = 200
) => {
  res.status(status);
  res.json({
    success: true,
    message,
    data,
  });
};

const failed = (
  res,
  message = "Request Successful",
  data = null,
  status = 200
) => {
  res.status(status);
  res.json({
    success: false,
    message,
    data,
  });
};

const sendResponse = {
  success,
  failed,
};

module.exports = sendResponse;
