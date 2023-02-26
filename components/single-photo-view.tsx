import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import ModalDesktop from "./shared/modal-desktop";

const ModalPhotoContext = createContext<{
    photoUrl: string | null;
    setShow: Dispatch<SetStateAction<boolean>>;
    setPhotoUrl: Function;
    show: boolean;

}>({
    photoUrl: '',
    setShow: () => null,
    setPhotoUrl: () => null,
    show: false
});
export const useModalPhoto = () => useContext(ModalPhotoContext);


export function SinglePhotViewProvider({ children }: { children: ReactNode }) {


    const [photoUrl, setPhotoUrl] = useState(null)
    const [show, setShow] = useState(false)


    return <ModalPhotoContext.Provider value={{ photoUrl, setShow, show, setPhotoUrl }}>
        {children}
    </ModalPhotoContext.Provider>

}


export const PhotoViewModal = () => {


    const { setShow, show, photoUrl } = useModalPhoto()

    return <ModalDesktop showModal={show} setShowModal={setShow}>

        <div className="relative p-[4%] h-[100vh] w-[100vw]">
        <Link className="hidden" href='/'></Link>
            <div onClick={() => setShow(false)} className="absolute hidden md:flex top-2 right-2 flex cursor-pointer items-center text-lg text-slate-800"><X /> Đóng </div>
            <div className="relative h-full w-full">
                {<Image src={photoUrl ?? ''} alt="" fill style={{ objectFit: 'contain' }} className={`relative aspect-square object-cover rounded-sm`} loading="lazy" />}
            </div>
        </div>
    </ModalDesktop>
}