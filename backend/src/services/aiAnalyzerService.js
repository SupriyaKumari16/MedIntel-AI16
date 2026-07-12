import { GoogleGenAI } from "@google/genai";

export const analyzeInitialCase = async (patientData) => {
  // Moving this inside the function ensures dotenv has already loaded the key
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are MedIntel AI.

Analyze the patient information.

Patient:
${JSON.stringify(patientData)}

Return ONLY valid JSON.

{
  "riskLevel":"",
  "possibleConditions":[],
  "recommendedTests":[],
  "urgency":"",
  "specialist":"",
  "homeCare":[],
  "doctorRequired":false,
  "disclaimer":""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text.trim();

  return JSON.parse(text);
};