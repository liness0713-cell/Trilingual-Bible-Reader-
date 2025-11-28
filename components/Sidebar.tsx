import React, { useState } from 'react';
import { BookOpen, ChevronRight, X, Search } from 'lucide-react';
import { BIBLE_BOOKS, THEME_STYLES } from '../constants';
import { Book, Testament, AppSettings } from '../types';

interface SidebarProps {
  currentBook: Book;
  currentChapter: number;
  onSelect: (bookName: string, chapter: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  settings: AppSettings;
}

const Sidebar: React.FC<SidebarProps> = ({ currentBook, currentChapter, onSelect, isOpen, setIsOpen, settings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const theme = THEME_STYLES[settings.theme];
  
  const filteredBooks = BIBLE_BOOKS.filter(book => 
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBookList = (books: Book[]) => (
    <div className="space-y-1">
      {books.map(book => {
         const isSelected = book.name === currentBook.name;
         return (
          <div key={book.name} className="space-y-1">
            <button
              onClick={() => {
                if (!isSelected) {
                   onSelect(book.name, 1);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                isSelected 
                  ? `${theme.select} ${theme.textMain} font-bold` 
                  : `${theme.textSecondary} ${theme.highlight}`
              }`}
            >
              <span className="font-serif">{book.name}</span>
              {isSelected && <ChevronRight size={14} />}
            </button>
            
            {isSelected && (
              <div className="pl-4 pr-2 py-2 grid grid-cols-5 gap-1">
                {Array.from({ length: book.chapters }, (_, i) => i + 1).map(chap => (
                  <button
                    key={chap}
                    onClick={() => {
                      onSelect(book.name, chap);
                      setIsOpen(false); 
                    }}
                    className={`h-8 rounded flex items-center justify-center text-xs font-serif transition-all ${
                      currentChapter === chap
                        ? `${theme.textMain} shadow-md transform scale-105 bg-white/20 border ${theme.uiBorder}`
                        : `${theme.textAccent} hover:bg-black/5`
                    }`}
                  >
                    {chap}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container - Z-Index 100 to sit ABOVE controls */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-80 ${theme.bg} border-r ${theme.uiBorder} shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${theme.uiBorder} flex items-center justify-between ${theme.uiBg}`}>
          <div className={`flex items-center gap-2 ${theme.textMain}`}>
            <BookOpen size={20} />
            <h2 className="font-serif font-bold text-lg">Scripture</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className={`p-1 rounded-full ${theme.textSecondary} ${theme.highlight}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className={`p-4 border-b ${theme.uiBorder}`}>
          <div className="relative">
            <Search className={`absolute left-3 top-2.5 ${theme.textAccent}`} size={16} />
            <input
              type="text"
              placeholder="Find a book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 bg-black/5 border-none rounded-lg text-sm ${theme.textMain} placeholder-stone-400 focus:ring-2 focus:ring-opacity-50 outline-none`}
            />
          </div>
        </div>

        {/* Book List - Increased padding bottom to pb-40 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40">
          
          {/* Old Testament */}
          {filteredBooks.some(b => b.testament === Testament.OLD) && (
            <div>
              <h3 className={`text-xs font-bold ${theme.textAccent} uppercase tracking-wider mb-3 px-2`}>
                Old Testament
              </h3>
              {renderBookList(filteredBooks.filter(b => b.testament === Testament.OLD))}
            </div>
          )}

          {/* New Testament */}
          {filteredBooks.some(b => b.testament === Testament.NEW) && (
            <div>
              <h3 className={`text-xs font-bold ${theme.textAccent} uppercase tracking-wider mb-3 px-2 mt-2`}>
                New Testament
              </h3>
              {renderBookList(filteredBooks.filter(b => b.testament === Testament.NEW))}
            </div>
          )}
          
          {filteredBooks.length === 0 && (
            <div className={`text-center py-10 ${theme.textAccent} text-sm`}>
              No books found
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;