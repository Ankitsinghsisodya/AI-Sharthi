import { GoogleGenAI } from "@google/genai";
export default async function POST(request, response) {
  const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || "" });
  const { prompt } = request.body;

  async function run() {
    const time = Date.now();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
      config: {
        thinkingConfig: {
          // thinkingBudget: 1024,
          // Turn off thinking:
          thinkingBudget: -1
          // Turn on dynamic thinking:
          // thinkingBudget: -1
        },
      },
    });
    console.log("time taken", Date.now() - time);
    return response.text ;
  }

  const result =  await run(prompt);

  return response.json({
    result,
  });
}
