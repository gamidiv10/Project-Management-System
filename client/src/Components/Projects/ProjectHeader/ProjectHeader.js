/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useState } from "react";
import "./ProjectHeader.scss";
import { Button } from "react-bootstrap";
import Modal from "../../Modal/Modal";
import CreateProject from "../CreateProject/CreateProject";

const ProjectHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const dismissable = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <>
      <section className="projectHeader">
        <div className="projectHeading">Projects</div>
        <div className="buttons">
          <Button onClick={handleModalOpen}>Create Project</Button>
        </div>
      </section>
      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <CreateProject dismiss={dismissable} /> : ""}
      />
    </>
  );
};

export default ProjectHeader;
