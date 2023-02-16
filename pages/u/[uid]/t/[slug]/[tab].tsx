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
import BusinessPageDecoration from "@/components/layout/business/business-page";
import { ReactNode } from "react";
import { useRouter } from "next/router";


let tabItemClsx = clsx(
    "relative",
    "transition-all",
    // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
    "px-3 py-1.5 whitespace-nowrap",
    "hover:bg-gray-100 text-slate-600 rounded-md",
    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:after:bg-indigo-700 data-active:text-indigo-700",
    "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)

const Page = () => {

    return (
        <div>
        <Tabs.Content value='/tong-quan'>
            <BusinessOverview />
        </Tabs.Content>
        <Tabs.Content value='/trang-tri'>
            <BusinessPageDecoration />
        </Tabs.Content>
        </div>

    );
}


Page.getLayout = (content: ReactNode) => {
    return <PageLayout>
        {content}
    </PageLayout>
}



export default Page