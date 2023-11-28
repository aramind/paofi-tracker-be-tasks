const mongoose = require("mongoose");

const testTaskSchema = mongoose.Schema({
  name: { type: String, required: true },
  metadata: {
    type: Object,
    required: true,
  },
  owner: { type: String, required: true },
  time_created: { type: Date, required: true, default: Date.now() },
  last_modified: { type: Date, required: true },
});

module.exports = mongoose.model("TestTask", testTaskSchema);
