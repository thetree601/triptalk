import React from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.areaLabel}>Header (1280×80)</div>
        </div>
      </header>

      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.areaLabel}>Banner (1920×516)</div>
      </section>

      {/* Gap between banner and API section */}
      <div className={styles.gap}>
        <div className={styles.gapLabel}>Gap (1920×40)</div>
      </div>

      {/* API Section */}
      <section className={styles.apiSection}>
        <div className={styles.apiContent}>
          <div className={styles.areaLabel}>API Section (1280×212)</div>
        </div>
      </section>

      {/* Gap between API section and main content */}
      <div className={styles.gap}>
        <div className={styles.gapLabel}>Gap (1920×40)</div>
      </div>

      {/* Main Content (children) */}
      <main className={styles.mainContent}>
        <div className={styles.mainContentWrapper}>
          <div className={styles.areaLabel}>Main Content (1280×828)</div>
          {children}
        </div>
      </main>

      {/* Bottom gap */}
      <div className={styles.bottomGap}>
        <div className={styles.gapLabel}>Bottom Gap (1920×56)</div>
      </div>
    </div>
  );
}
