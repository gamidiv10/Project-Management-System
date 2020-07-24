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
  let buttonDisable = true;
  const issueTypes = ["Epic", "Story", "Task", "Bug"];
  const priorityTypes = ["Highest", "High", "Medium", "Low", "Lowest"];

  useEffect(() => {
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
    axios
      .get("/project/getProjects")
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
  }, [isLoading]);

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
  ];

  function request() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const onSubmit = (values) => {
    setLoading(true);

    axios
      .post("/task/editTask", {
        id: task.id,
        projectName: values.projectName,
        issueType: values.issueType,
        summary: values.taskSummary,
        description: values.taskDescription,
        priority: values.taskPriority,
        assignee: values.assigneeName,
      })
      .then((response) => {
        console.log(response);
      })
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
              <Button
                disabled={isLoading}
                type="submit"
                disabled={buttonDisable}
              >
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
