'use client';

import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useBannerCarousel, BannerImage } from './hooks/index.banner.carousel.hook';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // 배너 이미지 데이터
  const bannerImages: BannerImage[] = [
    {
      src: "/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png",
      alt: "Tranquil Beachfront 1"
    },
    {
      src: "/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.png",
      alt: "Tranquil Beachfront 2"
    },
    {
      src: "/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.png",
      alt: "Tranquil Beachfront 3"
    }
  ];

  // 배너 캐러셀 훅 사용
  const {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useBannerCarousel({
    images: bannerImages,
    autoPlayInterval: 3000,
    enableAutoPlay: true,
  });
  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo and Navigation Group */}
          <div className={styles.logoNavGroup}>
            {/* Logo Area */}
            <div className={styles.logoArea}>
              <div className={styles.logo}>
                <Image 
                  src="/icons/logo.png" 
                  alt="TripTalk Logo" 
                  width={56}
                  height={32}
                  priority
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className={styles.navigation}>
              <div className={`${styles.tab} ${styles.active}`}>
                <span className={styles.tabText}>트립토크</span>
              </div>
              <div className={styles.tab}>
                <span className={styles.tabText}>숙박권 구매</span>
              </div>
              <div className={styles.tab}>
                <span className={styles.tabText}>마이 페이지</span>
              </div>
            </nav>
          </div>

          {/* User Actions */}
          <div className={styles.userActions}>
            <button className={styles.loginButton}>
              <span className={styles.loginText}>로그인</span>
              <Image 
                src="/icons/right_icon.png" 
                alt="Right Arrow" 
                width={16}
                height={16}
                className={styles.loginIcon}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section 
        className={styles.banner}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="배너 캐러셀"
        aria-live="polite"
      >
        <div className={styles.bannerContainer}>
          <div 
            className={styles.bannerTrack}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {bannerImages.map((image, index) => (
              <div key={index} className={styles.bannerSlide}>
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill
                  className={`${styles.bannerImg} ${index === 0 ? styles.bannerImgFirst : ''}`}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Banner Indicators */}
        <div className={styles.bannerIndicators}>
          <button
            className={`${styles.indicator} ${currentIndex === 0 ? styles.active : ''}`}
            onClick={() => goToSlide(0)}
            aria-label="슬라이드 1로 이동"
            aria-pressed={currentIndex === 0}
          />
          <button
            className={`${styles.indicator} ${currentIndex === 1 ? styles.active : ''}`}
            onClick={() => goToSlide(1)}
            aria-label="슬라이드 2로 이동"
            aria-pressed={currentIndex === 1}
          />
          <button
            className={`${styles.indicator} ${currentIndex === 2 ? styles.active : ''}`}
            onClick={() => goToSlide(2)}
            aria-label="슬라이드 3로 이동"
            aria-pressed={currentIndex === 2}
          />
          <button
            className={`${styles.indicator} ${currentIndex === 0 ? styles.active : ''}`}
            onClick={() => goToSlide(0)}
            aria-label="슬라이드 4로 이동"
            aria-pressed={currentIndex === 0}
          />
        </div>

        {/* Banner Navigation Arrows */}
        <button 
          className={`${styles.bannerArrow} ${styles.leftArrow}`}
          onClick={prevSlide}
          aria-label="이전 슬라이드"
        >
          <Image 
            src="/icons/leftenable_outline_light_m.svg" 
            alt="Previous" 
            width={24} 
            height={24} 
          />
        </button>
        <button 
          className={`${styles.bannerArrow} ${styles.rightArrow}`}
          onClick={nextSlide}
          aria-label="다음 슬라이드"
        >
          <Image 
            src="/icons/rightenable_outline_light_m.svg" 
            alt="Next" 
            width={24} 
            height={24} 
          />
        </button>
      </section>

      {/* Gap between banner and API section */}
      <div className={styles.gap}></div>

      {/* API Section - Hot TripTalk */}
      <section className={styles.apiSection}>
        <div className={styles.apiContent}>
          <h2 className={styles.apiTitle}>오늘 핫한 트립토크</h2>
          <div className={styles.apiCards}>
            {/* TripTalk Cards */}
            <div className={styles.tripTalkCard}>
              <div className={styles.cardImage}>
                <Image 
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>제주 살이 1일차 청산별곡이 생각나네요</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png" 
                      alt="Profile" 
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.profileName}>홍길동</span>
                </div>
                <div className={styles.cardMeta}>
                  <div className={styles.likeArea}>
                    <Image src="/icons/good.png" alt="Like" width={24} height={24} className={styles.likeIcon} />
                    <span className={styles.likeCount}>24</span>
                  </div>
                  <span className={styles.cardDate}>2024.11.11</span>
                </div>
              </div>
            </div>

            <div className={styles.tripTalkCard}>
              <div className={styles.cardImage}>
                <Image 
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.png" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>길 걷고 있었는데 고양이한테 간택 받았어요</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.png" 
                      alt="Profile" 
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.profileName}>홍길동</span>
                </div>
                <div className={styles.cardMeta}>
                  <div className={styles.likeArea}>
                    <Image src="/icons/good.png" alt="Like" width={24} height={24} className={styles.likeIcon} />
                    <span className={styles.likeCount}>24</span>
                  </div>
                  <span className={styles.cardDate}>2024.11.11</span>
                </div>
              </div>
            </div>

            <div className={styles.tripTalkCard}>
              <div className={styles.cardImage}>
                <Image 
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.png" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>강릉 여름바다 보기 좋네요 서핑하고 싶어요!</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.png" 
                      alt="Profile" 
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.profileName}>홍길동</span>
                </div>
                <div className={styles.cardMeta}>
                  <div className={styles.likeArea}>
                    <Image src="/icons/good.png" alt="Like" width={24} height={24} className={styles.likeIcon} />
                    <span className={styles.likeCount}>24</span>
                  </div>
                  <span className={styles.cardDate}>2024.11.11</span>
                </div>
              </div>
            </div>

            <div className={styles.tripTalkCard}>
              <div className={styles.cardImage}>
                <Image 
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>누가 양양 핫하다고 했어 나밖에 없는데?</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png" 
                      alt="Profile" 
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className={styles.profileName}>홍길동</span>
                </div>
                <div className={styles.cardMeta}>
                  <div className={styles.likeArea}>
                    <Image src="/icons/good.png" alt="Like" width={24} height={24} className={styles.likeIcon} />
                    <span className={styles.likeCount}>24</span>
                  </div>
                  <span className={styles.cardDate}>2024.11.11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gap between API section and main content */}
      <div className={styles.gap}></div>

      {/* Main Content (children) */}
      <main className={styles.mainContent}>
        <div className={styles.mainContentWrapper}>
          {children}
        </div>
      </main>

      {/* Bottom gap */}
      <div className={styles.bottomGap}></div>
    </div>
  );
}
