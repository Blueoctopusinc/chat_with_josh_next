import React from "react";

const LineNumber: React.FC<{ index: number }> = ({ index }) => (
  <div
    className={`my-auto min-w-full  border-r-[2px]  border-sky-800 px-1 py-1 text-center ${
      index % 2 ? "bg-gray-900" : "bg-gray-800"
    }`}
  >
    <span>{index + 1}</span>
  </div>
);

export default LineNumber;
