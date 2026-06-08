import {
  Lightbulb,
  AlertTriangle,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Zap,
  BookOpen,
  Search,
  Layout,
  GraduationCap,
  Award,
} from 'lucide-react';
import { useState } from 'react';

const PRIORITY_STYLES = {
  high: {
    border: 'border-red-200',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
  },
  medium: {
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    icon: ArrowUp,
    iconColor: 'text-amber-500',
  },
  low: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    icon: Lightbulb,
    iconColor: 'text-blue-500',
  },
};

const CATEGORY_ICONS = {
  skills: Zap,
  experience: BookOpen,
  keywords: Search,
  formatting: Layout,
  education: GraduationCap,
  certifications: Award,
};

function SuggestionCard({ suggestion }) {
  const [expanded, setExpanded] = useState(false);
  const style = PRIORITY_STYLES[suggestion.priority] || PRIORITY_STYLES.medium;
  const PriorityIcon = style.icon;
  const CategoryIcon = CATEGORY_ICONS[suggestion.category] || Lightbulb;

  return (
    <div
      className={`rounded-xl border ${style.border} ${style.bg} p-4 transition-all duration-200`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 text-left"
      >
        <div className="mt-0.5 flex shrink-0 items-center gap-2">
          <PriorityIcon className={`h-4 w-4 ${style.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-gray-900">{suggestion.title}</h4>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${style.badge}`}>
              {suggestion.priority}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-medium text-gray-500">
              <CategoryIcon className="h-3 w-3" />
              {suggestion.category}
            </span>
          </div>
          {expanded && (
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{suggestion.detail}</p>
          )}
        </div>
        <div className="shrink-0 mt-0.5">
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </button>
    </div>
  );
}

export default function Suggestions({ suggestions }) {
  const sorted = [...suggestions].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return (order[a.priority] ?? 1) - (order[b.priority] ?? 1);
  });

  const highCount = sorted.filter((s) => s.priority === 'high').length;

  return (
    <div className="card-elevated animate-in">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-brand-600" />
          <h3 className="text-lg font-semibold text-gray-900">Improvement Suggestions</h3>
        </div>
        {highCount > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            {highCount} high priority
          </span>
        )}
      </div>

      <div className="space-y-2">
        {sorted.map((suggestion, i) => (
          <SuggestionCard key={i} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );
}
