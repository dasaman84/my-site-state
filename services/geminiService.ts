
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling, professional 2-sentence marketing description for a product named "${productName}".`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });
    return response.text?.trim() || "No description generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI description.";
  }
};
