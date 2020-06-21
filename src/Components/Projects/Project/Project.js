import React, { Fragment } from "react";
import "./Project.scss";
import { ReactComponent as KeyIcon } from "../../../icons/key.svg";
import { ReactComponent as ProfileIcon } from "../../../icons/profile.svg";
import { ReactComponent as SettingsIcon } from "../../../icons/bolt.svg";
import { ReactComponent as NewTabIcon } from "../../../icons/newtab.svg";
import { withRouter } from "react-router-dom";

const Project = (props) => {
  const { projects, history } = props;
  const redirectToprojectDetail = (name) => {
    history.push("/project/" + name);
  };

  const editProject = () => {};
  return (
    <Fragment>
      {projects.map((project, index) => (
        <article key={index} className="project">
          <div className="projectName icon">
            <span>{project.name}</span>
            <span
              className="icon-project projectIcons"
              onClick={() => editProject(project.name)}
            >
              <SettingsIcon />
            </span>
            <span
              className="icon-project"
              onClick={() => redirectToprojectDetail(project.name)}
            >
              <NewTabIcon />
            </span>
          </div>
          <div className="projectKey icon">
            <span className="icon-project">
              <KeyIcon />
            </span>
            {project.key}
          </div>
          <div className="projectType">{project.type}</div>
          <div className="projectLead icon">
            <span className="icon-project">
              <ProfileIcon />
            </span>
            {project.lead}
          </div>
        </article>
      ))}
    </Fragment>
  );
};

export default withRouter(Project);
