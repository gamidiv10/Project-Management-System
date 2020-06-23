import Error from "../Components/Error/Error";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import ForgotPassword from "../Components/ForgotPassword/ForgotPassword";
import ResetPassword from "../Components/ResetPassword/ResetPassword";
import Task from "../Components/Task/Task";
import Projects from "../Components/Projects/Projects";
import Profile from "../Components/Profile/Profile";
import People from "../Components/People/People";
import ProjectDetailMain from "../Components/Projects/ProjectDetail/ProjectDetailMain/ProjectDetailMain";
import { Reports } from "../Components/Reports/Reports";
import { InviteUser } from '../Components/InviteUser/InviteUser';
import AddUser from '../Components/AddUser/AddUser';
import Calendar from "../views/calendar/pages/CalendarView"

const routes = [
  {
    path: "/signup",
    exact: true,
    component: Signup,
  },
  {
    path: "/home",
    exact: true,
    component: Home,
  },
  {
    path: "/forgotpassword",
    exact: true,
    component: ForgotPassword,
  },
  {
    path: "/resetpassword",
    exact: true,
    component: ResetPassword,
  },
  {
    path: "/profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/task",
    exact: true,
    component: Task,
    isPrivate: true,
  },
  {
    path: "/projects",
    exact: true,
    component: Projects,
  },
  {
    path: "/project/activesprint",
    exact: true,
    component: ProjectDetailMain,
  },
  {
    path: "/project/people",
    exact: true,
    component: People,
  },
  {
    path: "/people/:id",
    exact: true,
    component: Profile,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/reports",
    exact: true,
    component: Reports,
  },
  {
    path: "/calendar",
    exact: true,
    component: Calendar
  },
  {
    path: "/inviteUser",
    exact: true,
    component: InviteUser
  },
  {
    path: "/addUser",
    exact: true,
    component: AddUser
  },
  {
    path: "/",
    exact: true,
    component: Login,
  },
  {
    path: "/*",
    component: Error,
  },
];

export default routes;
