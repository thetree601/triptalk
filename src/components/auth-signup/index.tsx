'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

interface FormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
}

const AuthSignup = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 2글자 이상 입력해주세요.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8글자 이상 입력해주세요.';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual signup logic
      console.log('Signup data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Handle success (redirect, show success message, etc.)
      alert('회원가입이 완료되었습니다!');
      
    } catch (error) {
      console.error('Signup error:', error);
      // TODO: Handle error (show error message, etc.)
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form onSubmit={handleSubmit} className={styles.form}>
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력해 주세요."
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해 주세요."
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해 주세요."
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 한번 더 입력해 주세요."
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <span className={styles.errorMessage}>{errors.confirmPassword}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.signupButton}
              disabled={isSubmitting}
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