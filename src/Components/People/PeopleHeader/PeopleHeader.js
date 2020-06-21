import React from "react";
import { Button, Form } from "react-bootstrap";
import "./PeopleHeader.scss";

const PeopleHeader = () => {
  return (
    <>
      <header className="peopleHeader">
        <div className="peopleHeading">People</div>
        <div className="buttons">
          <Button>Start a Team</Button>
        </div>
      </header>
      <section>
        <Form className="peopleForm">
          <Form.Control type="text" placeholder="Search for person" />
        </Form>
      </section>
    </>
  );
};

export default PeopleHeader;
