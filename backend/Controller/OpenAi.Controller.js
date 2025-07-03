const OpenAiReviewService = require('../Services/OPEN_review')
const OpenAiChatService = require('../Services/OPEN_chat')

const ReviewController = async function(req, res, next){

    try{
    const code = req.body.code
    const lang = req.body.lang
    if(!code){
        console.log('code is not available')
    }
    if(!lang){
        console.log('code is not available')
    }
    const review = await OpenAiReviewService.getReview(code, lang)
    res.status(201).json({review})
    } catch (err) {
        console.log(`error sended from OpenAi Controller.jsx is: ${err}`)
    }
}

const ChatController = async function(req, res, next){
    try{
        const message = req.body.message
        const response = await OpenAiChatService.Chat(message)
        res.status(201).json({response})
    } catch (err) {
        console.log(`error sended from OpenAi Controller.jsx is: ${err}`)
    }
}
module.exports = { ReviewController, ChatController }