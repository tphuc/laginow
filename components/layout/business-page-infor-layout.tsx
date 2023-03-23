
import { ArrowUpRight, CalendarPlus, Check, ChevronDown, Clock, Clock11, Cross, Eye, FileImage, FlagTriangleRight, Gem, Grid, Image, ImagePlus, Layout, LayoutGrid, Link2, LucideGrid, Map, MessageSquare, MonitorSpeaker, Share, Star, X } from "lucide-react"
import * as Tabs from '@radix-ui/react-tabs';
import { blue, violet } from "@radix-ui/colors";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";
import { cn } from "@/lib/utils";




let tabItemClsx = cn(
    "relative",
    "transition-all w-full flex items-center gap-2 text-left",
    // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
    "px-4 py-2 whitespace-nowrap text-md",
    "hover:bg-gray-100 text-gray-600 font-revert rounded-md",
    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:text-indigo-800 data-active:bg-gray-100",
    "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)

let accordionPrimitveItemClsx = "bg-gray-100 text-indigo-700 overflow-hidden border border-gray-200 rounded-md focus-within:ring focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-none w-full"
let accordionPrimitiveTriggerClsx = cn(
    "group",
    "radix-state-open:rounded-t-md radix-state-closed:rounded-t-md",
    "focus:outline-none",
    "inline-flex w-full items-center text-indigo-700 justify-between px-4 py-2 text-left"
)

const BusinessPageInforlayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const parentPath = router.pathname === '/u/[uid]/t/[slug]/thong-tin' ? router.asPath : router.asPath.slice(0, router.asPath.lastIndexOf('/'))

    const regexPattern = /\/\u\/[^\/]+\/t\/[^\/]+\/([^\/]+)(\/[^\/]+)?/g;
    const match = regexPattern.exec(router.asPath)
    const tab = match?.[2] ?? ''

    return (
        <PageLayout>
            <main className="flex flex-col bg-white items-center justify-center" >
                <div className="p-8 w-full text-left border-b border-gray-200">
                    <h1 className="text-3xl text-gray-700">Thông tin trang</h1>
                </div>

                <Tabs.Root value={tab} className="flex min-h-[100vh] w-full pt-10 max-w-screen-xl" orientation="vertical">
                    <Tabs.List className="flex p-4 w-full sm:w-[300px] flex-col gap-1" aria-label="tabs example">
                        <Link href={parentPath + '/'}>
                            <Tabs.Trigger className={tabItemClsx} value="">Thông tin chung</Tabs.Trigger>
                        </Link>
                        <Link href={parentPath + '/hinh-anh'}>
                            <Tabs.Trigger className={tabItemClsx} value="/hinh-anh"> Hình ảnh</Tabs.Trigger>
                        </Link>

                        <Link href={parentPath + '/san-pham-dich-vu'}>
                            <Tabs.Trigger className={tabItemClsx} value="/san-pham-dich-vu">Sản phẩm và dịch vụ</Tabs.Trigger>
                        </Link>


                    </Tabs.List>
                    <div style={{ flex: 1 }} >
                        {children}
                    </div>
                </Tabs.Root>

            </main>
        </PageLayout>
    )







}

// BusinessPageInforlayout.getLayout = (content: ReactNode) => {
//     return <PageLayout>
//         {content}
//     </PageLayout>
// }


export default BusinessPageInforlayout;