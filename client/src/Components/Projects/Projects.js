import React, { Fragment, useEffect, useState } from "react";
import Project from "./Project/Project";
import "./Projects.scss";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import axios from "axios";

const Projects = () => {
const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    axios.get('/project/getProjects')
    .then(response => {
      setProjectsList(response.data.data);
    }).catch(
        error => console.log(error.message)
      );
  }
  return (
    (projectsList.length > 0 ?
    <Fragment>
      <ProjectHeader />
      <section className="projectsList">
        <Project projects={projectsList} />
      </section>
    </Fragment>
    : null)
  );
}

export default Projects;
