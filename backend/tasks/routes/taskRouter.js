const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

// console.log("taskrouter reached");

router.get("/:userId", taskController.getTaskByUserId);

module.exports = router;
