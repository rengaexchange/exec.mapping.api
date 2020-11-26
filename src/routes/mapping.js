const express = require('express');
const mappingController = require('../controllers/mappingController');
const auth = require('../middlewares/Authentication').authenticateToken;

const router = express.Router();

router.put('/import', auth,  mappingController.updateData);
router.get('/import', auth,  mappingController.getData);
router.post('/import', auth,  mappingController.postData);

module.exports = router;
