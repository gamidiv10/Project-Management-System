/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
import React, { Fragment, useState, useEffect } from "react";
import "./Project.scss";
import { ReactComponent as KeyIcon } from "../../../icons/key.svg";
import { ReactComponent as ProfileIcon } from "../../../icons/profile.svg";
import { ReactComponent as SettingsIcon } from "../../../icons/bolt.svg";
import { ReactComponent as NewTabIcon } from "../../../icons/newtab.svg";
import { withRouter } from "react-router-dom";
import Modal from "../../Modal/Modal";
import EditProject from "../EditProject/EditProject";

const Project = (props) => {
  const { projects, history } = props;
  const [projectsCopy] = useState(projects);
  const [projectList, setProjectsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  useEffect(() => {
    setProjectsList(projects);
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const dismissable = (projectName, projectKey, projectType) => {
    if (projectKey != null) {
      for (var i = 0; i < projectsCopy.length; i++) {
        if (projectsCopy[i].projectKey === projectKey) {
          projectsCopy[i].projectName = projectName;
          projectsCopy[i].projectType = projectType;
        }
      }
      setProjectsList(projectsCopy);
    }
    setIsModalOpen(false);
  };
  const redirectToprojectDetail = (proj) => {
    history.push(`/project/${proj.projectName}/activesprint`, proj);
  };

  const editProject = (project) => {
    setSelectedProject(project);
  };
  let editProjectProps = {
    project: selectedProject,
    dismiss: dismissable,
  };

  return (
    <Fragment>
      {projectList.map((project, index) => (
        <article key={index} className="project">
          <div className="projectName icon">
            <span>{project.projectName}</span>
            <span
              className="icon-project projectIcons"
              onClick={() => editProject(project)}
            >
              <SettingsIcon onClick={handleModalOpen} />
            </span>
            <span
              className="icon-project"
              onClick={() => redirectToprojectDetail(project)}
            >
              <NewTabIcon />
            </span>
          </div>
          <div className="projectKey icon">
            <span className="icon-project">
              <KeyIcon />
            </span>
            {project.projectKey}
          </div>
          <div className="projectType">{project.projectType}</div>
          <div className="projectLead icon">
            <span className="icon-project">
              <ProfileIcon />
            </span>
            {project.projectLead}
          </div>
        </article>
      ))}
      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <EditProject props={editProjectProps} /> : ""}
      />
    </Fragment>
  );
};

export default withRouter(Project);
