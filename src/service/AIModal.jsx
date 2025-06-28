import { GoogleGenAI } from '@google/genai';

export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

export const config = {
  thinkingConfig: {
    thinkingBudget: -1,
  },
  responseMimeType: 'application/json',
};

export const model = 'gemini-2.5-flash';

export const contents = [
  {
    role: 'user',
    parts: [
      {
        text: `Generate Travel plan for location : las Vegas for 3 days for couple with a cheap budget, give me a hotels option list with hotel name , hotel address, price, hotel image URL , geo coordinates, ratings, description , and suggest itinerary with place name, place details, place image URL, geo coordinates, ticket pricing time to travel each of the location for 3 days with each day plan with best time to visit in JSON format`,
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: `INSERT_MODEL_THINKING_OR_INIT_RESPONSE_IF_NEEDED`,
      },
      {
        text: "```json\nINSERT_JSON_HERE\n```",
      },
    ],
  },
  {
    role: 'user',
    parts: [
      {
        text: `INSERT_INPUT_HERE`,
      },
    ],
  },
];
