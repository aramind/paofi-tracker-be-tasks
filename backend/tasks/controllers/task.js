const Task = require("../models/Task");
const handleError = require("../helpers/errorCatcher");

const taskController = {
  // controller | GET | tasks/:userId | desc: Get all tasks for a specific user | req: {userId} | res: List of tasks for a specific user
  getTaskByUserId: async (req, res) => {
    // console.log(req.params);
    try {
      const { userId } = req.params;

      const userTasks = await Task.find({ userId });

      if (userTasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No tasks found for the give user ID",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        data: userTasks,
      });
    } catch (error) {
      handleError(res, error);
    }
  },
  // TODO: controller | GET | tasks/:type?date_to=date&date_from=date | desc: Get all tasks with a specific type | req: {task type, date_to, date_from} | res: List of all tasks with a specific type

  // controller | POST | tasks | desc: create a task | req: {task type, userId, metadata} | res: created task
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
        Metadata: typeof Metadata === "object" ? Metadata : { Metadata }, //question for reviewer: do we need to include pa this conditional?
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
  // TODO: controller | PUT | tasks | desc: updates a task | req: {updated info} | res: updated task
};

module.exports = taskController;
