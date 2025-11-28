export interface Verse {
  verseNumber: number;
  chinese: string; // Traditional or Simplified
  english: string; // NIV/KJV
  japaneseHtml: string; // Contains <ruby> tags
  japanesePlain: string; // Plain text for TTS
}

export interface ChapterData {
  bookName: string; // English
  bookNameChinese: string;
  bookNameJapanese: string;
  chapterNumber: number;
  verses: Verse[];
}

export enum Testament {
  OLD = 'Old Testament',
  NEW = 'New Testament',
}

export interface Book {
  name: string;
  testament: Testament;
  chapters: number; // Total number of chapters
}

export type Theme = 'paper' | 'wood' | 'dark' | 'forest';

export interface AppSettings {
  showChinese: boolean;
  showEnglish: boolean;
  showJapanese: boolean;
  showRuby: boolean;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  theme: Theme;
}