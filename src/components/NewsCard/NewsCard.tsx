import { TNews } from "../../types/types";
import styles from "./NewsCard.module.css";

interface IProps {
  item: TNews;
}

const NewsCard = ({ item }: IProps) => {
  return (
    <article className={styles.card}>
      <img
        //src={item.multimedia[0]}
        src={""}
        alt="Preview news"
        className={styles.cardImage}
      />
      <div className={styles.cardInfoContainer}>
        <h2 className={styles.cardInfoTitle}>{item.abstract}</h2>
        <p className={styles.cardInfoText}>{item.abstract}</p>
        <time className={styles.cardInfoDate}>{item.pub_date}</time>
      </div>
    </article>
  );
};

export default NewsCard;
