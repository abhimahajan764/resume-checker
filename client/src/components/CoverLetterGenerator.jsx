import { useState } from 'react';
import { FileEdit, Copy, Check, Download, RefreshCw } from 'lucide-react';

export default function CoverLetterGenerator({ coverLetter, status, onGenerate }) {
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('standard');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover-letter.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-elevated animate-in">
      <div className="flex items-center gap-2 mb-4">
        <FileEdit className="h-5 w-5 text-brand-600" />
        <h3 className="text-lg font-semibold text-gray-900">Cover Letter Generator</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Generate a tailored cover letter based on the gap analysis between your resume and the job description.
      </p>

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="input-field !py-2 !text-xs"
          >
            <option value="professional">Professional</option>
            <option value="conversational">Conversational</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="input-field !py-2 !text-xs"
          >
            <option value="concise">Concise (~250 words)</option>
            <option value="standard">Standard (~350 words)</option>
            <option value="detailed">Detailed (~500 words)</option>
          </select>
        </div>
        <button
          onClick={() => onGenerate({ tone, length })}
          disabled={status === 'generating'}
          className="btn-primary !py-2 !text-xs"
        >
          {status === 'generating' ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Generating...
            </>
          ) : coverLetter ? (
            <>
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerate
            </>
          ) : (
            <>
              <FileEdit className="h-3.5 w-3.5" />
              Generate Cover Letter
            </>
          )}
        </button>
      </div>

      {coverLetter && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-end gap-2 mb-3">
            <button
              onClick={handleCopy}
              className="btn-secondary !py-1.5 !px-3 !text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-green-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
            <button onClick={handleDownload} className="btn-secondary !py-1.5 !px-3 !text-xs">
              <Download className="h-3 w-3" /> Download
            </button>
          </div>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  );
}
