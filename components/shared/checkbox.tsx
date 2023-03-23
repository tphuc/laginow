import * as React from "react"

import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type='checkbox'

        className={cn(
          "ml-2 w-6 h-6 relative after:content-[''] after:block after:w-full after:h-full border-1.5 border-gray-300 shadow shadow-sm rounded-md checked:bg-indigo-700 transition-colors ease-in-out checked:hover:bg-indigo-900",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
