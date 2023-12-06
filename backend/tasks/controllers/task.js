const Task = require("../models/Task");
const taskServices = require("../services/taskServices");
const sendResponse = require("../helpers/sendResponse");
const convertStringToDate = require("../helpers/convertStringToDate");
const generateHtmlResponse = require("../helpers/generateHtmlResponse");

const taskController = {
  // controller | GET | tasks?type= | desc: Get all tasks of specific type | res: List of tasks of specific type
  // localhost:4000/tasks/general
  getTask: async (req, res) => {
    try {
      const dynamicRouteParams = { ...req.params };
      const dynamicQueryParams = { ...req.query };

      const params = { ...dynamicRouteParams, ...dynamicQueryParams };
      const tasks = await taskServices.getTaskByParams(params, Task);

      if (tasks.length === 0) {
        sendResponse.failed(res, "No tasks found", null, 404);
      } else
        sendResponse.success(res, "Tasks retrieved successfully", tasks, 200);
    } catch (error) {
      sendResponse.error(res, error);
    }
  },

  // controller | GET | tasks/:userId | desc: Get all tasks for a specific user | req: {userId} | res: List of tasks for a specific user
  // localhost:4000/tasks/1234
  getTaskByUserId: async (req, res) => {
    try {
      // const { userId } = req.params;
      // const userTasks = await taskServices.getTaskByUserId(userId, Task);
      const userTasks = await taskServices.getTaskByParams(req.params, Task);

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
      sendResponse.error(res, error);
    }
  },

  // controller | POST | tasks | desc: create a task | req: {task type, userId, metadata} | res: created task
  // localhost:4000/tasks
  addTask: async (req, res) => {
    try {
      const { type, userId, label, Metadata } = req.body;

      // check if required fields are present?
      if (!type || !userId || !label || !Metadata) {
        return sendResponse.failed(
          res,
          "One or more of the required fields are missing",
          null
        );
      }

      const existingTask = await taskServices.findTaskByParams({ label }, Task);
      // const existingTask = await Task.findOne({ label });

      if (existingTask) {
        return sendResponse.failed(res, "Task label already exist", null, 403);
      }

      // creating and adding the task
      const createdTask = await taskServices.addTask(
        {
          type,
          userId: userId.toString(),
          label,
          Metadata: typeof Metadata === "object" ? Metadata : { Metadata },
        },
        Task
      );

      sendResponse.success(res, "Task created successfully", createdTask, 201);
    } catch (error) {
      console.log(error.message);
      sendResponse.error(res, error);
    }
  },
  //controller | PUT | tasks | desc: updates a task | req: {updated info} | res: updated task
  // localhost:4000/tasks
  updateTask: async (req, res) => {
    try {
      // const { taskId } = req.params;

      const { taskId, type, label, userId, Metadata, completed } = req.body;

      // check for fields
      if (!taskId || (!type && !label && !userId && !Metadata && !completed)) {
        return sendResponse.failed(
          res,
          "Invalid Request. Provide a valid task ID and at least one field to update.",
          null,
          400
        );
      }

      // check completed if it is true there must be a date
      if (completed?.status && completed.date === undefined) {
        completed.date = new Date();
      }

      // Find the task by id and update
      const { exist, updatedTask } = await taskServices.updateTaskById(
        { taskId, type, label, userId, Metadata, completed },
        Task
      );

      if (!exist) {
        sendResponse.failed(res, "Task not found", null, 404);
      } else {
        sendResponse.success(
          res,
          "Task updated successfully",
          updatedTask,
          200
        );
      }
    } catch (error) {
      console.log(error);
      sendResponse.error(res, error);
    }
  },

  // displaying home on API
  displayHome: async (req, res) => {
    try {
      const htmlResponse = generateHtmlResponse();
      res.send(htmlResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = taskController;
