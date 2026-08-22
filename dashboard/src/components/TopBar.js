import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p>NIFTY 50</p>
          <p className="index-points">{100.2}</p>
        </div>

        <div className="sensex">
          <p>SENSEX</p>
          <p className="index-points">{100.2}</p>
        </div>
      </div>

     

        <Menu />
      </div>
    
  );
};

export default TopBar;
