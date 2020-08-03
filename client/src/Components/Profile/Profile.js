/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 * @author Vali Shaik
 */
import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as DefaultProfileIcon } from "../../icons/defaultprofile.svg";
import { ReactComponent as TitleIcon } from "../../icons/title.svg";
import { ReactComponent as DepartmentIcon } from "../../icons/department.svg";
import { ReactComponent as OrganizationIcon } from "../../icons/organization.svg";
import { ReactComponent as LocationIcon } from "../../icons/location.svg";
import { ReactComponent as EmailIcon } from "../../icons/email.svg";
import "./Profile.scss";
import Editable from "../Editable/Editable";
import { Button } from "react-bootstrap";
import * as firebase from "firebase";
import { AuthContext } from "../../App";
import axios from "axios";

const Profile = ({ history }) => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const titleRef = useRef();
  const [yourDepartment, setYourDepartment] = useState("");
  const departmentRef = useRef();
  const [yourOrganization, setYourOrganization] = useState("");
  const organizationRef = useRef();
  const [yourLocation, setYourLocation] = useState("");
  const locationRef = useRef();
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  var user = firebase.auth().currentUser;
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setUserId(user.uid);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = () => {
    axios
      .get(`/user/getUser/${userId}`)
      .then((response) => {
        const userData = response.data.data[0];
        setName(userData.userName);
        setJobTitle(userData.jobTitle);
        setYourDepartment(userData.department);
        setYourOrganization(userData.organisation);
        setEmail(userData.email);
        setYourLocation(userData.country);
      })
      .catch((error) => console.log(error.message));
  };

  const handleSubmit = (event) => {
    if (
      jobTitle.length == 0 ||
      yourDepartment.length == 0 ||
      yourOrganization.length == 0 ||
      yourLocation.length == 0
    ) {
      alert("Please fill all fields");
      history.push("/profile");
    } else {
      //Updating user profile details
      axios
        .post("/user/modifyUser", {
          id: user.uid,
          userName: name,
          email: email,
          jobTitle: jobTitle,
          department: yourDepartment,
          organisation: yourOrganization,
          country: yourLocation,
        })
        .then((response) => {
          alert("Profile details are updated!!");
          setUserId(user.uid);
          history.push("/profile");
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <main className="ProfileManager">
        <header className="ProfileHeader">
          <span className="profile-icon">
            <DefaultProfileIcon />
          </span>
          <div className="profileName">{name}</div>
        </header>
        <section className="AboutDetails">
          <div className="EditFields">
            <div className="EditField">
              <span className="icon-profile">
                <TitleIcon />
              </span>
              <Editable
                text={jobTitle}
                placeholder="Job Title"
                type="input"
                Ref={titleRef}
                className="EditableField"
              >
                <input
                  ref={titleRef}
                  type="text"
                  name="jobtitle"
                  placeholder="Job Title"
                  value={jobTitle}
                  className="PlaceholderField"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Editable>
            </div>
            <div className="EditField">
              <span className="icon-profile">
                <DepartmentIcon />
              </span>
              <Editable
                text={yourDepartment}
                placeholder="Your Department"
                type="input"
                Ref={departmentRef}
                className="EditableField"
              >
                <input
                  ref={departmentRef}
                  type="text"
                  name="yourdepartment"
                  placeholder="Your Department"
                  value={yourDepartment}
                  className="PlaceholderField"
                  onChange={(e) => setYourDepartment(e.target.value)}
                />
              </Editable>
            </div>
            <div className="EditField">
              <span className="icon-profile">
                <OrganizationIcon />
              </span>
              <Editable
                text={yourOrganization}
                placeholder="Your Organization"
                type="input"
                Ref={organizationRef}
                className="EditableField"
              >
                <input
                  ref={organizationRef}
                  type="text"
                  name="yourorganization"
                  placeholder="Your Organization"
                  value={yourOrganization}
                  className="PlaceholderField"
                  onChange={(e) => setYourOrganization(e.target.value)}
                />
              </Editable>
            </div>
            <div className="EditField">
              <span className="icon-profile">
                <LocationIcon />
              </span>
              <Editable
                text={yourLocation}
                placeholder="Your Location"
                type="input"
                Ref={locationRef}
                className="EditableField"
              >
                <input
                  ref={locationRef}
                  type="text"
                  name="yourlocation"
                  placeholder="Your Location"
                  value={yourLocation}
                  className="PlaceholderField"
                  onChange={(e) => setYourLocation(e.target.value)}
                />
              </Editable>
            </div>
            <div className="EditField">
              <span className="icon-profile">
                <EmailIcon />
              </span>
              <Editable
                text={email}
                placeholder="Email"
                type="input"
                Ref={emailRef}
                className="EditableField"
              >
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  className="PlaceholderField"
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                />
              </Editable>
            </div>
            <div className="buttons">
              <Button type="submit" onClick={handleSubmit}>
                Save Details
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
