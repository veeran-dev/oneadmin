const Stats=({stats}:any)=>{

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    return(
        <div className="mb-12 grid gap-y-6 gap-x-6 grid-cols-3 pr-4">
        {stats.map((stat:{name:string, value:string, unit:string}) => (
          <div
            key={stat.name}
            className={classNames('p-4 bg-clip-border rounded-xl bg-white text-gray-900 border border-blue-gray-100 shadow-sm'
            )}
          >
            <p className="text-sm font-medium leading-6 text-gray-900">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-gray-800">{stat.value}</span>
              {stat.unit ? <span className="text-sm text-gray-900">{stat.unit}</span> : null}
            </p>
          </div>
        ))}
      </div>
    )
}

export default Stats