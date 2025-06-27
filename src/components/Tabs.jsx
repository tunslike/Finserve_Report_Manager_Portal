// components/Tabs.js
import { useState } from 'react';

export default function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full mt-5 bg-white rounded-[1rem]">
      {/* Tab Headers */}
      <div className="flex border-b p-3 border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-6 mr-3 py-2 text-sm font-medium ${
              index === activeIndex
                ? 'border-b-2 m-1 border-primaryRed text-primaryRed'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
