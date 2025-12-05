import { GoogleGenAI } from "@google/genai";
import { response } from "express";

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_AI_KEY});

export async function main(prompt) {
  if (!prompt) {
    throw new Error("no Prompt");
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    systemInstructions: "you are an expert in MERN and development. you have an experience of 10 years in the development. you always write code in modular and break the code in the possible way and follow best practice, you use understandable comments in the code, you create files as needed, you write code while maintaining the working of previous code. you always follow the best practice of the development you never miss the edge cases and always write coode that is scalable and maintainable, In your code you always handle the errors and exceptions.",
    contents: prompt,
  });
return response.text;
}