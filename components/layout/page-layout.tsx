import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import MenuDropdown from "./menu-dropdown";
import NavbarLinks from "./navbar-links";

export default function PageLayout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      <SignInModal />

      <div
        className={`w-full bg-white ${scrolled
            ? "border-b border-gray-200  backdrop-blur-xl"
            : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="flex h-16 px-5 items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="35"
              height="35"
              className="mr-2 rounded-sm"
            />
 
          </Link>
          <div className="gap-2 hidden sm:flex items-center">
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-display text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Đăng nhập
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>

          <div className="gap-2 flex sm:hidden">
            <MenuDropdown/>
          </div>
        </div>
      </div>
      {/* bg-gradient-to-br from-indigo-50 via-white to-cyan-100 */}
      <main className="w-full bg-gray-100 min-h-[100vh]">
        {children}
      </main>

    </>
  );
}
