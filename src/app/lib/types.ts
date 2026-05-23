// I am Ironman
export interface Language {
  code: string;
  label: string;
  native: string;
  flag: string;
}

export interface Segment {
  id: string;
  text: string;
}

export interface DraftData {
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  docTitle: string;
}
