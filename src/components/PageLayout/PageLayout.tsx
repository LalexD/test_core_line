import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./PageLayout.module.css";

interface IProps {
  children: ReactNode;
}

const PageLayout = ({ children }: IProps) => {
  return (
    <div className={styles.pageContainerWrapper}>
      <div className={styles.pageContainer}>
        <Header title="BESIDER" />
        <div className={styles.pageContent}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
