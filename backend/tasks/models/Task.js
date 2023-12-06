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
  completed: {
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
    },
  },
  Metadata: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Task", taskSchema);
