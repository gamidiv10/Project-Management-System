/**
 * @author Vali Shaik <vl216084@dal.ca>
 */
import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import { AuthContext } from "../../App";
import axios from "axios";

import {
  TextField,
  Button,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
const Register = ({ history, registerShow }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(" ");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(" ");
  const validPasswordRegex = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
  const [error, setErrors] = useState("");

  useEffect(() => {
    if (email) {
      validateEmailForm();
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      validatePasswordForm();
    }
  }, [password]);

  useEffect(() => {
    if (name) {
      validateNameForm();
    }
  }, [name]);
  useEffect(() => {
    if (confirmPassword) {
      validateConfirmPasswordForm();
    }
  }, [confirmPassword]);

  const validatePasswordForm = () => {
    if (password.length === 0) {
      setPasswordError("* password cannot be empty");
    } else if (!validPasswordRegex.test(password)) {
      setPasswordError("* password is weak");
    } else {
      setPasswordError("");
    }
  };
  const validateConfirmPasswordForm = () => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordError("* Confirm password cannot be empty");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validEmailRegex = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/
  );
  const validateEmailForm = () => {
    if (email.length === 0) {
      setEmailError("* email id cannot be empty");
    } else if (!validEmailRegex.test(email)) {
      setEmailError("* Email is not valid");
    } else {
      setEmailError("");
    }
  };
  const validateNameForm = () => {
    if (name.length === 0) {
      setNameError("* Name cannot be empty");
    } else {
      setNameError("");
    }
  };

  //Fetching the current auth context
  const Auth = useContext(AuthContext);
  const handleForm = (e) => {
    //Validating all the required fields
    if (
      nameError.length === 0 &&
      confirmPasswordError.length === 0 &&
      emailError.length === 0 &&
      passwordError.length === 0
    ) {
      e.preventDefault();
      //Firebase API call
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          //Once sign up is successfull, user properties are updated
          var user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: name,
            })
            .then(function () {
              //Saving user details in DB
              axios
                .post("/user/addUser", {
                  id: user.uid,
                  userName: name,
                  email: email,
                  jobTitle: "Software Dev",
                  department: "Research",
                  organisation: "Dalhousie",
                  country: "Canada",
                })
                .then((response) => {
                  alert("Sign up is successful, please login");
                })
                .catch((error) => console.log(error.message));
            })
            .catch(function (error) {
              alert("Sign up failed, please try again!!");
            });

          if (res.user) {
            Auth.setLoggedIn(false);
            registerShow(false);
            history.push("/login");
          }
        })
        .catch((e) => {
          setErrors(e.message);
        });
    } else {
      validateEmailForm();
      validatePasswordForm();
      validateNameForm();
      validateConfirmPasswordForm();
    }
  };

  return (
    <div className="Register">
      <form onSubmit={(e) => handleForm(e)}>
        <FormHelperText id="my-helper-text">
          <span className="ErrorText">{error}</span>
        </FormHelperText>
        <FormGroup>
          <TextField
            id="nameInput"
            label="Name"
            variant="outlined"
            aria-describedby="my-helper-text"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
              validateNameForm();
            }}
            onBlur={validateNameForm}
          />
          <FormHelperText id="my-helper-text">
            <span className="ErrorText">{nameError}</span>
          </FormHelperText>
        </FormGroup>
        <FormGroup>
          <TextField
            id="emailInput"
            label="Email"
            variant="outlined"
            aria-describedby="my-helper-text"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              validateEmailForm();
            }}
            onBlur={validateEmailForm}
          />
          <FormHelperText id="my-helper-text">
            <span className="ErrorText">{emailError}</span>
          </FormHelperText>
        </FormGroup>
        <FormGroup>
          <TextField
            id="passwordInput"
            label="Password"
            variant="outlined"
            aria-describedby="my-helper-text"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              validatePasswordForm();
            }}
            onBlur={validatePasswordForm}
          />
          <FormHelperText id="my-helper-text">
            <span className="ErrorText">{passwordError}</span>
          </FormHelperText>
        </FormGroup>
        <FormGroup>
          <TextField
            id="confirmPasswordInput"
            label="Confirm Password"
            variant="outlined"
            aria-describedby="my-helper-text"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError("");
              validateConfirmPasswordForm();
            }}
            onBlur={validateConfirmPasswordForm}
          />
          <FormHelperText id="my-helper-text">
            <span className="ErrorText">{confirmPasswordError}</span>
          </FormHelperText>
        </FormGroup>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};
export default withRouter(Register);
