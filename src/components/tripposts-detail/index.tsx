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
        <div className={styles.ratingRow}>
          <Image src="/icons/star.png" alt="star" width={24} height={24} />
          <Image src="/icons/star.png" alt="star" width={24} height={24} />
          <Image src="/icons/star.png" alt="star" width={24} height={24} />
          <Image src="/icons/star.png" alt="star" width={24} height={24} />
          <Image src="/icons/star.png" alt="star" width={24} height={24} />
        </div>
        <div className={styles.commentInputWrapper}>
          <textarea className={styles.commentInput} placeholder="댓글을 입력해 주세요." maxLength={100} />
          <div className={styles.commentCount}>0/100</div>
        </div>
        <div className={styles.commentActions}>
          <button className={styles.primaryButton}>댓글 등록</button>
        </div>
        <ul className={styles.commentList}>
          {/* 실제 댓글 데이터가 있을 때만 목록을 렌더링합니다. 현재는 비워둡니다. */}
        </ul>
      </section>

      <div className={styles.bottomGap} />
    </div>
  );
}

