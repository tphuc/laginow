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

export const EditMenuPhotos = () => {


  let { slug } = useRouter().query as { slug: string }
  const { data, isLoading } = trpc.business.getBySlug.useQuery({ slug })
  const updateBusiness = trpc.business.updateBySlug.useMutation()

  const updatePhotos = async (values: any) => {


    let res = await updateBusiness.mutateAsync({
      slug, data: {
        menuImages: values
      }
    })


  }

  return (

    <div className="relative w-full">
      <ImageUploader placeholder="thêm ảnh" images={data?.menuImages as any} onChange={updatePhotos} className="md:grid-cols-4" />
    </div>


  );
};

export function useModalEditMenuPhotos() {
  const [show, setShow] = useState(false);

  const Component = useCallback(() => {
    return (
      <Modal showModal={show} setShowModal={setShow}>
        <EditMenuPhotos
        />
      </Modal>
    );
  }, [show, setShow]);

  return useMemo(
    () => ({ setShow, ModalEditMenuPhotos: Component }),
    [setShow, Component],
  );
}
