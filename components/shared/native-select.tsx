import * as React from "react"

import { cn } from "@/lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> { }

const NativeSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "relative after:content-[''] after:appearance-none after:block after:w-full after:h-full after:bg-gray-700 shadow shadow-small border-1.5 border-gray-300/80 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 inline-block min-w-[100px] p-2.5 disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
