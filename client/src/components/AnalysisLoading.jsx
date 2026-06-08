import { FileSearch, Brain, Sparkles } from 'lucide-react';

const STEPS = [
  { icon: FileSearch, label: 'Parsing your resume...', key: 'parsing' },
  { icon: Brain, label: 'Analyzing match with job description...', key: 'analyzing' },
  { icon: Sparkles, label: 'Generating insights...', key: 'generating' },
];

export default function AnalysisLoading({ status }) {
  const activeIndex = status === 'parsing' ? 0 : status === 'analyzing' ? 1 : 2;

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-2xl bg-brand-100 animate-pulse-slow flex items-center justify-center">
          <Brain className="h-10 w-10 text-brand-600 animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-brand-600 flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
      <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
        Our AI is carefully comparing your resume against the job description to find the best matches and improvement areas.
      </p>

      <div className="w-full max-w-xs space-y-3">
        {STEPS.map(({ icon: Icon, label }, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? 'bg-brand-50 border border-brand-200'
                  : isDone
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive
                    ? 'text-brand-600 animate-pulse'
                    : isDone
                      ? 'text-green-600'
                      : 'text-gray-300'
                }`}
              />
              <span
                className={`text-sm ${
                  isActive
                    ? 'font-medium text-brand-700'
                    : isDone
                      ? 'text-green-700'
                      : 'text-gray-400'
                }`}
              >
                {isDone ? label.replace('...', ' ✓') : label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
