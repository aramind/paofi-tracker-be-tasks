const mongoose = require("mongoose");
const uuid = require("uuid")

const documentSchema = mongoose.Schema({
  _id: { type: String, default: function genUUID() {
    uuid.v4()
  }},
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  gdriveId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Document", documentSchema);