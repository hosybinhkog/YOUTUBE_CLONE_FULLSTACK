const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Comments = require('../models/Comment');
const Videos = require('../models/Video');
const createErrors = require('http-errors');

const commentsController = {};

commentsController.create = catchAsyncErrors(async (req, res, next) => {
  const newComment = await new Comments({ userId: req.user.id, ...req.body });

  await newComment.save();

  res.status(200).json({
    success: true,
    message: 'create comments successfully',
    newComment,
  });
});

commentsController.update = catchAsyncErrors(async (req, res, next) => {});

commentsController.delete = catchAsyncErrors(async (req, res, next) => {
  const comment = await Comments.findById(req.params.id);
  const video = await Videos.findById(req.params.id);

  if (req.user.id === comment.userId || req.user.id === video.userId) {
    await Comments.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'delete comment successfully', success: true });
  } else {
    return next(createErrors(403, 'Forbidden'));
  }
});

commentsController.getComments = catchAsyncErrors(async (req, res, next) => {
  const comments = await Comments.find({ videoId: req.params.videoId });

  res.status(200).json({ message: 'get comments successfully', success: true }, comments);
});

module.exports = commentsController;
