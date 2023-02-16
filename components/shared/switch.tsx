import * as SwitchPrimitive from "@radix-ui/react-switch";
import { clsx } from "clsx";
import React from "react";



export const Switch = (props: any) => {
  return (
    <SwitchPrimitive.Root
        {...props}
        className="w-[42px] h-[25px] bg-gray-300 rounded-full relative shadow-sm  focus:shadow-black data-[state=checked]:bg-sky-600 outline-none cursor-default"
     
      >
        <SwitchPrimitive.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchPrimitive.Root>
  );
};
