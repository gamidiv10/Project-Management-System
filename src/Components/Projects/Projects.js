import React, { Fragment } from "react";
import Project from "../Projects/Project/Project";
import "./Projects.scss";
import ProjectHeader from "../Projects/ProjectHeader/ProjectHeader";

const projectsList = [
  { name: "Project1", key: "Pr", type: "Classic", lead: "Harry" },
  { name: "Project2", key: "SC", type: "Software", lead: "Page" },
  { name: "Project3", key: "HT", type: "Software", lead: "Justin" },
  { name: "Project4", key: "PK", type: "Classic", lead: "Boss" },
];

const Projects = () => {
  return (
    <Fragment>
      <ProjectHeader />
      <section className="projectsList">
        <Project projects={projectsList} />
      </section>
    </Fragment>
  );
};

export default Projects;
