const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middlewares/Authentication').authenticateToken;

const router = express.Router();

router.get('/getData', auth,  authController.getData);
router.post('/token', authController.postData);

module.exports = router;