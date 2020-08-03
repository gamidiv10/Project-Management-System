/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
import React, { Fragment, useEffect, useState } from "react";
import Project from "./Project/Project";
import "./Projects.scss";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import axios from "axios";

const Projects = () => {
  const [projectsList, setProjectsList] = useState([]);
  const userName = localStorage.getItem("user");
  useEffect(() => {
    getProjects();
  }, []);

  //Loading all the projects
  const getProjects = () => {
    axios
      .get(`/project/getProjects/${userName}`)
      .then((response) => {
        setProjectsList(response.data.data);
      })
      .catch((error) => console.log(error.message));
  };
  return projectsList.length > 0 ? (
    <Fragment>
      <ProjectHeader />
      <section className="projectsList">
        <Project projects={projectsList} />
      </section>
    </Fragment>
  ) : null;
};

export default Projects;
