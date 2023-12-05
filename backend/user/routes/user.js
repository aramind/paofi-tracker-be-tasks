
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET REQUESTS

// get a specific users
// api/v1/users/:userId
router.get('/:userId', userController.getUserById);

// get summary of all scholars
// api/v1/users/scholars/summary
router.get('/scholars/summary', userController.getAllScholarSummary);

// PUT REQUESTS

// change user info
// api/v1/users/:userId
router.put('/:userId', userController.changeUserInfo);

// change user password
// api/v1/users/:userId/password
router.put('/:userId/password', userController.changePassword);


// DELETE REQUEST

// soft delete user by id
// api/v1/users/:userId
router.delete( '/:userId', userController.deleteAUser);

module.exports = router;