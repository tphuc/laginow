import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { useSession } from "next-auth/react";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import React, { ReactNode } from "react";
import Layout2 from "@/components/layout/layout2";
import { useRouter } from "next/router";
import { trpc } from "@/lib/trpc";
import Image from "next/image";
import Link from "next/link";
import { Clock, Grid, Link2, LucideStar, Star, View } from "lucide-react";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import prisma from '@/lib/prisma';
import { appRouter } from '@/server/routers/_app';
import SuperJSON from 'superjson';
import { createContext } from '@/server/context';
import { useModalViewPhotos } from '@/components/layout/view-photos';
import clsx from 'clsx';
import { WorkingHours } from '@/components/working-hrs';
import { Bussiness } from '@prisma/client';
import StarFilled from '@/components/shared/icons/star-filled';
import CommmentItem from '@/components/layout/comment-item';


const weekDays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    let trpcState = props.trpcState as any
    const data: Bussiness = trpcState.json?.queries[0]?.state?.data as any

    let slug = props.slug as string
    // const { data, isLoading } = trpc.business.getBySlug.useQuery({ slug })
    const { data: session } = useSession()
    let images = data?.images as { url: string, fileId: string }[]

    const { setShow, ViewPhotos } = useModalViewPhotos(images)

    const isOpening = React.useCallback(() => {
        if (!data?.workingHrs) {
            return null
        }

        let workingHours = data?.workingHrs as any;

        let day: keyof any = new Date().getDay() as any
        let workingHrToday = workingHours[day]

        let currentHr = new Date().getHours()
        if (workingHrToday.isOpen24Hours) {
            return true
        }

        if (workingHrToday.openingHour < workingHrToday.closingHour) {
            if (workingHrToday.openingHour <= currentHr && currentHr <= workingHrToday.closingHour) {
                return true
            }
            else {
                return false
            }
        }
        else {
            if (workingHrToday.openingHour >= currentHr && currentHr >= workingHrToday.closingHour) {
                return true
            }
            else {
                return false
            }
        }
    }, [data?.workingHrs])

    const getOpeningHr = React.useCallback(() => {
        if (!data?.workingHrs) {
            return null
        }
        let workingHours = data?.workingHrs as any;

        let day: keyof any = new Date().getDay() as any

        let workingHrToday: {
            isOpen24Hours: boolean;
            openingHour: number;
            closingHour: number;
        } = workingHours[day]


        return {
            isOpen24Hours: workingHrToday.isOpen24Hours,
            openingHour: `${workingHrToday.openingHour}` + (workingHrToday.openingHour <= 12 ? 'AM' : 'PM'),
            closingHour: `${workingHrToday.closingHour}` + (workingHrToday.closingHour <= 12 ? 'AM' : 'PM'),
        }
    }, [data?.workingHrs])


    const renderWorkingHrs = React.useCallback(() => {

        let workingHrs = data?.workingHrs as WorkingHours

        return Object.keys(workingHrs)?.map((_day: string) => {
            let day: keyof WorkingHours = _day as any

            let dayWorkHrs = workingHrs[day]

            return <div className='justify-between flex items-center' key={day}>
                <span className='text-md font-display'>{weekDays?.[day as any]}</span>
                <span className='text-md text-slate-700 font-display'>{`${dayWorkHrs.openingHour}:00`} - {`${dayWorkHrs.closingHour}:00`} </span>
            </div>
        })
    }, [data?.workingHrs])


    return (
        <>
            <ViewPhotos />
            <div className="flex flex-col items-center">
                <div className="w-full relative min-w-[300px] border border-gray-200 overflow-hidden ">
                    <div className="relative bg-white bg-gray-100  flex  w-full  h-36 sm:h-48 md:h-72 lg:h-80 ">
                        {images?.slice(0, 5)?.map((item: { url: string }, id: number) =>
                            <Image
                                key={id}
                                alt=''
                                src={item.url}
                                width={400}
                                height={400}
                                style={{
                                    width: 'auto',
                                    height: '100%',

                                }}
                                className="object-cover"
                                loading="lazy"
                            />

                        )}

                        {images?.length && <div onClick={() => setShow(true)} className={clsx(`absolute z-10 top-5 left-[4%] cursor-pointer font-md items-center gap-1`,
                            "cursor-pointerz-1 flex items-center px-2 border border-white  py-1 bg-slate-700/40 text-white  rounded-md")}>
                            xem {images?.length} ảnh
                            <Grid size={22} />
                        </div>}


                        <div className="absolute w-full h-full" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.01),rgba(0,0,0,0.05), rgba(0,0,0,0.2),  rgba(0,0,0,0.3)) " }}></div>

                        <div className="absolute text-white bottom-[4%] left-[4%]">
                            <h1 className="text-white font-display md:text-4xl text-2xl">{data?.title}</h1>
                            <div className="flex items-center gap-1">
                                <Clock size={16} /> {(!isOpening() && isOpening() != null) ? <span className="text-red-400">Đã đóng</span> : <span className="text-green-400"> Đang mở</span>}
                                <div className="bg-gray-400/30 rounded-full cursor-default p-0.5 px-2">{getOpeningHr()?.openingHour}-{getOpeningHr()?.closingHour}</div>
                            </div>
                        </div>
                    </div>



                    <div className="flex flex-row gap-2  items-center w-full py-3 px-[4%] ">
                        <div className="bg-indigo-900 hover:bg-indigo-800 transition-all text-white cursor-pointer inline-flex gap-2 items-center shadow-md px-3 py-1.5  rounded-md" > Đánh giá <Star size={16} /> </div>
                        <div className="cursor-pointer hover:text-indigo-800 inline-flex border border-gray-300 gap-2 bg-white items-center shadow-sm px-3 py-1.5  rounded-md" > Chia sẻ <Link2 /> </div>

                    </div>
                </div>
                <div className='w-full py-4 px-[4%] text-gray-900 flex flex-row flex-wrap'>
                    <div style={{ flex: 2 }} className='relative min-w-[300px]'>
                        <h1 className='text-xl font-bold'>Menu</h1>
                        <br />
                        <h1 className='text-xl font-bold mb-1'>Giờ hoạt động</h1>
                        <div className='relative flex'>
                            <div className='relative w-full sm:max-w-[300px] rounded-md '>
                                {renderWorkingHrs()}
                            </div>
                        </div>
                        <br />
                        <h1 className='text-xl font-bold mb-1'> Đánh giá </h1>
                        <div className='flex flex-row gap-4 flex-wrap'>
                            <div className='flex-1 text-indigo-900'>
                                <h1 className='text-3xl'>4.7</h1>
                                <span className='flex flex-row text-indigo-900'> 
                                {[1,2,3,4,5]?.map(i => <StarFilled key={i} width={24} height={24} />)}
                                </span>
                                <span className='text-gray-600'>40 đánh giá</span>
                            </div>
                            <div className="w-full flex flex-col min-w-[280px] md:w-2/3">

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-indigo-900 gap-1 text-md">5 <StarFilled width={16} height={16} /></span>
                                    <span className="text-sm text-indigo-800 font-medium">25%</span>
                                </div>
                                <div className="w-full bg-indigo-100 h-1 mb-3">
                                    <div className="bg-indigo-800 h-1 rounded" style={{ width: '75%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-indigo-800 gap-1 text-md">4 <StarFilled width={16} height={16} /></span>
                                    <span className="text-sm text-indigo-800 font-medium">25%</span>
                                </div>
                                <div className="w-full bg-indigo-100 h-1 mb-3">
                                    <div className="bg-indigo-700 h-1 rounded" style={{ width: '55%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-indigo-700 gap-1 text-md">3 <StarFilled width={16} height={16} /></span>
                                    <span className="text-sm text-indigo-800 font-medium">25%</span>
                                </div>
                                <div className="w-full bg-indigo-100 h-1 mb-3">
                                    <div className="bg-indigo-600 h-1 rounded" style={{ width: '35%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-indigo-700 gap-1 text-md">2 <StarFilled width={16} height={16} /></span>
                                    <span className="text-sm text-indigo-800 font-medium">25%</span>
                                </div>
                                <div className="w-full bg-indigo-100 h-1 mb-3">
                                    <div className="bg-indigo-500 h-1 rounded" style={{ width: '55%' }}></div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-indigo-700 gap-1 text-md">1 <StarFilled width={16} height={16} /></span>
                                    <span className="text-sm text-indigo-800 font-medium">25%</span>
                                </div>
                                <div className="w-full bg-indigo-100 h-1 mb-3">
                                    <div className="bg-indigo-300 h-1 rounded" style={{ width: '55%' }}></div>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <h1 className='text-xl font-bold mb-1'> Binh luan </h1>
                        <CommmentItem/>

                        <br/>

                    </div>

                    <div style={{ flex: 1 }} className='px-[4%] min-w-[300px]'>
                        {data?.address && <iframe
                            title="map"
                            width="100%"
                            height={200}
                            className="border border-stone-300 rounded-sm my-2"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(data?.address)}`}
                            onLoad={() => { }}
                            allowFullScreen
                        />}
                    </div>

                    <div>

                    </div>
                </div>



            </div>
        </>
    );
}


Page.getLayout = (content: ReactNode) => {
    return <Layout2>
        {content}
    </Layout2>
}




export const getStaticPaths: GetStaticPaths = async () => {
    const business = await prisma?.bussiness.findMany();
    return {

        paths: business.map((item) => ({
            params: {
                slug: item.slug,
            },
        })),
        // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
        fallback: 'blocking',
    };
};

export async function getStaticProps(
    context: GetStaticPropsContext<{ slug: string }>,
) {

    const ssg = await createProxySSGHelpers({
        router: appRouter,
        ctx: await createContext(context as any),
        transformer: SuperJSON, // optional - adds superjson serialization
    });

    const slug = context.params?.slug as string;
    // prefetch `post.byId`
    await ssg.business.getBySlug.prefetch({ slug });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            slug,
        },
        revalidate: 1,
    };
}



export default Page;