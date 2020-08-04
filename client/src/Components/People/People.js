/**
 * @author Vamsi Gamidi <vamsi.gamidi@dal.ca>
 */
import React, { useState, useEffect } from "react";
import Person from "./Person/Person";
import PeopleHeader from "./PeopleHeader/PeopleHeader";
import "./People.scss";
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail";
import axios from "axios";
import { Form } from "react-bootstrap";

const People = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [peopleCopyList, setPeopleCopyList] = useState([]);
  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = () => {
    //Request to load all users
    axios
      .get("/people/getPeople")
      .then((response) => {
        setPeopleList(response.data.data);
        setPeopleCopyList(response.data.data);
      })
      .catch((error) => console.log(error.message));
  };
  const handlePeopleSearch = (e) => {
    e.preventDefault();
    setPeopleList(
      peopleCopyList.filter(
        (user) =>
          user.name.toLowerCase().includes(e.target.value) ||
          user.role.toLowerCase().includes(e.target.value)
      )
    );
  };
  return (
    <>
      <ProjectDetail>
        <main className="ProjectDetailMain">
          <PeopleHeader />
          <section>
            <Form className="peopleForm">
              <Form.Control
                onChange={handlePeopleSearch}
                type="text"
                placeholder="Search for person"
              />
            </Form>
          </section>
          <section className="peopleList">
            <Person people={peopleList} />
          </section>
        </main>
      </ProjectDetail>
    </>
  );
};

export default People;
