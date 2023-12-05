const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

//get user access
// api/v1/access/:userId
router.get('/:userId', accessController.getUserAccess);

module.exports = router;