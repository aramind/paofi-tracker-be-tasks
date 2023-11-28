const TestTask = require("../models/TestTask");
const handleError = require("../helpers/errorCatcher");

const testTaskController = {
  // adding new task
  add: async (req, res) => {
    console.log("reached add in testTaskController");
    try {
      console.log("Req body:", req.body);
      const { name } = req.body;

      const existingTask = await TestTask.findOne({
        name,
      });

      if (existingTask) {
        return res.status(403).json({
          success: false,
          message: "Task name already exist",
        });
      }

      const newTestTask = new TestTask({
        ...req.body,
        last_modified: Date.now(),
      });

      const savedTestTask = await newTestTask.save();

      res.status(201).json({
        success: true,
        message: "New test task saved",
        data: savedTestTask,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  // getting all task
  getAllTask: async (req, res) => {
    console.log("reached getTask in testTaskController");
    try {
      const tasks = await TestTask.find({});

      if (tasks.length === 0) {
        res.status(200).json({
          success: true,
          message: "No existing task",
          data: {},
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Tasks retrieved",
          data: tasks,
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  },

  // default
  getDefault: async (req, res) => {
    console.log("reached testTaskController");
    try {
    } catch (error) {
      handleError(res, error);
    }
  },
};

module.exports = testTaskController;
