var express = require('express');
var router = express.Router();
const OpenAI = require('../Controller/OpenAi.Controller');


router.post('/response/review', OpenAI.ReviewController );
router.get('/response/chat', OpenAI.ChatController)


module.exports = router