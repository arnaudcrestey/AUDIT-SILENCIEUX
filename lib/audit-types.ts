export type AuditAnalysisResult = {
  summary: string;
  expressedMessage: string;
  perceivedMessage: string;
  mainGap: string;
  recommendation: string;
};

export type SourceType = "site" | "page" | "presentation" | "mixed";

export type AuditAnalyseInput = {
  content: string;
  sourceType?: SourceType;
  sessionId?: string;
};
