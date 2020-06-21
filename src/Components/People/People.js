import React from "react";
import Person from "./Person/Person";
import PeopleHeader from "./PeopleHeader/PeopleHeader";
import "./People.scss";

const peopleList = [
  { name: "People1", role: "Software Engineer" },
  { name: "People2", role: "Systems Engineer" },
  { name: "People3", role: "DevOps Enginner" },
  { name: "People4", role: "Data Scientist" },
];

const People = () => {
  return (
    <>
      <main>
        <PeopleHeader />
        <section className="peopleList">
          <Person people={peopleList} />
        </section>
      </main>
    </>
  );
};

export default People;
