"use client";
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { FETCH_BOARDS_OF_THE_BEST, FETCH_BOARDS, FETCH_BOARDS_COUNT, type FetchBoardsOfTheBestResponse, type FetchBoardsResponse, type FetchBoardsVariables } from '@/lib/graphql/queries/boards';
import type { Board } from '@/lib/apollo/client';
import { URL_UTILS } from '@/commons/constants/url';
import { useMemo, useState } from 'react';

// Hot Post 타입 정의
interface HotPost {
  id: string;
  title: string;
  writer: string;
  likeCount: number;
  date: string;
  imageUrl: string;
}

// Board Post 타입 정의
interface BoardPost {
  id: string;
  number: string;
  title: string;
  writer: string;
  date: string;
}

export default function TripPosts(): JSX.Element {
  // 날짜 포맷터
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  // 이미지 URL 정규화 (Next/Image 요구사항 충족)
  const normalizeImageUrl = (raw?: string) => {
    if (!raw) return '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png';
    if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
    if (raw.startsWith('/')) return raw;
    if (raw.startsWith('codecamp-file-storage/')) {
      return `https://storage.googleapis.com/${raw}`;
    }
    return '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png';
  };

  // GraphQL: 오늘 핫한 트립토크
  const { data: bestData } = useQuery<FetchBoardsOfTheBestResponse>(FETCH_BOARDS_OF_THE_BEST);
  const hotPosts: HotPost[] = (bestData?.fetchBoardsOfTheBest ?? []).map((b: Board) => ({
    id: b._id,
    title: b.title,
    writer: b.writer ?? (b.user?.name ?? ''),
    likeCount: b.likeCount ?? 0,
    date: formatDate(b.createdAt),
    imageUrl: normalizeImageUrl(Array.isArray(b.images) ? b.images[0] : undefined)
  }));

  // GraphQL: 게시판 목록 (기본 1페이지)
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 전체 개수 조회로 총 페이지 계산 (페이지당 10개 가정)
  const { data: countData } = useQuery<{ fetchBoardsCount: number }>(FETCH_BOARDS_COUNT);
  const totalPages = Math.max(1, Math.ceil((countData?.fetchBoardsCount ?? 0) / 10));
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const { data: boardsData, loading: boardsLoading } = useQuery<FetchBoardsResponse, FetchBoardsVariables>(
    FETCH_BOARDS,
    {
      variables: { page: currentPage },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  const boardPosts: BoardPost[] = useMemo(() => (
    (boardsData?.fetchBoards ?? []).map((b: Board, idx: number) => ({
      id: b._id,
      number: String(idx + 1),
      title: b.title,
      writer: b.writer ?? (b.user?.name ?? ''),
      date: formatDate(b.createdAt)
    }))
  ), [boardsData]);


  return (
    <>
    <div className={styles.container}>
      {/* 오늘 핫한 트립토크 섹션 */}
      <section className={styles.hotSection}>
        <h2 className={styles.hotTitle}>오늘 핫한 트립토크</h2>
        <div className={styles.hotCards}>
          {hotPosts.map((post) => (
            <div key={post.id} className={styles.hotCard}>
              <div className={styles.hotCardImage}>
                <Image 
                  src={post.imageUrl} 
                  alt={post.title}
                  fill
                  className={styles.hotImage}
                />
              </div>
              <div className={styles.hotCardContent}>
                <div className={styles.hotCardTop}>
                  <h3 className={styles.hotCardTitle}>{post.title}</h3>
                  <div className={styles.hotProfile}>
                    <div className={styles.hotProfileImage}>
                      <Image 
                        src={post.imageUrl} 
                        alt={post.writer}
                        width={24}
                        height={24}
                        className={styles.hotProfileImg}
                      />
                    </div>
                    <span className={styles.hotProfileName}>{post.writer}</span>
                  </div>
                </div>
                <div className={styles.hotCardBottom}>
                  <div className={styles.hotLikeArea}>
                    <Image 
                      src="/icons/good.png" 
                      alt="좋아요" 
                      width={24} 
                      height={24} 
                      className={styles.hotLikeIcon}
                    />
                    <span className={styles.hotLikeCount}>{post.likeCount}</span>
                  </div>
                  <span className={styles.hotDate}>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 트립토크 게시판 섹션 */}
      <section className={styles.boardSection}>
        <h2 className={styles.boardTitle}>트립토크 게시판</h2>
        
        {/* 검색 및 필터 영역 */}
        <div className={styles.searchArea}>
          <div className={styles.searchControls}>
            <div className={styles.searchLeft}>
              <div className={styles.datePicker}>
              <Image 
                src="/icons/calendar.png" 
                alt="달력" 
                width={24} 
                height={24} 
                className={styles.calendarIcon}
              />
              <div className={styles.dateInputs}>
                <div className={styles.dateInput}>
                  <span className={styles.datePlaceholder}>YYYY</span>
                  <span className={styles.dateDot}>.</span>
                  <span className={styles.datePlaceholder}>MM</span>
                  <span className={styles.dateDot}>.</span>
                  <span className={styles.datePlaceholder}>DD</span>
                </div>
                <span className={styles.dateDash}>-</span>
                <div className={styles.dateInput}>
                  <span className={styles.datePlaceholder}>YYYY</span>
                  <span className={styles.dateDot}>.</span>
                  <span className={styles.datePlaceholder}>MM</span>
                  <span className={styles.dateDot}>.</span>
                  <span className={styles.datePlaceholder}>DD</span>
                </div>
              </div>
              </div>

              <div className={styles.searchBar}>
              <Image 
                src="/icons/search.png" 
                alt="검색" 
                width={24} 
                height={24} 
                className={styles.searchIcon}
              />
              <input 
                type="text" 
                placeholder="제목을 검색해 주세요." 
                className={styles.searchInput}
              />
              </div>
              <button className={styles.searchButton}>
                <span className={styles.searchButtonText}>검색</span>
              </button>
            </div>
            
            <Link href="/tripposts/new" className={styles.registerButton}>
              <Image 
                src="/icons/write.png" 
                alt="등록" 
                width={24} 
                height={24} 
                className={styles.registerButtonIcon}
              />
              <span className={styles.registerButtonText}>트립토크 등록</span>
            </Link>
          </div>
        </div>

        {/* 게시판 테이블 */}
        <div className={styles.boardTable}>
          <div className={styles.boardInner}>
          <div className={styles.tableHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div className={styles.headerTitle}>제목</div>
            <div className={styles.headerWriter}>작성자</div>
            <div className={styles.headerDate}>날짜</div>
          </div>
          
          <div className={styles.tableBody}>
            {boardsLoading && (
              <div className={styles.tableRow}>
                <div className={styles.cellNumber}>-</div>
                <div className={styles.cellTitle}>로딩 중...</div>
                <div className={styles.cellWriter}></div>
                <div className={styles.cellDate}></div>
              </div>
            )}
            {!boardsLoading && boardPosts.map((post) => (
              <div key={post.id} className={styles.tableRow}>
                <Link href={URL_UTILS.createTripPostDetailPath(post.id)} className={styles.cellNumber}>
                  {post.number}
                </Link>
                <Link href={URL_UTILS.createTripPostDetailPath(post.id)} className={styles.cellTitle}>
                  {post.title}
                </Link>
                <Link href={URL_UTILS.createTripPostDetailPath(post.id)} className={styles.cellWriter}>
                  {post.writer}
                </Link>
                <Link href={URL_UTILS.createTripPostDetailPath(post.id)} className={styles.cellDate}>
                  {post.date}
                </Link>
              </div>
            ))}
          </div>
            {/* 페이지네이션 (박스 내부) */}
            <div className={styles.pagination}>
              <button
                className={`${styles.paginationButton} ${!canGoPrev ? styles.disabled : ''}`}
                aria-label="이전"
                aria-disabled={!canGoPrev}
                disabled={!canGoPrev}
                onClick={() => canGoPrev && setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <Image
                  src={canGoPrev ? '/icons/leftenable_outline_light_m.svg' : '/icons/leftdisabled_outline_light_m.svg'}
                  alt="이전"
                  width={24}
                  height={24}
                  className={styles.paginationIcon}
                />
              </button>
              
              <div className={styles.paginationNumbers}>
                {(() => {
                  const windowSize = 5;
                  const start = Math.floor((currentPage - 1) / windowSize) * windowSize + 1;
                  const end = Math.min(start + windowSize - 1, totalPages);
                  const pages = [] as number[];
                  for (let n = start; n <= end; n++) pages.push(n);
                  return pages;
                })().map((n) => (
                  <button
                    key={n}
                    className={`${styles.paginationNumber} ${currentPage === n ? styles.active : ''}`}
                    aria-current={currentPage === n ? 'page' : undefined}
                    onClick={() => setCurrentPage(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              
              <button
                className={`${styles.paginationButton} ${!canGoNext ? styles.disabled : ''}`}
                aria-label="다음"
                aria-disabled={!canGoNext}
                disabled={!canGoNext}
                onClick={() => canGoNext && setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <Image
                  src={canGoNext ? '/icons/rightenable_outline_light_m.svg' : '/icons/rightdisabled_outline_light_m.svg'}
                  alt="다음"
                  width={24}
                  height={24}
                  className={styles.paginationIcon}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    {/* 메인 페이지 하단 56px 갭 (컨테이너 밖에 위치해 gap 40과 누적되지 않도록 함) */}
    <div style={{ height: 56 }} aria-hidden="true" />
    </>
  );
}