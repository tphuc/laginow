import { cn } from "@/lib/utils";
import clsx from "clsx";
import { AlertCircle, AlertTriangle, Check, Info, Triangle } from "lucide-react";
import { ReactElement } from "react"

export default function StatusText({children, type}: {
    children?: ReactElement | string;
    type?: 'info' | 'danger' | 'warning' | 'success'
}){
    return <span className={cn('text-md transition text-sm cursor-default px-3 py-1.5 gap-2 text-gray-700 flex items-center', {
        '!text-red-700 bg-red-100/50 hover:!text-red-600 rounded-md': type == 'danger',
        '!text-blue-700 bg-blue-100/50 hover:!text-blue-600 rounded-md': type == 'info',
        '!text-yellow-700 bg-orange-100/50 hover:!text-yellow-600 rounded-md': type == 'warning',
        '!text-green-700 bg-green-100/50 hover:!text-green-600 rounded-md': type == 'success',
    })}>
        {type === 'info' && <Info size={16}/>}
        {type === 'danger' && <AlertTriangle size={16}/>}
        {type === 'warning' && <AlertCircle size={16}/>}
        {type === 'success' && <Check size={16}/>}
        {children}
    </span>
}