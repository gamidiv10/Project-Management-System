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
  var [projectList, setProjectsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  useEffect(() => {
     setProjectsList(projects);
  }, [])
  
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const dismissable = (projectName, projectKey, projectType) => {
    setIsModalOpen(false);
    if(projectKey != null){
      for(var i = 0; i < projectList.length; i++){
        if(projectList[i].projectKey == projectKey){
          projectList[i].projectName = projectName;
          projectList[i].projectType = projectType;
        }
      }
      setProjectsList(projectList);
    }
  };
  const redirectToprojectDetail = (name) => {
    history.push("/project/activesprint");
  };

  const editProject = (project) => {
    setSelectedProject(project);
  };
  let editProjectProps = {
    "project": selectedProject,
    "dismiss": dismissable,
  }

  return (
    <Fragment>
      {projectList.map((project, index) => (
        <article key={index} className="project" onClick={handleModalOpen}>
          <div className="projectName icon">
            <span>{project.projectName}</span>
            <span
              className="icon-project projectIcons"
              onClick={() => editProject(project)}
            >
              <SettingsIcon />
            </span>
            <span
              className="icon-project"
              onClick={() => redirectToprojectDetail(project.projectName)}
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
        children={isModalOpen ? <EditProject props = {editProjectProps} /> : ""}
      />
    </Fragment>
  );
};

export default withRouter(Project);
