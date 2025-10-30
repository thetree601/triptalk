"use client";

import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import styles from './styles.module.css';
import { useTripPostNewForm } from './hooks/index.form.hook';

export default function TripPostsNew() {
  const {
    register,
    handleSubmit,
    formState,
    errors,
    onSubmit,
    isSubmitting,
    isPostcodeOpen,
    openPostcode,
    closePostcode,
    onPostcodeComplete,
    fileInputRef,
    previews,
    triggerFileSelect,
    onFilesSelected,
    removePreviewAt,
  } = useTripPostNewForm();

  return (
    <section className={styles.container} aria-labelledby="newPostHeading">
      <div className={styles.topGap} aria-hidden="true" />

      <div className={styles.frame}>
        <header className={styles.header}>
          <h1 id="newPostHeading">게시물 등록</h1>
        </header>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* 작성자 / 비밀번호 */}
        <div className={styles.rowTwoCols}>
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="author" className={styles.label}>작성자</label>
              <span className={styles.requiredMark} aria-hidden>*</span>
            </div>
            <input
              id="author"
              {...register('writer')}
              className={styles.input}
              placeholder="작성자 명을 입력해 주세요."
            />
            {errors.writer?.message && (
              <p className={styles.errorText} role="alert">{errors.writer.message as string}</p>
            )}
          </div>
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>비밀번호</label>
              <span className={styles.requiredMark} aria-hidden>*</span>
            </div>
            <div className={styles.inputWithAction}>
              <input
                id="password"
                {...register('password')}
                type="password"
                className={styles.input}
                placeholder="비밀번호를 입력해 주세요."
              />
            </div>
            {errors.password?.message && (
              <p className={styles.errorText} role="alert">{errors.password.message as string}</p>
            )}
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
            {...register('title')}
            className={styles.input}
            placeholder="제목을 입력해 주세요."
          />
          {errors.title?.message && (
            <p className={styles.errorText} role="alert">{errors.title.message as string}</p>
          )}
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
            {...register('contents')}
            className={styles.textarea}
            placeholder="내용을 입력해 주세요."
            rows={12}
          />
          {errors.contents?.message && (
            <p className={styles.errorText} role="alert">{errors.contents.message as string}</p>
          )}
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
                {...register('zipcode')}
                className={styles.input}
                placeholder="01234"
              />
            </div>
            <button type="button" onClick={openPostcode} className={`${styles.button} ${styles.secondary} ${styles.searchButton}`}>
              우편번호 검색
            </button>
          </div>

          <div className={styles.field}>
            <input
              id="address1"
              {...register('address1')}
              className={styles.input}
              placeholder="주소를 입력해 주세요,"
            />
          </div>
          <div className={styles.field}>
            <input
              id="address2"
              {...register('address2')}
              className={styles.input}
              placeholder="상세주소"
            />
          </div>
          {isPostcodeOpen && (
            <div className={styles.postcodeLayer} role="dialog" aria-modal="true">
              <div className={styles.postcodeBox}>
                <DaumPostcodeEmbed onComplete={(data) => onPostcodeComplete({ zonecode: data.zonecode, address: data.address })} />
                <button type="button" onClick={closePostcode} className={`${styles.button} ${styles.ghost}`}>닫기</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.hr} aria-hidden="true" />

        {/* 유튜브 링크 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="youtube" className={styles.label}>유튜브 링크</label>
          </div>
          <input
            id="youtube"
            {...register('youtube')}
            className={styles.input}
            placeholder="링크를 입력해 주세요."
          />
          {errors.youtube?.message && (
            <p className={styles.errorText} role="alert">{errors.youtube.message as string}</p>
          )}
        </div>

        <div className={styles.hr} aria-hidden="true" />

        {/* 사진 첨부 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label}>사진 첨부</label>
          </div>
          <div className={styles.imageGrid}>
            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFilesSelected(e.target.files)} />
            {[0,1,2].map((slotIdx) => {
              const src = previews[slotIdx];
              if (src) {
                return (
                  <div key={`preview-${slotIdx}`} className={styles.imageTile} aria-label={`업로드된 이미지 ${slotIdx + 1}`}>
                    <img src={src} alt="미리보기" className={styles.previewImg} />
                    <button type="button" onClick={() => removePreviewAt(slotIdx)} className={styles.removeBadge} aria-label="이미지 삭제">
                      ×
                    </button>
                  </div>
                );
              }
              return (
                <button key={`add-${slotIdx}`} type="button" onClick={() => triggerFileSelect(slotIdx)} className={styles.imageTile} aria-label="클릭해서 사진 업로드">
                  <img src="/icons/add.png" alt="추가" className={styles.addIcon} />
                  <span className={styles.tileText}>클릭해서 사진 업로드</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 푸터 버튼 */}
        <div className={styles.footer}>
          <button type="button" className={`${styles.button} ${styles.ghost}`}>
            취소
          </button>
          <button type="submit" disabled={!formState.isValid || isSubmitting} className={`${styles.button} ${styles.primary}`}>
            등록하기
          </button>
        </div>
        </form>
      </div>

      <div className={styles.bottomGap} aria-hidden="true" />
    </section>
  );
}


