import Modal from "@/components/shared/modal";
import { signIn, useSession } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS, INPUT_STYLES } from "@/lib/constants";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "@/lib/trpc";
import slugify from "slugify";
import LoadingHorizontalDots from "../shared/loading-dots";
import clsx from "clsx";
import Popover, { useMultiSelect } from "../shared/multiple-select";
import MultiSelect from "../shared/multiple-select";
import ImageUploader from "../shared/upload-image";
import Link from "next/link";


export const AddBussiness = ({

}: {

  }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState({});

  const session = useSession().data as any;

  let addBusiness = trpc.business.add.useMutation({
    onSuccess(data, variables, context) {

    },
  })

  const { data: tags } = trpc.tags.getAll.useQuery({})

  let tagOptions = tags?.length ? tags?.map((item) => ({ id: item.id, title: item.name })) : []

  const { selected: selectedTags, removeAtIndex, MultiSelect } = useMultiSelect();


  const trpcContext = trpc.useContext()
  const { handleSubmit, setError, register, getValues, formState: {
    errors
  } } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      title:"",
      phone: "",
      address: "",
      website: ""
    }
  });

  const onSubmit = async (values: any) => {

    if (step !== 3) {
      return
    }

    // console.log(values)

    const { title, address, website, phone } = values;
    setLoading(true)
    let slug = slugify(title, {lower:true})
    let res = await addBusiness.mutateAsync({
      title, 
      slug,
      address,
      website, 
      phone,
      tags: selectedTags
    })

    if(res.id){
      setCreated(res)
      setStep(4)
    }

    setLoading(false)

  }


  const isSlugAvailable = async (value: string) => {
    let slug = slugify(value)
    let record = await trpcContext.business.getBySlug.fetch({ slug })

    if (record?.id) {
      return false
    }
    return true
  }


  return (

    <div className="w-full lg:max-w-xl ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center space-y-3  px-4 py-6 pt-8 text-center md:px-8">
          <AnimatePresence mode='wait'>
            <motion.div
              className="w-full pt-6"
              key={step}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <h1
                className="bg-gradient-to-br from-indigo-900 to-slate-500 bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-4xl md:leading-[5rem]"
              >
                Bắt đầu với Lagi Now Business
              </h1>
              {
                step === 1 && <motion.div className="w-full text-left  ">

                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-400" htmlFor="title"> Tên thương hiệu / trang </label>
                  <input {...INPUT_STYLES} id="title" type="text" {...register('title')} placeholder="Coffee Thống Nhất..." required autoFocus />
                  <span className="text-amber-500 text-sm">{errors?.title?.message?.toString()}</span>
                  <div className="h-5" />
                  <button
                    disabled={loading}
                    onClick={async () => {
                      if (!getValues('title')) {
                        setError('title', { message: "Không được để trống" }, { shouldFocus: true })
                        return
                      }

                      setLoading(true)
                      let is = await isSlugAvailable(getValues('title'))
                      if (is) {
                        setStep(2);
                        setLoading(false)
                      }
                      else {
                        setError('title', { message: "Tên không khả dụng" }, { shouldFocus: true })
                      }

                      setLoading(false)
                    }}
                    className={clsx(`rounded-full disabled float-right flex items-center gap-2 justify-center  border border-black bg-black p-1.5 px-4 text-display text-white transition-all hover:bg-white hover:text-black`, {
                      'disabled:opacity-50  pointer-events-none': loading === true
                    })}
                  >
                    <span>Tiếp tục</span>
                    {loading ? <LoadingHorizontalDots /> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M15 16l4 -4"></path>
                      <path d="M15 8l4 4"></path>
                    </svg>}
                  </button>

                </motion.div>
              }

              <motion.div className={clsx("w-full text-left", {
                "hidden": step !== 2
              })}>
                <p className="block mb-2 text-lg font-medium text-slate-600 dark:text-gray-400" > Cho chúng tôi biết thêm về trang của bạn </p>
                <p className="block mb-2 text-sm font-medium text-slate-600 dark:text-gray-400" > Hãy lựa chọn những từ liên quan đến danh mục kinh doanh (Tối đa 3) </p>
                <MultiSelect
                  placeholder='chọn'
                  options={tagOptions}>
                  {selectedTags?.map((e: { id: string | number, title: string }, i: number) => <div key={e?.id}
                    onClick={(event) => {
                      event.preventDefault()
                      let foundIndex = selectedTags?.findIndex((i: { id: string | number }) => i.id === e?.id)
                      removeAtIndex(foundIndex)
                    }}
                    className="bg-white cursor-pointer flex items-center border border-gray px-2 py-1 rounded-2xl" >
                    <span className="text-slate-600">{e.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-gray-400 icon icon-tabler icon-tabler-x " width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M18 6l-12 12"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </div>)}
                </MultiSelect>
                <div className="h-5" />
                <div className="flex items-center justify-end gap-2">
                  <button
                    disabled={loading}
                    onClick={() => {
                      setStep(1)
                    }}
                    className={clsx(`rounded-full disabled float-right flex items-center gap-2 justify-center  border border-black bg-white text-black p-1.5 px-4 text-display text-white transition-all `, {
                      'disabled:opacity-50  pointer-events-none': loading === true
                    })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M5 12l4 4"></path>
                      <path d="M5 12l4 -4"></path>
                    </svg>
                    <span>Trở về</span>
                  </button>
                  <button
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault()
                      setStep(3)
                    }}
                    className={clsx(`rounded-full disabled float-right flex items-center gap-2 justify-center  border border-black bg-black p-1.5 px-4 text-display text-white transition-all hover:bg-white hover:text-black`, {
                      'disabled:opacity-50  pointer-events-none': loading === true
                    })}
                  >
                    <span>Tiếp tục</span>
                    {loading ? <LoadingHorizontalDots /> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M15 16l4 -4"></path>
                      <path d="M15 8l4 4"></path>
                    </svg>}
                  </button>
                </div>
              </motion.div>


              <motion.div className={clsx("w-full text-left", {
                "hidden": step !== 3
              })}>
                <div className='py-2 flex flex-col w-full gap-2'>

                  <p className="font-medium text-slate-700">Thông tin liên hệ đến kinh doanh của bạn</p>
                  <label className="block text-sm font-medium " >
                    <span className="text-slate-600">Số điện thoại</span> <br />
                    <input {...INPUT_STYLES} type="text" {...register('phone', {required:"Cần điền thông tin"})} placeholder="(+84)" />
                  </label>


                  <label className="block text-sm font-medium " >
                    <span className="text-slate-600">Địa chỉ </span><br />
                    <input {...INPUT_STYLES} type="text" {...register('address', {required:"Cần điền thông tin"})} placeholder="21 Thống Nhất..." />
                  </label>


                  <label className="block text-sm font-medium " >
                    <span className="text-slate-600">Website (tuỳ chọn)</span> <br />
                    <input {...INPUT_STYLES} type="text" {...register('website')} placeholder="https://example.com" />
                  </label>

                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    disabled={loading}
                    onClick={async () => {
                      setStep(2)
                    }}
                    className={clsx(`rounded-full disabled flex items-center gap-2 justify-center border border-black bg-white text-gray-900 p-1.5 px-4 text-display text-white transition-all `, {
                      'disabled:opacity-50  pointer-events-none': loading === true
                    })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M5 12l4 4"></path>
                      <path d="M5 12l4 -4"></path>
                    </svg>
                    <span>Trở về</span>
                  </button>
                  <button
                    disabled={loading}
                    type='submit'
                    className={clsx(`rounded-full disabled flex items-center gap-2 justify-center border border-black bg-black p-1.5 px-4 text-display text-white transition-all hover:bg-white hover:text-black`, {
                      'disabled:opacity-50  pointer-events-none': loading === true
                    })}
                  >
                    <span>Xác nhận</span>
                    {loading ? <LoadingHorizontalDots /> : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l14 0"></path>
                      <path d="M15 16l4 -4"></path>
                      <path d="M15 8l4 4"></path>
                    </svg>}
                  </button>
                </div>

              </motion.div>


              {
                step === 4 && <div className="w-full text-left">
                  <div className='py-2 flex flex-col items-center w-full gap-2'>
                    <div className="flex items-center justify-center">
                      <Image alt="Auth.js logo" src="/success.svg" style={{ objectFit: "contain" }} width={300} height={300} />

                    </div>
                    <h2
                      className="bg-gradient-to-br from-indigo-900 to-slate-500 bg-clip-text text-center font-display text-md font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-6xl md:leading-[5rem]"
                    >
                      <Balancer>Tạo trang thành công</Balancer>
                    </h2>
                  </div>
                  <div className="flex items-center justify-center  gap-2">
                    <br />
                    <Link
                    href={`/u/${session?.user?.id}/t`}
                      className={clsx(`rounded-full disabled flex items-center gap-2 border border-gray justify-center bg-white p-2 px-4 text-display text-black transition-all hover:shadow-md hover:text-black shadow-sm`, {
                        'disabled:opacity-50  pointer-events-none': loading === true
                      })}
                    >
                      <span>Tiếp tục</span>
                    </Link>
                  </div>

                </div>
              }

            </motion.div>
          </AnimatePresence>
        </div>
      </form>
    </div>

  );
};

