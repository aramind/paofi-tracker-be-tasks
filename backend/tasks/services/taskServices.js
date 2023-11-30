const handleError = require("../helpers/errorCatcher");
const sendResponse = require("../helpers/sendResponse");
const Task = require("../models/Task");

const getTaskByUserId = async (userId) => {
  try {
    return await Task.find({ userId });
  } catch (error) {
    handleError(res, error);
  }
};

const sendResponseToGettingDocsRequests = (
  res,
  requestedDocs,
  successMessage,
  failureMessage
) => {
  if (requestedDocs.length === 0) {
    return sendResponse(res, 404, false, failureMessage);
  } else sendResponse(res, 200, true, successMessage, requestedDocs);
};

const taskServices = {
  getTaskByUserId,
  sendResponseToGettingDocsRequests,
};
module.exports = taskServices;
