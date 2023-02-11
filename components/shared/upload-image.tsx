
import axios from 'axios';

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useId } from 'react';
import { useList } from 'react-use';



interface Image {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl: string;
    width: number;
    height: number;
    size: number;
}

interface ImageUploaderProps {
    images?: Image[];
    preview?: boolean;
    width?: number;
    height?: number;
    onChange?: (value: any) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images: initialImages, onChange, width = 200, height = 200 }) => {
    const uploadId = useId()
    const [images, { push, removeAt, }] = useList(initialImages);

    const [loading, setLoading] = useState(false);


    const handleUpload = (newImage: Image) => {
        push(newImage);
        onChange?.(images)
    };

    const handleRemove = async (index: number) => {
        let img = images[index]

        try {
            if (img) {
                const response = await axios.post("/api/media/delete", {
                    id: img.fileId
                });
                removeAt(index);
            }
    
            onChange?.(images)
        }
        catch(e){
            setLoading(false)
        }
        
    };




    const onUserSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)

        try {
            if (e.target.files) {
                let file = e.target.files[0]
                const formData = new FormData();
                formData.append("file", file);
                const response = await axios.post("/api/media", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                let img: Image = response.data
                handleUpload(img)

            }
        }
        catch (e) {
            setLoading(false)
        }

        setLoading(false)
    }



    return (
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 w-full ">

            <div className={`relative aspect-square  rounded-lg border border-gray-200 bg-white shadow-sm`}>
                <label htmlFor={`upload_${uploadId}`} className="flex w-[100%] h-[100%] flex-col items-center justify-center gap-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload stroke-gray-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 9l5 -5l5 5"></path>
                        <path d="M12 4l0 12"></path>
                    </svg>
                    <span className="text-gray-400 text-sm">Upload file</span>
                </label>
                <input onChange={onUserSelect} id={`upload_${uploadId}`} type="file" className="hidden" />
            </div>
            

            {loading && <div className={`relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:rounded-lg before:-translate-x-full  before:animate-[shimmer_1.4s_infinite]  before:bg-gradient-to-r before:from-white before:via-gray-200 before:to-transparent`} />}

            {images?.map((item, id) => <div key={item?.fileId} className={`relative aspect-square rounded-lg  border border-gray-200 bg-white shadow-sm`}>
                <img src={item?.url} alt=""  className={`relative aspect-square object-cover rounded-md`} loading="lazy" />
                <div onClick={() => handleRemove(id)} style={{ zIndex: 10 }} className='absolute rounded-xl  bg-white shadow-sm p-1 top-[-8px] right-[-8px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M18 6l-12 12"></path>
                        <path d="M6 6l12 12"></path>
                    </svg>
                </div>
            </div>)}





        </div>
    )
};

export default ImageUploader;
