"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setBadCount(board?.dislikeCount ?? 0);
    setGoodCount(board?.likeCount ?? 0);
  }, [board?.dislikeCount, board?.likeCount]);

  const [likeBoard] = useMutation<LikeBoardResponse, { boardId: string }>(LIKE_BOARD);
  const [dislikeBoard] = useMutation<DislikeBoardResponse, { boardId: string }>(DISLIKE_BOARD);

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
        <Image src="/icons/location.png" alt="location" width={24} height={24} />
      </div>

      {board?.images?.[0] && (
        <div className={styles.heroImageWrapper}>
          <Image
            src={board.images[0]?.startsWith('codecamp-file-storage/') ? `https://storage.googleapis.com/${board.images[0]}` : board.images[0]}
            alt="hero"
            width={400}
            height={531}
            className={styles.heroImage}
          />
        </div>
      )}

      <article className={styles.contentText}>
        {board?.contents ?? ''}
      </article>

      {board?.youtubeUrl && (
        <div className={styles.videoThumbnail}>
          <Image src="/images/youtube.png" alt="video thumbnail" width={822} height={464} className={styles.videoThumbnailImage} />
          <Image src="/icons/playbutton.png" alt="play" width={56} height={56} className={styles.videoPlayButton} />
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
        <button className={styles.outlineButton}>
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

