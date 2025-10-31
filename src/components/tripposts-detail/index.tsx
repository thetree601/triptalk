"use client";

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useMutation } from '@apollo/client/react';
import { useQuery } from '@apollo/client/react';
import { FETCH_BOARD } from '@/lib/graphql/queries/boards';
import type { Board } from '@/lib/apollo/client';
import { LIKE_BOARD, DISLIKE_BOARD, type LikeBoardResponse, type DislikeBoardResponse } from '@/lib/graphql/mutations/boards';
import { URL_PATHS } from '@/commons/constants/url';
import { useTripPostCommentCreate } from './hooks/index.comment.create.hook';
import { useQuery as useAqQuery } from '@apollo/client/react';
import { FETCH_BOARD_COMMENTS, type FetchBoardCommentsResponse } from '@/lib/graphql/queries/boardComments';
import { useTripPostCommentUpdateDelete } from './hooks/index.comment.update.delete.hook';

interface TripPostDetailProps {
  id: string;
}

export default function TripPostDetail({ id }: TripPostDetailProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery<{ fetchBoard: Board }>(FETCH_BOARD, { variables: { boardId: id }, fetchPolicy: 'cache-and-network' });
  const board = data?.fetchBoard;

  const [badCount, setBadCount] = useState<number>(0);
  const [goodCount, setGoodCount] = useState<number>(0);
  const [showAddressTooltip, setShowAddressTooltip] = useState<boolean>(false);
  const {
    writerRegister,
    passwordRegister,
    contentsRegister,
    errors,
    isSubmitting: isCommentSubmitting,
    contentsLength,
    rating,
    setRating,
    onSubmit: onSubmitComment,
  } = useTripPostCommentCreate(id);

  const { data: commentsData, refetch: refetchComments } = useAqQuery<FetchBoardCommentsResponse>(FETCH_BOARD_COMMENTS, { variables: { boardId: id, page: 1 } });
  const comments = commentsData?.fetchBoardComments ?? [];
  const { editState, errors: editErrors, startEdit, cancelEdit, setEditField, submitEdit, deleteComment, isMutating } = useTripPostCommentUpdateDelete(() => {
    refetchComments();
  });

  useEffect(() => {
    setBadCount(board?.dislikeCount ?? 0);
    setGoodCount(board?.likeCount ?? 0);
  }, [board?.dislikeCount, board?.likeCount]);

  const [likeBoard] = useMutation<LikeBoardResponse, { boardId: string }>(LIKE_BOARD);
  const [dislikeBoard] = useMutation<DislikeBoardResponse, { boardId: string }>(DISLIKE_BOARD);

  // YouTube helpers
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = useMemo(() => {
    const url = board?.youtubeUrl ?? '';
    if (!url) return '';
    try {
      // Match common YouTube URL formats
      const patterns = [
        /(?:v=)([a-zA-Z0-9_-]{11})/, // watch?v=
        /youtu\.be\/([a-zA-Z0-9_-]{11})/, // youtu.be/
        /embed\/([a-zA-Z0-9_-]{11})/, // embed/
      ];
      for (const re of patterns) {
        const m = url.match(re);
        if (m && m[1]) return m[1];
      }
      const u = new URL(url);
      const v = u.searchParams.get('v');
      if (v && v.length === 11) return v;
      return '';
    } catch {
      return '';
    }
  }, [board?.youtubeUrl]);

  if (loading) {
    return <div className={styles.detail}><p>로딩 중...</p></div>;
  }
  if (error) {
    return <div className={styles.detail}><p>오류가 발생했습니다.</p></div>;
  }

  return (
    <div className={styles.detail}>
      <h1 className={styles.title}>
        {board?.title ?? '제목 없음'}
      </h1>

      <div className={styles.metaRow}>
        <div className={styles.profileArea}>
          <div className={styles.profileImage}>
            <Image src="/icons/s.png" alt="profile" width={24} height={24} />
          </div>
          <span className={styles.profileName}>{board?.writer ?? '익명'}</span>
        </div>
        <div className={styles.dateArea}>
          <span className={styles.dateText}>{board?.createdAt ? new Date(board.createdAt).toLocaleDateString() : ''}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.iconRow}>
        <Image src="/icons/link.png" alt="link" width={24} height={24} />
        <div
          className={styles.iconWrapper}
          onMouseEnter={() => setShowAddressTooltip(true)}
          onMouseLeave={() => setShowAddressTooltip(false)}
        >
          <Image src="/icons/location.png" alt="location" width={24} height={24} />
          {showAddressTooltip && (board?.boardAddress?.address || board?.boardAddress?.zipcode || board?.boardAddress?.addressDetail) && (
            <div className={styles.addressTooltip} role="tooltip">
              {`${board?.boardAddress?.zipcode ? `(${board.boardAddress.zipcode}) ` : ''}${board?.boardAddress?.address ?? ''}${board?.boardAddress?.addressDetail ? ` ${board.boardAddress.addressDetail}` : ''}`.trim()}
            </div>
          )}
        </div>
      </div>

      {board?.images?.filter(Boolean)?.length ? (
        <div className={styles.heroImagesGrid}>
          {board.images.filter(Boolean).slice(0, 3).map((src, i) => {
            const url = src.startsWith('codecamp-file-storage/') ? `https://storage.googleapis.com/${src}` : src;
            return (
              <Image
                key={`hero-${i}`}
                src={url}
                alt={`hero-${i + 1}`}
                width={400}
                height={531}
                className={styles.heroImage}
              />
            );
          })}
        </div>
      ) : null}

      <article className={styles.contentText}>
        {board?.contents ?? ''}
      </article>

      {board?.youtubeUrl && videoId && (
        <div className={styles.videoThumbnail}>
          {!isPlaying ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="video thumbnail"
                className={styles.videoThumbnailImage}
              />
              <button
                type="button"
                aria-label="재생"
                className={styles.videoPlayButton}
                onClick={() => setIsPlaying(true)}
              >
                <Image src="/icons/playbutton.png" alt="play" width={56} height={56} />
              </button>
            </>
          ) : (
            <iframe
              className={styles.videoPlayer}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      )}

      <div className={styles.reactionsRow}>
        <button
          type="button"
          className={styles.badArea}
          onClick={async () => {
            setBadCount((c) => c + 1); // optimistic
            try {
              const res = await dislikeBoard({ variables: { boardId: id } });
              if (typeof res.data?.dislikeBoard === 'number') setBadCount(res.data.dislikeBoard);
            } catch {}
          }}
        >
          <Image src="/icons/bad.png" alt="bad" width={24} height={24} />
          <span className={styles.badCount}>{badCount}</span>
        </button>
        <button
          type="button"
          className={styles.goodArea}
          onClick={async () => {
            setGoodCount((c) => c + 1); // optimistic
            try {
              const res = await likeBoard({ variables: { boardId: id } });
              if (typeof res.data?.likeBoard === 'number') setGoodCount(res.data.likeBoard);
            } catch {}
          }}
        >
          <Image src="/icons/good.png" alt="good" width={24} height={24} />
          <span className={styles.goodCount}>{goodCount}</span>
        </button>
      </div>

      <div className={styles.actionRow}>
        <button className={styles.outlineButton} onClick={() => router.push(URL_PATHS.TRIPPOSTS)}>
          <Image src="/icons/menu.png" alt="list" width={20} height={20} />
          <span className={styles.outlineButtonText}>목록으로</span>
        </button>
        <button
          className={styles.outlineButton}
          onClick={() => router.push(`/tripposts/${id}/edit`, { scroll: true })}
        >
          <Image src="/icons/edit.png" alt="edit" width={20} height={20} />
          <span className={styles.outlineButtonText}>수정하기</span>
        </button>
      </div>

      <div className={styles.divider} />

      <section className={styles.commentsSection}>
        <div className={styles.commentsHeader}>
          <Image src="/icons/chat.png" alt="chat" width={24} height={24} />
          <h2 className={styles.commentsTitle}>댓글</h2>
        </div>
        <form onSubmit={onSubmitComment}>
          <div className={styles.ratingRow}>
            {[1,2,3,4,5].map((i) => (
              <Image
                key={i}
                src={i <= rating ? '/icons/star_bright.png' : '/icons/star.png'}
                alt="star"
                width={24}
                height={24}
                onClick={() => setRating(i)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>

          <div className={styles.commentFields}>
            <input {...writerRegister} className={styles.commentFieldInput} placeholder="작성자" />
            <input {...passwordRegister} type="password" className={styles.commentFieldInput} placeholder="비밀번호" />
          </div>
          {(errors.writer?.message || errors.password?.message) && (
            <div className={styles.commentError} role="alert">
              {(errors.writer?.message as string) || (errors.password?.message as string)}
            </div>
          )}

          <div className={styles.commentInputWrapper}>
            <textarea {...contentsRegister} className={styles.commentInput} placeholder="댓글을 입력해 주세요." maxLength={100} />
            <div className={styles.commentCount}>{contentsLength}/100</div>
          </div>
          {errors.contents?.message && (
            <div className={styles.commentError} role="alert">{errors.contents.message as string}</div>
          )}

          <div className={styles.commentActions}>
            <button className={styles.primaryButton} disabled={isCommentSubmitting}>댓글 등록</button>
          </div>
        </form>
        <ul className={styles.commentList}>
          {comments.map((c) => (
            <li key={c._id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentProfileImage}>
                  <Image src="/icons/person.png" alt="profile" width={32} height={32} />
                </div>
                <div className={styles.commentMeta}>
                  <div className={styles.commentTopRow}>
                    <div className={styles.commentTopLeft}>
                      <span className={styles.commentName}>{c.writer ?? '익명'}</span>
                      <div className={styles.commentStars}>
                        {[1,2,3,4,5].map((i) => (
                          <Image key={i} src={i <= Math.round(c.rating) ? '/icons/star_bright.png' : '/icons/star.png'} alt="star" width={24} height={24} />
                        ))}
                      </div>
                    </div>
                    <div className={styles.commentTopRight}>
                      <div className={styles.commentItemActions}>
                        <button type="button" className={styles.commentActionBtn} onClick={() => startEdit(c._id, { contents: c.contents, rating: Math.round(c.rating) })} aria-label="댓글 수정">
                          <Image src="/icons/edit.png" alt="edit" width={20} height={20} />
                        </button>
                        <button
                          type="button"
                          className={styles.commentActionBtn}
                          onClick={() => {
                            const pw = window.prompt('비밀번호를 입력해 주세요.');
                            if (pw != null) deleteComment(c._id, pw);
                          }}
                          aria-label="댓글 삭제"
                        >
                          <Image src="/icons/close.png" alt="delete" width={20} height={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* 날짜는 하단 한 줄만 노출 (상단 제거) */}
                </div>
              </div>
              {editState[c._id]?.isEditing ? (
                <div className={styles.commentEditForm}>
                  <div className={styles.commentEditGrid}>
                    <input className={styles.commentEditInput} value={c.writer ?? '익명'} disabled readOnly />
                    <input
                      className={styles.commentEditInput}
                      type="password"
                      placeholder="비밀번호"
                      value={editState[c._id]?.password ?? ''}
                      onChange={(e) => setEditField(c._id, { password: e.target.value })}
                    />
                  </div>
                  <textarea
                    className={styles.commentEditTextarea}
                    placeholder="내용"
                    value={editState[c._id]?.contents ?? ''}
                    onChange={(e) => setEditField(c._id, { contents: e.target.value })}
                  />
                  {editErrors[c._id] && (
                    <div className={styles.commentError} role="alert">{editErrors[c._id]}</div>
                  )}
                  <div className={styles.commentEditActions}>
                    <button type="button" className={styles.commentEditButtonGhost} onClick={() => cancelEdit(c._id)}>취소</button>
                    <button type="button" className={styles.commentEditButtonPrimary} disabled={isMutating} onClick={() => submitEdit(c._id)}>수정하기</button>
                  </div>
                </div>
              ) : (
                <div className={styles.commentText}>{c.contents}</div>
              )}
              <div className={styles.commentFooter}>
                <span className={styles.commentDateBottom}>{(() => { const d = new Date(c.createdAt); const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const day = String(d.getDate()).padStart(2,'0'); return `${y}.${m}.${day}`; })()}</span>
              </div>
              <div className={styles.commentSeparator} />
            </li>
          ))}
          {comments.length === 0 && (
            <li className={styles.noComments}>등록된 댓글이 없습니다.</li>
          )}
        </ul>
      </section>

      <div className={styles.bottomGap} />
    </div>
  );
}

