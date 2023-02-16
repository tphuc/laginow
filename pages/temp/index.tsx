import PageLayout from "@/components/layout/page-layout";


import { ReactNode } from "react";



const Page = () => {


    return (
       <div>
       </div>
    );
}


Page.getLayout = (content: ReactNode) => {
    return <PageLayout>
        {content}
    </PageLayout>
}



export default Page