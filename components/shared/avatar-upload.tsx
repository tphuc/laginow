import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ChangeEventHandler, useCallback, useId, useMemo, useState } from "react"


interface AvatarUploadProps  { url?: string, className?: string | null, label?: string | null, onselect: ChangeEventHandler<HTMLInputElement> }
export default function AvatarUpload({ url, label = '', className, onselect }: AvatarUploadProps) {
    const uploadId = useId();


    return (
        <div className={cn(`relative bg-gradient-to-r from-cyan-500 to-blue-500  block aspect-square rounded-full`, className)}>
                <img className="relative rounded-full" src={url} />
      
                <div className="absolute w-7 h-7 sm:w-8 sm:h-8  bg-gray-100/90 text-gray-700 top-[-8%] left-[-8%] rounded-full">
                    <label htmlFor={`upload_${uploadId}`} className="flex w-[100%] h-[100%] flex-col items-center justify-center gap-0 cursor-pointer ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"></path>
                            <path d="M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        </svg>
                        <span className="text-gray-400 text-sm">{label}</span>
                    </label>
                </div>

            <input onChange={onselect} id={`upload_${uploadId}`} type="file" className="hidden" />
        </div>
    )
}


export function useAvatarUpload({url}: {url?: string}) {
    const [value, setValue] = useState(url);



    const Component = useCallback((props: AvatarUploadProps) => {
        return (
            <AvatarUpload  {...props} url={value} />
        );
    }, [value]);

    return useMemo(
        () => ({ value, setValue, AvatarUpload: Component }),
        [value, Component],
    );
}
