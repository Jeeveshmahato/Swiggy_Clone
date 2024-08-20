import { useEffect, useState } from "react";

const USer = (prpos) => {
  let [count, setCount] = useState(0);
  const [count2, setCount2] = useState(2);
  useEffect(() => {
    const timmer = setInterval(() => {
      console.log("timer");
    }, 1000);
    return () => {
      clearInterval(timmer);
    };
  }, []);

  return (
    <div>
      <h1>{prpos.name}</h1>
      <p>This is {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click kr
      </button>
      <p>This is {count2}</p>
    </div>
  );
};
export default USer;
