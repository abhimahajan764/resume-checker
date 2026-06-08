import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Target,
  Zap,
  BookOpen,
  Search,
  GraduationCap,
  Layout,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

function getScoreColor(score) {
  if (score >= 80) return { main: '#16a34a', trail: '#dcfce7', label: 'Excellent' };
  if (score >= 60) return { main: '#2563eb', trail: '#dbeafe', label: 'Good' };
  if (score >= 40) return { main: '#f59e0b', trail: '#fef3c7', label: 'Fair' };
  return { main: '#dc2626', trail: '#fee2e2', label: 'Needs Work' };
}

function getScoreIcon(score) {
  if (score >= 60) return <TrendingUp className="h-3.5 w-3.5" />;
  if (score >= 40) return <Minus className="h-3.5 w-3.5" />;
  return <TrendingDown className="h-3.5 w-3.5" />;
}

const SCORE_META = {
  skills: { icon: Zap, label: 'Skills' },
  experience: { icon: BookOpen, label: 'Experience' },
  keywords: { icon: Search, label: 'Keywords' },
  education: { icon: GraduationCap, label: 'Education' },
  formatting: { icon: Layout, label: 'Formatting' },
};

export default function ScoreOverview({ scores }) {
  const overall = scores.overall || 0;
  const overallColor = getScoreColor(overall);

  const subScores = Object.entries(SCORE_META)
    .filter(([key]) => scores[key] !== undefined)
    .map(([key, meta]) => ({
      key,
      ...meta,
      score: scores[key],
      color: getScoreColor(scores[key]),
    }));

  return (
    <div className="card-elevated animate-in">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-36 w-36">
            <CircularProgressbar
              value={overall}
              text={`${overall}%`}
              styles={buildStyles({
                textSize: '22px',
                textColor: overallColor.main,
                pathColor: overallColor.main,
                trailColor: overallColor.trail,
                pathTransitionDuration: 1.5,
              })}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Overall Match</span>
          </div>
          <span
            className="rounded-full px-3 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: overallColor.trail, color: overallColor.main }}
          >
            {overallColor.label}
          </span>
        </div>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subScores.map(({ key, icon: Icon, label, score, color }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: color.trail }}
                >
                  <Icon className="h-4 w-4" style={{ color: color.main }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">{label}</span>
                    <div className="flex items-center gap-1" style={{ color: color.main }}>
                      {getScoreIcon(score)}
                      <span className="text-sm font-bold">{score}%</span>
                    </div>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${score}%`, backgroundColor: color.main }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
