const Task = require("../models/Task");
// const Task = require("../objects/Task");
const handleError = require("../helpers/errorCatcher");
const sendResponse = require("../helpers/sendResponse");
const taskServices = require("../services/taskServices");

const taskController = {
  // controller | GET | tasks/:userId | desc: Get all tasks for a specific user | req: {userId} | res: List of tasks for a specific user
  // localhost:4000/tasks/1234
  getTaskByUserId: async (req, res) => {
    // console.log(req.params);
    try {
      const { userId } = req.params;

      const userTasks = await taskServices.getTaskByUserId(userId);

      if (userTasks.length === 0) {
        return sendResponse(
          res,
          404,
          false,
          "No tasks found for the given user ID"
        );
      }

      sendResponse(res, 200, true, "Tasks retrieved successfully", userTasks);
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
        return res.status(400).json({
          success: false,
          message: "One or more of the required fields are missing",
          data: null,
        });
      }

      const existingTask = await Task.findOne({
        label,
      });

      if (existingTask) {
        return res.status(403).json({
          success: false,
          message: "Task label already exist",
        });
      }

      // creating and adding the task
      const newTask = new Task({
        type,
        userId: userId.toString(), // question for reviewer: do I need to include pa this conditional ?
        label,
        Metadata: typeof Metadata === "object" ? Metadata : { Metadata }, //question for reviewer: do I need to include pa this conditional?
      });

      const createdTask = await newTask.save();

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: createdTask,
      });
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
