const GeminiReviewService = require('../Services/GEMINI_review')


const ReviewController = async function (req, res, next) {
    const code = req.body.code
    const lang = req.body.lang
    if (!code) {
        res.status(401).json({ error: 'code is not provided to review' });
    }
    if (!lang) {
        res.status(401).json({ error: 'language is required' });
    }

    if (code && lang) {
        const response = await GeminiReviewService.getReview(code, lang)
        res.status(201).json({ response })
    }
}


module.exports = { ReviewController }