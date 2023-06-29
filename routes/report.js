const express = require('express');
const router = express.Router();
const ReportController = require('../Controller/Report.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, ReportController.getReports);
router.get('/:reportId', auth, ReportController.getReportById);
router.post('/create', auth, ReportController.createReport);

module.exports = router;