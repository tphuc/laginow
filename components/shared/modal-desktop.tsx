import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ModalDesktop({
  children,
  showModal,
  setShowModal,
  zIndex = 20,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  zIndex?: number
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


  return (
    <AnimatePresence>
      {showModal && (

        <div className={`fixed inset-0 z-${zIndex} items-center h-[100vh] justify-center flex`}>
          {/* <FocusTrap focusTrapOptions={{ initialFocus: false }}> */}
          <motion.div
            key="desktop-backdrop"
            className={`absolute z-${zIndex} inset-0 bg-gray-100 bg-opacity-20 backdrop-blur`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeInOut'
            }}
            onMouseDown={(e) => {
              e.preventDefault()
              setShowModal(false)
            }}
          >

          </motion.div>
          <motion.div
            ref={desktopModalRef}
            key="desktop-modal"
            className={`relative flex z-${zIndex} items-center justify-center`}
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


        </div>
      )}


    </AnimatePresence>
  );
}
