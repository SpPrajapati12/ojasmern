import React from "react";
import "./query.css";

const Query = () => {
  return (
    <div className="Query mt-4">
      <div className="q_border d-flex justify-content-around">
        <ul className="list-group">
          <a href="#" className="list-group-item nav-link"> <i className="fa-solid fa-caret-right"></i> Important Instruction</a>
        </ul>
        <ul className="list-group">
          <a href="#" className="list-group-item nav-link"> <i className="fa-solid fa-caret-right"></i> Help / Query</a>
        </ul>
        <ul className="list-group">
          <a href="#" className="list-group-item nav-link last"> <i className="fa-solid fa-caret-right"></i> FAQ</a>
        </ul>
      </div>
    </div>
  );
};

export default Query;
