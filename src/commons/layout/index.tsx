import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
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

          {/* User Actions */}
          <div className={styles.userActions}>
            <button className={styles.loginButton}>
              <span className={styles.loginText}>로그인</span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerImage}>
          <Image 
            src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.jpg" 
            alt="Banner" 
            fill
            className={styles.bannerImg}
            priority
          />
        </div>
        
        {/* Banner Indicators */}
        <div className={styles.bannerIndicators}>
          <div className={`${styles.indicator} ${styles.active}`}></div>
          <div className={styles.indicator}></div>
          <div className={styles.indicator}></div>
          <div className={styles.indicator}></div>
          <div className={styles.indicator}></div>
          <div className={styles.indicator}></div>
          <div className={styles.indicator}></div>
        </div>

        {/* Banner Navigation Arrows */}
        <button className={`${styles.bannerArrow} ${styles.leftArrow}`}>
          <Image src="/icons/left_arrow.png" alt="Previous" width={24} height={24} />
        </button>
        <button className={`${styles.bannerArrow} ${styles.rightArrow}`}>
          <Image src="/icons/right_arrow.png" alt="Next" width={24} height={24} />
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
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.jpg" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>제주 살이 1일차 청산별곡이 생각나네요</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.jpg" 
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
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.jpg" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>길 걷고 있었는데 고양이한테 간택 받았어요</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.jpg" 
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
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.jpg" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>강릉 여름바다 보기 좋네요 서핑하고 싶어요!</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.jpg" 
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
                  src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.jpg" 
                  alt="TripTalk" 
                  fill
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>누가 양양 핫하다고 했어 나밖에 없는데?</h3>
                <div className={styles.cardProfile}>
                  <div className={styles.profileImage}>
                    <Image 
                      src="/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.jpg" 
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
