import Image from "next/image";
import StarFilled from "../shared/icons/star-filled";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useModalViewPhotos } from "./view-photos";

export default function CommmentItem() {

    const { setShow, show, ViewPhotos } = useModalViewPhotos([
        {
            url: 'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
        }
    ])

    return <>
        {show && <ViewPhotos />}
        <div className="bg-gray-50 border-t border-gray-300 pt-2 w-full">
            <div className="flex items-center justify-between">
                <span className="flex gap-2 items-center">
                    <Image className="bg-gray-200 rounded-full" alt='' width={50} height={50} src={`https://avatars.dicebear.com/api/micah/felixtran2000@gmail.com.svg`} />
                    <div className="w-full">
                        <p className="text-lg font-display">Bao Phuc Tran</p>
                        <p className="text-gray-500 text-sm">Feb 8, 2022</p>
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
            <div style={{ height: 100 }} className="flex bg-gray-100 flex-row gap-1 items-center">
                <div className="relative h-[100px] w-[100px]">
                    <Image alt='' className="rounded-sm" fill src='https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'></Image>
                </div>
                <div className="relative h-[100px] w-[100px]">
                    <Image alt='' className="rounded-sm" fill src='https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'></Image>
                </div>
                <div onClick={() => setShow(true)}>View photos</div>
            </div>

        </div>
    </>
}