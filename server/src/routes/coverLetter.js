import { generateCoverLetter } from '../services/anthropic.js';

export async function coverLetterRoute(req, res) {
  try {
    const { resumeText, jobDescription, analysisData, options } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Both resumeText and jobDescription are required.',
      });
    }

    const coverLetter = await generateCoverLetter(resumeText, jobDescription, analysisData, options);
    res.json({ success: true, data: { coverLetter } });
  } catch (err) {
    console.error('Cover letter error:', err);
    res.status(500).json({ error: 'Cover letter generation failed. Please try again.' });
  }
}
