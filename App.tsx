import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { AppSettings, ChapterData } from './types';
import { BIBLE_BOOKS, THEME_STYLES } from './constants';
import { fetchChapter } from './services/geminiService';
import BibleReader from './components/BibleReader';
import Controls from './components/Controls';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  // --- State ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentBookName, setCurrentBookName] = useState<string>("John");
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<AppSettings>({
    showChinese: true,
    showEnglish: true,
    showJapanese: true,
    showRuby: true,
    fontSize: 'base',
    theme: 'paper',
  });
  
  const theme = THEME_STYLES[settings.theme];

  // --- Helpers ---
  const currentBook = BIBLE_BOOKS.find(b => b.name === currentBookName) || BIBLE_BOOKS[0];

  // --- Effects ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchChapter(currentBookName, currentChapter);
        setChapterData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load scripture.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentBookName, currentChapter]);

  const handleNavigation = (book: string, chapter: number) => {
    setCurrentBookName(book);
    setCurrentChapter(chapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans transition-colors duration-500`}>
      
      {/* Injecting style for Ruby toggle conditionally */}
      <style>
        {`
          .ruby-hidden rt {
            display: none !important;
          }
          .ruby-hidden rp {
            display: none !important;
          }
        `}
      </style>

      {/* Top Bar (Mobile/Desktop) */}
      <nav className={`sticky top-0 z-30 ${theme.uiBg} backdrop-blur-md border-b ${theme.uiBorder} px-4 py-3 flex items-center justify-between transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className={`p-2 -ml-2 rounded-lg ${theme.textSecondary} ${theme.highlight} transition-colors`}
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-lg leading-none ${theme.textMain}`}>
              Trilingual Bible
            </span>
            <span className={`text-[10px] ${theme.textAccent} uppercase tracking-widest`}>
              Chinese • English • Japanese
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            {/* Quick nav indicator */}
            <div 
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-serif cursor-pointer transition-colors ${theme.highlight} ${theme.textSecondary}`}
              onClick={() => setSidebarOpen(true)}
            >
              <span className="font-bold">{currentBookName}</span>
              <span className="opacity-40">|</span>
              <span>Ch. {currentChapter}</span>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <Sidebar 
          currentBook={currentBook}
          currentChapter={currentChapter}
          onSelect={handleNavigation}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          settings={settings}
        />

        <BibleReader 
          data={chapterData}
          isLoading={loading}
          settings={settings}
          error={error}
        />
      </main>

      {/* Bottom Controls */}
      <Controls settings={settings} setSettings={setSettings} />
    </div>
  );
};

export default App;