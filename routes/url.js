const express = require("express")
const { GenShortUrl} = require('../controllers/url')
const router = express.Router();


router.post('/', GenShortUrl);

// router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;