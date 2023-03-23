import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import ImageUploader from "../shared/upload-image";
import { useRouter } from "next/router";
import { trpc } from "@/lib/trpc";

export const EditBusinessPhotos = () => {


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

    <div className="relative min-h-[90vh] overflow-hidden w-full bg-white md:rounded-lg ">
      {/* <h2 className="text-lg  text-slate-500 px-4">Ảnh cho {data?.title} </h2> */}

      <a href="https://precedent.dev">

      </a>

      <div className="p-2">
        <ImageUploader placeholder="thêm ảnh" images={data?.images as any} onChange={updatePhotos} className="lg:grid-cols-4" />
      </div>
    </div>


  );
};

export function useModalEditBusinessPhotos() {
  const [show, setShow] = useState(false);

  const Component = useCallback(() => {
    return (
      <Modal showModal={show} setShowModal={setShow}>
        <EditBusinessPhotos
        />
      </Modal>
    );
  }, [show, setShow]);

  return useMemo(
    () => ({ setShow, ModalEditBusinessPhotos: Component }),
    [setShow, Component],
  );
}
