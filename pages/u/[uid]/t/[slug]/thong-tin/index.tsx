
import { ArrowUpRight, CalendarPlus, Check, ChevronDown, Clock, Clock11, Cross, Eye, FileImage, FlagTriangleRight, Gem, Grid, ImagePlus, Layout, LayoutGrid, Link2, LucideGrid, Map, MessageSquare, MonitorSpeaker, Share, Star, X } from "lucide-react"
import * as Tabs from '@radix-ui/react-tabs';
import { blue, violet } from "@radix-ui/colors";
import clsx from "clsx";
import { useRouter } from "next/router";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/components/shared/toast";
import Image from "next/image";
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React, { ReactNode, useState } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Switch } from "@/components/shared/switch";
import Link from "next/link";
import Places2, { PlacesAutocomplete } from "@/components/shared/map/autocomplete";
import { useForm } from "react-hook-form";
import LoadingHorizontalDots from "@/components/shared/loading-dots";
import EditWorkingHours, { WorkingHours } from "@/components/working-hrs";
import { useModalEditBusinessPhotos } from "@/components/business/edit-business-photos";
import BusinessPageInforlayout from "@/components/layout/business-page-infor-layout";
import Fieldset from "@/components/shared/fieldset";
import { INPUT_STYLES } from "@/lib/constants";
import StatusText from "@/components/shared/status-text";
import slugify from "slugify";
import { cn } from "@/lib/utils"
import { TextArea } from "@/components/shared/textarea";
import { Input } from "@/components/shared/input";










let tabItemClsx = cn(
  "relative",
  "transition-all w-full flex items-center gap-2 text-left",
  // "data-active:border-gray-800 border-b-2 border-transparent border-gray-800 text-gray-600 data-active:text-gray-900",
  "px-4 py-2 whitespace-nowrap text-md",
  "hover:bg-gray-100 text-gray-600 font-revert rounded-md",
  "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-0.5 data-active:text-blue-900 data-active:bg-slate-100",
  "focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
)

let accordionPrimitveItemClsx = "bg-gray-100 text-slate-700 overflow-hidden border border-gray-200 rounded-md focus-within:ring focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-none w-full"
let accordionPrimitiveTriggerClsx = cn(
  "group",
  "radix-state-open:rounded-t-md radix-state-closed:rounded-t-md",
  "focus:outline-none",
  "inline-flex w-full items-center text-slate-700 justify-between px-4 py-2 text-left"
)

const Page = ({ children }: { children: ReactNode }) => {

  let { slug } = useRouter().query as { slug: string }
  const updateBusiness = trpc.business.updateBySlug.useMutation()

  const trpcContext = trpc.useContext()

  const { data, isLoading } = trpc.business.getBySlug.useQuery({ slug }, { refetchOnWindowFocus: true, refetchOnMount: true })
  console.log(data?.workingHrs)
  const { setShow: setShowEditBusinessPhotos, ModalEditBusinessPhotos } = useModalEditBusinessPhotos()

  let images = data?.images as { url: string, fileId: string }[]
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const parentPath = router.pathname === '/u/[uid]/t/[slug]/thong-tin' ? router.asPath : router.asPath.slice(0, router.asPath.lastIndexOf('/'))

  // let { setValue: setAvatarUrl, AvatarUpload } = useAvatarUpload({ url: '' })
  // let { setValue: setBannerUrl, BannerUpload } = useBannerUpload({ url: '' })

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.78746222,
    lng: -122.412923,
  });

  const [zoom, setZoom] = useState<number>(15);

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!);

    const nextCenter = map.getCenter();

    if (nextCenter) {
      setCenter(nextCenter.toJSON());
    }
  };


  let { getValues, watch, formState, register, setError, clearErrors, setValue } = useForm({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      address: data?.address as string,
      workingHrs: data?.workingHrs as any,

    }
  });




  const updateLocation = async () => {
    if (!getValues('address')) {
      return
    }
    try {
      setLoading(true)
      let res = await updateBusiness.mutateAsync({
        slug, data: {
          address: getValues('address') as string
        }
      })

      if (res.id) {
        toast('success', 'Cập nhật thành công')
      }
      setLoading(false)
    }
    catch (e) {
      setLoading(false)
    }
  }

  const updateWorkingHrs = async () => {

    if (!getValues('workingHrs') as any) {
      return
    }


    try {

      setLoading(true)
      let res = await updateBusiness.mutateAsync({
        slug,
        data: {
          workingHrs: getValues('workingHrs')
        }
      })

      if (res.id) {
        toast('success', 'Cập nhật thành công')
      }

      setLoading(false)

    }
    catch (e) {
      console.log(e)
      setLoading(false)
    }

  }


  const isOpening = React.useCallback(() => {
    if (!data?.workingHrs) {
      return null
    }

    let workingHours = data?.workingHrs as WorkingHours;

    let day: keyof WorkingHours = new Date().getDay() as any
    let workingHrToday = workingHours[day]

    let currentHr = new Date().getHours()
    if (workingHrToday.isOpen24Hours) {
      return true
    }

    if (workingHrToday.openingHour < workingHrToday.closingHour) {
      if (workingHrToday.openingHour <= currentHr && currentHr <= workingHrToday.closingHour) {
        return true
      }
      else {
        return false
      }
    }
    else {
      if (workingHrToday.openingHour >= currentHr && currentHr >= workingHrToday.closingHour) {
        return true
      }
      else {
        return false
      }
    }
  }, [data?.workingHrs])

  const getOpeningHr = React.useCallback(() => {
    if (!data?.workingHrs) {
      return null
    }
    let workingHours = data?.workingHrs as WorkingHours;

    let day: keyof WorkingHours = new Date().getDay() as any

    let workingHrToday: {
      isOpen24Hours: boolean;
      openingHour: number;
      closingHour: number;
    } = workingHours[day]


    return {
      isOpen24Hours: workingHrToday.isOpen24Hours,
      openingHour: `${workingHrToday.openingHour}` + (workingHrToday.openingHour <= 12 ? 'AM' : 'PM'),
      closingHour: `${workingHrToday.closingHour}` + (workingHrToday.closingHour <= 12 ? 'AM' : 'PM'),
    }
  }, [data?.workingHrs])


  const isSlugAvailable = async (value: string) => {
    let slug = slugify(value, { lower: true })
    let record = await trpcContext.business.getBySlug.fetch({ slug })

    if (record?.id) {
      return false
    }
    return true
  }


  return <>
    <div className="flex flex-col gap-5">

      <Fieldset
        onSave={async () => {
          clearErrors('title')
          if (!getValues('title')) {
            setError('title', { message: "Không được để trống" }, { shouldFocus: true })
            return
          }

          let res = await updateBusiness.mutateAsync({
            slug,
            data: {
              description: getValues('description') as string
            }
          })
          if (res) {
            toast('success', 'cập nhật thành công')
          }
          return
        }}
        title={'Tên trang'}
        description={'Không quá 124 ký tự'}
      >
        <div className="flex flex-col gap-1 w-full md:w-96 ">

          <Input disabled defaultValue={data?.title} type="text" {...register('title')} placeholder="Coffee Thống Nhất..." required autoFocus />

          {formState.errors?.title && <StatusText type={'danger'}>{formState.errors?.title?.message}</StatusText>}
        </div>
      </Fieldset>

      <Fieldset
        onSave={async () => {
          clearErrors('description')
          let res = await updateBusiness.mutateAsync({
            slug,
            data: {
              description: getValues('description') as string
            }
          })
          if (res) {
            toast('success', 'cập nhật thành công')
          }
          return
        }}
        title={'Mô tả / giới thiệu'}
        subTitle={'Vài dòng giới thiệu về trang'}
        description={'Không quá 400 ký tự'}
      >
        <div className="flex flex-col gap-1 w-full md:w-96 ">
          <TextArea defaultValue={data?.description as string} {...register('description')} placeholder="Mô tả ngắn về kinh doanh của bạn" />
          {formState.errors?.description && <StatusText type={'danger'}>{formState.errors?.description?.message}</StatusText>}
        </div>
      </Fieldset>

      <Fieldset
        onSave={async () => {
          let res = await updateBusiness.mutateAsync({
            slug,
            data: {
              workingHrs: getValues('workingHrs')
            }
          })
          if (res) {
            toast('success', 'cập nhật thành công')
          }
          return

        }}
        title={'Giờ làm việc'}
      >

        <div>
          <EditWorkingHours onSave={(val) => setValue('workingHrs', val)}
            initialWorkingHours={data?.workingHrs as any} />
        </div>


      </Fieldset>

    </div>
    {/* <ModalEditBusinessPhotos />

        <div className="relative w-full flex-wrap flex flex-row gap-4  p-2 md:p-4">
            <div className="w-full flex-1  w-120 md:w-124">
                <div className="bg-white text-gray-700 min-h-[200px] rounded-md shadow shadow-sm p-2">
                    <AccordionPrimitive.Root
                        type="multiple"
                        //   defaultValue="1"

                        className={cn("space-y-2 w-full")}
                    >

                        <AccordionPrimitive.Item
                            value={`1`}
                            className={accordionPrimitveItemClsx}
                        >
                            <AccordionPrimitive.Header className="w-full">
                                <AccordionPrimitive.Trigger
                                    className={accordionPrimitiveTriggerClsx}
                                >
                                    <span className="text-sm  flex items-center gap-2 font-medium">
                                        <ImagePlus /> Hình ảnh & videos
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                        )}
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3">
                                <div className="text-sm text-gray-700 dark:text-gray-400">
                                    <div onClick={() => setShowEditBusinessPhotos(true)} className={cn(`inline-flex cursor-pointer font-sm items-center gap-1 shadow shadow-sm hover:text-gray-800 text-gray-500`,
                                        "cursor-pointerz-1 px-3  py-1.5 bg-white rounded-md")}>
                                        {images?.length} ảnh & video đã chọn <Grid size={18} />
                                    </div>
                                </div>
                            </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>


                        <AccordionPrimitive.Item
                            value={`2`}
                            className={accordionPrimitveItemClsx}
                        >
                            <AccordionPrimitive.Header className="w-full">
                                <AccordionPrimitive.Trigger
                                    className={accordionPrimitiveTriggerClsx}
                                >
                                    <span className="text-sm  flex items-center gap-2 font-medium ">
                                        <Map /> Maps
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                        )}
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3 ">
                                <div className="relative text-sm relative w-full text-gray-700">

                                    <Places2 defaultValue={data?.address as string} setSelected={(location) => {
                                        setValue('address', location.address)
                                    }} />



                                    {watch('address') && <iframe
                                        title="map"
                                        width="100%"
                                        height={200}
                                        className="border border-stone-300 rounded-sm my-2"
                                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(watch('address'))}`}
                                        onLoad={() => { }}
                                        allowFullScreen
                                    />}

                                    {(!watch('address') && data?.address) && <iframe
                                        title="map"
                                        width="100%"
                                        height={200}
                                        className="border border-stone-300 rounded-sm my-2"
                                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(data?.address)}`}
                                        onLoad={() => { }}
                                        allowFullScreen
                                    />}


                                    <button disabled={loading} onClick={updateLocation} className={cn(`rounded-md my-2 shadow disabled float-right flex items-center gap-2 justify-center  bg-indigo-800 p-1.5 px-4 text-display text-white transition-all `, {
                                        'disabled:opacity-50 disabled pointer-events-none': loading === true
                                    })}>
                                        Cập nhật
                                        {loading && <LoadingHorizontalDots />}
                                    </button>

                                </div>
                            </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>


                        <AccordionPrimitive.Item
                            value={`3`}
                            className={accordionPrimitveItemClsx}
                        >
                            <AccordionPrimitive.Header className="w-full">
                                <AccordionPrimitive.Trigger
                                    className={accordionPrimitiveTriggerClsx}
                                >
                                    <span className="text-sm  flex items-center gap-2 font-medium ">
                                        <Clock11 /> Giờ hoạt động
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                        )}
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg  px-4 pb-3 ">
                                <div className="relative text-sm relative w-full text-gray-700">

                                    <EditWorkingHours onSave={(val) => setValue('workingHrs', val)}
                                        initialWorkingHours={data?.workingHrs as any} />

                                    <button disabled={loading} onClick={updateWorkingHrs} className={cn(`rounded-md my-2 shadow disabled float-right flex items-center gap-2 justify-center  bg-indigo-800 p-1.5 px-4 text-display text-white transition-all `, {
                                        'disabled:opacity-50 disabled pointer-events-none': loading === true
                                    })}>
                                        Cập nhật
                                        {loading && <LoadingHorizontalDots />}
                                    </button>

                                </div>
                            </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>

                    </AccordionPrimitive.Root>

                </div>
            </div>
            <div className="relative flex-1 w-full min-w-[300px] ">
                <div className="w-full relative min-w-[300px] shadow shadow-sm overflow-hidden rounded-lg">
                    <div className="relative bg-white  flex  w-full  h-36 sm:h-48 md:h-56 lg:h-62 ">
                        {images?.slice(0, 5)?.map((item: { url: string }, id: number) =>
                            <Image
                                key={id}
                                alt=''
                                src={item.url}
                                width={400}
                                height={400}
                                style={{
                                    width: 'auto',
                                    height: '100%',
                                }}
                                className="object-cover"
                                loading="lazy"
                            />

                        )}


                        <div className="absolute w-full h-full" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.01),rgba(0,0,0,0.05), rgba(0,0,0,0.2),  rgba(0,0,0,0.3)) " }}></div>

                        <div className="absolute text-white bottom-[4%] left-[4%]">
                            <h1 className="text-white  md:text-4xl text-2xl">{data?.title}</h1>
                            <div className="flex items-center gap-1">
                                <Clock11 size={16} /> {(!isOpening() && isOpening() != null) ? <span className="text-red-400">Đã đóng</span> : <span className="text-green-400"> Đang mở</span>}
                                <div className="bg-white/20 rounded-full cursor-default p-0.5 px-2">{getOpeningHr()?.openingHour}-{getOpeningHr()?.closingHour}</div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-2 z-1000  right-2">
                        <Link className="bg-white flex items-center px-2 py-1 text-sm rounded-md" href={`/t/${slug}`}>Xem thử <ArrowUpRight size={16} /> </Link>
                    </div>


                    <div className="flex flex-row gap-2 bg-gray-50 items-center w-full bg-white py-3 px-2 ">
                        <div className="bg-indigo-800 text-white cursor-pointer inline-flex border gap-2 border-gray-200 items-center shadow-sm px-3 py-1.5  rounded-md" > Đánh giá <Star size={16} /> </div>
                        <div className="cursor-pointer inline-flex border gap-2 border-gray-200 bg-white items-center shadow-sm px-3 py-1.5  rounded-md" > Chia sẻ <Link2 /> </div>
                    </div>
                </div>

            </div>






        </div> */}
  </>
}

Page.getLayout = (content: ReactNode) => {
  return <BusinessPageInforlayout>
    {content}
  </BusinessPageInforlayout>
}


export default Page;
