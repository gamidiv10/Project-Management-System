import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import "./CreateTask.scss";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { TextField, Autocomplete } from "mui-rff";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";

const CreateTask = ({ dismiss }) => {
  const [isLoading, setLoading] = useState(false);
  let buttonDisable = true;
  const projects = ["Project1", "Project2"];
  const issueTypes = ["Epic", "Story", "Task", "Bug"];
  const priorityTypes = ["Highest", "High", "Medium", "Low", "Lowest"];

  useEffect(() => {
    if (isLoading) {
      request().then(() => {
        setLoading(false);
        dismiss();
      });
    }
  }, [isLoading]);

  const validate = (values) => {
    const errors = {};
    if (!values.projects) {
      errors.projects = "Required";
    }
    if (!values.issuetype) {
      errors.issuetype = "Required";
    }
    if (!values.summary) {
      errors.summary = "Required";
    }
    if (!values.priority) {
      errors.priority = "Required";
    }

    buttonDisable = Object.keys(errors).length ? true : false;
    return errors;
  };

  const formFields = [
    {
      size: 6,
      field: (
        <Autocomplete
          label="Projects"
          name="projects"
          required={true}
          options={projects}
          variant="outlined"
          getOptionValue={(option) => option}
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Issue Type"
          name="issuetype"
          variant="outlined"
          required={true}
          options={issueTypes}
          getOptionValue={(option) => option}
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="text"
          label="Summary"
          name="summary"
          margin="none"
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          type="text"
          label="Description"
          name="description"
          margin="none"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          multiline
          rows={5}
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Priority"
          name="priority"
          variant="outlined"
          required={true}
          options={priorityTypes}
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
  ];

  function request() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const onSubmit = () => {
    setLoading(true);
  };

  return (
    <>
      <div className="issueHeading">
        Create Issue
        <span className="icon-button-close" onClick={dismiss}>
          <CloseIcon />
        </span>
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="taskFormField">
            <Grid container alignItems="flex-start" spacing={2}>
              {formFields.map((item, id) => (
                <Grid item xs={item.size} key={id}>
                  {item.field}
                </Grid>
              ))}
            </Grid>
            <div className="buttons">
              <Button
                disabled={isLoading}
                type="submit"
                disabled={buttonDisable}
              >
                {isLoading ? "CreateTask...." : "CreateTask"}
              </Button>
              <Button onClick={dismiss}>Cancel</Button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default CreateTask;
