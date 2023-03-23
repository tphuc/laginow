import clsx from "clsx"

import { CalendarPlus, Check, Cross, Eye, FlagTriangleRight, Gem, ImagePlus, MessageSquare, MonitorSpeaker, Star, X } from "lucide-react"
import dynamic from "next/dynamic";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { blue, indigo, violet } from "@radix-ui/colors";
import PageLayout from "@/components/layout/page-layout";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['1/2', '2/2', '3/2', '4/2', '5/2', '6/2', '7/2']

const Line = dynamic(() => import('react-chartjs-2').then(m => m.Line), { ssr: false });

const Page = () => {
    return <PageLayout>
        <div className="flex px-1 py-2 md:px-3 w-full flex-wrap-reverse gap-2">
            <div className="flex-1 h-auto flex flex-col items-start justify-start">
                <div className="grid w-full grid-cols-1 gap-2 grid-rows-auto sm:grid-cols-2 md:grid-cols-3">

                    <div className="p-4 w-full border min-w-[160px] flex flex-col gap-1 border-gray-200 bg-white shadow-sm rounded-lg">
                        <div className="p-2 w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-lg text-blue-900">
                            <Eye />
                        </div>
                        <p className="text-gray-800 text-lg font-light">Lượt xem trang</p>
                        <h2 className="text-2xl text-slate-700 ">1202</h2>

                        <p className="text-gray-600 text-sm font-light">mỗi tuần</p>
                    </div>

                    <div className="p-4 w-full border min-w-[160px] flex flex-col gap-1 border-gray-200 bg-white shadow-sm rounded-lg">
                        <div className="p-2 f w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-lg text-indigo-800">
                            <Star />
                        </div>
                        <p className="text-gray-800 text-lg font-light">Điểm trung bình</p>
                        <h2 className="text-2xl text-slate-700 ">4.7</h2>

                        <p className="text-gray-600 text-sm font-light">bởi 49 người</p>
                    </div>

                    <div className="p-4 w-full border min-w-[160px] flex flex-col items-start gap-1 border-gray-200  bg-gradient-to-br from-amber-50  to-red-50 shadow-sm rounded-lg">
                        <div className="p-2 f w-10 h-10 flex items-center justify-center bg-amber-300 rounded-lg text-white">
                            <Gem />
                        </div>
                        <p className="text-yellow-800 text-lg font-normal">Tạo Quảng Cáo trên Lagi Now</p>
                        <div className={cn("rounded-full cursor-pointer inline-flex items-center gap-2 text-sm bg-gray-300/40 p-2 px-3 text-display float-right transition-all",
                            "bg-yellow-700 text-white")}>
                            Bắt đầu
                            <FlagTriangleRight size={16} />
                        </div>
                    </div>



                </div>
                <br />
                <div style={{ height: 400 }} className="flex p-4 md:p-8 rounded-lg shadow shadow-sm items-center justify-center  w-full bg-white">
                    <Line

                        width={'100%'}

                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },
                                title: {
                                    display: false,
                                },
                            },
                            scales: {
                                y: {
                                    grid: {
                                        display: false
                                    },
                                    ticks: {
                                    },
                                },
                                x: {
                                    grid: {
                                        display: false
                                    },
                                }
                            }
                        }}
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: 'Số lượng tiếp cận',
                                    data: [100, 104, 89, 88, 120, 120, 99],
                                    borderColor: indigo.indigo10,
                                    backgroundColor: indigo.indigo6,
                                    pointStyle: false
                                },

                            ],
                        }} />
                </div>
                <br />

                <div className="p-4 rounded-lg w-full bg-white shadow-sm flex flex-col">

                    <div className="flex  justify-between items-center">
                        <div className="flex items-center gap-2  text-lg">
                            <div className="p-2 w-10 h-10 flex items-center justify-center bg-sky-100 rounded-lg text-sky-900">
                                <MessageSquare />
                            </div>
                            Reviews</div>
                        <span className="text-blue-700 px-2 py-1 cursor-pointer rounded-lg transition-all hover:bg-indigo-100">xem thêm</span>
                    </div>
                    <br />

                    <ul role="list" className=" w-full divide-y divide-slate-200">

                        <li className="flex py-2 first:pt-0 last:pb-0">
                            <img className="h-10 w-10 rounded-full" src="/logo.png" alt="" />
                            <div className="ml-3 overflow-hidden">
                                <div className="flex gap-2 items-center">
                                    <span className="text-sm font-medium text-slate-900">hello</span>
                                    <span className="text-sm text-slate-400 truncate">2 giờ trước</span>
                                </div>
                                <p className="text-sm text-slate-600 truncate">Đã đến đây rồi ạ</p>
                            </div>
                            <div>

                            </div>
                        </li>

                        <li className="flex py-2 first:pt-0 last:pb-0">
                            <img className="h-10 w-10 rounded-full" src="/logo.png" alt="" />
                            <div className="ml-3 overflow-hidden">
                                <div className="flex gap-2 items-center">
                                    <span className="text-sm font-medium text-slate-900">hello</span>
                                    <span className="text-sm text-slate-400 truncate">2 giờ trước</span>
                                </div>
                                <p className="text-sm text-slate-600 truncate">Đã đến đây rồi ạ</p>
                            </div>
                            <div>

                            </div>
                        </li>

                        <li className="flex py-2 first:pt-0 last:pb-0">
                            <img className="h-10 w-10 rounded-full" src="/logo.png" alt="" />
                            <div className="ml-3 overflow-hidden">
                                <div className="flex gap-2 items-center">
                                    <span className="text-sm font-medium text-slate-900">hello</span>
                                    <span className="text-sm text-slate-400 truncate">2 giờ trước</span>
                                </div>
                                <p className="text-sm text-slate-600 truncate">Views ở đây rất đẹp...</p>
                            </div>
                            <div>

                            </div>
                        </li>

                    </ul>

                </div>
            </div>


            <div className="w-96 h-auto">
                <div className="p-2 flex flex-col gap-2 bg-white rounded-lg shadow-s border border-gray-200">

                    <div className="px-3 py-2 cursor-pointer flex flex-col text-gray-700 bg-gray-100  rounded-lg hover:bg-sky-600 hover:text-white">
                        <div className="flex flex-row items-center justify-between">
                            <CalendarPlus />
                            <div className={cn("rounded-full shadow shadow-sm flex items-center gap-1 text-sm bg-gray-300/40 p-1 px-2.5 text-display float-right transition-all")}>
                                chưa hoàn thành
                                <X size={16} />
                            </div>
                        </div>
                        <span className="mt-1 ">Thêm ảnh</span>
                        <span className="text-sm">Chọn tối đa 3 ảnh nổi bật cho trang</span>
                    </div>

                    <div className={cn("px-3 py-2 cursor-pointer flex flex-col text-gray-600 bg-gray-100  rounded-lg hover:bg-sky-600 hover:text-white")}>
                        <div className="flex flex-row items-center justify-between">
                            <CalendarPlus />
                            <div className={cn("rounded-full flex items-center gap-1 text-sm bg-gray-300/40 p-1 px-2.5 text-display float-right transition-all", {
                                "bg-sky-400/100 text-white": true
                            })}>
                                đã hoàn thành
                                <Check size={16} />
                            </div>
                        </div>
                        <span className="mt-1 ">Thông tin giờ hành chính</span>
                        <span className="text-sm">Giờ hoạt động các ngày trong tuần</span>
                    </div>

                    <div className="px-3 py-2 cursor-pointer flex flex-col text-gray-700 bg-gray-100  rounded-lg hover:bg-sky-600 hover:text-white">
                        <div className="flex flex-row items-center justify-between">
                            <CalendarPlus />
                            <div className="rounded-full flex items-center gap-1 text-sm bg-gray-300/40 p-1 px-2.5 text-display float-right transition-all ">
                                chưa hoàn thành
                                <X size={16} />
                            </div>
                        </div>
                        <span className="mt-1 ">Thông tin giờ hành chính</span>
                        <span className="text-sm">Giờ hoạt động các ngày trong tuần</span>
                    </div>
                </div>

            </div>
        </div>
    </PageLayout>
}


// Page.getLayout = (content: ReactNode) => {
//     return <PageLayout>
//         {content}
//     </PageLayout>
// }


export default Page;