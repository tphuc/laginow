import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import Leaflet from "./leaflet";
import useWindowSize from "@/lib/hooks/use-window-size";

export default function Modal({
  children,
  showModal,
  setShowModal,
  zIndex = 20
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  zIndex?: number;
}) {
  const desktopModalRef = useRef(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const { isMobile, isDesktop } = useWindowSize();

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && <Leaflet zIndex={zIndex} setShow={setShowModal}>{children}</Leaflet>}
          {isDesktop && (
            <><motion.div
              key="desktop-backdrop"
              className={`fixed inset-0 z-${zIndex} bg-gray-100 bg-opacity-10 backdrop-blur`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: 'easeInOut'
              }}
              onClick={() => setShowModal(false)}
            />
              <FocusTrap focusTrapOptions={{ initialFocus: false }}>
                <motion.div
                  ref={desktopModalRef}
                  key="desktop-modal"
                  className={`fixed inset-0 z-${zIndex} hidden min-h-screen items-center justify-center md:flex`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  transition={{
                    ease: 'easeInOut'
                  }}
                  onMouseDown={(e) => {
                    if (desktopModalRef.current === e.target) {
                      setShowModal(false);
                    }
                  }}
                >
                  {children}
                </motion.div>
              </FocusTrap>

            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
