const Task = require("../models/Task");
// const Task = require("../objects/Task");
const handleError = require("../helpers/errorCatcher");
const taskServices = require("../services/taskServices");
const sendResponse = require("../helpers/sendResponse");

const taskController = {
  // controller | GET | tasks/:userId | desc: Get all tasks for a specific user | req: {userId} | res: List of tasks for a specific user
  // localhost:4000/tasks/1234
  getTaskByUserId: async (req, res) => {
    // console.log(req.params);
    try {
      const { userId } = req.params;
      const userTasks = await taskServices.getTaskByUserId(userId);

      if (userTasks.length === 0) {
        sendResponse.failed(
          res,
          "No tasks found for the given user ID",
          null,
          404
        );
      } else
        sendResponse.success(
          res,
          "Tasks retrieved successfully",
          userTasks,
          200
        );
    } catch (error) {
      handleError(res, error);
    }
  },

  // TODO: controller | GET | tasks/:type?date_to=date&date_from=date | desc: Get all tasks with a specific type | req: {task type, date_to, date_from} | res: List of all tasks with a specific type

  // controller | POST | tasks | desc: create a task | req: {task type, userId, metadata} | res: created task
  // localhost:4000/tasks
  addTask: async (req, res) => {
    console.log("addTask controller reached");
    try {
      const { type, userId, label, Metadata } = req.body;

      // check if required fields are present?
      if (!type || !userId || !label || !Metadata) {
        return sendResponse.failed(
          res,
          "One or more of the required fields are missing",
          null,
          400
        );
      }

      const existingTask = await taskServices.findTaskByParams({ label });

      if (existingTask) {
        return sendResponse.failed(res, "Task label already exist", null, 403);
      }

      // creating and adding the task
      const createdTask = await taskServices.addTask({
        type,
        userId: userId.toString(),
        label,
        Metadata: typeof Metadata === "object" ? Metadata : { Metadata },
      });

      sendResponse.success(res, "Task created successfully", createdTask, 201);
    } catch (error) {
      handleError(res, error);
    }
  },
  //controller | PUT | tasks | desc: updates a task | req: {updated info} | res: updated task
  // localhost:4000/tasks
  // NOTE for reviewer: why not do it by adding the taskId via params to determine which existing (if there is one) task to update? is it better to include the taskId in the req.body? :)
  updateTask: async (req, res) => {
    console.log("UPDATING TASK");
    try {
      // const { taskId } = req.params;

      const { taskId, type, label, userId, Metadata } = req.body;

      // check for fields
      if (!taskId || (!type && !label && !userId && !Metadata)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid Request. Provide a valid task ID and at least one field to update.",
          data: null,
        });
      }

      // Find the task by id
      const existingTask = await Task.findById(taskId);

      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
          data: null,
        });
      }

      // updates the task
      if (type) existingTask.type = type;
      if (label) existingTask.label = label;
      if (userId) existingTask.userId = userId.toString();
      if (Metadata)
        existingTask.Metadata =
          typeof Metadata === "object" ? Metadata : { Metadata };

      // saving the updated task
      const updatedTask = await existingTask.save();

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = taskController;
