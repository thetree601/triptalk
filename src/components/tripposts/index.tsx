import styles from './styles.module.css';
import Image from 'next/image';

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
  // 핫한 트립토크 더미 데이터
  const hotPosts: HotPost[] = [
    {
      id: '1',
      title: '제주 살이 1일차 청산별곡이 생각나네요',
      writer: '홍길동',
      likeCount: 24,
      date: '2024.11.11',
      imageUrl: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png'
    },
    {
      id: '2',
      title: '길 걷고 있었는데 고양이한테 간택 받았어요',
      writer: '홍길동',
      likeCount: 24,
      date: '2024.11.11',
      imageUrl: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 2.png'
    },
    {
      id: '3',
      title: '강릉 여름바다 보기 좋네요 서핑하고 싶어요!',
      writer: '홍길동',
      likeCount: 24,
      date: '2024.11.11',
      imageUrl: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 3.png'
    },
    {
      id: '4',
      title: '누가 양양 핫하다고 했어 나밖에 없는데?',
      writer: '홍길동',
      likeCount: 24,
      date: '2024.11.11',
      imageUrl: '/images/Tranquil Beachfront with White Loungers and Orange Umbrellas 1.png'
    }
  ];

  // 게시판 더미 데이터
  const boardPosts: BoardPost[] = [
    { id: '1', number: '243', title: '제주 살이 1일차', writer: '홍길동', date: '2024.12.16' },
    { id: '2', number: '242', title: '강남 살이 100년차', writer: '홍길동', date: '2024.12.16' },
    { id: '3', number: '241', title: '길 걷고 있었는데 고양이한테 간택 받았어요', writer: '홍길동', date: '2024.12.16' },
    { id: '4', number: '240', title: '오늘 날씨 너무 좋아서 바다보러 왔어요~', writer: '홍길동', date: '2024.12.16' },
    { id: '5', number: '239', title: '누가 양양 핫하다고 했어 나밖에 없는데?', writer: '홍길동', date: '2024.12.16' },
    { id: '6', number: '238', title: '여름에 보드타고 싶은거 저밖에 없나요 🥲', writer: '홍길동', date: '2024.12.16' },
    { id: '7', number: '237', title: '사무실에서 과자 너무 많이 먹은거 같아요 다이어트하러 여행 가야겠어요', writer: '홍길동', date: '2024.12.16' },
    { id: '8', number: '236', title: '여기는 기승전 여행이네요 ㅋㅋㅋ', writer: '홍길동', date: '2024.12.16' },
    { id: '9', number: '235', title: '상여금 들어왔는데 이걸로 다낭갈까 사이판 갈까', writer: '홍길동', date: '2024.12.16' },
    { id: '10', number: '234', title: '강릉 여름바다 보기 좋네요', writer: '홍길동', date: '2024.12.16' }
  ];

  // 페이지네이션 상태 (데모용)
  const totalPages = 5;
  const currentPage = 1;
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

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
            
            <button className={styles.registerButton}>
              <Image 
                src="/icons/write.png" 
                alt="등록" 
                width={24} 
                height={24} 
                className={styles.registerButtonIcon}
              />
              <span className={styles.registerButtonText}>트립토크 등록</span>
            </button>
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
            {boardPosts.map((post) => (
              <div key={post.id} className={styles.tableRow}>
                <div className={styles.cellNumber}>{post.number}</div>
                <div className={styles.cellTitle}>{post.title}</div>
                <div className={styles.cellWriter}>{post.writer}</div>
                <div className={styles.cellDate}>{post.date}</div>
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
                <button className={`${styles.paginationNumber} ${styles.active}`}>1</button>
                <button className={styles.paginationNumber}>2</button>
                <button className={styles.paginationNumber}>3</button>
                <button className={styles.paginationNumber}>4</button>
                <button className={styles.paginationNumber}>5</button>
              </div>
              
              <button
                className={`${styles.paginationButton} ${!canGoNext ? styles.disabled : ''}`}
                aria-label="다음"
                aria-disabled={!canGoNext}
                disabled={!canGoNext}
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