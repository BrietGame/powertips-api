const express = require('express');
const router = express.Router();
const GuideController = require('../Controller/Guide.controller');
const auth = require('../Middleware/auth');

router.get('/all', auth, GuideController.getGuides);
router.get('/all/:userId', auth, GuideController.getGuidesByUserId);
router.get('/:guideId', auth, GuideController.getGuideById);
router.get('/slug/:slug', auth, GuideController.getGuideBySlug);
router.post('/create', auth, GuideController.createGuide);
router.put('/:guideId', auth, GuideController.updateGuide);
router.delete('/:guideId', auth, GuideController.deleteGuide);

module.exports = router;