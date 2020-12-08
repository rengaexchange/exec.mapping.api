const express = require('express');
const brandingController = require('../controllers/brandingController');
const auth = require('../middlewares/Authentication').authenticateToken;

const router = express.Router();

router.get('/getBrand', auth,  brandingController.getData);
router.delete('/getBrand', auth,  brandingController.delData);

module.exports = router;
