/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useState } from "react";
import "./ProjectHeader.scss";
import { Button, Form } from "react-bootstrap";
import Modal from "../../Modal/Modal";
import CreateProject from "../CreateProject/CreateProject";
import { useHistory } from "react-router-dom";

const ProjectHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const dismissable = () => {
    setIsModalOpen(false);
    history.push("/home");
  };

  return (
    <>
      <section className="projectHeader">
        <div className="projectHeading">Projects</div>
        <div className="buttons">
          <Button onClick={handleModalOpen}>Create Project</Button>
        </div>
      </section>
      <section>
        <Form className="projectForm">
          <Form.Control type="text" placeholder="Search for project" />
        </Form>
      </section>
      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <CreateProject dismiss={dismissable} /> : ""}
      />
    </>
  );
};

export default ProjectHeader;
