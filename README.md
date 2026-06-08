# ResumeAI — Smart Resume Analyzer

AI-powered resume analysis tool that compares your resume against any job description and provides actionable feedback to improve your match score.

## Features

- **Match Scoring** — Overall score plus 5 sub-scores (Skills, Experience, Keywords, Education, Formatting)
- **Keyword Analysis** — Tracks matched, partially matched, and missing keywords from the job description
- **Section-by-Section Feedback** — Detailed analysis of each resume section (Experience, Skills, Education, Summary)
- **ATS Compatibility Check** — Identifies formatting and content issues that hurt ATS parsing
- **Actionable Suggestions** — Prioritized (high/medium/low) improvement recommendations
- **Cover Letter Generator** — AI-generated cover letters tailored to the gap analysis, with tone and length options
- **Analysis History** — Last 5 analyses stored locally in the browser

## Tech Stack

- **Frontend:** React 19 + Tailwind CSS (Vite)
- **Backend:** Express.js (lightweight API proxy)
- **AI:** Anthropic Claude (claude-sonnet-4-20250514)
- **PDF Parsing:** pdf.js (client-side)
- **Storage:** localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

```bash
# Clone the repo
git clone https://github.com/abhimahajan764/resume-checker.git
cd resume-checker

# Copy env file and add your API key
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY=sk-ant-...

# Install all dependencies
npm run install:all

# Start development (frontend + backend)
npm run dev
```

The app will be available at `http://localhost:5173`.

### Project Structure

```
resume-checker/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # PDF parser, API client, storage
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── index.html
├── server/                 # Express backend
│   └── src/
│       ├── routes/         # API route handlers
│       ├── services/       # Anthropic API integration
│       └── index.js        # Server entry point
├── .env.example            # Environment variables template
└── package.json            # Root package with dev scripts
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/analyze` | Analyze resume against job description |
| POST | `/api/cover-letter` | Generate a tailored cover letter |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |
| `PORT` | Backend server port (default: 3001) | No |

## How It Works

1. **Upload** your resume (PDF or TXT) and paste the job description
2. The frontend extracts text from your resume using pdf.js
3. Both texts are sent to the Express backend
4. The backend calls Claude to perform a detailed analysis
5. Results are displayed with scores, keywords, suggestions, and section feedback
6. Optionally generate a tailored cover letter based on the analysis
7. Analysis is saved to localStorage for future reference

## License

MIT
