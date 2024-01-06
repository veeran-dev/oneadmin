import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export interface AccordionProps {
  content: {
    title: string;
    description?: string;
    chips: string[];
  }[];
}

const Accordion: React.FC<AccordionProps> = ({ content }) => {
  const [isContentVisible, setIsContentVisible] = useState(0);

  const toggleContentVisibility = (index: number) => {
    setIsContentVisible(index === isContentVisible ? 0 : index);
  };

  return (
    <div
      tabIndex={0}
      className=" flex flex-col w-full px-6 pb-6 border border-b-0 border-gray-200"
    >
      {content?.map((item, index) => (
        <>
          <div
            key={index}
            className="flex flex-row items-center justify-between collapse-title font-semibold text-sm leading-7 text-gray-700 pb-4 pt-6"
            onClick={() => toggleContentVisibility(index+1)}
          >
            <div>{item.title}</div>
            <span className="rounded-xl cursor-pointer p-[2px] hover:bg-gray-100">
              <ChevronDownIcon
                className={`h-[18px] w-[18px] transform ${
                  isContentVisible === (index+1) ? "rotate-180" : "rotate-0"
                }`}
              />
            </span>
          </div>
          <div
            className={`collapse-content transition-all duration-300 ${
              isContentVisible === (index+1)
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {item.description && (
              <p className="font-medium text-sm leading-6 text-gray-500 mb-2">
                {item.description}
              </p>
            )}
            <div className="flex flex-row flex-wrap">
              {item.chips &&
                item.chips.map((item, index) => (
                  <div key={index} className="flex-shrink bg-gray-200 text-gray-700 rounded-full px-3 py-2 mr-2 mb-2 text-xs font-semibold">
                    {item}
                  </div>
                ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Accordion;
