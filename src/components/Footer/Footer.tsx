import styles from "./Footer.module.css";

const links = [
  { label: "Log In", href: "/" },
  { label: "About Us", href: "/" },
  { label: "Publishers", href: "/" },
  { label: "Sitemap", href: "/" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className={styles.powered_container}>
        <span>Powered by</span>
        <img src="/images/news_api.png" alt="News API logo" />
      </div>
      <span>© 2023 Besider. Inspired by Insider</span>
    </footer>
  );
};

export default Footer;
