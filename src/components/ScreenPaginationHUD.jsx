import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ScreenPaginationHUD({ 
  currentScreen = 0, 
  totalScreens = 6, 
  onNext, 
  onPrev, 
  onSelectScreen,
  screenTitles = []
}) {
  return (
    <aside className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      {/* Up Button */}
      <button
        type="button"
        disabled={currentScreen === 0}
        onClick={onPrev}
        className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[#1769FF] hover:bg-[#EAF3FF] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
        title="Previous Screen"
        aria-label="Previous Screen"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Vertical Dots Capsule */}
      <div className="glass-panel p-2.5 rounded-full flex flex-col items-center gap-2.5 shadow-md border border-[#EAF3FF]">
        {Array.from({ length: totalScreens }).map((_, index) => {
          const isActive = currentScreen === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectScreen(index)}
              className="group relative flex items-center justify-center focus:outline-none"
              aria-label={`Go to screen ${index + 1}`}
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-8 bg-gradient-to-b from-[#1769FF] to-[#00A3FF] shadow-electric'
                    : 'w-2.5 h-2.5 bg-slate-300 group-hover:bg-[#00A3FF] group-hover:scale-125'
                }`}
              />

              {/* Tooltip on Hover */}
              <span className="absolute right-7 px-3 py-1 rounded-lg bg-[#07152E] text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                0{index + 1}. {screenTitles[index] || `Screen ${index + 1}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        type="button"
        disabled={currentScreen === totalScreens - 1}
        onClick={onNext}
        className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-[#1769FF] hover:bg-[#EAF3FF] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
        title="Next Screen"
        aria-label="Next Screen"
      >
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Counter Tag */}
      <div className="mt-1 px-2.5 py-1 rounded-full bg-[#EAF3FF] border border-[#00A3FF]/30 text-[10px] font-mono font-extrabold text-[#1769FF]">
        0{currentScreen + 1}/0{totalScreens}
      </div>
    </aside>
  );
}
