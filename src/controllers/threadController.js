const Thread = require("../models/Thread");
const Comment = require("../models/Comment");

exports.createThread = async (req, res) => {
  const thread = await Thread.create({
    ...req.body,
    author: req.user.id
  });
  res.json(thread);
};

exports.getThreads = async (req, res) => {
  const threads = await Thread.find().populate("author", "name");
  res.json(threads);
};

exports.getThreadById = async (req, res) => {
  const thread = await Thread.findById(req.params.id).populate("author", "name");

  const comments = await Comment.find({ thread: thread._id }).lean();

  const buildTree = (comments, parent = null) =>
    comments
      .filter(c => String(c.parentComment) === String(parent))
      .map(c => ({
        ...c,
        replies: buildTree(comments, c._id)
      }));

  res.json({
    thread,
    comments: buildTree(comments)
  });
};

exports.deleteThread = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  await Thread.findByIdAndDelete(req.params.id);
  res.json({ message: "Thread deleted" });
};


exports.voteThread = async (req, res) => {
  const { value } = req.body; // 1 or -1
  const thread = await Thread.findById(req.params.id);

  const existingVote = thread.votes.find(
    v => v.user.toString() === req.user.id
  );

  if (existingVote) {
    existingVote.value = value; // update vote
  } else {
    thread.votes.push({ user: req.user.id, value });
  }

  await thread.save();

  res.json({ message: "Vote recorded", votes: thread.votes });
};