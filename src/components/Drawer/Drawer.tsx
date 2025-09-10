import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./Drawer.module.css";
import { createPortal } from "react-dom";
import CloseIcon from "../icons/CloseIcon";

type DrawerContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within Drawer.Root");
  }
  return context;
}

type DrawerRootProps = {
  children: ReactNode;
};

const DrawerRoot = ({ children }: DrawerRootProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

type DrawerTriggerProps = {
  children: ReactNode;
  className?: string;
};

const DrawerTrigger = ({ children, className }: DrawerTriggerProps) => {
  const { setOpen } = useDrawer();
  return (
    <button
      className={`${styles.clearButton} ${className}`}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

type DrawerContentProps = {
  children: ReactNode;
};

const DrawerContent = ({ children }: DrawerContentProps) => {
  const { open, setOpen } = useDrawer();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  const closeDrawer = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  if (!isMounted) return null;

  return createPortal(
    open && (
      <div
        className={`${styles.overlay} ${
          isVisible ? styles.overlayOpen : styles.overlayClosing
        }`}
        onClick={closeDrawer}
      >
        <div
          className={`${styles.drawer} ${
            isVisible ? styles.drawerOpen : styles.drawerClosing
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={closeDrawer}>
            <CloseIcon />
          </button>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    ),
    document.body
  );
};

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
};
