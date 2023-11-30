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

// for creating tasks
const addTask = async (params) => {
  try {
    const newTask = new Task(params);
    const createdTask = await newTask.save();
    return createdTask;
  } catch (error) {
    handleError(res, error);
  }
};

// find task
const findTaskByParams = async (params) => {
  try {
    return await Task.findOne(params);
  } catch (error) {
    handleError(res, error);
  }
};

const taskServices = {
  getTaskByUserId,
  addTask,
  findTaskByParams,
};
module.exports = taskServices;
