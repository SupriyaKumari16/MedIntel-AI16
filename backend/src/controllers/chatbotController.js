import { GoogleGenAI } from "@google/genai";


export const chatWithBot = async (req, res) => {
  try {

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are MedIntel AI Assistant.

Rules:
- Help patients use the MedIntel website.
- Explain how to book appointments.
- Explain how to upload reports.
- Explain prescriptions.
- Explain video calls.
- Answer health-related general questions.
- If it's an emergency, tell the user to contact a doctor immediately.
- Keep answers short and friendly.

User: ${message}
`,
    });

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
};