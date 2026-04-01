import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(comment);
};

export const getCommentsByTask = async (req, res) => {
  const comments = await Comment.find({ taskId: req.params.taskId, isDeleted: false })
    .populate("userId");
  res.json(comments);
};

export const updateComment = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.json(comment);
};