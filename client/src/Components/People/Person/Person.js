import React, { Fragment, useState, useEffect } from "react";
import { ReactComponent as NewTabIcon } from "../../../icons/newtab.svg";
import { withRouter } from "react-router-dom";
import "./Person.scss";
import Modal from "../../Modal/Modal";
import AddUser from "../../AddUser/AddUser";

const Person = (props) => {
  var { people, history } = props;
  const [peopleList, setPeopleList] = useState(new Set(people));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));
  useEffect(() => {
    if (selectedProject != null) {
      people = people.filter(
        (item) => item.projectKey === selectedProject.projectKey
      );
    }
    setPeopleList(new Set(people));
  }, [people]);

  const redirectTopeopleDetail = (name) => {
    history.push("/people/" + name);
  };

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const dismissable = (newUser) => {
    people.push(newUser);
    people = people.filter(
      (item) => item.projectKey === selectedProject.projectKey
    );
    setPeopleList(new Set(people));
    console.log("dismiss", peopleList);
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      {Array.from(peopleList).map((person, index) => (
        <article key={index} className="person">
          <div className="personName icon">
            <span>{person.name}</span>
            <span
              className="icon-person personIcons"
              onClick={() => redirectTopeopleDetail(person.name)}
            >
              <NewTabIcon />
            </span>
          </div>
          <div className="personType">{person.role}</div>
        </article>
      ))}
      <article key={Math.random()} className="person">
        <div className="personName icon">
          <span className="add-user-span" onClick={handleModalOpen}>
            Add Existing User<br></br>
            to the Project
          </span>
        </div>
      </article>
      <Modal
        visible={isModalOpen}
        children={isModalOpen ? <AddUser dismiss={dismissable} /> : ""}
      />
    </Fragment>
  );
};

export default withRouter(Person);
