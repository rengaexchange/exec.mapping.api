const express = require('express');
const mappingController = require('../controllers/mappingController');

const router = express.Router();

router.put('/import', mappingController.updateData);
router.get('/import', mappingController.getData);
router.post('/import', mappingController.postData);

module.exports = router;
