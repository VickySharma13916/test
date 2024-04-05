import React from "react";

const Card = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between relative">
        <div className="flex gap-2">
          <div className="text-2xl"> {data?.id})</div>
          <div className="text-2xl">{data?.quote}</div>
        </div>
        <div className="quotes text-[#e7e6e4] absolute top-[-40px] right-0">
          &#8221;
        </div>
      </div>
      <div className="flex justify-end items-start text-xs font-bold text-[#d3d3cf]">
        - {data?.author}
      </div>
    </div>
  );
};

export default Card;
