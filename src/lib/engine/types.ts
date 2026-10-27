export type Language = 'en' | 'hi' | 'gu' | 'bn' | 'mr' | 'te' | 'ta' | 'kn';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type CitizenRiskCategory = 'HIGH_RISK' | 'SOME_WARNINGS' | 'NO_OBVIOUS_WARNINGS';

export type RuleCategory =
  | 'urgency'
  | 'impersonation'
  | 'credential'
  | 'financial'
  | 'remote_access'
  | 'suspicious_link';

export interface WarningIndicator {
  id: string;
  category: RuleCategory;
  title: Partial<Record<Language, string>> & { en: string };
  explanation: Partial<Record<Language, string>> & { en: string };
  severity: 'low' | 'medium' | 'high' | 'critical';
  weight: number; // score increment
  matchedPatterns: string[];
}

export interface UrlAnalysis {
  rawUrl: string;
  cleanedUrl: string;
  domain: string;
  protocol: string;
  isHttps: boolean;
  isIpAddress: boolean;
  isShortener: boolean;
  hasSuspiciousTld: boolean;
  isLookalike: boolean;
  targetBrand?: string;
  lookalikeDetails?: string;
  hasSuspiciousExtension: boolean;
  hasCredentialsInUrl: boolean;
  hasExcessiveSubdomains: boolean;
  flags: {
    code: string;
    description: Partial<Record<Language, string>> & { en: string };
    severity: 'info' | 'warning' | 'danger';
  }[];
}

export interface ScamAnalysisResult {
  input: string;
  inputType: 'message' | 'url' | 'mixed';
  score: number; // 0 - 100 internal score
  riskLevel: RiskLevel;
  citizenCategory: CitizenRiskCategory;
  categoryDescription: Partial<Record<Language, string>> & { en: string };
  summary: Partial<Record<Language, string>> & { en: string };
  warnings: WarningIndicator[];
  categoryScores: Record<RuleCategory, number>;
  urlsFound: UrlAnalysis[];
  recommendedActions: Partial<Record<Language, string[]>> & { en: string[] };
  disclaimer: Partial<Record<Language, string>> & { en: string };
  analyzedAt: string;
  detectionMode: 'rule_engine' | 'ai_enhanced';
}
