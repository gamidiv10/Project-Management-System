import Error from "../Components/Error/Error";
import Landing from "../Components/Landing/Landing";
import Home from "../Components/Home/Home";
import ContactUs from "../Components/ContactUs/ContactUs";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import ResetPassword from "../Components/ResetPassword/ResetPassword";
// import Task from "../Components/Task/Task";
import Backlog from "../Components/Backlog/Backlog"
import Projects from "../Components/Projects/Projects";
import AboutUs from "../Components/AboutUs/AboutUs";
import Profile from "../Components/Profile/Profile";
import People from "../Components/People/People";
import ProjectDetailMain from "../Components/Projects/ProjectDetail/ProjectDetailMain/ProjectDetailMain";
import { Reports } from "../Components/Reports/Reports";
import { Comments } from "../Components/Comments/Comments";
import { InviteUser } from "../Components/InviteUser/InviteUser";
import AddUser from "../Components/AddUser/AddUser";
import Calendar from "../views/calendar";
import Notifications from "../views/notification";
import ReduxDemo from "../Components/ReduxDemo";

const routes = [
  {
    path: "/home",
    exact: true,
    component: Home,
    isPrivate: true,
  },
  {
    path: "/about-us",
    exact: true,
    component: AboutUs,
    isPrivate: false,
  },
  {
    path: "/contact-us",
    exact: true,
    component: ContactUs,
    isPrivate: false,
  },
  {
    path: "/forgotpassword",
    exact: true,
    component: ForgotPassword,
    isPrivate: false,
  },
  {
    path: "/resetpassword",
    exact: true,
    component: ResetPassword,
    isPrivate: false,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
    isPrivate: true,
  },
  {
    path: "/projects",
    exact: true,
    component: Projects,
    isPrivate: true,
  },
  {
    path: "/project/:projectName/activesprint",
    exact: true,
    component: ProjectDetailMain,
    isPrivate: true,
  },
  {
    path: "/project/:projectName/people",
    exact: true,
    component: People,
    isPrivate: true,
  },
  {
    path: "/project/backlog",
    exact: true,
    component: Backlog
  },
  {
    path: "/people/:id",
    exact: true,
    component: Profile,
    isPrivate: true,
  },
  {
    path: "/login",
    exact: true,
    component: Landing,
    isPrivate: false,
  },
  {
    path: "/project/:projectName/reports",
    exact: true,
    component: Reports,
    isPrivate: true,
  },
  {
    path: "/calendar",
    exact: true,
    component: Calendar,
    isPrivate: true,
  },
  {
    path: "/notifications",
    exact: true,
    component: Notifications,
    isPrivate: true,
  },
  {
    path: "/inviteUser",
    exact: true,
    component: InviteUser,
    isPrivate: true,
  },
  {
    path: "/addUser",
    exact: true,
    component: AddUser,
    isPrivate: true,
  },
  {
    path: "/comments",
    exact: true,
    component: Comments,
    isPrivate: true,
  },
  {
    path: "/redux-demo",
    exact: true,
    component: ReduxDemo,
    isPrivate: true,
  },
  {
    path: "/",
    exact: true,
    component: Landing,
    isPrivate: true,
  },
  {
    path: "/*",
    component: Error,
    isPrivate: false,
  },
];

export default routes;
