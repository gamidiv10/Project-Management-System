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
  activeSprint,
  setSprintNumber,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [sprintNames, setSprintNames] = useState([]);
  const [selectSprintNumber, setSelectSprintNumber] = useState(0);
  const user = localStorage.getItem("user");

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
          if (activeSprint !== sprint.sprintNumber) {
            sprints.push(sprint.sprintNumber);
          }
        });
        sprints = sprints.sort(function (a, b) {
          return a - b;
        });
        sprints.map((sprint) => {
          sprintsList.push("Sprint " + sprint);
        });
        sprintsList.push("Backlog");
        setSprintNames(sprintsList);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const validate = (values) => {
    if (values.types === "Backlog") {
      setSelectSprintNumber(0);
    } else if (values.types) {
      const sprintNo = values.types.split("Sprint ");
      setSelectSprintNumber(values.types.charAt(7));
    }
  };

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
            .put(
              `/task/updateTaskStatus/${item.task.sprintNumber}/${item.task.id}`
            )
            .then((response) => {})
            .catch((error) => console.log(error.message));
        });
      } else {
        const sprintN = selectSprintNumber;
        type[1].items.map((item) => {
          axios
            .put(`/task/updateTaskStatus/${sprintN}/${item.id}`)
            .then((response) => {})
            .catch((error) => console.log(error.message));
          axios
            .put(`/task/changeTaskByStatus/To do/${item.id}/${user}`)
            .then((response) => {})
            .catch((error) => console.log(error.message));
        });
      }
    });

    setTimeout(
      axios
        .post(`/sprint/completeSprint`, {
          sprintNumber: activeSprint,
        })
        .then((response) => {})
        .catch((error) => console.log(error.message)),
      2000
    );

    setLoading(false);
    setSprintNumber(99999999);
    dismiss();
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
        validate={validate}
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
