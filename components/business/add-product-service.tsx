import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import ModalDesktop from "../shared/modal-desktop";
import { X } from "lucide-react";
import ImageUploader from "../shared/upload-image";
import RatingStars from "../shared/rating-star";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { Button } from "@/components/shared/button";
import { trpc } from "@/lib/trpc";
import { useToast } from "../shared/toast";
import { INPUT_STYLES, TEXTAREA_STYLES } from "@/lib/constants";
import LoadingHorizontalDots from "../shared/loading-dots";
import { cn } from "@/lib/utils";
import { Input } from "@/components/shared/input";
import { TextArea } from "@/components/shared/textarea";

const AddProductService = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {


  let { slug } = useRouter().query as { slug: string }
  const [loading, setLoading] = useState(false)
  let addReview = trpc.product.add.useMutation({})
  const { handleSubmit, register, reset, clearErrors, formState, setError, setValue } = useForm({

  })

  const toast = useToast()

  const onSubmit = async (values: any) => {

    try {
      setLoading(true)

      let res = await addReview.mutateAsync({
        slug,
        name: values?.name,
        description: values?.description,
        minPrice: values?.minPrice ? parseInt(values?.minPrice) : undefined,
        maxPrice: values?.maxPrice ? parseInt(values?.maxPrice) : undefined,
        images: values.images

      })

      if (res) {
        toast('success', 'Thêm thành công')
        reset()
        setShow(false)
      }

      setLoading(false)
    }
    catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <ModalDesktop showModal={show} setShowModal={setShow}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div onClick={() => setShow(false)} className="fixed hidden md:flex top-2 right-2 flex cursor-pointer items-center text-lg text-slate-800"><X /> Đóng </div>
        <div className="relative flex items-center justify-center  p-[4%] h-full w-full">

          <div className="relative flex flex-col gap-2 justify-start items-start bg-white shadow shadow-sm p-4 rounded-lg md:w-[800px] w-[96vw] sm:w-[400px] h-auto">
            <h3 className="text-lg ">Thêm sản phẩm / dịch vụ</h3>

            <label className="block text-sm font-medium text-gray-700 w-full" > Tên *
              <Input onChange={(e: any) => setValue('name', e.target.value)} type='text' name="email"
                placeholder="Tên sản phẩm / dịch vụ" autoFocus />
            </label>




            <label className="block text-sm font-medium text-gray-700 w-full" > Mô tả
              <TextArea onChange={(e) => setValue('description', e.target.value)} name="email"
                placeholder="Mô tả chi tiết (không bắt buộc)" />
            </label>

            <div className="w-full">
              <h3 className="text-sm font-medium text-gray-800">Hình ảnh</h3>
              <ImageUploader onChange={(val) => setValue('images', val)} className="grid-cols-3 md:grid-cols-3 lg:grid-cols-4" />
            </div>


            <div className="flex mb-1 items-center gap-10 w-full">
              <label className="block text-sm font-medium text-gray-700" > Giá từ (VND)
                <Input onChange={(e) => setValue('minPrice', e.target.value)} type='number' name="email"
                  placeholder="20.000" autoFocus />
              </label>
              <label className="block text-sm font-medium text-gray-700" > Đến (VND)
                <Input onChange={(e) => setValue('maxPrice', e.target.value)} type='number' name="email"
                  placeholder="40.000" autoFocus />
              </label>
            </div>
            <span className="text-sm text-gray-500">Nếu giá là cố định hãy điền giá từ-đến bằng nhau.</span>

            <br />
            <button
              disabled={loading}
              type='submit'
              style={{
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
              }}
              className={
                cn("rounded-lg w-full md:w-auto transition hover:bg-gray-800 border flex items-center justify-center gap-2  bg-gray-900 p-1.5 px-6 border-none text-display text-white transition-all shadow shadow-md", {
                })}>
              xác nhận
              {loading && <LoadingHorizontalDots />}
            </button>
          </div>



        </div>
      </form>
    </ModalDesktop>
  );
};

export function useAddProductServiceModal() {
  const [show, setShow] = useState(false);

  const Component = useCallback((props: any) => {
    return (
      <AddProductService
        show={show}
        setShow={setShow}
        {...props}
      />
    );
  }, [show, setShow]);

  return useMemo(
    () => ({ setShow, AddProductService: Component }),
    [setShow, Component],
  );
}
