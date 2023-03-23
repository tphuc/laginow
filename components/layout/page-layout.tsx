import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "../shared/sign-in-modal";
import UserDropdown from "@/components/shared/user-dropdown";
import MenuDropdown from "../shared/menu-dropdown";
import clsx from "clsx";
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from "next/router";
import { cn, getPosition } from "@/lib/utils";

let tabItemClsx = cn(
  "relative",
  "transition-all",
  // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
  "px-3 py-1.5 whitespace-nowrap",
  "hover:bg-gray-100 text-slate-600 rounded-md",
  "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:after:bg-indigo-700 data-active:text-indigo-700",
  "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)


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
  const router = useRouter();


  const urlPath = '/u/123/t/my-slug/tab-123/other/segments';
  const regexPattern = /(\/\u\/[^\/]+\/t\/[^\/]+\/)([^\/]+)(\/[^\/]+)?/g;
  const match = regexPattern.exec(router.asPath)
  const tab = match?.[2]

  const parentPath = match?.[1]
  console.log(parentPath, match)
  // const tab = router?.asPath?.slice(getPosition(router.asPath, '/', 5), router?.asPath?.length)

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
          <Link href="/" className="flex items-center  text-2xl">
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
            <MenuDropdown />
          </div>
        </div>
      </div>
      {/* bg-gradient-to-br from-indigo-50 via-white to-cyan-100 */}
      <main className="w-full bg-gray-100 min-h-[100vh]">
        <Tabs.Root value={tab} orientation="vertical">

          <Tabs.List className="px-5 py-1.5 sticky top-0 z-[1] flex overflow-x-scroll gap-1 bg-white border-b border-gray-200" aria-label="tabs example">
            <Link href={parentPath + 'tong-quan'}>
              <Tabs.Trigger className={tabItemClsx} value="tong-quan">Tổng quan</Tabs.Trigger>
            </Link>
            <Link href={parentPath + 'thong-tin'}>
              <Tabs.Trigger className={tabItemClsx} value="thong-tin">Thông tin</Tabs.Trigger>
            </Link>

          </Tabs.List>
          <div style={{ flex: 1 }} >
            {children}
          </div>
        </Tabs.Root>

      </main>

    </>
  );
}
