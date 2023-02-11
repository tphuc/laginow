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
import PageLayout from "@/components/layout/page-layout";
import * as Tabs from '@radix-ui/react-tabs';
import clsx from "clsx";
import UserDropdown from "@/components/layout/user-dropdown";
import BusinessOverview from "@/components/layout/business/overview";


let tabItemClsx = clsx(
    "relative",
    "transition-all",
    // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
    "px-3 py-1.5 whitespace-nowrap",
    "hover:bg-gray-100 text-slate-600 rounded-md",
    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:after:bg-indigo-700 data-active:text-indigo-700",
    "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)

export default function Page() {

    const { data: yourBusinesses, isLoading } = trpc.business.getAllByUser.useQuery({});
    const session = useSession().data as any

    return (
        <PageLayout>
            <Tabs.Root defaultValue="1" orientation="vertical">

                <Tabs.List className="px-5 py-1.5 sticky top-0 z-[1] flex overflow-x-scroll gap-1 bg-white border-b border-gray-200" aria-label="tabs example">
                    <Tabs.Trigger className={tabItemClsx} value="1">Tổng quan</Tabs.Trigger>
                    <Tabs.Trigger className={tabItemClsx} value="2">Thông tin trang</Tabs.Trigger>
                    <Tabs.Trigger className={tabItemClsx} value="3">Three</Tabs.Trigger>
                    <Tabs.Trigger className={tabItemClsx} value="4">Four</Tabs.Trigger>
                    <Tabs.Trigger className={tabItemClsx} value="5">Five</Tabs.Trigger>
                </Tabs.List>
                <div style={{ flex: 1 }} className="p-2">
                    <Tabs.Content className="flex" value="1">
                        <BusinessOverview></BusinessOverview>
                    </Tabs.Content>
                    <Tabs.Content className="flex" value="2">Tab two content</Tabs.Content>
                    <Tabs.Content className="flex" value="3">Tab three content</Tabs.Content>
                </div>
            </Tabs.Root>
        </PageLayout>
    );
}




