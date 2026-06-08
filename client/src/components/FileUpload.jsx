import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';

export default function FileUpload({ file, onFileChange }) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted.length > 0) onFileChange(accepted[0]);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
          <FileText className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-green-900">{file.name}</p>
          <p className="text-xs text-green-600">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFileChange(null);
          }}
          className="rounded-lg p-1.5 text-green-400 transition-colors hover:bg-green-100 hover:text-green-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
        isDragActive
          ? 'border-brand-400 bg-brand-50'
          : 'border-gray-200 bg-gray-50/50 hover:border-brand-300 hover:bg-brand-50/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
            isDragActive ? 'bg-brand-100' : 'bg-gray-100'
          }`}
        >
          <Upload className={`h-6 w-6 ${isDragActive ? 'text-brand-600' : 'text-gray-400'}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
          </p>
          <p className="mt-1 text-xs text-gray-400">PDF or TXT, up to 10MB</p>
        </div>
        <button type="button" className="text-xs font-medium text-brand-600 hover:text-brand-700">
          or browse files
        </button>
      </div>
    </div>
  );
}
