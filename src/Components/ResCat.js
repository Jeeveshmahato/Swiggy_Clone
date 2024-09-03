import { useState } from "react";
import CatItems from "./CatItems";

const ResCat = ({ data, show , setShowIndex }) => {
  // console.log(data);
  handleclick = () => {
    setShowIndex();
  };
  return (
    <div className=" flex flex-col gap-5">
      <div
        className=" w-full flex justify-between cursor-pointer  border shadow-xl px-6 py-3 rounded-lg"
        onClick={handleclick}
      >
        <h3>{data.title}</h3>
        <p>🔽</p>
      </div>
      <div>
        {show &&
          data.itemCards.map((res) => <CatItems key={res.title} data={res} />)}
      </div>
    </div>
  );
};

export default ResCat;
