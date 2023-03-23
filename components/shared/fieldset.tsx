import clsx from "clsx";
import { ReactElement, ReactNode, useState } from "react";
import LoadingHorizontalDots from "./loading-dots";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export default function Fieldset({ title = '', description = '', subTitle = '', children, onSave }:
  {
    title?: ReactElement | string,
    subTitle?: ReactElement | string,
    description?: ReactElement | string,
    children?: ReactElement,
    onSave?: Function
  }
) {
  const [loading, setLoading] = useState(false);
  return <div className="relative rounded-lg overflow-hidden w-full border-2 border-gray-300/50">
    <label className="flex flex-col justify-start gap-1 w-full p-4 sm:p-6 ">
      {title && <p className="text-xl text-gray-900 ">{title}</p>}
      {subTitle && <p className="text-md font-light text-gray-700">{subTitle}</p>}
      {children}
    </label>
    <div className="flex items-center border-t-2 border-gray-200 justify-between pl-6 pr-4 py-3 bg-gray-200/20">
      <p className="text-sm font-light text-gray-700">{description}</p>

      <Button disabled={loading} onClick={async (e) => {
        e.preventDefault()
        setLoading(true)
        await onSave?.()
        setLoading(false)
      }}>Lưu {loading && <LoadingHorizontalDots />}</Button>
    </div>
  </div>
}
