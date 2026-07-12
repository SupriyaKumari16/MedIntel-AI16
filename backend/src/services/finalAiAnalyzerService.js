import { GoogleGenAI } from "@google/genai";

export const analyzeFinalReport = async (patientData) => {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are MedIntel Final Medical AI.

Analyze the patient report carefully.

Patient Data:

${JSON.stringify(patientData, null, 2)}

Return ONLY valid JSON.

{
  "riskLevel":"",
  "diagnosis":"",
  "recommendation":"",
  "prescription":"",
  "followUp":"",
  "doctorRequired":false,
  "doctorNotes":"",
  "disclaimer":""
}

Rules:
- Only JSON.
- No markdown.
- No explanation.
- riskLevel must be only LOW, MEDIUM or HIGH.
`;

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {

    console.log("========== FINAL AI ERROR ==========");
    console.log(error);

    throw error;
  }
};