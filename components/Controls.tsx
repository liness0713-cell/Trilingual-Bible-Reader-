import React from 'react';
import { Type, Eye, EyeOff } from 'lucide-react';
import { AppSettings, Theme } from '../types';
import { THEME_STYLES } from '../constants';

interface ControlsProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const Controls: React.FC<ControlsProps> = ({ settings, setSettings }) => {
  const theme = THEME_STYLES[settings.theme];

  const toggleSetting = (key: keyof AppSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setFontSize = (size: AppSettings['fontSize']) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };
  
  const setTheme = (t: Theme) => {
    setSettings(prev => ({ ...prev, theme: t }));
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${theme.uiBg} backdrop-blur-md border-t ${theme.uiBorder} p-4 shadow-lg z-50 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300`}>
      
      {/* Visibility Toggles */}
      <div className={`flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 ${theme.textSecondary}`}>
        <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
          <input 
            type="checkbox" 
            checked={settings.showChinese} 
            onChange={() => toggleSetting('showChinese')}
            className="w-4 h-4 accent-stone-600 rounded" 
          />
          <span className="font-serif">中文</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
          <input 
            type="checkbox" 
            checked={settings.showJapanese} 
            onChange={() => toggleSetting('showJapanese')}
            className="w-4 h-4 accent-stone-600 rounded" 
          />
          <span className="font-serif">日本語</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
          <input 
            type="checkbox" 
            checked={settings.showEnglish} 
            onChange={() => toggleSetting('showEnglish')}
            className="w-4 h-4 accent-stone-600 rounded" 
          />
          <span className="font-serif">English</span>
        </label>
      </div>

      <div className={`hidden md:block h-8 w-px bg-current opacity-20`}></div>

      {/* Settings Group */}
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
        
        {/* Theme Selector */}
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setTheme('paper')}
                className={`w-6 h-6 rounded-full bg-[#fdfbf7] border-2 ${settings.theme === 'paper' ? 'border-stone-500 scale-110' : 'border-stone-200'} shadow-sm`}
                title="Paper Mode"
            />
             <button 
                onClick={() => setTheme('wood')}
                className={`w-6 h-6 rounded-full bg-[#e8dcc6] border-2 ${settings.theme === 'wood' ? 'border-[#4a3b2a] scale-110' : 'border-[#d6c4a0]'} shadow-sm`}
                title="Wood Mode"
            />
            <button 
                onClick={() => setTheme('forest')}
                className={`w-6 h-6 rounded-full bg-[#ecf5ec] border-2 ${settings.theme === 'forest' ? 'border-[#143314] scale-110' : 'border-[#bddebd]'} shadow-sm`}
                title="Forest Mode"
            />
            <button 
                onClick={() => setTheme('dark')}
                className={`w-6 h-6 rounded-full bg-[#1c1917] border-2 ${settings.theme === 'dark' ? 'border-white scale-110' : 'border-stone-600'} shadow-sm`}
                title="Dark Mode"
            />
        </div>

        <div className={`h-6 w-px bg-current opacity-20`}></div>

        {/* Ruby Toggle */}
        <button 
          onClick={() => toggleSetting('showRuby')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors border ${settings.showRuby ? `${theme.select} ${theme.uiBorder}` : 'bg-transparent border-transparent opacity-60 hover:opacity-100'} ${theme.textMain}`}
          title="Toggle Furigana (Ruby)"
          disabled={!settings.showJapanese}
        >
          {settings.showRuby ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>

        {/* Font Size */}
        <div className={`flex items-center bg-black/5 rounded-lg p-1 border ${theme.uiBorder}`}>
          <button 
            onClick={() => setFontSize('sm')} 
            className={`p-1.5 rounded ${settings.fontSize === 'sm' ? theme.uiBg + ' shadow-sm' : 'opacity-50 hover:opacity-100'} ${theme.textMain}`}
          >
            <Type size={12} />
          </button>
          <button 
            onClick={() => setFontSize('base')} 
            className={`p-1.5 rounded ${settings.fontSize === 'base' ? theme.uiBg + ' shadow-sm' : 'opacity-50 hover:opacity-100'} ${theme.textMain}`}
          >
            <Type size={16} />
          </button>
          <button 
            onClick={() => setFontSize('lg')} 
            className={`p-1.5 rounded ${settings.fontSize === 'lg' ? theme.uiBg + ' shadow-sm' : 'opacity-50 hover:opacity-100'} ${theme.textMain}`}
          >
            <Type size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Controls;