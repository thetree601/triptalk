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
          {/* Header content will be implemented here */}
        </div>
      </header>

      {/* Banner */}
      <section className={styles.banner}>
        {/* Banner content will be implemented here */}
      </section>

      {/* Gap between banner and API section */}
      <div className={styles.gap}></div>

      {/* API Section */}
      <section className={styles.apiSection}>
        {/* API loading area will be implemented here */}
      </section>

      {/* Gap between API section and main content */}
      <div className={styles.gap}></div>

      {/* Main Content (children) */}
      <main className={styles.mainContent}>
        {children}
      </main>

      {/* Bottom gap */}
      <div className={styles.bottomGap}></div>
    </div>
  );
}
