const express = require('express');
const videosRoute = express.Router();
const videoController = require('../controllers/videos');
const { verifyToken } = require('../middleware/auth');

videosRoute.post('/', verifyToken, videoController.create);
videosRoute.put('/:id', verifyToken, videoController.update);
videosRoute.delete('/:id', verifyToken, videoController.delete);
videosRoute.get('/find/:id', videoController.getVideo);
videosRoute.put('/view/:id', verifyToken, videoController.view);
videosRoute.get('/trend', videoController.trend);
videosRoute.get('/random', videoController.random);
videosRoute.get('/sub', verifyToken, videoController.sub);

module.exports = videosRoute;
