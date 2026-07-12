import { analyzeFinalReport } from "../services/finalAiAnalyzerService.js";

export const analyzeFinalAI = async (req, res) => {
  try {

    console.log("===== FINAL AI REQUEST =====");
    console.log(req.body);

    const analysis = await analyzeFinalReport(req.body);

    console.log("===== FINAL AI RESPONSE =====");
    console.log(analysis);

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log("========== FINAL AI ERROR ==========");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};