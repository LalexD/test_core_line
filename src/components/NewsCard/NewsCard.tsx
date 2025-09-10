import { TNews } from "../../types/types";
import { formatDateAndTime } from "../../utils/date";
import styles from "./NewsCard.module.css";

interface IProps {
  item: TNews;
}

const NewsCard = ({ item }: IProps) => {
  return (
    <a
      href={item.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardLink}
    >
      <article className={styles.card}>
        <div className={styles.cardImageWrapper}>
          <img
            src={
              item.multimedia[0] ||
              `${process.env.PUBLIC_URL}/images/empty_img.png`
            }
            alt={item.abstract}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardInfoContainer}>
          <h2 className={styles.cardInfoTitle}>{item.source}</h2>
          <p className={styles.cardInfoText}>{item.abstract}</p>
          <time className={styles.cardInfoDate}>
            {formatDateAndTime(item.pub_date)}
          </time>
        </div>
      </article>
    </a>
  );
};

export default NewsCard;
