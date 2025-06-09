const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

router.post('/enquiries', enquiryController.createEnquiry);

module.exports = router;