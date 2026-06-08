const API_BASE = '/api';

async function request(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function analyzeResume(resumeText, jobDescription) {
  const { data } = await request('/analyze', { resumeText, jobDescription });
  return data;
}

export async function generateCoverLetter(resumeText, jobDescription, analysisData, options) {
  const { data } = await request('/cover-letter', {
    resumeText,
    jobDescription,
    analysisData,
    options,
  });
  return data.coverLetter;
}
