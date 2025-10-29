'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

const AuthLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <Image
              src="/icons/logo.png"
              alt="TripTalk Logo"
              width={120}
              height={75}
              priority
            />
          </div>
          <h1 className={styles.welcomeTitle}>
            트립트립에 오신걸 환영합니다.
          </h1>
        </div>

        <div className={styles.formSection}>
          <p className={styles.loginSubtitle}>
            트립트립에 로그인 하세요.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해 주세요."
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요."
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
          </form>

          <div className={styles.signupSection}>
            <a href="/auth/signup" className={styles.signupLink}>
              회원가입
            </a>
          </div>
        </div>
      </div>

      <div className={styles.backgroundImage}>
        <Image
          src="/images/auth.png"
          alt="Auth Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
};

export default AuthLogin;
