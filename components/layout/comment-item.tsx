import Image from "next/image";
import StarFilled from "../shared/icons/star-filled";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useModalViewPhotos } from "./view-photos";
import { useModalPhoto } from "../single-photo-view";
import { Review } from "@prisma/client";
import { timeAgo } from "@/lib/utils";
import StarRated from "../shared/star-rated";
import { trpc } from "@/lib/trpc";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

export default function CommmentItem({data}: {data: any}) {

    const user = useSession().data?.user as any

    const { setShow: setShowModalPhoto, setPhotoUrl } = useModalPhoto()
    let images = data?.images as any[]
    const { setShow, show, setImages, ViewPhotos, } = useModalViewPhotos(images)
    const userLike = trpc.review.userLike.useMutation({})
    const userDislike = trpc.review.userDislike.useMutation({})
    const [loading, setLoading] = useState(false);

    const [totalLike, setTotalLike] = useState(data?.userLikes ?? [])
    const [totalDislike, setTotalDislike] = useState(data?.userDislikes ?? [])


    const onUserLike = async () => {
        setLoading(true)
        let userId = user?.id
        if(totalLike?.findIndex((item: string) => item == userId) === -1){
            await userLike.mutateAsync({ id: data?.id }).catch(e => setLoading(false))
            setTotalLike([...totalLike, userId])
        }
        setLoading(false)
    }

    const onUserDislike = async () => {
        let userId = user?.id
        setLoading(true)
        if(totalDislike?.findIndex((item: string) => item == userId) === -1){
            await userDislike.mutateAsync({ id: data?.id }).catch(e => setLoading(false))
            setTotalDislike([...totalDislike, userId])
        }
        setLoading(false)
    }

    const isUserLiked = useCallback(() => {
        let res = data.userLikes?.findIndex((item: string) => item == user?.id) >= 0
        return res
    }, [user?.id])

    const isUserDisliked = useCallback(() => {
        return data.userDislikes?.findIndex((item: string) => item == user?.id) >= 0
    }, [user?.id])


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
                <StarRated rated={data?.rating}/>
                <div onClick={onUserLike} className={clsx("flex border border-gray-300 text-gray-500 cursor-default flex-row p-1 gap-1  hover:bg-gray-100 hover:text-indigo-800 rounded-md items-center", {
                    "text-indigo-800 border-indigo-400": isUserLiked() === true,
                    'disabled:opacity-50  pointer-events-none': loading === true
                })}>
                    <ThumbsUp width={18} height={18} /> <span>{totalLike?.length ?? 0}</span>
                </div>
                <div onClick={onUserDislike} className={clsx("flex border border-gray-300 text-gray-500 cursor-default flex-row p-1 gap-1  hover:bg-gray-100 hover:text-indigo-800 rounded-md items-center", {
                    "text-indigo-800 border-indigo-400": isUserDisliked() === true,
                    'disabled:opacity-50  pointer-events-none': loading === true
                })}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
   <path d="M9 10l.01 0"></path>
   <path d="M15 10l.01 0"></path>
   <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0"></path>
</svg> <span>{totalDislike?.lengt ?? 0}</span>
                </div>
            </span>

            <span className="text-gray-700">{data?.content}</span>
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