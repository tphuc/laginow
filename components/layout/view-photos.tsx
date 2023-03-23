import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Image from "next/image";
import clsx from "clsx";
import { X } from "lucide-react";
import Link from "next/link";
import { useModalPhoto } from "../single-photo-view";
import { cn } from "@/lib/utils";

const PhotosGrid = ({
  show,
  setShow,
  images,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  images: any[]
}) => {

  const [list, setList] = useState(images);
  useEffect(() => {
    if (images) {
      setList(images);
    }
  }, [images]);

  const { setPhotoUrl, setShow: setShowSingle } = useModalPhoto()


  return (

    <Modal showModal={show} setShowModal={setShow}>
      <div className="relative p-[4%] h-full w-full">
        <div onClick={() => setShow(false)} className="absolute hidden md:flex top-2 right-2 flex cursor-pointer items-center text-lg text-slate-800"><X /> Đóng </div>
        <div className={cn("grid grid-cols-2 gap-1.5 lg:grid-cols-4 w-full")}>
          {list?.map((item, id) => <div onClick={() => {
            setPhotoUrl(item.url)
            setShowSingle(true)
          }} key={id} className={`relative aspect-square rounded-sm bg-white shadow-sm`}>
            <Image src={item?.url} alt="" fill className={`relative aspect-square object-cover rounded-sm`} loading="lazy" />
          </div>)}
        </div>
      </div>
      <Link href='/'></Link>

    </Modal>
  );
};

export function useModalViewPhotos(initialImages: any[]) {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState(initialImages)

  const Component = useCallback(() => {
    return (
      <PhotosGrid
        show={show}
        setShow={setShow}
        images={images}
      />
    );
  }, [show, setShow]);

  return useMemo(
    () => ({ setShow, show, setImages, ViewPhotos: Component }),
    [setShow, Component],
  );
}
