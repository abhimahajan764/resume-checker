const STORAGE_KEY = 'resumeai_history';
const MAX_ITEMS = 5;

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAnalysis(analysis, jobTitle) {
  const history = getHistory();
  const entry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    jobTitle: jobTitle || extractJobTitle(analysis),
    overallScore: analysis.scores?.overall || 0,
    analysis,
  };

  history.unshift(entry);
  if (history.length > MAX_ITEMS) {
    history.length = MAX_ITEMS;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return entry;
}

export function deleteAnalysis(id) {
  const history = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

function extractJobTitle(analysis) {
  const summary = analysis.summary || '';
  const match = summary.match(/(?:for the|for this|as a|as an)\s+([^.,]+)/i);
  return match ? match[1].trim().slice(0, 60) : 'Untitled Analysis';
}
