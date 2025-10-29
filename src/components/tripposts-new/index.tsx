"use client";

import React from 'react';
import styles from './styles.module.css';

export default function TripPostsNew() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // submit logic to be implemented later
  };

  return (
    <section className={styles.container} aria-labelledby="newPostHeading">
      <div className={styles.topGap} aria-hidden="true" />

      <div className={styles.frame}>
        <header className={styles.header}>
          <h1 id="newPostHeading">게시물 등록</h1>
        </header>

        <form className={styles.form} onSubmit={onSubmit}>
        {/* 작성자 / 비밀번호 */}
        <div className={styles.rowTwoCols}>
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="author" className={styles.label}>작성자</label>
              <span className={styles.requiredMark} aria-hidden>*</span>
            </div>
            <input
              id="author"
              name="author"
              className={styles.input}
              placeholder="작성자 명을 입력해 주세요."
              required
            />
          </div>
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>비밀번호</label>
              <span className={styles.requiredMark} aria-hidden>*</span>
            </div>
            <div className={styles.inputWithAction}>
              <input
                id="password"
                name="password"
                type="password"
                className={styles.input}
                placeholder="비밀번호를 입력해 주세요."
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.hr} aria-hidden="true" />

        {/* 제목 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="title" className={styles.label}>제목</label>
            <span className={styles.requiredMark} aria-hidden>*</span>
          </div>
          <input
            id="title"
            name="title"
            className={styles.input}
            placeholder="제목을 입력해 주세요."
            required
          />
        </div>

        <div className={styles.hr} aria-hidden="true" />

        {/* 내용 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="content" className={styles.label}>내용</label>
            <span className={styles.requiredMark} aria-hidden>*</span>
          </div>
          <textarea
            id="content"
            name="content"
            className={styles.textarea}
            placeholder="내용을 입력해 주세요."
            rows={12}
            required
          />
        </div>

        {/* 주소 섹션 */}
        <div className={styles.addressSection}>
          <div className={styles.rowZip}>
            <div className={styles.fieldNarrow}>
              <div className={styles.labelRow}>
                <label htmlFor="zipcode" className={styles.label}>주소</label>
              </div>
              <input
                id="zipcode"
                name="zipcode"
                className={styles.input}
                placeholder="01234"
                required
              />
            </div>
            <button type="button" className={`${styles.button} ${styles.secondary} ${styles.searchButton}`}>
              우편번호 검색
            </button>
          </div>

          <div className={styles.field}>
            <input
              id="address1"
              name="address1"
              className={styles.input}
              placeholder="주소를 입력해 주세요,"
              required
            />
          </div>
          <div className={styles.field}>
            <input
              id="address2"
              name="address2"
              className={styles.input}
              placeholder="상세주소"
            />
          </div>
        </div>

        <div className={styles.hr} aria-hidden="true" />

        {/* 유튜브 링크 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="youtube" className={styles.label}>유튜브 링크</label>
          </div>
          <input
            id="youtube"
            name="youtube"
            className={styles.input}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles.hr} aria-hidden="true" />

        {/* 사진 첨부 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label}>사진 첨부</label>
          </div>
          <div className={styles.imageGrid}>
            <button type="button" className={styles.imageTile} aria-label="클릭해서 사진 업로드">
              <img src="/icons/add.png" alt="추가" className={styles.addIcon} />
              <span className={styles.tileText}>클릭해서 사진 업로드</span>
            </button>
            <button type="button" className={styles.imageTile} aria-label="클릭해서 사진 업로드">
              <img src="/icons/add.png" alt="추가" className={styles.addIcon} />
              <span className={styles.tileText}>클릭해서 사진 업로드</span>
            </button>
            <button type="button" className={styles.imageTile} aria-label="클릭해서 사진 업로드">
              <img src="/icons/add.png" alt="추가" className={styles.addIcon} />
              <span className={styles.tileText}>클릭해서 사진 업로드</span>
            </button>
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className={styles.footer}>
          <button type="button" className={`${styles.button} ${styles.ghost}`}>
            취소
          </button>
          <button type="submit" className={`${styles.button} ${styles.primary}`}>
            등록하기
          </button>
        </div>
        </form>
      </div>

      <div className={styles.bottomGap} aria-hidden="true" />
    </section>
  );
}


