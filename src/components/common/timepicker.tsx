// TimePicker.tsx

import React, { useEffect, useState } from 'react';

interface TimePickerProps {
    onChange: (value: any) => void;
    onBlur: () => void;
    value: string;
  }

interface timeProps{
    hours?: string;
    minutes?: string;
    ampm?: string;
};

const defaultTime:timeProps = {
    hours: "05",
    minutes:"00",
    ampm: "am"
}

const TimePicker:React.FC<TimePickerProps> = (props) => {
    const { onChange, onBlur, value } = props
    const [time, setTime] = useState<timeProps>(defaultTime)

    useEffect(()=>{
        if(value !== undefined && value !== time){
            const timeData = value.split(':')
            
            setTime(prevTime => ({
                ...prevTime,
                hours: timeData[0].startsWith("0") ? timeData[0].slice(1) : timeData[0],
                minutes: timeData[1],
                ampm: timeData[2]
            }));
        }
        // if(value === undefined){
        //     onChange(`${time.hours}:${time.minutes}:${time.ampm}`)
        // }
    },[value])

    const handleChange=(data:timeProps)=>{
        setTime(data)
        onChange(`${data.hours}:${data.minutes}:${data.ampm}`)
    }

  return (
    <div className="block max-w-[160px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      <div className="flex">
        <div className="mr-3">
            <select
                value={time.hours}
                onChange={(e) => onChange(()=>handleChange({...time, hours:e.target.value}))}
                onBlur={onBlur}
                className="bg-transparent text-md appearance-none outline-none"
            >
            {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`${i + 1}`}>
                {i + 1}
                </option>
            ))}
            </select>
        </div>
        <span className="text-md mr-3">:</span>
        <div className="mr-3">
            <select
                value={time?.minutes}
                onChange={(e) => onChange(()=>handleChange({ ...time, minutes: e.target.value }))}
                onBlur={onBlur}
                className="bg-transparent text-md appearance-none outline-none"
            >
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>
        </div>
        <div>
            <select
                value={time?.ampm}
                onChange={(e) => onChange(()=>handleChange({ ...time, ampm: e.target.value }))}
                onBlur={onBlur}
                className="bg-transparent text-md appearance-none outline-none"
            >
                <option selected={time.ampm == "am"} value="am">AM</option>
                <option selected={time.ampm == "am"} value="pm">PM</option>
            </select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
