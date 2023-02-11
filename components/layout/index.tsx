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

export default function Layout({
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
        className={`fixed top-0 w-full bg-white ${scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/laginow.svg"
              alt="Precedent logo"
              width="120"
              height="60"
              className="mr-2 rounded-sm"
            />
 
          </Link>
          <div className="gap-2 hidden sm:flex items-center">
            <NavbarLinks/>
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
      <main className="w-full pt-5 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        {children}
      </main>

    </>
  );
}
