import { useState, useEffect } from "react";

export const Auth = () => {
  const [tabToggle, setTabToggle] = useState("login");

  return (
    <div className="comp-container h-[100vh] bg-[#16a085] flex justify-center items-center">
      <div className="auth-comp w-[28rem] h-[28rem] rounded-3xl border-2 border-solid border-black bg-white my-auto flex flex-col">
        <div className="tab-btns inline h-[10rem] w-[100%] relative rounded-3xl flex">
          <div className="tab1 w-[50%] h-[100%] rounded-3xl border-2 border-solid border-black"></div>
          <div className="tab2 w-[50%] h-[100%] rounded-3xl border-2 border-solid border-black"></div>
        </div>
        <div className="forms-container absolute"></div>
        <div className="forms-container absolute"></div>
      </div>
    </div>
  );
};
