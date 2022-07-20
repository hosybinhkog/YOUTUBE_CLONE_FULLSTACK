const express = require('express');
const userController = require('../controllers/users');
const { verifyToken } = require('../middleware/auth');
const usersRoute = express.Router();

usersRoute.put('/:id', verifyToken, userController.update);
usersRoute.delete('/:id', verifyToken, userController.deleteUser);
usersRoute.get('/find/:id', userController.getUser);
usersRoute.put('/sub/:id', verifyToken, userController.subscribe);
usersRoute.put('/unsub/:id', verifyToken, userController.unsubscribe);
usersRoute.put('/like/:videoId', verifyToken, userController.like);
usersRoute.put('/unlike/:videoId', verifyToken, userController.dislike);

module.exports = usersRoute;
