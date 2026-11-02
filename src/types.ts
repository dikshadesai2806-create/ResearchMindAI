export interface User {
  id: string;
  name: string;
  email: string;
  avatarLetter: string;
  role?: string;
}

export type PaperStatus = 'Summarized' | 'Analyzed' | 'Notes Added' | 'Uploaded';
export type SummaryMode = 'short' | 'detailed';

export interface ResearchPaper {
  id: string;
  title: string;
  fileName: string;
  date: string;
  status: PaperStatus;
  category?: string;
  abstract?: string;
  summary?: string;
  detailedSummary?: string;
  preferredSummaryMode?: SummaryMode;
  keyPoints?: string[];
  keywords?: string[];
  authors?: string;
  citations?: number;
  pages?: number;
  fileSize?: string;
  notes?: string;
  fullText?: string;
  pdfBase64?: string;
}

export interface AiQuery {
  id: string;
  question: string;
  answer: string;
  paperId?: string;
  paperTitle?: string;
  timestamp: string;
  citations?: string[];
  keyTakeaways?: string[];
  type?: 'query' | 'summary' | 'comparison';
}

export interface ResearchNote {
  id: string;
  title: string;
  paperId?: string;
  paperTitle: string;
  content: string;
  date: string;
  tags: string[];
}

export interface PaperComparisonCriterion {
  criterion: string;
  values: Record<string, string>; // paperId -> description
}

export interface PaperComparison {
  id: string;
  title: string;
  paperIds: string[];
  paperTitles: string[];
  date: string;
  criteria: PaperComparisonCriterion[];
  comparativeAnalysis: string;
  similarities: string[];
  differences: string[];
  researchGaps: string[];
  futureScope: string;
}

export type SidebarTab =
  | 'Dashboard'
  | 'Upload PDF'
  | 'My Papers'
  | 'Compare Papers'
  | 'Ask AI'
  | 'Paper Analysis'
  | 'Research History'
  | 'Saved Notes';

export type ThemeMode = 'dark' | 'light';
