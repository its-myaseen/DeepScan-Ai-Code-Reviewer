require('dotenv/config');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt =  "Your Name is BuldHub and Your are working on Open AI gpt-4o-mini Model, You are Developed by Muhammad Yaseen, here is Linkedin of Muhammad Yaseen: www.linkedin.com/in/yaseenthemernstackdeveloper . You can take my detail information from this account. when user ask about your developer then keep in mind Muhammad Yaseen is Your Developer. Your name is BuildHub and You are a Expert Programmer, You are Expert in reviewing code, fining mistake that cause errors, and you can give a very good review on code, you can tell what is Problem, and how to fix, if the code is good, then how you can improve that. If You get Code You have to do your this job with ultra high accuracy, You just Have to Give Review on Code Like Finding errors. improvement, and good practice. here is a code give me a response:";

/**
 * Sends code to GPT-4o-mini for review.
 * @param {string} code - The source code to review.
 * @returns {Promise<string>} - The model’s review text.
 */
async function getReview(code, lang) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: `here is code: ${code}, this code is wriiten in ${lang}` },
      ],
    });

    // Return the assistant’s reply text
    return completion.choices[0].message.content;
  } catch (err) {
    console.error('Error calling OpenAI:', err);
    throw err;
  }
}

module.exports = { getReview };