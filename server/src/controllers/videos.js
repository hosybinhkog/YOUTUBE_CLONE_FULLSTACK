const Videos = require('../models/Video');
const Users = require('../models/User');
const videoController = {};
const createErrors = require('http-errors');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Video = require('../models/Video');

videoController.create = catchAsyncErrors(async (req, res, next) => {
  const newVideo = await new Videos({ userId: req.user.id, ...req.body });

  await newVideo.save();

  res.status(200).json({
    message: 'Create video successfully',
    success: true,
    newVideo,
  });
});

videoController.update = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) return next(createErrors(404, 'Video not found'));
  if (req.user.id !== video.userId) return next(createErrors(403, 'You can update your videos'));

  const updateVideo = await Videos.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({
    message: 'Video updated successfully',
    updateVideo,
    success: true,
  });
});

videoController.delete = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  if (!video) return next(createErrors(404, 'Video not found'));
  if (req.user.id !== video.userId) return next(createErrors(403, 'You can delete your videos!'));

  await Videos.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: 'Video delete successfully',
    success: true,
  });
});

videoController.getVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Videos.findById(req.params.id);
  if (!video) return next(createErrors(404, 'Video not found'));

  res.status(200).json({
    success: true,
    message: 'get video success',
    video,
  });
});

videoController.view = catchAsyncErrors(async (req, res, next) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });

  res.status(200).json({ success: true, message: 'Add view success' });
});

videoController.trend = catchAsyncErrors(async (req, res, next) => {
  const videos = await Videos.find().sort({ view: -1 });
  res.status(200).json({ success: true, message: 'trend video', videos });
});

videoController.random = catchAsyncErrors(async (req, res, next) => {
  const videos = await Videos.aggregate([{ $sample: { size: 40 } }]);
  res.status(200).json({ success: true, message: 'random video', videos });
});

videoController.sub = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findById(req.user.id);
  const subscribedChannels = user.subscribedUsers;

  const list = await Promise.all(
    subscribedChannels.map((chanelId) => {
      return Videos.find({ userId: chanelId });
    })
  );

  res.status(200).json({
    success: true,
    message: 'sub',
    list: list.flat().sort((a, b) => b.createAt - a.createAt),
  });
});

videoController.tags = catchAsyncErrors(async (req, res, next) => {
  const tags = req.query.tags.split(',');
  const videos = await Videos.find({ tags: { $in: tags } }).limit(20);

  res.status(200).json({
    success: true,
    message: 'get by tags successfully',
    videos,
  });
});

videoController.search = catchAsyncErrors(async (req, res, next) => {
  const search = req.query.q;

  const videos = await Videos.find({ title: { $regex: search, $options: 'i' } }).limit(40);

  res.status(200).json({
    message: 'search by title successfully',
    videos,
    success: true,
  });
});

module.exports = videoController;
