/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useState, useLayoutEffect, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ReactComponent as ActiveSprintIcon } from "../../../../icons/activesprint.svg";
import { ReactComponent as BacklogIcon } from "../../../../icons/backlog.svg";
import { ReactComponent as ReportsIcon } from "../../../../icons/reports.svg";
import { ReactComponent as DotsIcon } from "../../../../icons/dots.svg";
import { ReactComponent as PeopleIcon } from "../../../../icons/people.svg";
import "./ProjectDetailSideBar.scss";

const ProjectDetailSideBar = ({ history, match }) => {
  const [sidebar, setSideBar] = useState(true);
  const [projectName, setProjectName] = useState(match.params.projectName);

  useEffect(() => {
    if (match.params.projectName?.length > 0) {
      setProjectName(match.params.projectName);
    }
  }, [match.params.projectName]);

  const sidebarHandler = () => {
    setSideBar(!sidebar);
    let width = document.getElementsByClassName("ProjectDetail")[0].clientWidth;
    width = !sidebar ? width - 225 : width - 15;
    document.getElementsByClassName("ProjectDetailMain")[0].style.width =
      "" + width + "px";
  };

  useLayoutEffect(() => {
    function handleResize() {
      let width = document.getElementsByClassName("ProjectDetail")[0]
        .clientWidth;
      if (window.innerWidth <= "767") {
        setSideBar(false);
        width = width - 30;
        document.getElementsByClassName("ProjectDetailMain")[0].style.width =
          "" + width + "px";
      } else {
        setSideBar(true);
        width = sidebar ? width - 225 : width - 15;
        document.getElementsByClassName("ProjectDetailMain")[0].style.width =
          "" + width + "px";
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
          <div className="projectName">{projectName}</div>
          <NavLink to="/project/backlog">
            <div
              className={
                history.location.pathname === "/project/backlog"
                  ? "ProjectSideLink active"
                  : "ProjectSideLink"
              }
            >
              <span className="icon-project">
                <BacklogIcon />
              </span>
              Backlog
            </div>
          </NavLink>
          <NavLink to={`/project/${projectName}/activesprint`}>
            <div
              className={
                history.location.pathname ===
                `/project/${projectName}/activesprint`
                  ? "ProjectSideLink active"
                  : "ProjectSideLink"
              }
            >
              <span className="icon-project">
                <ActiveSprintIcon />
              </span>
              Active Sprint
            </div>
          </NavLink>
          <NavLink to={`/project/${projectName}/reports`}>
            <div
              className={
                history.location.pathname === `/project/${projectName}/reports`
                  ? "ProjectSideLink active"
                  : "ProjectSideLink"
              }
            >
              <span className="icon-project">
                <ReportsIcon />
              </span>
              Reports
            </div>
          </NavLink>
          <NavLink to={`/project/${projectName}/people`}>
            <div
              className={
                history.location.pathname === `/project/${projectName}/people`
                  ? "ProjectSideLink active"
                  : "ProjectSideLink"
              }
            >
              <span className="icon-project">
                <PeopleIcon />
              </span>
              People
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

export default withRouter(ProjectDetailSideBar);
