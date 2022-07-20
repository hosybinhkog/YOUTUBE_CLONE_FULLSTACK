const Users = require('../models/User');
const Videos = require('../models/Video');
const userController = {};
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const createErrors = require('http-errors');

userController.update = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id !== req.user) {
    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // await updateUser.save();

    res.status(200).json({
      updateUser,
      message: 'Update user successfully',
      success: true,
    });
  } else {
    next(createErrors(404, 'You only can edit your account'));
  }
});

userController.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) return next(createErrors(404, 'User not found'));

  user.password = undefined;
  res.status(200).json({
    success: true,
    message: 'get user successfully',
    user,
  });
});

userController.deleteUser = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id !== req.user) {
    await Users.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } else {
    next(createErrors(403, 'You can only del your account'));
  }
});

userController.subscribe = catchAsyncErrors(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user.id, {
    $push: { subscribedUsers: req.params.id },
  });

  await Users.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: 1 },
  });

  res.status(200).json({
    success: true,
    message: 'subscribe success',
  });
});

userController.unsubscribe = catchAsyncErrors(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user.id, {
    $pull: { subscribedUsers: req.params.id },
  });

  await Users.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: -1 },
  });

  res.status(200).json({
    success: true,
    message: 'unsubscribe success',
  });
});

userController.like = catchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  await Videos.findByIdAndUpdate(videoId, {
    $addToSet: { likes: id },
    $pull: { dislikes: id },
  });

  res.status(200).json({ message: 'like success', success: true });
});

userController.dislike = catchAsyncErrors(async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  await Videos.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: id },
    $pull: { likes: id },
  });

  res.status(200).json({ message: 'dislike success', success: true });
});

module.exports = userController;
