import React, { useState, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ActiveSprintIcon } from "../../../../icons/activesprint.svg";
import { ReactComponent as BacklogIcon } from "../../../../icons/backlog.svg";
import { ReactComponent as ReportsIcon } from "../../../../icons/reports.svg";
import { ReactComponent as DotsIcon } from "../../../../icons/dots.svg";
import "./ProjectDetailBar.scss";

const ProjectDetailSideBar = () => {
  const [sidebar, setSideBar] = useState(true);

  const sidebarHandler = () => {
    setSideBar(!sidebar);
  };

  useLayoutEffect(() => {
    function handleResize() {
      if (window.innerWidth <= "767") {
        setSideBar(false);
      } else {
        setSideBar(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {sidebar ? (
        <aside className="ProjectDetailSideBar">
          <div className="projectName">Project Name</div>
          <NavLink to="/project/1">
            <div className="ProjectSideLink">
              <span className="icon-project">
                <BacklogIcon />
              </span>
              Backlog
            </div>
          </NavLink>
          <NavLink to="/project/1">
            <div className="ProjectSideLink">
              <span className="icon-project">
                <ActiveSprintIcon />
              </span>
              Active Sprint
            </div>
          </NavLink>
          <NavLink to="/project/1">
            <div className="ProjectSideLink">
              <span className="icon-project">
                <ReportsIcon />
              </span>
              Reports
            </div>
          </NavLink>
        </aside>
      ) : (
        ""
      )}

      <div className="sideBarSlider" onClick={sidebarHandler}>
        <span className="icon-project">
          <DotsIcon />
        </span>
      </div>
    </>
  );
};

export default ProjectDetailSideBar;
