const handleError = require("../helpers/errorCatcher");
const Task = require("../models/Task");

const getTaskByUserId = async (userId) => {
  try {
    return await Task.find({ userId });
  } catch (error) {
    handleError(res, error);
  }
};

const taskServices = {
  getTaskByUserId,
};
module.exports = taskServices;
