import { Clock, Trash2, Eye, AlertCircle } from 'lucide-react';
import { getHistory, deleteAnalysis, clearHistory } from '../utils/storage';
import { useState } from 'react';

function getScoreColor(score) {
  if (score >= 80) return 'text-green-600 bg-green-50';
  if (score >= 60) return 'text-blue-600 bg-blue-50';
  if (score >= 40) return 'text-amber-600 bg-amber-50';
  return 'text-red-600 bg-red-50';
}

export default function HistoryView({ onLoadAnalysis }) {
  const [history, setHistory] = useState(getHistory);

  const handleDelete = (id) => {
    const updated = deleteAnalysis(id);
    setHistory(updated);
  };

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <Clock className="h-8 w-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No analyses yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Your recent analyses will appear here — up to 5 stored locally.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg font-semibold text-gray-900">Recent Analyses</h2>
        </div>
        <button onClick={handleClear} className="text-xs text-red-500 hover:text-red-700 font-medium">
          Clear all
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
        <p className="text-xs text-amber-700">
          Analyses are stored in your browser's local storage. Clearing browser data will remove them.
        </p>
      </div>

      <div className="space-y-3">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="card-elevated flex items-center gap-4"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${getScoreColor(entry.overallScore)}`}
            >
              {entry.overallScore}%
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">{entry.jobTitle}</p>
              <p className="text-xs text-gray-400">
                {new Date(entry.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onLoadAnalysis(entry.analysis)}
                className="rounded-lg p-2 text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                title="View analysis"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
