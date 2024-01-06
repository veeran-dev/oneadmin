
const stats = [
    { name: 'Total Students', value: '32', change: '+4.75%', changeType: 'positive' },
    { name: 'Start Time', value: '03:00 AM', change: '+54.02%', changeType: 'negative' },
    { name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
  ]
  
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function PageAnalytics() {
    return (
      <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:p-4"
          >
            <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
            <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    )
  }
  