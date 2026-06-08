import { MessageSquareText, Award, AlertOctagon } from 'lucide-react';

export default function SummaryCard({ summary, strengths, atsIssues }) {
  return (
    <div className="space-y-4 animate-in">
      <div className="card-elevated">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquareText className="h-5 w-5 text-brand-600" />
          <h3 className="text-lg font-semibold text-gray-900">Assessment</h3>
        </div>
        <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {strengths && strengths.length > 0 && (
          <div className="card-elevated">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-green-600" />
              <h4 className="text-sm font-semibold text-gray-900">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {atsIssues && atsIssues.length > 0 && (
          <div className="card-elevated">
            <div className="flex items-center gap-2 mb-3">
              <AlertOctagon className="h-5 w-5 text-red-500" />
              <h4 className="text-sm font-semibold text-gray-900">ATS Compatibility Issues</h4>
            </div>
            <ul className="space-y-2">
              {atsIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
