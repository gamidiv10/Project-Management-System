/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useState } from "react";
import CompleteSprint from "../../../CompleteSprint/CompleteSprint";
import Modal from "../../../Modal/Modal";

const ProjectDetailHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const dismissable = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="projectSprintHeader">
        <div className="projectSprintHeading">Sprint Name</div>
      </section>

      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <CompleteSprint dismiss={dismissable} /> : ""}
      />
    </>
  );
};

export default ProjectDetailHeader;
