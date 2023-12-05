const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

console.log("task router reached");

router.get("/users/:userId", taskController.getTask);
router.get("/:type", taskController.getTask);
// router.get("/:userId", taskController.getTaskByUserId);
router.post("/", taskController.addTask);
router.put("/", taskController.updateTask);

module.exports = router;
