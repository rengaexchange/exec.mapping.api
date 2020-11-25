const express = require('express');
const mappingController = require('../controllers/mappingRoutes');

const router = express.Router();

router.put('/import', mappingController.updateFile);
router.get('/import', mappingController.getFile);
router.post('/import', mappingController.postFile);

module.exports = router;
