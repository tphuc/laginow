import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import ModalDesktop from "../shared/modal-desktop";
import Link from "next/link";
import { X } from "lucide-react";
import ImageUploader from "../shared/upload-image";
import RatingStars from "../shared/rating-star";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Button from "../shared/button";
import { trpc } from "@/lib/trpc";
import { useToast } from "../shared/toast";
import { cn } from "@/lib/utils";

const AddCommentItem = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {


  let { slug } = useRouter().query as { slug: string }
  const [loading, setLoading] = useState(false)
  let addReview = trpc.business.addReview.useMutation({})
  const { handleSubmit, register, reset, clearErrors, formState, setError, setValue } = useForm({

  })

  const toast = useToast()

  const onSubmit = async (values: any) => {
    await clearErrors('rating')
    try {
      setLoading(true)
      if (!values.rating) {
        setError('rating', { message: 'bạn chưa chọn số sao' })
        setLoading(false)
        return
      }

      let res = await addReview.mutateAsync({
        slug,
        content: values.content,
        rating: values.rating,
        images: values.images?.length ? values?.images : []
      })

      if (res) {
        toast('success', 'Thêm review thành công')
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

          <div className="relative bg-white shadow shadow-sm p-4 rounded-lg md:w-[800px] w-[96vw] sm:w-[400px] h-auto">
            <h3 className="text-lg ">Thêm đánh giá của bạn</h3>
            <RatingStars onChange={(val) => {
              clearErrors('rating')
              setValue('rating', val)
            }} />
            {formState.errors?.rating?.message && <span className="text-red-500 text-sm">{formState.errors?.rating?.message as string}</span>}

            <label className="block text-sm font-medium text-gray-800" > Bình luận </label>

            <textarea onChange={(e) => setValue('content', e.target.value)} className="inline-block w-full py-2 rounded-md  bg-gray-50  border-transparent  focus:border-gray-300 hover:focus:border-gray-700 hover:border-gray-300 hover:focus:border-gray-300 focus:ring-0 text-sm mt-1 block w-full" name="email"
              placeholder="Cho mọi người biết cảm nghĩ của bạn" autoFocus />
            <div className="w-full">
              <h3 className="text-sm font-medium text-gray-800">Hình ảnh</h3>
              <ImageUploader onChange={(val) => setValue('images', val)} className="grid-cols-3 md:grid-cols-3 lg:grid-cols-4" />
            </div>

            <br />
            <Button className={cn("rounded-lg transition hover:bg-gray-800 border flex items-center gap-2  bg-gray-900 p-1.5 px-6 border-none text-display text-white transition-all shadow shadow-md", {
            })}
              htmlType='submit' loading={loading}>xác nhận
            </Button>
          </div>



        </div>
      </form>
    </ModalDesktop>
  );
};

export function useAddCommentItemModal() {
  const [show, setShow] = useState(false);

  const Component = useCallback((props: any) => {
    return (
      <AddCommentItem
        show={show}
        setShow={setShow}
        {...props}
      />
    );
  }, [show, setShow]);

  return useMemo(
    () => ({ setShow, AddCommentItem: Component }),
    [setShow, Component],
  );
}
