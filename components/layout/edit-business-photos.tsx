import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import ImageUploader from "../shared/upload-image";
import { useRouter } from "next/router";
import { trpc } from "@/lib/trpc";
import { X } from "lucide-react";

const EditBusinessPhotos = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {

  
  let { slug } = useRouter().query as { slug: string }
  const { data, isLoading } = trpc.business.getBySlug.useQuery({ slug })
  const updateBusiness = trpc.business.updateBySlug.useMutation()

  const updatePhotos = async (values: any) => {


    let res = await updateBusiness.mutateAsync({
        slug, data: {
            images: values
        }
    })


}

  return (
    <Modal  showModal={show} setShowModal={setShow}>
      <div style={{minWidth:"90vw"}} className="relative bg-stone-100 min-h-[90vh] overflow-hidden shadow-xl md:max-w-lg bg-white md:rounded-lg md:border md:border-gray-200">
           <h2 className="text-lg font-display text-slate-500 p-4">Ảnh cho {data?.title} </h2>

          <a href="https://precedent.dev">
            
            </a>
          
                
            
          <div className="p-2">
            <ImageUploader images={data?.images as any} onChange={updatePhotos} className="lg:grid-cols-6" />
          </div>
        </div>
     
    </Modal>
  );
};

export function useModalEditBusinessPhotos() {
  const [show, setShow] = useState(false);

  const Component = useCallback(() => {
    return (
      <EditBusinessPhotos
        show={show}
        setShow={setShow}
      />
    );
  }, [show, setShow]);

  return useMemo(
    () => ({ setShow, ModalEditBusinessPhotos: Component }),
    [setShow, Component],
  );
}
