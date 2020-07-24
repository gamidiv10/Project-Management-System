import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-final-form";
import "./CreateTask.scss";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { TextField, Autocomplete } from "mui-rff";
import { v4 as uuid } from "uuid";
import Task from "../Task";
import { ReactComponent as CloseIcon } from "../../../icons/close.svg";
import tasksItemsContext from "../../../Context/tasksItemsContext";
import axios from "axios";

const CreateTask = ({ dismiss }) => {
  const [isLoading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [assigneeNames] = useState(["A", "B"]);
  const { tasks, setTasks } = useContext(tasksItemsContext);
  let buttonDisable = true;
  const issueTypes = ["Epic", "Story", "Task", "Bug"];
  const priorityTypes = ["Highest", "High", "Medium", "Low", "Lowest"];

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
          name="issueType"
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
    let projectName = values.projectName;
    let issueType = values.issueType;
    let summary = values.taskSummary;
    let description = values.taskDescription;
    let priority = values.taskPriority;
    let assignee = values.assigneeName;
    let sprintNumber = 2;
    let taskStatus = "To do";
    let taskId = uuid();
    setLoading(true);

    axios
      .post("/task/addTask", {
        id: taskId,
        projectName,
        issueType,
        summary,
        description,
        priority,
        assignee,
        sprintNumber,
        taskStatus,
      })
      .then((response) => {
        const value = {
          id: taskId,
          task: { ...values },
          content: <Task {...values} />,
        };
        setTasks([...tasks, value]);
      })
      .catch((error) => console.log(error.message));
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
