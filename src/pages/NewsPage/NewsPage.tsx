import NewsCard from "../../components/NewsCard/NewsCard";
import { useGetNewsQuery } from "../../store/newsApi";
import styles from "./NewsPage.module.css";

const DEF_QUERY_NEWS = { year: 2025, month: 4 };

const NewsPage = () => {
  const { data, error, isLoading } = useGetNewsQuery(DEF_QUERY_NEWS);

  const newsList = data?.slice(0, 50) || [];

  return (
    <>
      {isLoading && "Loading..."}
      {newsList && (
        <ul className={styles.newsList}>
          {newsList.map((item) => (
            <li key={item.source}>
              <NewsCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NewsPage;
