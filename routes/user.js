const express = require('express');
const router = express.Router();
const UserController = require('../Controller/User.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, UserController.getUsers);
router.get('/:userId', auth, UserController.getUserById);
router.get('/:field/:value', auth, UserController.getUserBy);
router.post('/create', auth, UserController.createUser);
router.put('/:userId', auth, UserController.updateUser);
router.delete('/:userId', auth, UserController.deleteUser);

module.exports = router;