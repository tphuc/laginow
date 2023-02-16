
import axios from 'axios';
import clsx from 'clsx';

import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useId } from 'react';
import { useList } from 'react-use';
import {startTransition} from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';


export interface CloudImage {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl: string;
    width: number;
    height: number;
    size: number;
}

interface ImageUploaderProps {
    images?: CloudImage[] | null;
    preview?: boolean;
    width?: number;
    height?: number;
    onChange?: (value: any) => void,
    placeholder?: string,
    className?: string,
    setImages?: (val: CloudImage[]) => void,
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ className,  images, onChange, placeholder }) => {
    const uploadId = useId()  
    const [list, setList] = useState(images);
    useEffect(() => {
        if (images) {
          setList(images);
        }
      }, [images]);
  
    const [loading, setLoading] = useState(false);



    // const handleRemove = async (index: number) => {
    //     let img = images?.[index]
    //     console.log(img)

    //     try {
    //         if (img) {
    //             await axios.post("/api/media/delete", {
    //                 id: img.fileId
    //             });
    //             let arr = list ? [...list] : []
    //             arr.splice(index, 1)
    //             setList?.(arr)
    //             onChange?.(arr)
    //         }
    
           
    //     }
    //     catch(e){
    //         setLoading(false)
    //     }
        
    // };

    const handleRemove = async (id: string) => {
   
        try {
            if (id) {
                let arr = list ? [...list] : []
                let index = arr?.findIndex(item => item.fileId === id)
                
                console.log(id, list, index)
                if(index == -1){
                    return
                }
                await axios.post("/api/media/delete", {
                    id
                });
                
              
                arr.splice(index, 1)
                console.log(id, arr)
                setList?.(arr)
                onChange?.(arr)
            }
    
           
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

                let img: CloudImage = response.data
                let arrImgs = list ? [...list, img] : [img];
                onChange?.(arrImgs)
                setList?.(arrImgs)
            }
        }
        catch (e) {
    
            setLoading(false)
        }

        setLoading(false)
    }



    return (
        <div className={clsx("grid grid-cols-2 gap-1.5 lg:grid-cols-4 w-full", className)}>
             <input onChange={onUserSelect} id={`upload_${uploadId}`} type="file" className="hidden" />
            <div className={`relative float-right aspect-square rounded-sm bg-white border border-gray-300 shadow-sm`}>
                <label htmlFor={`upload_${uploadId}`} className="flex w-[100%] h-[100%] flex-col items-center justify-center gap-1 cursor-pointer text-gray-500">
                    <ImagePlus/>
                    <span className="text-gray-400 text-sm">{placeholder}</span>
                </label>
                
            </div>
           
            

            {loading && <div className={`relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:rounded-lg before:-translate-x-full  before:animate-[shimmer_1.4s_infinite]  before:bg-gradient-to-r before:from-white before:via-gray-200 before:to-transparent`} />}

            {list?.map((item, id) => <div key={id} className={`relative aspect-square rounded-sm bg-white shadow-sm`}>
                <Image src={item?.url} alt="" fill className={`relative aspect-square object-cover rounded-sm`} loading="lazy" />
                <div onClick={() => handleRemove(item.fileId)} style={{ zIndex: 10 }} className='absolute rounded-xl flex items-center justify-center  bg-white shadow-sm border border-gray-200 p-1 top-[-8px] right-[-8px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M18 6l-12 12"></path>
                        <path d="M6 6l12 12"></path>
                    </svg>
                </div>
            </div>)}
        </div>
    )
};


export function useImageUploader({images, onChange}:{images?: CloudImage[], onChange: (img: CloudImage[]) => void }) {
    const [list, setList] = useState<CloudImage[] | undefined>(images);
  
    const Component = useCallback((props: ImageUploaderProps) => {
        return (
            <ImageUploader  images={list} setImages={setList} {...props} />
        );
    }, [list]);




    return useMemo(
        () => ({ list,  ImageUploaderGrid: Component }),
        [list, images, Component],
    );
}






export default ImageUploader;
