import clsx from "clsx"
import LoadingHorizontalDots from "./loading-dots"






export default function Button({ loading, children, className, ...props }: any) {
    return <button
        disabled={loading}
        className={clsx(`rounded-md disabled flex items-center gap-2 justify-center  border border-black bg-black p-1.5 px-4 text-display text-white transition-all hover:bg-white hover:text-black`, {
            'disabled:opacity-50  pointer-events-none': loading === true,
            className
        })}
        {...props}
    >
        <span>{children}</span>
        {loading && <LoadingHorizontalDots />}
    </button>
}