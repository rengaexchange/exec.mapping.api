const express = require('express');
const brandingController = require('../controllers/brandingController');
const auth = require('../middlewares/Authentication').authenticateToken;

const router = express.Router();

router.get('/getBrand', auth,  brandingController.getData);

module.exports = router;
