"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export interface SliderTestimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
  date: string;
}

interface TestimonialSliderProps {
  testimonials: SliderTestimonial[];
}

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
};

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set actual window width after mount to avoid hydration mismatch
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      const newVisibleCount = getVisibleCount(newWidth);
      const maxIndexForNewWidth = testimonials.length - newVisibleCount;
      setCurrentIndex((prev) =>
        prev > maxIndexForNewWidth ? Math.max(0, maxIndexForNewWidth) : prev
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      const visibleCount = getVisibleCount(windowWidth);
      const maxIndex = testimonials.length - visibleCount;

      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          directionRef.current = -1;
          return prev - 1;
        } else if (prev <= 0) {
          directionRef.current = 1;
          return prev + 1;
        }
        return prev + directionRef.current;
      });
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, windowWidth, testimonials.length]);

  const visibleCount = getVisibleCount(windowWidth);
  const maxIndex = testimonials.length - visibleCount;
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const goNext = () => {
    if (canGoNext) {
      directionRef.current = 1;
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      pauseAutoPlay();
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      directionRef.current = -1;
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      pauseAutoPlay();
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const swipeThreshold = 30;
    if (info.offset.x < -swipeThreshold && canGoNext) {
      goNext();
    } else if (info.offset.x > swipeThreshold && canGoPrev) {
      goPrev();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  return (
    <div className="overflow-hidden">
      <div className="relative" ref={containerRef}>
        {/* Navigation arrows */}
        <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 space-x-2 mb-4 sm:mb-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            disabled={!canGoPrev}
            className={`p-2 rounded-full transition-all duration-300 ${
              canGoPrev
                ? "bg-card shadow-md hover:bg-accent text-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            disabled={!canGoNext}
            className={`p-2 rounded-full transition-all duration-300 ${
              canGoNext
                ? "bg-card shadow-md hover:bg-accent text-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Slider track */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className={`flex-shrink-0 w-full ${
                  visibleCount === 3
                    ? "md:w-1/3"
                    : visibleCount === 2
                      ? "md:w-1/2"
                      : "w-full"
                } p-2`}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98, cursor: "grabbing" }}
                style={{ cursor: "grab" }}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full bg-card border border-border shadow-lg">
                  {/* Decorative quote icon */}
                  <div className="absolute -top-4 -left-4 opacity-10">
                    <Quote className="w-10 h-10 sm:w-[60px] sm:h-[60px] text-primary" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Star rating */}
                    <div className="mb-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-secondary text-secondary"
                              : "text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="text-sm sm:text-base text-foreground-body font-medium mb-4 sm:mb-6 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author info */}
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm sm:text-base text-card-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-6 sm:mt-8">
          {Array.from(
            { length: testimonials.length - visibleCount + 1 },
            (_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative mx-1 focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  animate={{
                    scale: index === currentIndex ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: index === currentIndex ? Infinity : 0,
                    repeatDelay: 1,
                  }}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{
                      scale: [1, 1.8],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
