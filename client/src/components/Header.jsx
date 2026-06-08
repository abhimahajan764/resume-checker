import { FileSearch, History, ArrowLeft } from 'lucide-react';

export default function Header({ view, onNavigate, historyCount }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/25">
            <FileSearch className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              Resume<span className="text-brand-600">AI</span>
            </h1>
            <p className="hidden text-xs text-gray-400 sm:block">Smart Resume Analyzer</p>
          </div>
        </button>

        <nav className="flex items-center gap-2">
          {view === 'results' && (
            <button
              onClick={() => onNavigate('home')}
              className="btn-secondary !py-2 !px-4 text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              New Analysis
            </button>
          )}
          <button
            onClick={() => onNavigate(view === 'history' ? 'home' : 'history')}
            className="btn-secondary !py-2 !px-4 text-xs relative"
          >
            <History className="h-3.5 w-3.5" />
            History
            {historyCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {historyCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
