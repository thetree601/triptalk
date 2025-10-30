'use client';

import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useSignupForm } from './hooks/index.form.hook';

const AuthSignup = () => {
  const { form, onSubmit, isSubmitting, isSubmitDisabled } = useSignupForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className={styles.container}>
      <div className={styles.signupForm}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>
            회원가입
          </h1>
          <p className={styles.signupSubtitle}>
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Email Field */}
            <div className={styles.inputGroup}>
              <div className={styles.labelGroup}>
                <label htmlFor="email" className={styles.label}>
                  이메일
                </label>
                <span className={styles.required}>*</span>
              </div>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력해 주세요."
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                disabled={isSubmitting}
                {...register('email')}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email.message as string}</span>
              )}
            </div>

            {/* Name Field */}
            <div className={styles.inputGroup}>
              <div className={styles.labelGroup}>
                <label htmlFor="name" className={styles.label}>
                  이름
                </label>
                <span className={styles.required}>*</span>
              </div>
              <input
                type="text"
                id="name"
                placeholder="이름을 입력해 주세요."
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                disabled={isSubmitting}
                {...register('name')}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name.message as string}</span>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <div className={styles.labelGroup}>
                <label htmlFor="password" className={styles.label}>
                  비밀번호
                </label>
                <span className={styles.required}>*</span>
              </div>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해 주세요."
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                disabled={isSubmitting}
                {...register('password')}
              />
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password.message as string}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.inputGroup}>
              <div className={styles.labelGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  비밀번호 확인
                </label>
                <span className={styles.required}>*</span>
              </div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호를 한번 더 입력해 주세요."
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                disabled={isSubmitting}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span className={styles.errorMessage}>{errors.confirmPassword.message as string}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.signupButton}
              disabled={isSubmitDisabled}
            >
              {isSubmitting ? '처리 중...' : '회원가입'}
            </button>
          </form>

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

export default AuthSignup;