import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import UserDropdown from "@/components/shared/user-dropdown";
import { useSignInModal } from "./sign-in-modal";
import Link from "next/link";
import NavbarLinks from "../layout/navbar-links";


export default function MenuDropdown() {
  const { data: session, status } = useSession();
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);
  const { SignInModal, setShowSignInModal } = useSignInModal();



  return (

    
    <motion.div
      className="relative inline-block text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <SignInModal />

      <Popover
        content={
          <div className="w-full rounded-md bg-white text-slate-900 p-2 sm:w-56">
            <div className="gap-2 flex flex-col sm:hidden">
              <NavbarLinks />

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

            </div>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-10 w-10 shadow-sm text-slate-500 items-center justify-center bg-white rounded-full p-1.5 overflow-hidden border border-gray-300 transition-all duration-75 outline-none ring-none active:scale-95"
        >
          <Menu />
        </button>
      </Popover>
    </motion.div>
  
  );
}
