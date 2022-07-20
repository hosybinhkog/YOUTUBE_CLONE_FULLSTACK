const express = require('express');
const routes = express.Router();

const commentsRoute = require('./comments');
const usersRoute = require('./users');
const videosRoute = require('./videos');
const authRoute = require('./auth');

routes.use('/users', usersRoute);
routes.use('/videos', videosRoute);
routes.use('/comments', commentsRoute);
routes.use('/auth', authRoute);

module.exports = routes;
