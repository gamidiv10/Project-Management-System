import React from "react";
import ProjectDetailSideBar from "./ProjectDetailSideBar/ProjectDetailSideBar";
import ProjectDetailMain from "./ProjectDetailMain/ProjectDetailMain";
import "./ProjectDetail.scss";

const ProjectDetail = () => {
  return (
    <>
      <main className="ProjectDetail">
        <ProjectDetailSideBar />
        <ProjectDetailMain />
      </main>
    </>
  );
};

export default ProjectDetail;
