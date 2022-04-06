import React, { useState, useEffect } from "react";

const Tabs = ({ children }) => {
  const tabKey = "currentTab";
  const [active, setActive] = useState();

  useEffect(() => {
    const storedTab = localStorage.getItem(tabKey);
    if (storedTab) setActive(storedTab);
    else setActive(children[0].props.label);
  }, []);

  const handleClick = (e, tabName) => {
    e.preventDefault();
    setActive(tabName);
    localStorage.setItem(tabKey, tabName);
  };
  return (
    <div>
      <ul className="tabs">
        {children.map((tab) => (
          <li
            className={tab.props.label == active ? "current" : ""}
            key={tab.props.label}
          >
            <a href="#" onClick={(e) => handleClick(e, tab.props.label)}>
              {tab.props.label}
            </a>
          </li>
        ))}
      </ul>
      {children.map((val) => {
        if (val.props.label == active)
          return (
            <div key={val.props.label}>
              <p>{val}</p>
            </div>
          );
      })}
    </div>
  );
};

export default Tabs;
