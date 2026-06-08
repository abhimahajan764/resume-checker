import { analyzeResume } from '../services/anthropic.js';

export async function analyzeRoute(req, res) {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Both resumeText and jobDescription are required.',
      });
    }

    if (resumeText.length > 50000 || jobDescription.length > 20000) {
      return res.status(400).json({
        error: 'Input too long. Resume must be under 50,000 characters and JD under 20,000.',
      });
    }

    const analysis = await analyzeResume(resumeText, jobDescription);
    res.json({ success: true, data: analysis });
  } catch (err) {
    console.error('Analysis error:', err);
    const status = err.message?.includes('API_KEY') ? 401 : 500;
    res.status(status).json({
      error: status === 401
        ? 'API key not configured. Please set ANTHROPIC_API_KEY in your .env file.'
        : 'Analysis failed. Please try again.',
    });
  }
}
