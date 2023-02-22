import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import Link from "next/link";
import { Portal } from "@radix-ui/react-popover";


export default function UserDropdown() {
  const session = useSession().data as any;

  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
   
    <motion.div
    data-boundary="viewport"
      className="relative inline-block text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      
      <Popover
        content={

          <div data-boundary="viewport" className="w-full z-10 rounded-md bg-white text-indigo-900 p-2 sm:w-56">
            <Link
              href={`/u/${session?.user?.id}/t`}
              className="relative outline-none flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-md font-medium">Trang quản lí</p>
            </Link>

           

            {/* <button
              className="relative outline-none flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut({ redirect: false })}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-md font-medium">Đăng xuất</p>
            </button> */}
          </div>

        }
        align="end"
        
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex border border-gray-300 border-1 h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 outline-none ring-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
    
      </Popover>
      
    </motion.div>

  );
}
