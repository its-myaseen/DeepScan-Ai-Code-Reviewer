var express = require('express');
var router = express.Router();
const GeminiController = require('../Controller/Gemini.controller')

router.get('/response/review', GeminiController.ReviewController)


module.exports = router