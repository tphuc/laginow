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
}: {
    children: React.ReactNode;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
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
                <div className="fixed inset-0 z-30 items-center h-[100vh] justify-center flex">
                    {/* <FocusTrap focusTrapOptions={{ initialFocus: false }}> */}
                    
                    <motion.div
                        ref={desktopModalRef}
                        key="desktop-modal"
                        className="relative flex items-center justify-center z-50"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        onMouseDown={(e) => {
                            if (desktopModalRef.current === e.target) {
                                setShowModal(false);
                            }
                        }}
                    >
                        {children}
                    </motion.div>
                    <motion.div
                        key="desktop-backdrop"
                        className="fixed inset-0 z-30  bg-gray-100 bg-opacity-10 backdrop-blur"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                    >
                       
                    </motion.div>
                  
                </div>
            )}


        </AnimatePresence>
    );
}
