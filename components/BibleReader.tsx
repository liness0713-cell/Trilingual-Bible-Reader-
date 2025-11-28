import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { ChapterData, AppSettings } from '../types';
import { playTextToSpeech } from '../services/geminiService';
import { THEME_STYLES } from '../constants';

interface BibleReaderProps {
  data: ChapterData | null;
  isLoading: boolean;
  settings: AppSettings;
  error: string | null;
}

const BibleReader: React.FC<BibleReaderProps> = ({ data, isLoading, settings, error }) => {
  const [playingState, setPlayingState] = useState<{ id: string } | null>(null);
  
  const theme = THEME_STYLES[settings.theme];

  const handlePlay = async (text: string, lang: 'en' | 'zh' | 'ja', uniqueId: string) => {
    if (playingState) return; 

    setPlayingState({ id: uniqueId });
    try {
      await playTextToSpeech(text, lang);
    } catch (e) {
      console.error("Failed to play audio", e);
      alert("Unable to play audio. Please try again.");
    } finally {
      setPlayingState(null);
    }
  };
  
  const sizeClasses = {
    sm: { cn: 'text-base', jp: 'text-base', en: 'text-sm' },
    base: { cn: 'text-lg', jp: 'text-lg', en: 'text-base' },
    lg: { cn: 'text-xl', jp: 'text-xl', en: 'text-lg' },
    xl: { cn: 'text-2xl', jp: 'text-2xl', en: 'text-xl' },
  };

  const currentSize = sizeClasses[settings.fontSize];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-12 animate-pulse pt-24 pb-72">
        <div className={`h-12 bg-black/10 rounded w-1/2 mx-auto mb-12`}></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <div className="flex gap-4">
              <div className={`w-8 h-8 bg-black/10 rounded-full flex-shrink-0`}></div>
              <div className="flex-1 space-y-3">
                <div className={`h-4 bg-black/10 rounded w-full`}></div>
                <div className={`h-4 bg-black/10 rounded w-3/4`}></div>
                <div className={`h-4 bg-black/10 rounded w-5/6`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 px-4 pt-32">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-500 text-5xl mb-4">☩</div>
          <h3 className={`text-xl font-serif ${theme.textMain}`}>Connection Error</h3>
          <p className={`${theme.textSecondary}`}>{error}</p>
          <p className={`text-xs ${theme.textAccent} mt-4`}>Please ensure your API Key is valid and try again.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-32 px-4 opacity-50 pt-32">
        <div className={`text-center font-serif ${theme.textAccent}`}>
          <p className="text-2xl mb-2">Select a book to begin</p>
          <p>Please use the menu above.</p>
        </div>
      </div>
    );
  }

  const SpeakerButton = ({ text, lang, id }: { text: string, lang: 'en' | 'zh' | 'ja', id: string }) => {
    const isLoadingThis = playingState?.id === id;
    return (
      <button 
        onClick={() => handlePlay(text, lang, id)}
        disabled={!!playingState}
        className={`ml-2 inline-flex items-center justify-center p-1.5 rounded-full ${theme.textAccent} hover:${theme.textMain} hover:bg-black/5 transition-all disabled:opacity-30`}
        title="Read aloud"
        aria-label="Play audio"
      >
        {isLoadingThis ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}
      </button>
    );
  };

  return (
    // Increased padding-bottom to pb-72 (approx 288px) to ensuring nothing is hidden by the control bar
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pb-72">
      <header className="text-center mb-12 mt-4 space-y-3">
        <div className="flex flex-col items-center gap-1">
          <h1 className={`text-3xl sm:text-4xl font-serif font-bold ${theme.textMain} tracking-wide`}>
            {data.bookNameChinese}
          </h1>
          <h2 className={`text-xl ${theme.textSecondary} font-serif`}>
            {data.bookNameJapanese}
          </h2>
          <h3 className={`text-lg ${theme.textAccent} font-serif uppercase tracking-widest`}>
            {data.bookName}
          </h3>
        </div>
        
        <div className={`w-16 h-px bg-current opacity-30 mx-auto my-4 ${theme.textAccent}`}></div>
        
        <p className={`${theme.textAccent} font-serif text-lg italic`}>
          Chapter {data.chapterNumber}
        </p>
      </header>

      <div className="space-y-10">
        {data.verses.map((verse) => (
          <div 
            key={verse.verseNumber} 
            className={`group relative flex gap-2 sm:gap-6 p-3 rounded-xl transition-colors ${theme.highlight} border border-transparent hover:${theme.uiBorder}`}
          >
            {/* Verse Number */}
            <div className="flex-shrink-0 w-8 sm:w-10 pt-1">
              <span className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/5 ${theme.textAccent} text-xs sm:text-sm font-serif font-semibold`}>
                {verse.verseNumber}
              </span>
            </div>

            {/* Verse Text Content */}
            <div className="flex-1 space-y-4">
              
              {/* Chinese */}
              {settings.showChinese && (
                <div className={`flex items-start justify-between group/line`}>
                  <div className={`font-serif leading-loose ${theme.textMain} ${currentSize.cn}`} style={{ fontFamily: '"Noto Serif SC", serif' }}>
                    {verse.chinese}
                  </div>
                  <SpeakerButton text={verse.chinese} lang="zh" id={`zh-${verse.verseNumber}`} />
                </div>
              )}

              {/* Japanese */}
              {settings.showJapanese && (
                <div className={`flex items-start justify-between group/line`}>
                  <div 
                    className={`font-serif leading-[2.5] ${theme.textMain} ${currentSize.jp} ${!settings.showRuby ? 'ruby-hidden' : ''}`} 
                    style={{ fontFamily: '"Noto Serif JP", serif' }}
                    dangerouslySetInnerHTML={{ __html: verse.japaneseHtml }}
                  />
                  <SpeakerButton text={verse.japanesePlain} lang="ja" id={`ja-${verse.verseNumber}`} />
                </div>
              )}

              {/* English */}
              {settings.showEnglish && (
                <div className={`flex items-start justify-between group/line`}>
                  <div className={`font-serif leading-relaxed ${theme.textSecondary} ${currentSize.en}`} style={{ fontFamily: '"Merriweather", serif' }}>
                    {verse.english}
                  </div>
                  <SpeakerButton text={verse.english} lang="en" id={`en-${verse.verseNumber}`} />
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-20 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
        <div className={`w-12 h-px bg-current mb-4 ${theme.textAccent}`}></div>
        <a 
          href="https://my-portfolio-beige-five-56.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex items-center gap-2 font-serif text-sm ${theme.textSecondary} hover:${theme.textMain} transition-colors`}
        >
          <span>千葉２狗 🐶</span>
        </a>
      </div>
    </div>
  );
};

export default BibleReader;