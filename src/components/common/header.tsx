import Link from "next/link";
import Select from "./select";

export default function Header({
  title,
  config,
}: {
  title: string;
  config: any;
}) {
  const Option: { value: string; name: string }[] = [
    { name: "Select Branch", value: "Select Branch" },
  ];
  return (
    <div className="flex items-center justify-between py-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
      {config.options !== false && (
        <div className="">
          <Select title="Select Branch" options={Option} />
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
    </div>
  );
}
