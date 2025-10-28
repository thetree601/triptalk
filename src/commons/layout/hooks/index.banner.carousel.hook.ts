'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface BannerImage {
  src: string;
  alt: string;
}

export interface UseBannerCarouselProps {
  images: BannerImage[];
  autoPlayInterval?: number;
  enableAutoPlay?: boolean;
}

export interface UseBannerCarouselReturn {
  currentIndex: number;
  isAutoPlaying: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  pauseAutoPlay: () => void;
  resumeAutoPlay: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function useBannerCarousel({
  images,
  autoPlayInterval = 5000,
  enableAutoPlay = true,
}: UseBannerCarouselProps): UseBannerCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef(false);

  // 자동 재생 기능
  useEffect(() => {
    if (isAutoPlaying && images.length > 1) {
      autoPlayRef.current = setInterval(() => {
        if (!isUserInteractingRef.current) {
          setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, images.length, autoPlayInterval]);

  // 특정 슬라이드로 이동
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      isUserInteractingRef.current = true;
      
      // 사용자 상호작용 후 일정 시간 후 자동 재생 재개
      setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 3000);
    }
  }, [images.length]);

  // 다음 슬라이드
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    isUserInteractingRef.current = true;
    
    setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 3000);
  }, [images.length]);

  // 이전 슬라이드
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    isUserInteractingRef.current = true;
    
    setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 3000);
  }, [images.length]);

  // 자동 재생 일시 정지
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // 자동 재생 재개
  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // 터치 시작
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  // 터치 이동
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  // 터치 종료
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    // 자동 재생 재개
    setTimeout(() => {
      resumeAutoPlay();
    }, 1000);
  }, [touchStart, touchEnd, nextSlide, prevSlide, resumeAutoPlay]);

  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case ' ':
        e.preventDefault();
        if (isAutoPlaying) {
          pauseAutoPlay();
        } else {
          resumeAutoPlay();
        }
        break;
    }
  }, [prevSlide, nextSlide, isAutoPlaying, pauseAutoPlay, resumeAutoPlay]);

  return {
    currentIndex,
    isAutoPlaying,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  };
}
