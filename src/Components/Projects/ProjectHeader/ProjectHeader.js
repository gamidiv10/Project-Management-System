import React from "react";
import "./ProjectHeader.scss";
import { Button, Form } from "react-bootstrap";

const ProjectHeader = () => {
  return (
    <>
      <section className="projectHeader">
        <div className="projectHeading">Projects</div>
        <div className="buttons">
          <Button>Create Project</Button>
        </div>
      </section>
      <section>
        <Form className="projectForm">
          <Form.Control type="text" placeholder="Search for project" />
        </Form>
      </section>
    </>
  );
};

export default ProjectHeader;
