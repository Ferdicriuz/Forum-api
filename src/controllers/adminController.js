const Thread = require("../models/Thread");
const Comment = require("../models/Comment");

exports.getAllThreads = async (req, res) => {
  const threads = await Thread.find().populate("author", "name");
  res.json(threads);
};

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Comment deleted" });
};