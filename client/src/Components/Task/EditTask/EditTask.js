/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import "./EditTask.scss";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { TextField, Autocomplete } from "mui-rff";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";
import { Comments } from "../../Comments/Comments";
import axios from "axios";

const EditTask = ({ dismiss, task }) => {
  const [isLoading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [assigneeNames, setAssigneeNames] = useState([]);
  const [projectName, setProjectName] = useState("");
  const userName = localStorage.getItem("user");
  let buttonDisable = true;
  const issueTypes = ["Story", "Task", "Bug"];
  const priorityTypes = ["Highest", "High", "Medium", "Low", "Lowest"];

  useEffect(() => {
    //Request to get the people by project name
    if (projectName) {
      axios
        .get(`/people/getPeopleByProject/${projectName}`)
        .then((response) => {
          const peopleList = [];
          const peopleData = response.data.data;
          peopleData.map((people) => {
            peopleList.push(people.name);
          });
          setAssigneeNames(peopleList);
        })
        .catch((error) => console.log(error.message));
    } else {
      setAssigneeNames([]);
    }
  }, [projectName]);

  useEffect(() => {
    //Request to get projects
    axios
      .get(`/project/getProjects/${userName}`)
      .then((response) => {
        const projectsList = [];
        const projectData = response.data.data;
        projectData.map((project) => {
          projectsList.push(project.projectName);
        });
        setProjects(projectsList);
      })
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    if (isLoading) {
      request().then(() => {
        setLoading(false);
        dismiss();
      });
    }
  }, [dismiss, isLoading]);

  const validate = (values) => {
    const errors = {};
    if (!values.projectName) {
      errors.projects = "Required";
    }
    if (!values.issueType) {
      errors.issuetype = "Required";
    }
    if (!values.taskSummary) {
      errors.summary = "Required";
    }
    if (!values.taskPriority) {
      errors.priority = "Required";
    }
    if (!values.assigneeName) {
      errors.assigneeName = "Required";
    }
    if (!values.dueDate) {
      errors.dueDate = "Required";
    }
    if (!values.storyPoints) {
      errors.storyPoints = "Required";
    }

    if (values.projectName) {
      setProjectName(values.projectName);
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
          name="projectName"
          required={true}
          options={projects}
          variant="outlined"
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Issue Type"
          name="issueType"
          variant="outlined"
          required={true}
          options={issueTypes}
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
          name="taskSummary"
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
          name="taskDescription"
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
          name="taskPriority"
          variant="outlined"
          required={true}
          options={priorityTypes}
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Assignee"
          name="assigneeName"
          variant="outlined"
          required={true}
          options={assigneeNames}
          renderOption={(option) => <>{option}</>}
        />
      ),
    },
    {
      size: 6,
      field: (
        <TextField
          name="storyPoints"
          label="Story Points"
          type="number"
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    {
      size: 6,
      field: (
        <TextField
          name="dueDate"
          label="Due Date"
          type="date"
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
  ];

  function request() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const onSubmit = (values) => {
    setLoading(true);
    let user = localStorage.getItem("user");

    axios
      .post("/task/editTask", {
        id: task.id,
        projectName: values.projectName,
        issueType: values.issueType,
        summary: values.taskSummary,
        description: values.taskDescription,
        priority: values.taskPriority,
        assignee: values.assigneeName,
        storyPoints: values.storyPoints,
        dueDate: new Date(values.dueDate).toISOString(),
        user,
      })
      .then((response) => {})
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="issueHeading">
        Edit Issue
        <span className="icon-button-close" onClick={dismiss}>
          <CloseIcon />
        </span>
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          projectName: task.projectName,
          issueType: task.issueType,
          taskSummary: task.summary,
          taskDescription: task.description,
          taskPriority: task.priority,
          assigneeName: task.assignee,
          storyPoints: task.storyPoints,
          dueDate: task.dueDate.substring(0, 10),
        }}
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
              <Button disabled={isLoading || buttonDisable} type="submit">
                {isLoading ? "Edit Issue...." : "Edit Issue"}
              </Button>
              <Button onClick={dismiss}>Cancel</Button>
            </div>
          </form>
        )}
      />
      <Comments id={task.id} />
    </>
  );
};

export default EditTask;
