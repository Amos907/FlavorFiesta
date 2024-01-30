import React from "react";
import TopNav from "./layout/top-nav";

const MainWrapper = ({ child }) => {
  return (
    <div className="">
      <TopNav />
      {/* <div className="h-96">{child}</div> */}
      {child}
    </div>
  );
};

export default MainWrapper;
