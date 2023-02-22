import React, { ReactNode, createContext, useContext, useState } from "react";

const ModalPhotoContext = createContext<any>({});
export const useModalPhoto = () => useContext(ModalPhotoContext);


export function MenuStateProvider({ children }: { children: ReactNode}){
   


    const [photoUrl, setPhotoUrl] = useState(null)
    const [show, setShow] = useState(false)
  
    return <ModalPhotoContext.Provider value={{ photoUrl, setPhotoUrl }}>
        {children}
    </ModalPhotoContext.Provider>

}