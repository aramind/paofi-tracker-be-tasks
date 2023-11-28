const Task = require("../models/Task");
const handleError = require("../helpers/errorCatcher");

const taskController = {
  // TODO: controller | GET | tasks/:userId | desc: Get all tasks for a specific user | req: {userId} | res: List of tasks for a specific user
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
  // TODO: controller | POST | tasks | desc: create a task | req: {task type, userId, metadata} | res: created task
  // TODO: controller | PUT | tasks | desc: updates a task | req: {updated info} | res: updated task
};

module.exports = taskController;
