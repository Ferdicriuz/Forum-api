const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    author: req.user.id,
    thread: req.params.id
  });

  res.json(comment);
};

exports.replyComment = async (req, res) => {
  const parent = await Comment.findById(req.params.id);

  const reply = await Comment.create({
    content: req.body.content,
    author: req.user.id,
    thread: parent.thread,
    parentComment: parent._id
  });

  res.json(reply);
};


exports.voteComment = async (req, res) => {
  const { value } = req.body;
  const comment = await Comment.findById(req.params.id);

  const existingVote = comment.votes.find(
    v => v.user.toString() === req.user.id
  );

  if (existingVote) {
    existingVote.value = value;
  } else {
    comment.votes.push({ user: req.user.id, value });
  }

  await comment.save();

  res.json({ message: "Vote recorded", votes: comment.votes });
};