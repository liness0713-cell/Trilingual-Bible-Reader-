import { Book, Testament, Theme } from './types';

// Theme Configuration for Tailwind Classes
export const THEME_STYLES: Record<Theme, {
  bg: string;
  textMain: string;
  textSecondary: string;
  textAccent: string;
  uiBg: string;
  uiBorder: string;
  highlight: string;
  select: string;
}> = {
  paper: {
    bg: 'bg-[#fdfbf7]',
    textMain: 'text-stone-800',
    textSecondary: 'text-stone-600',
    textAccent: 'text-stone-400',
    uiBg: 'bg-white/95',
    uiBorder: 'border-stone-200',
    highlight: 'hover:bg-stone-100',
    select: 'bg-stone-200',
  },
  wood: {
    bg: 'bg-[#e8dcc6]', // Warm sepia/wood
    textMain: 'text-[#422d16]', // Dark brown
    textSecondary: 'text-[#694d2c]', // Medium brown
    textAccent: 'text-[#8f7556]', // Light brown
    uiBg: 'bg-[#f0e6d2]/95',
    uiBorder: 'border-[#d6c4a0]',
    highlight: 'hover:bg-[#d6c4a0]/50',
    select: 'bg-[#c9b58f]',
  },
  dark: {
    bg: 'bg-[#1c1917]', // Dark stone
    textMain: 'text-[#e7e5e4]', // Light stone
    textSecondary: 'text-[#a8a29e]', // Medium gray
    textAccent: 'text-[#57534e]', // Darker gray
    uiBg: 'bg-[#292524]/95',
    uiBorder: 'border-[#44403c]',
    highlight: 'hover:bg-[#44403c]/50',
    select: 'bg-[#44403c]',
  },
  forest: {
    bg: 'bg-[#ecf5ec]', // Pale mint
    textMain: 'text-[#143314]', // Dark green
    textSecondary: 'text-[#365936]', // Medium green
    textAccent: 'text-[#8da88d]', // Light green
    uiBg: 'bg-[#e0ebe0]/95',
    uiBorder: 'border-[#bddebd]',
    highlight: 'hover:bg-[#ccebcc]',
    select: 'bg-[#addbad]',
  }
};

export const BIBLE_BOOKS: Book[] = [
  // Old Testament
  { name: "Genesis", testament: Testament.OLD, chapters: 50 },
  { name: "Exodus", testament: Testament.OLD, chapters: 40 },
  { name: "Leviticus", testament: Testament.OLD, chapters: 27 },
  { name: "Numbers", testament: Testament.OLD, chapters: 36 },
  { name: "Deuteronomy", testament: Testament.OLD, chapters: 34 },
  { name: "Joshua", testament: Testament.OLD, chapters: 24 },
  { name: "Judges", testament: Testament.OLD, chapters: 21 },
  { name: "Ruth", testament: Testament.OLD, chapters: 4 },
  { name: "1 Samuel", testament: Testament.OLD, chapters: 31 },
  { name: "2 Samuel", testament: Testament.OLD, chapters: 24 },
  { name: "1 Kings", testament: Testament.OLD, chapters: 22 },
  { name: "2 Kings", testament: Testament.OLD, chapters: 25 },
  { name: "1 Chronicles", testament: Testament.OLD, chapters: 29 },
  { name: "2 Chronicles", testament: Testament.OLD, chapters: 36 },
  { name: "Ezra", testament: Testament.OLD, chapters: 10 },
  { name: "Nehemiah", testament: Testament.OLD, chapters: 13 },
  { name: "Esther", testament: Testament.OLD, chapters: 10 },
  { name: "Job", testament: Testament.OLD, chapters: 42 },
  { name: "Psalms", testament: Testament.OLD, chapters: 150 },
  { name: "Proverbs", testament: Testament.OLD, chapters: 31 },
  { name: "Ecclesiastes", testament: Testament.OLD, chapters: 12 },
  { name: "Song of Solomon", testament: Testament.OLD, chapters: 8 },
  { name: "Isaiah", testament: Testament.OLD, chapters: 66 },
  { name: "Jeremiah", testament: Testament.OLD, chapters: 52 },
  { name: "Lamentations", testament: Testament.OLD, chapters: 5 },
  { name: "Ezekiel", testament: Testament.OLD, chapters: 48 },
  { name: "Daniel", testament: Testament.OLD, chapters: 12 },
  { name: "Hosea", testament: Testament.OLD, chapters: 14 },
  { name: "Joel", testament: Testament.OLD, chapters: 3 },
  { name: "Amos", testament: Testament.OLD, chapters: 9 },
  { name: "Obadiah", testament: Testament.OLD, chapters: 1 },
  { name: "Jonah", testament: Testament.OLD, chapters: 4 },
  { name: "Micah", testament: Testament.OLD, chapters: 7 },
  { name: "Nahum", testament: Testament.OLD, chapters: 3 },
  { name: "Habakkuk", testament: Testament.OLD, chapters: 3 },
  { name: "Zephaniah", testament: Testament.OLD, chapters: 3 },
  { name: "Haggai", testament: Testament.OLD, chapters: 2 },
  { name: "Zechariah", testament: Testament.OLD, chapters: 14 },
  { name: "Malachi", testament: Testament.OLD, chapters: 4 },

  // New Testament
  { name: "Matthew", testament: Testament.NEW, chapters: 28 },
  { name: "Mark", testament: Testament.NEW, chapters: 16 },
  { name: "Luke", testament: Testament.NEW, chapters: 24 },
  { name: "John", testament: Testament.NEW, chapters: 21 },
  { name: "Acts", testament: Testament.NEW, chapters: 28 },
  { name: "Romans", testament: Testament.NEW, chapters: 16 },
  { name: "1 Corinthians", testament: Testament.NEW, chapters: 16 },
  { name: "2 Corinthians", testament: Testament.NEW, chapters: 13 },
  { name: "Galatians", testament: Testament.NEW, chapters: 6 },
  { name: "Ephesians", testament: Testament.NEW, chapters: 6 },
  { name: "Philippians", testament: Testament.NEW, chapters: 4 },
  { name: "Colossians", testament: Testament.NEW, chapters: 4 },
  { name: "1 Thessalonians", testament: Testament.NEW, chapters: 5 },
  { name: "2 Thessalonians", testament: Testament.NEW, chapters: 3 },
  { name: "1 Timothy", testament: Testament.NEW, chapters: 6 },
  { name: "2 Timothy", testament: Testament.NEW, chapters: 4 },
  { name: "Titus", testament: Testament.NEW, chapters: 3 },
  { name: "Philemon", testament: Testament.NEW, chapters: 1 },
  { name: "Hebrews", testament: Testament.NEW, chapters: 13 },
  { name: "James", testament: Testament.NEW, chapters: 5 },
  { name: "1 Peter", testament: Testament.NEW, chapters: 5 },
  { name: "2 Peter", testament: Testament.NEW, chapters: 3 },
  { name: "1 John", testament: Testament.NEW, chapters: 5 },
  { name: "2 John", testament: Testament.NEW, chapters: 1 },
  { name: "3 John", testament: Testament.NEW, chapters: 1 },
  { name: "Jude", testament: Testament.NEW, chapters: 1 },
  { name: "Revelation", testament: Testament.NEW, chapters: 22 },
];