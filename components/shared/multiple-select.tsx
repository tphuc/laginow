import { useState, useCallback, useMemo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

interface Item {
  title: string,
  id: string | number,
  [key: string]: any
}
export default function MultiSelect({
  placeholder,
  align = 'start',
  children,
  selected,
  setSelected,
  options = []
}: {
  placeholder?: string,
  align?: "center" | "start" | "end" | undefined,
  children?: any,
  selected?: any[],
  setSelected?: (value: any) => void;
  options: Item[]
}) {

  return (
    <>
      <PopoverPrimitive.Root>
        <div className="inline-flex flex-wrap gap-1 p-2 border rounded-lg shadow-sm bg-stone-100 w-full">
          <PopoverPrimitive.Trigger className="bg-indigo-700 flex gap-1 items-center text-white shadow-md text-gray-500 rounded-2xl  px-3 py-1"  >
            <span>{placeholder}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-rounded-chevron-right" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 9l3 3l-3 3"></path>
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
            </svg>
          </PopoverPrimitive.Trigger>
          {children}
        </div>
        <PopoverPrimitive.Content
          sideOffset={4}
          align={align}
          className="z-20 outline-0 ring-0 p-2 overflow-y-scroll min-h-[120px] max-h-[240px] min-w-[200px] items-left animate-slide-up-fade items-center rounded-md border border-gray-200 bg-white shadow-md"
        >
          {
            options?.map((item: Item, id: number) => {

              // let isChecked =  seleted?.findIndex(e => e.id === item?.id) !== -1

              return <div key={item.id} onClick={() => {
                let foundItem = options?.find(e => e.id === item.id)

                if (foundItem) {

                  let foundIndex = selected?.findIndex(e => e.id === foundItem?.id)

                  if (foundIndex === -1) {
                    setSelected?.((prev: Item[]) => {
                      return [...prev, foundItem]
                    })
                  }
                  else {

                  }
                }


              }} className="flex text-slate-700 items-center gap-2 py-1 px-2 cursor-pointer rounded-md hover:bg-stone-100">
                {/* {isChecked && <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>} */}
                <span>{item.title}</span>
              </div>
            })
          }
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>

    </>
  );
}



export function useMultiSelect() {
  const [selected, setSelected] = useState([]);

  const removeAtIndex = useCallback((index: number) => {
    let arr = [...selected]
    arr.splice(index, 1)
    setSelected(arr)
  }, [selected])

  const Component = useCallback((props: any) => {
    return (
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        {...props}
      />
    );
  }, [selected]);

  return useMemo(
    () => ({ removeAtIndex, selected, MultiSelect: Component }),
    [selected, Component],
  );
}
