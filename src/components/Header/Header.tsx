import { Drawer } from "../Drawer/Drawer";
import MenuIcon from "../icons/MenuIcon";
import styles from "./Header.module.css";

interface IProps {
  title: string;
}

const menuItems: { label: string; href: string }[] = [
  { label: "SCIENCE", href: "/" },
  { label: "GENERAL", href: "/" },
  { label: "ENTERTAINMENT", href: "/" },
  { label: "TECHNOLOGY", href: "/" },
  { label: "BUSINESS", href: "/" },
  { label: "HEALTH", href: "/" },
  { label: "SPORTS", href: "/" },
];

const Header = ({ title }: IProps) => {
  return (
    <header className={styles.header}>
      <Drawer.Root>
        <Drawer.Trigger className={styles.headerMenuButton}>
          <MenuIcon />
        </Drawer.Trigger>
        <Drawer.Content>
          <div className={styles.menuListWrapper}>
            <ul className={styles.menuList}>
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </Drawer.Content>
      </Drawer.Root>

      <h1 className={styles.headerTittle}>{title}</h1>
    </header>
  );
};

export default Header;
