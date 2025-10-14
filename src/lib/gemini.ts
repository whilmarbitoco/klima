import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateText(system: string, prompt: string) {
  const response = await model.invoke([
    ["system", system],
    ["user", prompt],
  ]);

  return response.content;
}
