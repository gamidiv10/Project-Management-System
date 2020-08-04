/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
import React, { useEffect, useState } from "react";
import Project from "./Project/Project";
import "./Projects.scss";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import axios from "axios";
import { Form } from "react-bootstrap";

const Projects = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [projectsCopy, setProjectsCopy] = useState([]);
  const userName = localStorage.getItem("user");
  useEffect(() => {
    getProjects();
  }, []);

  //Loading all the projects
  const getProjects = () => {
    axios
      .get(`/project/getProjects/${userName}`)
      .then((response) => {
        setProjectsList(
          response.data.data.filter((proj) => proj.projectKey !== "P0")
        );
        setProjectsCopy(response.data.data);
      })
      .catch((error) => console.log(error.message));
  };

  const handleProjectSearch = (e) => {
    e.preventDefault();
    setProjectsList(
      projectsCopy.filter(
        (project) =>
          project.projectName.toLowerCase().includes(e.target.value) ||
          project.projectKey.toLowerCase().includes(e.target.value) ||
          project.projectLead.toLowerCase().includes(e.target.value) ||
          project.projectType.toLowerCase().includes(e.target.value)
      )
    );
  };
  return (
    <>
      <ProjectHeader />
      <section>
        <Form className="projectForm">
          <Form.Control
            type="text"
            onChange={handleProjectSearch}
            placeholder="Search for project"
          />
        </Form>
      </section>
      {projectsList.length > 0 ? (
        <section className="projectsList">
          <Project projects={projectsList} />
        </section>
      ) : null}
    </>
  );
};

export default Projects;
