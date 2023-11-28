const express = require("express");
const router = express.Router();
const testTaskController = require("../controllers/testTask");

router.get("/", testTaskController.getDefault);
router.post("/add", testTaskController.add);
router.get("/tasks", testTaskController.getAllTask);

module.exports = router;
