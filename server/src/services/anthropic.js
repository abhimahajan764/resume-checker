import Anthropic from '@anthropic-ai/sdk';

let client = null;

function getClient() {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.');
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export async function analyzeResume(resumeText, jobDescription) {
  const anthropic = getClient();

  const systemPrompt = `You are an expert career coach and ATS (Applicant Tracking System) specialist. Analyze how well a resume matches a job description. Be thorough, specific, and actionable.

Return your analysis as a JSON object with EXACTLY this structure (no markdown, no code blocks, just raw JSON):

{
  "scores": {
    "overall": <number 0-100>,
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "keywords": <number 0-100>,
    "education": <number 0-100>,
    "formatting": <number 0-100>
  },
  "summary": "<A 3-4 sentence plain-English assessment of the candidate's fit for this role. Be direct and specific about strengths and gaps.>",
  "keywords": {
    "matched": ["<keywords found in both resume and JD>"],
    "partial": ["<keywords partially present or related terms used>"],
    "missing": ["<important JD keywords completely absent from resume>"]
  },
  "suggestions": [
    {
      "priority": "high|medium|low",
      "category": "skills|experience|keywords|formatting|education|certifications",
      "title": "<short actionable title>",
      "detail": "<specific, actionable advice on what to change and how>"
    }
  ],
  "strengths": ["<specific things the resume does well for this job>"],
  "atsIssues": ["<specific ATS compatibility issues found>"],
  "sectionAnalysis": {
    "experience": { "score": <0-100>, "feedback": "<specific feedback>" },
    "skills": { "score": <0-100>, "feedback": "<specific feedback>" },
    "education": { "score": <0-100>, "feedback": "<specific feedback>" },
    "summary": { "score": <0-100>, "feedback": "<specific feedback>" }
  }
}

Guidelines:
- Be specific: reference actual skills, job titles, and requirements from the JD
- Suggestions should be immediately actionable, not vague
- Missing keywords should only include genuinely important terms from the JD
- Partial matches mean the concept is there but the exact terminology differs
- ATS issues should flag real formatting/parsing problems
- Score fairly: a 70+ means genuinely competitive for the role`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Analyze this resume against the job description.\n\n---JOB DESCRIPTION---\n${jobDescription}\n\n---RESUME---\n${resumeText}`,
      },
    ],
    system: systemPrompt,
  });

  const text = response.content[0].text;

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse analysis response');
  }
}

export async function generateCoverLetter(resumeText, jobDescription, analysisData, options = {}) {
  const anthropic = getClient();

  const { tone = 'professional', length = 'standard' } = options;

  const lengthGuide = {
    concise: '200-250 words',
    standard: '300-400 words',
    detailed: '450-550 words',
  };

  const systemPrompt = `You are an expert cover letter writer. Write a compelling, personalized cover letter.

Tone: ${tone}
Target length: ${lengthGuide[length] || lengthGuide.standard}

Guidelines:
- Open with a strong hook that shows genuine interest in the specific role and company
- Highlight 2-3 key strengths from the resume that directly match the job requirements
- Address any gaps tactfully by reframing experience or showing transferable skills
- Include specific achievements with metrics where available from the resume
- Close with a confident call to action
- Sound like a real person, not a template
- Never use phrases like "I am writing to express my interest" or "I believe I would be a great fit"
- Do NOT use any placeholder brackets like [Company Name] or [Your Name] — use generic references like "your team" or "this role" instead

Return ONLY the cover letter text, no headers or metadata.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Write a cover letter for this candidate applying to this job.\n\n---JOB DESCRIPTION---\n${jobDescription}\n\n---RESUME---\n${resumeText}\n\n---ANALYSIS SUMMARY---\nOverall match: ${analysisData?.scores?.overall || 'N/A'}%\nKey strengths: ${analysisData?.strengths?.join(', ') || 'N/A'}\nGaps to address: ${analysisData?.keywords?.missing?.join(', ') || 'None identified'}`,
      },
    ],
    system: systemPrompt,
  });

  return response.content[0].text;
}
