

export default function LoadingHorizontalDots({color = 'white'}: {color?: string}){
    return <span className="inline-flex items-center gap-px">
    <span className={`animate-blink mx-px h-1.5 w-1.5 rounded-full bg-${color}`}></span>
    <span className={`animate-blink animation-delay-200 mx-px h-1.5 w-1.5 rounded-full bg-${color}`}></span>
    <span className={`animate-blink animation-delay-[400ms] mx-px h-1.5 w-1.5 rounded-full bg-${color}`}></span>
  </span>
}