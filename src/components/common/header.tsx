import Link from "next/link";
import Select from "./select";
import { useRouter } from "next/router";
import Tabs, { tabs } from "./tab";
import Dropdown, {DropdownData} from "./dropdown";

export interface HeaderProps {
  title: string;
  config: {
    mini?: boolean;
    tabs?: boolean;
    tabsData?: tabs[];
    link?: {
      href: string;
      title: string;
    };
    dropdown?: DropdownData,
  };
  
}

export default function Header({ title, config }: HeaderProps) {
  const router = useRouter();
  const currentRoute = router.pathname.includes("dashboard");
  const tabs = true;
  const { dropdown } = config;
  return (
    <div className="flex items-center justify-between py-4">
      {(config.tabs === undefined || config.tabs !== true) && (
        <div className="min-w-0 flex-1">
          <h2
            className={`${
              config?.mini ? "text-xl" : "text-2xl"
            } font-bold leading-7 text-gray-900 sm:truncate`}
          >
            {title}
          </h2>

          {!currentRoute && !config?.mini && (
            <div>
              <button
                className="text-sm text-indigo-400 cursor-pointer"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}

      {config.tabs === true && config?.tabsData && config?.tabsData.length>0 && (
        <div className="min-w-0 flex-1">
          <Tabs tabsData={config.tabsData}/>
        </div>
      )}

      {config.link !== undefined && (
        <Link
          href={config.link["href"]}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {config.link["title"]}
        </Link>
      )}
      {dropdown !== undefined && (
        <Dropdown title={dropdown.title} options={dropdown.options} />
      )}
    </div>
  );
}
