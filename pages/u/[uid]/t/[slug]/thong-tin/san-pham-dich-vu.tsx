
import { useAddProductServiceModal } from '@/components/business/add-product-service'
import { EditBusinessPhotos } from '@/components/business/edit-business-photos'
import { EditMenuPhotos } from '@/components/business/edit-menu-photos'
import BusinessPageInforlayout from '@/components/layout/business-page-infor-layout'
import { Button } from '@/components/shared/button'
import { Switch } from '@/components/shared/switch'
import { trpc } from '@/lib/trpc'
import { cn, formatVND } from '@/lib/utils'
import clsx from 'clsx'
import { Grid, FileImage, Menu, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'



const Page = () => {
  let { slug } = useRouter().query as { slug: string }
  const { data, isLoading } = trpc.business.getProducts.useQuery({ slug })


  const { AddProductService, setShow: setShowAddProductService } = useAddProductServiceModal();
  return <div className='p-5'>
    <AddProductService />
    <p className='flex items-center gap-2 text-xl text-gray-800'>
      Hình ảnh sản phẩm và dịch vụ của shop
    </p>
    <br />

    <label className='flex items-center gap-2 text-gray-500'>
      <Switch />
      Hiển thị bằng hình ảnh
    </label>

    <div className='mt-2 bg-gray-50 border-1.5 border-gray-150 rounded-md'>

      <h1 className='text-gray-700 p-4 border-b-1.5 border-gray-150 text-lg font-medium'>Ảnh sản phẩm / dịch vụ</h1>
      <div className='w-full p-4 bg-white'>
        <EditMenuPhotos />
      </div>

    </div>
    <br />
    <div className='border-2 border-gray-150 bg-gray-50 border-1.5 border-gray-150 rounded-md'>
      <div className='flex w-full justify-between p-4'>

        <div className='' >
          <h6 className='text-gray-700 text-lg font-medium'>Sản phẩm / dịch vụ</h6>
          <h6 className='text-gray-600'>Tạo thủ công</h6>
        </div>
        <Button onClick={async (e) => {
          e.preventDefault();
          setShowAddProductService(true)
        }}>
          thêm
          <Plus size={16} />
        </Button>

      </div>

      <div className='grid grid-cols-1 p-4  xs:grid-cols-2 md:grid-cols-4 gap-4'>
        {data?.map((item) => {

          let images = item?.images as any[]

          return <div className='inline-flex shadow shadow-medium relative flex-col text-gray-800 bg-white rounded-md border border-gray-150/50' key={item?.id}>
            <div onClick={() => {
            }} className="relative rounded-t-md select-none overflow-hidden box-border  cursor-default w-full aspect-square">
              {/* <span className="absolute rounded-sm text-white w-full h-full z-10 bg-black/40 backdrop-blur flex items-center justify-center text-sm text-color-800"></span> */}
              <Image alt='' className="appearance-none w-full object-cover bg-center" style={{ all: 'unset' }} placeholder="empty" fill src={images?.[0]?.url ?? ""} />
            </div>

            <div className='p-4 px-3  border-t border-t-150'>
              <p className='text-gray-900'>{item?.name}</p>
              <p className='text-sm text-gray-700'>{formatVND(item?.minPrice)} - {formatVND(item?.maxPrice)}</p>

            </div>
          </div>
        }

        )}
      </div>
    </div>

  </div>

}

Page.getLayout = (content: React.ReactNode) => {
  return <BusinessPageInforlayout>
    {content}
  </BusinessPageInforlayout>
}


export default Page
