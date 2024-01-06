import Link from "next/link";

  export default function Pagination({previous, next}:any) {
    return (
      <nav
        className="flex items-center justify-between border-t border-gray-200 py-3"
        aria-label="Pagination"
      >
        <div className="flex flex-1 justify-between sm:justify-end">
          <Link
            href="#"
            onClick={() => previous()}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </Link>
          <Link
            href="#"
            onClick={() => next()}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </Link>
        </div>
      </nav>
    )
  }
  