import clsx from "clsx";
import { ChangeEventHandler, useCallback, useId, useMemo, useState } from "react"


interface BannerUploadProps  { url?: string, className?: string | null, label?: string | null, onselect: ChangeEventHandler<HTMLInputElement> }
export default function BannerUpload({ url, label = '', className, onselect }: BannerUploadProps) {
    const uploadId = useId();


    return (
        <div className={clsx(`relative bg-slate-700 block aspect-square rounded-md`, className)}>
                {url && <img className="relative rounded-md w-full  h-full" style={{objectFit:"cover"}}  src={url} />}
      
                <label htmlFor={`upload_${uploadId}`} className="absolute z-10 text-sm shadow shadow-sm pointer-cursor hover:text-gray-800 text-gray-500 flex right-2 top-2  rounded-md items-center gap-2 bg-white p-1.5 px-3">
                    {label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
                            <path d="M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        </svg>
                </label>

            <input onChange={onselect} id={`upload_${uploadId}`} type="file" className="hidden" />
        </div>
    )
}


export function useBannerUpload({url}: {url?: string}) {
    const [value, setValue] = useState(url);



    const Component = useCallback((props: BannerUploadProps) => {
        return (
            <BannerUpload  {...props} url={value} />
        );
    }, [value]);

    return useMemo(
        () => ({ value, setValue, BannerUpload: Component }),
        [value, Component],
    );
}
