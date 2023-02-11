import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS, FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";

import { trpc } from '@/lib/trpc';
import ImageUploader from "@/components/shared/upload-image";
import { useSession } from "next-auth/react";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { AddBussiness } from "@/components/layout/add-business";
import Link from "next/link";

export default function Page() {

  const { data: session } = useSession()
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <Layout>
      <SignInModal />
      <div className="fixed top-0 h-screen w-full bg-gradient-to-br from-indigo-100 via-gray-50 to-cyan-150" />

      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="max-w-xl p-4 pt-24 xl:px-0 "
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >


          <motion.h1
            className="bg-gradient-to-br from-indigo-900 to-slate-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer> Kết nối thương hiệu của bạn  đến mọi người</Balancer>
          </motion.h1>
          <motion.p
            className="mt-3 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>
              Tạo hồ sơ kinh doanh của bạn trên Lagi Now miễn phí.
            </Balancer>
          </motion.p>

        </motion.div>
        <motion.div
          className="mx-auto z-10 mt-6 flex items-center justify-center space-x-5"
        >
          <Link
            href='/tao-trang'
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-display text-gray-600 shadow-md transition-colors hover:border-gray-800"
          >
            <p>Tạo hồ sơ ngay</p>
          </Link>
        </motion.div>
  
      </div>
      <br />



















    </Layout>
  );
}

