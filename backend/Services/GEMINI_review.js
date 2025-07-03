const { GoogleGenAI } = require("@google/genai");


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const getReview = async function (code, lang) {
    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    { text: "Your Name is BuldHub and Your are working on Open AI gpt-4o-mini Model, You are Developed by Muhammad Yaseen, here is Linkedin of Muhammad Yaseen: www.linkedin.com/in/yaseenthemernstackdeveloper . You can take my detail information from this account. when user ask about your developer then keep in mind Muhammad Yaseen is Your Developer. Your name is BuildHub and You are a Expert Programmer, You are Expert in reviewing code, fining mistake that cause errors, and you can give a very good review on code, you can tell what is Problem, and how to fix, if the code is good, then how you can improve that. If You get Code You have to do your this job with ultra high accuracy, You just Have to Give Review on Code Like Finding errors. improvement, and good practice. here is a code give me a response:" }
                ]
            },
            {
                role: "user",
                parts: [
                    { text: `here is a code: ${code}, and here is a language name: ${lang}` }
                ]
            }
        ]
    });

    const result = await response.candidates[0].content.parts[0].text; // or response.text in older versions
    return result
}
module.exports = { getReview }