import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HomeSection({ title, children }) {
  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 px-4 sm:px-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-300)}
            className="bg-neutral-800 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(300)}
            className="bg-neutral-800 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 px-4 sm:px-6 pb-4 items-start [&::-webkit-scrollbar]:w-0 scrollbar-width-none"
      >
        {children}
        <div className="shrink-0 w-1"></div>
      </div>
    </div>
  );
}

export default HomeSection;
