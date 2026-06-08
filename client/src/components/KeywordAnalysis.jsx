import { CheckCircle2, AlertCircle, XCircle, Search } from 'lucide-react';

function KeywordBadge({ text, type }) {
  const styles = {
    matched: 'border-green-200 bg-green-50 text-green-700',
    partial: 'border-amber-200 bg-amber-50 text-amber-700',
    missing: 'border-red-200 bg-red-50 text-red-700',
  };

  return (
    <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${styles[type]}`}>
      {text}
    </span>
  );
}

export default function KeywordAnalysis({ keywords }) {
  const { matched = [], partial = [], missing = [] } = keywords;
  const total = matched.length + partial.length + missing.length;
  const matchRate = total > 0 ? Math.round(((matched.length + partial.length * 0.5) / total) * 100) : 0;

  const sections = [
    {
      key: 'matched',
      label: 'Matched',
      icon: CheckCircle2,
      color: 'text-green-600',
      items: matched,
      description: 'Keywords found in your resume',
    },
    {
      key: 'partial',
      label: 'Partial Match',
      icon: AlertCircle,
      color: 'text-amber-500',
      items: partial,
      description: 'Related terms found — consider using exact keywords',
    },
    {
      key: 'missing',
      label: 'Missing',
      icon: XCircle,
      color: 'text-red-500',
      items: missing,
      description: 'Important keywords not found in your resume',
    },
  ];

  return (
    <div className="card-elevated animate-in">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-brand-600" />
          <h3 className="text-lg font-semibold text-gray-900">Keyword Analysis</h3>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
            {total} keywords tracked
          </span>
          <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">
            {matchRate}% coverage
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map(({ key, label, icon: Icon, color, items, description }) => (
          <div key={key}>
            <div className="mb-2 flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-sm font-semibold text-gray-700">
                {label} ({items.length})
              </span>
              <span className="text-xs text-gray-400">— {description}</span>
            </div>
            {items.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {items.map((kw) => (
                  <KeywordBadge key={kw} text={kw} type={key} />
                ))}
              </div>
            ) : (
              <p className="text-xs italic text-gray-400">None</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
