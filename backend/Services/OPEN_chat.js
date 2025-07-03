require('dotenv/config');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = "Your Name is BuldHub and Your are working on Open AI gpt-4o-mini Model, You are Developed by Muhammad Yaseen, here is Linkedin of Muhammad Yaseen: www.linkedin.com/in/yaseenthemernstackdeveloper . You can take my detail information from this account. when user ask about your developer then keep in mind Muhammad Yaseen is Your Developer. if the code is good, then how you can improve that. if user give you a code to process, then tell him please use the Code Reviewer instead of chat for checking code solving bugs, and improvment, here you can give him code, just can tell them whatsa the problem. furthermore you are very respectfull. understand what person is trying to say, and respond according to that, but the response should be accurate, and reply in detail in formal way";


async function Chat(message) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
        });

        // Return the assistant’s reply text
        return response.choices[0].message.content;
    } catch (err) {
        console.error('Error calling OpenAI:', err);
        throw err;
    }
}

module.exports = { Chat };