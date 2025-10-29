import Image from 'next/image';
import styles from './styles.module.css';

interface TripPostDetailProps {
  id: string;
}

export default function TripPostDetail({ }: TripPostDetailProps) {
  return (
    <div className={styles.detail}>
      <h1 className={styles.title}>
        살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
      </h1>

      <div className={styles.metaRow}>
        <div className={styles.profileArea}>
          <div className={styles.profileImage}>
            <Image src="/icons/s.png" alt="profile" width={24} height={24} />
          </div>
          <span className={styles.profileName}>홍길동</span>
        </div>
        <div className={styles.dateArea}>
          <span className={styles.dateText}>2024.11.11</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.iconRow}>
        <Image src="/icons/link.png" alt="link" width={24} height={24} />
        <Image src="/icons/location.png" alt="location" width={24} height={24} />
      </div>

      <div className={styles.heroImageWrapper}>
        <Image
          src="/images/Tranquil Beachside Serenity 1.png"
          alt="hero"
          width={400}
          height={531}
          className={styles.heroImage}
        />
      </div>

      <article className={styles.contentText}>
        {`살겠노라 살겠노라. 청산에 살겠노라.
머루랑 다래를 먹고 청산에 살겠노라.
얄리얄리 얄랑셩 얄라리 얄라

우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
너보다 시름 많은 나도 자고 일어나 우노라.
얄리얄리 얄라셩 얄라리 얄라

갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
얄리얄리 얄라셩 얄라리 얄라

이럭저럭 하여 낮일랑 지내 왔건만
올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
얄리얄리 얄라셩 얄라리 얄라

어디다 던지는 돌인가 누구를 맞히려던 돌인가.
미워할 이도 사랑할 이도 없이 맞아서 우노라.
얄리얄리 얄라셩 얄라리 얄라

살겠노라 살겠노라. 바다에 살겠노라.
나문재, 굴, 조개를 먹고 바다에 살겠노라.
얄리얄리 얄라셩 얄라리 얄라`}
      </article>

      <div className={styles.videoThumbnail}>
        <Image src="/images/youtube.png" alt="video thumbnail" width={822} height={464} className={styles.videoThumbnailImage} />
        <Image src="/icons/playbutton.png" alt="play" width={56} height={56} className={styles.videoPlayButton} />
      </div>

      <div className={styles.reactionsRow}>
        <div className={styles.badArea}>
          <Image src="/icons/bad.png" alt="bad" width={24} height={24} />
          <span className={styles.badCount}>24</span>
        </div>
        <div className={styles.goodArea}>
          <Image src="/icons/good.png" alt="good" width={24} height={24} />
          <span className={styles.goodCount}>12</span>
        </div>
      </div>

      <div className={styles.actionRow}>
        <button className={styles.outlineButton}>
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
          <li className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.commentProfileImage}>
                <Image src="/icons/s.png" alt="user" width={32} height={32} />
              </div>
              <div className={styles.commentMeta}>
                <div className={styles.commentTopRow}>
                  <span className={styles.commentName}>김코딩</span>
                </div>
                <div className={styles.commentStars}>
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star.png" alt="star" width={16} height={16} />
                </div>
              </div>
            </div>
            <p className={styles.commentText}>사진이 정말 멋져요! 다음 여행이 기대됩니다.
다음 일정도 공유해 주세요.
멋진 후기 기다릴게요!</p>
            <div className={styles.commentFooter}>
              <span className={styles.commentDateBottom}>2024.11.11</span>
            </div>
          </li>
          <div className={styles.commentSeparator} />
          <li className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.commentProfileImage}>
                <Image src="/icons/g.png" alt="user" width={32} height={32} />
              </div>
              <div className={styles.commentMeta}>
                <div className={styles.commentTopRow}>
                  <span className={styles.commentName}>이디자인</span>
                </div>
                <div className={styles.commentStars}>
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star.png" alt="star" width={16} height={16} />
                </div>
              </div>
            </div>
            <p className={styles.commentText}>정보가 자세해서 도움이 많이 되었어요. 감사합니다!
후속 글도 기대하고 있을게요.
유익한 정보 고마워요.</p>
            <div className={styles.commentFooter}>
              <span className={styles.commentDateBottom}>2024.11.09</span>
            </div>
          </li>
          <div className={styles.commentSeparator} />
          <li className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.commentProfileImage}>
                <Image src="/icons/person.png" alt="user" width={32} height={32} />
              </div>
              <div className={styles.commentMeta}>
                <div className={styles.commentTopRow}>
                  <span className={styles.commentName}>박여행</span>
                </div>
                <div className={styles.commentStars}>
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star_bright.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star.png" alt="star" width={16} height={16} />
                  <Image src="/icons/star.png" alt="star" width={16} height={16} />
                </div>
              </div>
            </div>
            <p className={styles.commentText}>사진과 글이 조화롭네요.
설명 덕분에 참고가 많이 됐어요.
좋은 하루 보내세요!</p>
            <div className={styles.commentFooter}>
              <span className={styles.commentDateBottom}>2024.11.07</span>
            </div>
          </li>
        </ul>
      </section>

      <div className={styles.bottomGap} />
    </div>
  );
}

