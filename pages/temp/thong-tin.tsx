
import { CalendarPlus, Check, Cross, Eye, FlagTriangleRight, Gem, ImagePlus, MessageSquare, MonitorSpeaker, Star, X } from "lucide-react"
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
import PageLayout from "@/components/layout/page-layout";
import { ReactNode } from "react";





let tabItemClsx = clsx(
    "relative",
    "transition-all",
    // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
    "px-3 py-1 text-sm whitespace-nowrap",
    "hover:bg-gray-100 text-slate-500 rounded-md",
    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:text-blue-700 data-active:bg-slate-100",
    "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)

const Page = () => {

    let { slug } = useRouter().query as { slug: string }
   
    const { data, isLoading } = trpc.business.getBySlug.useQuery({ slug }, {refetchOnWindowFocus: true,  refetchOnMount: true})

    const updateBusiness = trpc.business.updateBySlug.useMutation()
    const toast = useToast()

  

  

    const updatePhotos = async (values: any) => {

       
        let res = await updateBusiness.mutateAsync({slug, data: {
            images: values
        }})

        toast('success', 'Thêm ảnh thành công')
    }


    let { setValue: setAvatarUrl, AvatarUpload } = useAvatarUpload({ url: '' })
    let { setValue: setBannerUrl, BannerUpload } = useBannerUpload({ url: '' })


    return  <Tabs.Content value="2" className="p-5">

                    <h2 className="text-lg font-display text-slate-500 mb-2">Thêm ảnh</h2>
                    <div style={{ height: 100 }} className="w-full flex">
                        <ImageUploader images={data?.images as any} onChange={updatePhotos} className="md:grid-cols-10" />
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
            
          
        </Tabs.Content>
}



Page.getLayout = (content: ReactNode) => {
    return <PageLayout>
        {content}
    </PageLayout>
}



export default Page