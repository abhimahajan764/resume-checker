import { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisLoading from './components/AnalysisLoading';
import ScoreOverview from './components/ScoreOverview';
import SummaryCard from './components/SummaryCard';
import KeywordAnalysis from './components/KeywordAnalysis';
import Suggestions from './components/Suggestions';
import SectionAnalysis from './components/SectionAnalysis';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import HistoryView from './components/HistoryView';
import { useAnalysis } from './hooks/useAnalysis';
import { getHistory } from './utils/storage';
import {
  Sparkles,
  Target,
  Zap,
  FileText,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Search,
  BarChart3,
} from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="card flex items-start gap-3 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
        <Icon className="h-4 w-4 text-brand-600" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loadedAnalysis, setLoadedAnalysis] = useState(null);
  const {
    status,
    analysis,
    error,
    coverLetter,
    coverLetterStatus,
    analyze,
    generateLetter,
    reset,
  } = useAnalysis();

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) return;
    try {
      await analyze(file, jobDescription);
      setView('results');
    } catch {
      // error is set in the hook
    }
  };

  const handleNavigate = useCallback(
    (target) => {
      if (target === 'home') {
        reset();
        setFile(null);
        setJobDescription('');
        setLoadedAnalysis(null);
      }
      setView(target);
    },
    [reset]
  );

  const isAnalyzing = status === 'parsing' || status === 'analyzing';
  const displayAnalysis = analysis || loadedAnalysis;
  const canAnalyze = file && jobDescription.trim().length > 20 && !isAnalyzing;
  const historyCount = getHistory().length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header view={view} onNavigate={handleNavigate} historyCount={historyCount} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {view === 'history' && (
          <HistoryView
            onLoadAnalysis={(a) => {
              reset();
              setLoadedAnalysis(a);
              setView('results');
            }}
          />
        )}

        {view === 'home' && !isAnalyzing && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Resume Analysis
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Know exactly what's <span className="gradient-text">missing</span> in your resume
              </h2>
              <p className="mt-3 text-base text-gray-500">
                Upload your resume and paste a job description. Get instant, actionable feedback on
                how to improve your match score and beat the ATS.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto">
              <FeatureCard icon={Target} title="Match Scoring" description="6 detailed score categories" />
              <FeatureCard icon={Search} title="Keyword Tracking" description="Missing & matched keywords" />
              <FeatureCard icon={BarChart3} title="Section Analysis" description="Per-section feedback" />
              <FeatureCard icon={FileText} title="Cover Letter" description="AI-generated & tailored" />
            </div>

            <div className="card-elevated max-w-3xl mx-auto">
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    Your Resume
                  </label>
                  <FileUpload file={file} onFileChange={setFile} />
                </div>

                <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3">
                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  className="btn-primary w-full"
                >
                  {isAnalyzing ? (
                    'Analyzing...'
                  ) : (
                    <>
                      Analyze Resume
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Free to use
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> No data stored on servers
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Instant results
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAnalyzing && <AnalysisLoading status={status} />}

        {(view === 'results') && displayAnalysis && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <Zap className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Analysis Complete</h2>
                <p className="text-sm text-gray-500">
                  Here's how your resume matches the job description
                </p>
              </div>
            </div>

            {displayAnalysis.scores && <ScoreOverview scores={displayAnalysis.scores} />}

            {displayAnalysis.summary && (
              <SummaryCard
                summary={displayAnalysis.summary}
                strengths={displayAnalysis.strengths}
                atsIssues={displayAnalysis.atsIssues}
              />
            )}

            {displayAnalysis.keywords && <KeywordAnalysis keywords={displayAnalysis.keywords} />}

            {displayAnalysis.sectionAnalysis && (
              <SectionAnalysis sectionAnalysis={displayAnalysis.sectionAnalysis} />
            )}

            {displayAnalysis.suggestions && displayAnalysis.suggestions.length > 0 && (
              <Suggestions suggestions={displayAnalysis.suggestions} />
            )}

            {analysis && (
              <CoverLetterGenerator
                coverLetter={coverLetter}
                status={coverLetterStatus}
                onGenerate={generateLetter}
              />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-center text-xs text-gray-400">
            ResumeAI — Powered by Claude. Your data never leaves your browser except for analysis.
          </p>
        </div>
      </footer>
    </div>
  );
}
