import { GoogleGenerativeAI } from "@google/generative-ai";
export default async function handler(request, response) {
  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const { prompt } = request.body;
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    return response.text();
  }

  const result = run(prompt);
  return response.json({
    result,
  });
}
