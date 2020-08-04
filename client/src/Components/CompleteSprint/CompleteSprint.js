/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import "./CompleteSprint.scss";
import { Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Autocomplete } from "mui-rff";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import axios from "axios";

const CompleteSprint = ({
  dismiss,
  issuesCount,
  completedCount,
  tasks,
  projectName,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [sprintNames, setSprintNames] = useState([]);

  useEffect(() => {
    if (isLoading) {
      request().then(() => {
        setLoading(false);
        dismiss();
      });
    }
  }, [isLoading]);

  useEffect(() => {
    let sprints = [];
    let sprintsList = [];
    axios
      .post(`/sprint/getSprints`, {
        projectName,
      })
      .then((response) => {
        response.data.sprints.map((sprint) => {
          sprints.push(sprint.sprintNumber);
        });
        sprints.sort();
        sprints.map((sprint) => {
          sprintsList.push(sprint.sprintNumber);
        });
        sprintsList.push("Backlog");
        setSprintNames(sprintsList);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const formFields = [
    {
      size: 6,
      field: (
        <Autocomplete
          label="Move to"
          name="types"
          required={true}
          options={sprintNames}
          variant="outlined"
          getOptionValue={(option) => option}
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

    let sprintNum = "";

    Object.entries(tasks).forEach((type) => {
      if (type[1].name === "Done") {
        type[1].items.map((item) => {
          sprintNum = item.task.sprintNumber;
          axios
            .put(`/task/updateTaskStatus/${item.task.sprintNumber}/${item.id}`)
            .then((response) => {})
            .catch((error) => console.log(error.message));
        });
      } else {
        const sprintN = 0;
        type[1].items.map((item) => {
          axios
            .put(`/task/updateTaskStatus/${sprintN}/${item.id}`)
            .then((response) => {})
            .catch((error) => console.log(error.message));
          axios
            .put(`/task/changeTaskByStatus/To do/${item.id}`)
            .then((response) => {})
            .catch((error) => console.log(error.message));
        });
      }
    });

    setTimeout(
      axios
        .post(`/sprint/completeSprint`, {
          sprintNumber: sprintNum,
        })
        .then((response) => {})
        .catch((error) => console.log(error.message)),
      2000
    );

    setLoading(false);
  };

  return (
    <>
      <div className="issueHeading">
        Sprint Name
        <span className="icon-button-close" onClick={dismiss}>
          <CloseIcon />
        </span>
      </div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="taskFormField">
            <div>
              <div>{issuesCount} Issues to be completed</div>
              <div>{completedCount} Issues are completed</div>
            </div>
            <br />
            {issuesCount ? (
              <>
                <div>Select where the remaining issues to be moved: </div>
                <Grid container alignItems="flex-start" spacing={2}>
                  {formFields.map((item, id) => (
                    <Grid item xs={item.size} key={id}>
                      {item.field}
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              ""
            )}

            <div className="buttons">
              <Button disabled={isLoading} type="submit" onClick={onSubmit}>
                {isLoading ? "Complete...." : "Complete"}
              </Button>
              <Button onClick={dismiss}>Cancel</Button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default CompleteSprint;
