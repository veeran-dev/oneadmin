import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type tabs = {
    name: string;
    href: string;
    current: boolean;
}


  
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Tabs({tabsData}:{tabsData: tabs[]|undefined}) {
    console.log("tabsData.........",tabsData)
    // const tabsData:tabs[] = [
    //     { name: 'Settings', href: '/settings', current: false },
    //     { name: 'Batch', href: '/batch', current: false },
    //     { name: 'Branch', href: '/branch', current: true },
    //     { name: 'Course', href: '/course', current: false },
    //     { name: 'Staffs', href: '/staff', current: false },
    // ]
    const [tabs, setTabs] = useState(tabsData)
    const router = useRouter()
    
    useEffect(()=>{
      if(tabs){
          const currentRoute = router.pathname
          const updatedTabs = tabs.map((tab) => ({
              ...tab,
              current: currentRoute.includes(tab.href),
            }));

          console.log(updatedTabs)
          console.log(tabs)
          setTabs(updatedTabs)
      }
    },[router])

      if(tabs === undefined){
        return("Something is wrong")
      }

      return (
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={tabs.find((tab) => tab.current)?.name}
            >
              {tabs && tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs && tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )
  }