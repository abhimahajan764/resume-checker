import { BarChart3 } from 'lucide-react';

function getBarColor(score) {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

function getScoreBadge(score) {
  if (score >= 80) return { bg: 'bg-green-50', text: 'text-green-700', label: 'Strong' };
  if (score >= 60) return { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Good' };
  if (score >= 40) return { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Needs Work' };
  return { bg: 'bg-red-50', text: 'text-red-700', label: 'Weak' };
}

const SECTION_LABELS = {
  experience: 'Work Experience',
  skills: 'Skills Section',
  education: 'Education',
  summary: 'Professional Summary',
};

export default function SectionAnalysis({ sectionAnalysis }) {
  if (!sectionAnalysis) return null;

  const sections = Object.entries(sectionAnalysis)
    .filter(([, data]) => data && typeof data.score === 'number')
    .sort(([, a], [, b]) => a.score - b.score);

  if (sections.length === 0) return null;

  return (
    <div className="card-elevated animate-in">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-brand-600" />
        <h3 className="text-lg font-semibold text-gray-900">Section-by-Section Analysis</h3>
      </div>

      <div className="space-y-4">
        {sections.map(([key, data]) => {
          const badge = getScoreBadge(data.score);
          return (
            <div key={key} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800">
                  {SECTION_LABELS[key] || key}
                </h4>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{data.score}%</span>
                </div>
              </div>
              <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(data.score)}`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
              <p className="text-xs leading-relaxed text-gray-600">{data.feedback}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
