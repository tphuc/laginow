import { ReactNode } from "react";

interface PaginationBarProps { 
    onClickPrevious?: Function;
    onClickNext?: Function;
    children?: ReactNode;
}


export default function PaginationBar({ onClickNext, onClickPrevious, children }: PaginationBarProps){
    return <div className="relative flex items-center flex-wrap">
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center space-x-2">
        <li><button 
        onClick={() => {
            onClickPrevious?.()
                
        }} className="flex items-center justify-center w-8 h-8 text-indigo-800 transition-colors duration-150 rounded-md focus:shadow-outline bg-indigo-100">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button>
        </li>
        {children}
        <li><button onClick={() => {
           onClickNext?.()
        }} className="flex items-center justify-center w-8 h-8 text-indigo-800 transition-colors duration-150 bg-white rounded-md focus:shadow-outline bg-indigo-100">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button>
        </li>
      </ul>
    </nav>
  </div>
}