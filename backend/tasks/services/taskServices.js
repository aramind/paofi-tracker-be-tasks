const handleError = require("../helpers/errorCatcher");

const getTaskByUserId = async (userId, model) => {
  try {
    return await model.find({ userId });
  } catch (error) {
    handleError(res, error);
  }
};

// for creating tasks
const addTask = async (params, model) => {
  try {
    const newTask = new model(params);
    const createdTask = await newTask.save();
    return createdTask;
  } catch (error) {
    handleError(res, error);
  }
};

// find taskByParams
const findTaskByParams = async (params, model) => {
  try {
    return await model.findOne(params);
  } catch (error) {
    handleError(res, error);
  }
};

// find task by Id
const findTaskById = async (taskId) => {
  try {
    return await Task.findById(taskId);
  } catch (error) {
    handleError(res, error);
  }
};
// update task by ID
const updateTaskById = async (
  { taskId, type, label, userId, Metadata },
  model
) => {
  const existingTask = await model.findById(taskId);

  if (!existingTask) {
    return { exist: false, updatedTask: null };
  }

  if (type) existingTask.type = type;
  if (label) existingTask.label = label;
  if (userId) existingTask.userId = userId.toString();
  if (Metadata)
    existingTask.Metadata =
      typeof Metadata === "object" ? Metadata : { Metadata };

  return { exist: true, updatedTask: await existingTask.save() };
};

const taskServices = {
  getTaskByUserId,
  addTask,
  findTaskByParams,
  findTaskById,
  updateTaskById,
};

module.exports = taskServices;
