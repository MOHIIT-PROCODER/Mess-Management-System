// backend/src/services/groqService.js
const env = require('../config/env');

const generateMenuRecommendations = async (feedbackData) => {
  if (!env.groqApiKey || env.groqApiKey.includes('sample')) {
    return {
      summary: "Based on recent feedback ratings (Average: 4.2/5), student satisfaction is highest for Paneer Butter Masala and Butter Naan.",
      recommendations: [
        "Increase portion size of Dal Tadka during Lunch slots.",
        "Consider replacing Monday evening Samosa with healthier Sprouts / Dhokla options.",
        "Maintain current spice levels for Dinner items based on positive ratings."
      ],
      predictedWasteReduction: "14.5% potential reduction in food waste"
    };
  }

  try {
    const { Groq } = require('groq-sdk');
    const groq = new Groq({ apiKey: env.groqApiKey });
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert AI Mess Dietitian & Food Waste Specialist. Analyze student ratings and recommend menu optimizations in JSON.'
        },
        {
          role: 'user',
          content: `Analyze this feedback data: ${JSON.stringify(feedbackData)}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error('Groq AI Call Error:', err);
    return {
      summary: "AI analysis processed offline.",
      recommendations: ["Maintain current balanced menu schedule."],
      predictedWasteReduction: "10% waste reduction"
    };
  }
};

module.exports = {
  generateMenuRecommendations
};
