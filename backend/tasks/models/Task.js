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
  label: {
    type: String,
    required: true,
  },
  Metadata: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
