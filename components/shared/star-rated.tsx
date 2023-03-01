import clsx from "clsx";
import StarFilled from "./icons/star-filled";



export default function StarRated({ rated = 5 }: {rated?: number}) {
    return <div className="flex flex-row">
        {[1, 2, 3, 4, 5]?.map(i => <StarFilled className={clsx( i > rated ? 'text-indigo-300' : 'text-indigo-800')} key={i} width={18} height={18} />)}
    </div>
}