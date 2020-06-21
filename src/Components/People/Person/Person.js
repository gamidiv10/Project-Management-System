import React, { Fragment } from "react";
import { ReactComponent as NewTabIcon } from "../../../icons/newtab.svg";
import { withRouter } from "react-router-dom";
import "./Person.scss";

const Person = (props) => {
  const { people, history } = props;
  const redirectTopeopleDetail = (name) => {
    history.push("/people/" + name);
  };

  return (
    <Fragment>
      {people.map((person, index) => (
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
    </Fragment>
  );
};

export default withRouter(Person);
