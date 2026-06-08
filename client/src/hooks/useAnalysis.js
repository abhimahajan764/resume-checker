import { useState, useCallback } from 'react';
import { analyzeResume, generateCoverLetter } from '../utils/api';
import { extractTextFromFile } from '../utils/pdfParser';
import { saveAnalysis } from '../utils/storage';

export function useAnalysis() {
  const [state, setState] = useState({
    status: 'idle',
    analysis: null,
    resumeText: '',
    jobDescription: '',
    error: null,
    coverLetter: null,
    coverLetterStatus: 'idle',
  });

  const analyze = useCallback(async (file, jobDescription) => {
    setState((s) => ({ ...s, status: 'parsing', error: null }));

    try {
      const resumeText = file instanceof File ? await extractTextFromFile(file) : file;

      if (!resumeText.trim()) {
        throw new Error('Could not extract text from the file. Please try a different format.');
      }

      setState((s) => ({ ...s, status: 'analyzing', resumeText }));

      const analysis = await analyzeResume(resumeText, jobDescription);
      saveAnalysis(analysis);

      setState((s) => ({
        ...s,
        status: 'done',
        analysis,
        jobDescription,
      }));

      return analysis;
    } catch (err) {
      setState((s) => ({ ...s, status: 'error', error: err.message }));
      throw err;
    }
  }, []);

  const generateLetter = useCallback(async (options) => {
    setState((s) => ({ ...s, coverLetterStatus: 'generating' }));

    try {
      const letter = await generateCoverLetter(
        state.resumeText,
        state.jobDescription,
        state.analysis,
        options
      );

      setState((s) => ({ ...s, coverLetter: letter, coverLetterStatus: 'done' }));
      return letter;
    } catch (err) {
      setState((s) => ({ ...s, coverLetterStatus: 'error', error: err.message }));
      throw err;
    }
  }, [state.resumeText, state.jobDescription, state.analysis]);

  const reset = useCallback(() => {
    setState({
      status: 'idle',
      analysis: null,
      resumeText: '',
      jobDescription: '',
      error: null,
      coverLetter: null,
      coverLetterStatus: 'idle',
    });
  }, []);

  return { ...state, analyze, generateLetter, reset };
}
