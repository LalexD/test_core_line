import NewsCard from "../../components/NewsCard/NewsCard";
import { useGetNewsQuery } from "../../store/newsApi";
import styles from "./NewsPage.module.css";
import { GroupedVirtuoso } from "react-virtuoso";
import { useMemo } from "react";
import { formatDate } from "../../utils/date";
import Spinner from "../../components/Spinner/Spinner";

const DEF_QUERY_NEWS = { year: 2025, month: 4 };

const NewsPage = () => {
  const { data, error, isLoading } = useGetNewsQuery(DEF_QUERY_NEWS);

  const { items, groupCounts, groupLabels } = useMemo(() => {
    const list = (data || []).slice();
    list.sort(
      (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
    );

    const counts: number[] = [];
    const labels: string[] = [];
    let currentLabel = "";
    let currentCount = 0;

    for (let i = 0; i < list.length; i++) {
      const labelGroup = `News for ${formatDate(list[i].pub_date)}`;
      if (i === 0) {
        currentLabel = labelGroup;
        currentCount = 1;
      } else if (labelGroup === currentLabel) {
        currentCount += 1;
      } else {
        counts.push(currentCount);
        labels.push(currentLabel);
        currentLabel = labelGroup;
        currentCount = 1;
      }
    }
    if (list.length > 0) {
      counts.push(currentCount);
      labels.push(currentLabel);
    }

    return { items: list, groupCounts: counts, groupLabels: labels };
  }, [data]);

  if (error) {
    return <>Ошибка загрузки данных</>;
  }

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <GroupedVirtuoso
          groupCounts={groupCounts}
          className={styles.virtuoso}
          groupContent={(index) => (
            <div className={styles.groupHeaderWrapper}>
              <div className={styles.groupHeader}>{groupLabels[index]}</div>
            </div>
          )}
          itemContent={(index) => {
            const item = items[index];
            const isLast = index === items.length - 1;
            return (
              <div
                className={styles.itemWrapper}
                key={`${item.web_url}-${index}`}
              >
                <div
                  className={styles.item}
                  style={isLast ? { borderBottom: "none" } : undefined}
                >
                  <NewsCard item={item} />
                </div>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default NewsPage;
