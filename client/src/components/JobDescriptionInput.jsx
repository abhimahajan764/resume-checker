import { Briefcase } from 'lucide-react';

export default function JobDescriptionInput({ value, onChange }) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Briefcase className="h-4 w-4 text-gray-400" />
          Job Description
        </label>
        <span className={`text-xs ${wordCount > 0 ? 'text-gray-400' : 'text-transparent'}`}>
          {wordCount} words
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here — include requirements, responsibilities, and qualifications for the best analysis..."
        rows={8}
        className="input-field resize-none"
      />
    </div>
  );
}
