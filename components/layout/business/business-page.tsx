
import { ArrowUpRight, CalendarPlus, Check, ChevronDown, Cross, Eye, FlagTriangleRight, Gem, Grid, ImagePlus, Layout, LayoutGrid, Link2, MessageSquare, MonitorSpeaker, Share, Star, X } from "lucide-react"
import * as Tabs from '@radix-ui/react-tabs';
import { blue, violet } from "@radix-ui/colors";
import clsx from "clsx";
import { useAvatarUpload } from "@/components/shared/avatar-upload";
import axios from "axios";
import { useBannerUpload } from "@/components/shared/banner-upload";
import { useRouter } from "next/router";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/components/shared/toast";
import ImageUploader, { CloudImage, useImageUploader } from "@/components/shared/upload-image";
import Image from "next/image";
import { useModalEditBusinessPhotos } from "../edit-business-photos";
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React, { useState } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Switch } from "@/components/shared/switch";
import Link from "next/link";








let tabItemClsx = clsx(
    "relative",
    "transition-all",
    // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
    "px-3 py-1 text-sm whitespace-nowrap",
    "hover:bg-gray-100 text-slate-500 rounded-md",
    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:text-blue-700 data-active:bg-slate-100",
    "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)

let accordionPrimitveItemClsx = "bg-gray-50 border border-gray-200 focus-within:ring focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-none w-full"
let accordionPrimitiveTriggerClsx = clsx(
    "group",
    "radix-state-open:rounded-t-md radix-state-closed:rounded-t-md",
    "focus:outline-none",
    "inline-flex w-full items-center justify-between bg-gray-50 px-4 py-2 text-left dark:bg-gray-800"
)

export default function BusinessPageDecoration() {

    let { slug } = useRouter().query as { slug: string }

    const { data, isLoading } = trpc.business.getBySlug.useQuery({ slug }, { refetchOnWindowFocus: true, refetchOnMount: true })

    const { setShow: setShowEditBusinessPhotos, ModalEditBusinessPhotos } = useModalEditBusinessPhotos()

    let images = data?.images as { url: string, fileId: string }[]



    // let { setValue: setAvatarUrl, AvatarUpload } = useAvatarUpload({ url: '' })
    // let { setValue: setBannerUrl, BannerUpload } = useBannerUpload({ url: '' })

    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 37.78746222,
        lng: -122.412923,
      });
    
      const [zoom, setZoom] = useState<number>(15);
    
      const onIdle = (map: google.maps.Map) => {
        setZoom(map.getZoom()!);
    
        const nextCenter = map.getCenter();
    
        if (nextCenter) {
          setCenter(nextCenter.toJSON());
        }
      };
    return <>
        <ModalEditBusinessPhotos />
        <div className="relative w-full flex-wrap flex flex-row gap-4  p-2 md:p-4">





            <div className="w-full flex-1  w-120 md:w-124">
                <div className="bg-white text-gray-700 min-h-[200px] rounded-md shadow shadow-sm p-2">
                    <AccordionPrimitive.Root
                        type="multiple"
                        //   defaultValue="1"
                        className={clsx("space-y-2 w-full")}
                    >
                        {/* <AccordionPrimitive.Item
                            value={`1`}
                            className={accordionPrimitveItemClsx}
                        >
                            <AccordionPrimitive.Header className="w-full">
                                <AccordionPrimitive.Trigger
                                    className={accordionPrimitiveTriggerClsx}
                                >
                                    <span className="text-sm  flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                                        <Layout /> Bố cục
                                    </span>
                                    <ChevronDown
                                        className={clsx(
                                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                        )}
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3 dark:bg-gray-800">
                                <div className="text-sm text-gray-700 dark:text-gray-400">
                                    <ToggleGroup.Root style={{ width: "100%" }} type="single" defaultValue="left" aria-label="header-layout">
                                        <ToggleGroup.Item className={clsx(
                                            "group data-on:bg-white ",
                                            "bg-gray-50 dark:bg-gray-800",
                                            "border-y px-2.5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x",
                                            "border-gray-200 ",
                                            "focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                                        )} value="left" aria-label="Left aligned">

                                            <span style={{ fontSize: "small", textAlign: "center", }}>image left</span>
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item className={clsx(
                                            "group data-on:bg-white ",
                                            "bg-gray-50 dark:bg-gray-800",
                                            "border-y px-2.5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x",
                                            "border-gray-200 ",
                                            "focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                                        )} value="center" aria-label="Middle aligned">

                                            <span style={{ fontSize: "small", textAlign: "center", }}>image center</span>
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item className={clsx(
                                            "group data-on:bg-white ",
                                            "bg-gray-50 dark:bg-gray-800",
                                            "border-y px-2.5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x",
                                            "border-gray-200 ",
                                            "focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                                        )} value="right" aria-label="Right aligned">

                                            <span style={{ fontSize: "small", textAlign: "center", }}>image right</span>
                                        </ToggleGroup.Item>
                                    </ToggleGroup.Root>
                                 
                                </div>
                            </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item> */}


                        <AccordionPrimitive.Item
                            value={`2`}
                            className={accordionPrimitveItemClsx}
                        >
                            <AccordionPrimitive.Header className="w-full">
                                <AccordionPrimitive.Trigger
                                    className={accordionPrimitiveTriggerClsx}
                                >
                                    <span className="text-sm  flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                                        <ImagePlus /> Hình ảnh & videos
                                    </span>
                                    <ChevronDown
                                        className={clsx(
                                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                        )}
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3 dark:bg-gray-800">
                                <div className="text-sm text-gray-700 dark:text-gray-400">
                                    <div onClick={() => setShowEditBusinessPhotos(true)} className={clsx(`inline-flex cursor-pointer font-sm items-center gap-1 shadow shadow-sm hover:text-gray-800 text-gray-500`,
                                        "cursor-pointerz-1 px-2 py-1 bg-white rounded-md")}>
                                        chọn hình ảnh <Grid size={18} />
                                    </div>
                                </div>
                            </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>


                        <AccordionPrimitive.Item
                            value={`2`}
                            className={accordionPrimitveItemClsx}
                        >
                            <AccordionPrimitive.Header className="w-full">
                                <AccordionPrimitive.Trigger
                                    className={accordionPrimitiveTriggerClsx}
                                >
                                    <span className="text-sm  flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                                        <ImagePlus /> Hình ảnh & videos
                                    </span>
                                    <ChevronDown
                                        className={clsx(
                                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                        )}
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3 dark:bg-gray-800">
                                <div className="text-sm text-gray-700 dark:text-gray-400">
                      
                                
                                </div>
                            </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>

                    </AccordionPrimitive.Root>

                </div>
            </div>
            <div className="relative flex-1 bg-white w-full min-w-[300px] overflow-hidden bg-white shadow shadow-sm rounded-lg">
                <div className="relative flex overflow-hidden  w-full  h-36 sm:h-48 md:h-56 lg:h-62">
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
                    <div className="absolute top-2  right-2">
                        <Link className="bg-white flex items-center px-2 py-1 text-sm rounded-md" href='/'>Xem thử <ArrowUpRight size={16}/> </Link>
                    </div>
                    <div className="absolute w-full h-full" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.1),  rgba(0,0,0,0.2)) " }}></div>

                    <div className="absolute text-white bottom-[4%] left-[4%]">
                        <h1 className="text-white font-display md:text-4xl text-2xl">{data?.title}</h1>
                        <p>Hello world</p>
                    </div>
                </div>



                <div className="flex flex-row gap-2 bg-gray-50 items-center w-full bg-white py-3 px-2 ">
                    <div className="bg-amber-500 text-white cursor-pointer inline-flex border gap-2 border-gray-200 items-center shadow-sm px-3 py-1.5  rounded-md" > Đánh giá <Star size={16}/> </div>
                    <div className="cursor-pointer inline-flex border gap-2 border-gray-200 bg-white items-center shadow-sm px-3 py-1.5  rounded-md" > Chia sẻ <Link2/> </div>
                </div>





            </div>



            {/* <div className="flex flex-col overflow-y-visible items-center justify-center">
                   <div className="w-full max-w-screen-lg overflow-visible">
                       
                        <div className="relative flex items-center overflow-visible justify-center   h-[140px] xs:h-[200px] sm:h-[400px] w-full">
                            <BannerUpload 
                                label={'cập nhật ảnh bìa'}
                                onselect={async (e) => {
                                try {
                                    if (e.target.files) {
                                        let file = e.target.files[0]
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        const response = await axios.post("/api/media", formData, {
                                            headers: { "Content-Type": "multipart/form-data" },
                                        });
                        
                                        let img: CloudImage = response.data
                                        setBannerUrl(img.url)
                        
                                    }
                                }
                                catch (e) {
                                    
                                }
                            }} className="w-full h-full bg-white rounded-md"/>
                           
                           <div className="absolute w-full h-full rounded-lg" style={{ background:"linear-gradient(180deg, rgba(0,0,0,0.01), rgba(0,0,0,0.02),  rgba(0,0,0,0.5)) "}}></div>

                            <div className="absolute flex items-center gap-4 bottom-2 left-[4%]">
                                <div className="h-14 w-14 sm:h-20 sm:w-20  rounded-full bg-white shadow shadow-sm">
                                    <AvatarUpload onselect={async (e) => {
                                        try {
                                            if (e.target.files) {
                                                let file = e.target.files[0]
                                                const formData = new FormData();
                                                formData.append("file", file);
                                                const response = await axios.post("/api/media", formData, {
                                                    headers: { "Content-Type": "multipart/form-data" },
                                                });
                                
                                                let img: CloudImage = response.data
                                                setAvatarUrl(img.url)
                                            }
                                        }
                                        catch (e) {
                                            
                                        }
                                    }}/>
                                   
                                </div>
                                <div>
                                <p className="text-white font-display text-2xl">{data?.title}</p>
                                </div>
                            </div>
                        </div>
                        </div>

        </div> */}



        </div>
    </>
}