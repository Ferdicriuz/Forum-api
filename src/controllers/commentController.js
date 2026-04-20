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