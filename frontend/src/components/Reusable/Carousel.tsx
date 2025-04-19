import React, { ReactNode, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CarouselProps {
  children: ReactNode;
  itemsToShow?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, itemsToShow = 3 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / itemsToShow;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Carousel Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 p-2 bg-card border border-card-border rounded-full text-text"
      >
        <FaAngleLeft size={24} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 p-2 bg-card border border-card-border rounded-full text-text"
      >
        <FaAngleRight size={24} />
      </button>

      {/* Carousel Content */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-4 scroll-smooth px-10 py-4"
      >
        {React.Children.map(children, (child) => (
          <div className="flex-shrink-0 w-[calc(100%/1.1)] sm:w-[calc(100%/2.2)] md:w-[calc(100%/3.2)]">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
