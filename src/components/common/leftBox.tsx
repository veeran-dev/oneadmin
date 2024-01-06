import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker"

export default function LeftBox(){
    return(
        <section aria-labelledby="summary-heading" className="flex-1 rounded-lg bg-gray-50 px-4 py-6 ">
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Attendnce summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Present</dt>
              <dd className="text-sm font-medium text-gray-900">{"32"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Absent</dt>
              <dd className="text-sm font-medium text-gray-900">{"03"}</dd>
            </div>
            <div className="flex flex-col border-t border-gray-200 pt-4">
                <label className="pb-2 text-sm">Select Date</label>
                <Datepicker
                    // dateFormat="DD/MM/YYYY"
                    dateFormat="dd/MM/yyyy"
                    selected={new Date()}
                    onChange={(e)=>console.log(e)}
                />
            </div>
          </dl>

          <div className="mt-6">
            <button 
                type="submit" 
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Save</button>
          </div>
        </section>
    )
}