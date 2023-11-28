const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  metaData: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
