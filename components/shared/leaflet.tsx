import { useEffect, useRef, ReactNode, Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Portal } from "@radix-ui/react-portal";

export default function Leaflet({
  setShow,
  children,
  zIndex = 30,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  zIndex?: number
}) {
  const leafletRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };
  useEffect(() => {
    controls.start({
      y: 20,
      transition: transitionProps,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDragEnd(_: any, info: any) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const height = leafletRef.current?.getBoundingClientRect().height || 0;
    if (offset > height / 2 || velocity > 800) {
      await controls.start({ y: "100%", transition: transitionProps });
      setShow(false);
    } else {
      controls.start({ y: 0, transition: transitionProps });
    }
  }

  return (
    <Portal>
      <AnimatePresence>
        <motion.div
          key="leaflet-backdrop"
          className={`fixed inset-0 z-${zIndex - 10} bg-gray-100 bg-opacity-10 backdrop-blur`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
        />
        <motion.div
          ref={leafletRef}
          key="leaflet"
          className={`group fixed inset-x-0 bottom-0 z-${zIndex} w-screen cursor-grab bg-white pb-10 active:cursor-grabbing sm:hidden`}
          initial={{ y: "100%" }}
          animate={controls}
          exit={{ y: "100%" }}
          transition={transitionProps}
          drag="y"
          dragDirectionLock
          onDragEnd={handleDragEnd}
          dragElastic={{ top: 0, bottom: 1 }}
          dragConstraints={{ top: 0, bottom: 0 }}
        >
          <div
            className={`rounded-t-4xl flex h-7 w-full items-center justify-center border-t border-gray-200`}
          >
            <div className="-mr-1 h-1 w-6 rounded-full bg-gray-300 transition-all group-active:rotate-12" />
            <div className="h-1 w-6 rounded-full bg-gray-300 transition-all group-active:-rotate-12" />
          </div>
          {children}
        </motion.div>

      </AnimatePresence>
    </Portal>
  );
}
