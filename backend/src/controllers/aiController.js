import { analyzeInitialCase } from "../services/aiAnalyzerService.js";

export const analyzeInitialAI = async (req, res) => {
  try {
    console.log("===== AI REQUEST =====");
    console.log(req.body);

    const analysis = await analyzeInitialCase(req.body);

    console.log("===== AI RESPONSE =====");
    console.log(analysis);

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log("========== AI ERROR ==========");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};