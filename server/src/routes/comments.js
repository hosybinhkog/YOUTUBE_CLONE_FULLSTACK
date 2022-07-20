const express = require('express');
const commentsRoute = express.Router();
const { verifyToken } = require('../middleware/auth');
const commentsController = require('../controllers/comments');

commentsRoute.post('/', verifyToken, commentsController.create);
commentsRoute.put('/:id', verifyToken, commentsController.update);
commentsRoute.delete('/:id', verifyToken, commentsController.delete);
commentsRoute.get('/find/:videoId', commentsController.getComments);

module.exports = commentsRoute;
