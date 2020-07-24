import React, {useState, useEffect} from "react";
import Person from "./Person/Person";
import PeopleHeader from "./PeopleHeader/PeopleHeader";
import "./People.scss";
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail";
import axios from "axios";

const People = () => {
  const [peopleList, setPeopleList] = useState([]);
  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = () => {
    axios.get('/people/getPeople')
    .then(response => {
      setPeopleList(response.data.data);
    }).catch(
        error => console.log(error.message)
      );
  }
  return (
    <>
      <ProjectDetail>
        <main className="ProjectDetailMain">
          <PeopleHeader />
          <section className="peopleList">
            <Person people={peopleList} />
          </section>
        </main>
      </ProjectDetail>
    </>
  );
};

export default People;
