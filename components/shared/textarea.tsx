import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> { }

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "appearance-none flex min-h-20 w-full shadow shadow-small rounded-md border-1.5 border-gray-200 bg-zinc-50 py-2 px-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"

export { TextArea }
