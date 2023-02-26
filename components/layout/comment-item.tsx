import Image from "next/image";
import StarFilled from "../shared/icons/star-filled";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useModalViewPhotos } from "./view-photos";
import { useModalPhoto } from "../single-photo-view";
import { Review } from "@prisma/client";
import { timeAgo } from "@/lib/utils";

export default function CommmentItem({data}: {data: any}) {

    const { setShow: setShowModalPhoto, setPhotoUrl } = useModalPhoto()
    let images = data?.images as any[]
    const { setShow, show, setImages, ViewPhotos, } = useModalViewPhotos(images)

    console.log(data)

    return <>
        {show && <ViewPhotos />}
        <div className="bg-gray-50 border-t border-gray-300 pt-2 w-full">
            <div className="flex items-center justify-between">
                <span className="flex gap-2 items-center">
                    <Image className="bg-gray-200 rounded-full" alt='' width={50} height={50} src={data?.user?.image ?? `https://avatars.dicebear.com/api/micah/${data?.user?.email}.svg`} />
                    <div className="w-full">
                        <p className="text-lg font-display">{data?.user?.name}</p>
                        <p className="text-gray-500 text-sm">{timeAgo(data?.createdAt)}</p>
                    </div>
                </span>


            </div>
            <span className='flex flex-row items-center gap-2 text-indigo-900 my-2'>
                <div className="flex flex-row">
                    {[1, 2, 3, 4, 5]?.map(i => <StarFilled key={i} width={18} height={18} />)}
                </div>
                <div className="flex cursor:default flex-row p-1 gap-1 text-slate-800  hover:bg-indigo-50 rounded-md items-center">
                    <ThumbsUp width={18} height={18} /> <span>1</span>
                </div>
                <div className="flex cursor:default flex-row p-1 gap-1 text-slate-800 hover:bg-indigo-50 rounded-md items-center">
                    <ThumbsDown width={18} height={18} /> <span>1</span>
                </div>
            </span>

            <span className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            <div  className="flex flex-row gap-1 items-center">
                {images?.map((item: {url: string, fileId: string }) => <div key={item?.fileId} onClick={() => {
                    setPhotoUrl(item.url)
                    setShowModalPhoto(true)
                }} className="relative h-[100px] w-[100px]">
                    <Image alt='' className="rounded-sm object-cover" style={{objectFit:'cover'}} fill src={item.url}></Image>
                </div> )}
                
                
                {images[0]?.url && <div onClick={() => {
                    setImages(images)
                    setShow(true)
                }} className="relative rounded-sm select-none cursor-default bg-gray-200 h-[100px] w-[100px]">
                    <span className="absolute rounded-sm text-white w-full h-full z-10 bg-black/40 backdrop-blur flex items-center justify-center text-sm text-color-800" >xem ảnh</span>
                    <Image alt=''  className="rounded-sm object-cover" fill src={images[0]?.url} style={{objectFit:'cover'}} />
                </div>} 
               
            </div>

        </div>
    </>
}