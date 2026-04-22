const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
}, { timestamps: true });

votes: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: { type: Number, enum: [1, -1] }
  }
]

module.exports = mongoose.model("Comment", commentSchema);