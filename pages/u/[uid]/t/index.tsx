import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS, FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { trpc } from '@/lib/trpc';
import Link from "next/link";
import { ArrowRightCircle, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/shared/icons";

export default function Page() {

    const { data: yourBusinesses, isLoading } = trpc.business.getAllByUser.useQuery({});
    const session = useSession().data as any

    return (
        <Layout>
            <div className="flex flex-col min-h-[100vh] items-center justify-center">
                <motion.div
                    className="max-w-xl xl:px-0 "
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

                    <motion.p
                        className="mb-3 text-center text-2xl text-indigo-900 md:text-3xl"
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                    >
                        Trang của bạn
                    </motion.p>

                </motion.div>
                <br />
                <div className="flex flex-col items-center gap-1 min-w-[300px]">
                    {isLoading && <LoadingSpinner />}
                    {yourBusinesses?.length === 0 && <p className="text-slate-500">Chưa có trang nào, hãy tạo trang mới</p>}
                    {yourBusinesses?.map((item, id) => <div key={item?.id}
                        className="flex items-center transition ease-in-out relative p-2 w-full bg-white rounded-lg border border border-gray-300 overflow-hidden hover:shadow-md">
                        <Image
                            src="/logo-lagi.png"
                            alt="Precedent logo"
                            width="45"
                            height="45"
                            className="mr-2 rounded-full border border-gray"
                        />
                        <div className="ml-1 flex-1">
                            <p className="font-medium text-indigo-900">{item?.title}</p>
                        </div>
                        <Link href={`/u/${session.user?.id}/t/${item?.slug}`}>
                        <div className="bg-indigo-900 cursor-pointer flex gap-1 items-center text-white shadow-md text-gray-500 rounded-2xl  px-3 py-1"  >
                            <span>chọn</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </div>
                        </Link>
                    </div>)}
                </div>
                <motion.div
                    className="mx-auto z-10 mt-6 flex items-center justify-center space-x-5"
                >
                    <Link
                        href='/tao-trang'
                        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-display text-gray-600 shadow-md transition-colors hover:border-gray-800"
                    >
                        <p>Tạo trang</p>
                        <Plus />

                    </Link>
                </motion.div>

            </div>
            <br />

        </Layout>
    );
}




