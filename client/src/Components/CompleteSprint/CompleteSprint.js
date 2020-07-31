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

const CompleteSprint = ({ dismiss, issuesCount, completedCount }) => {
  const [isLoading, setLoading] = useState(false);
  const sprintNames = ["Sprint 1", "Sprint 2", "Backlog"];
  const errors = {};

  useEffect(() => {
    if (isLoading) {
      request().then(() => {
        setLoading(false);
        dismiss();
      });
    }
  }, [isLoading]);

  const validate = (values) => {
    if (!values.types) {
      errors.projects = "Required";
    } else {
      errors.projects = "";
    }
    return errors;
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

  const handleSubmit = (values) => {
    if (!values.types) {
      errors.projects = "Required";
      return false;
    } else {
      errors.projects = "";
    }
    console.log("here");
    setLoading(true);
  };

  return (
    <>
      <div className="issueHeading">
        Complete Sprint: Sprint Name
        <span className="icon-button-close" onClick={dismiss}>
          <CloseIcon />
        </span>
      </div>
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="taskFormField">
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
              <Button disabled={isLoading} type="submit">
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
