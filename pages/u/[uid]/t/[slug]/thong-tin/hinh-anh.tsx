
import { EditBusinessPhotos } from '@/components/business/edit-business-photos'
import BusinessPageInforlayout from '@/components/layout/business-page-infor-layout'
import React from 'react'



const Page = () => {
    return <div className='p-5'>
        <EditBusinessPhotos/>
    </div>
}

Page.getLayout = (content: React.ReactNode) => {
    return <BusinessPageInforlayout>
        {content}
    </BusinessPageInforlayout>
}


export default Page