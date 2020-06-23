import React, { useState, useContext, useLayoutEffect } from "react";
import "./Navbar.scss";
import { ReactComponent as BellIcon } from "../../icons/bell.svg";
import { ReactComponent as CaretIcon } from "../../icons/caret.svg";
import { ReactComponent as ProjectsIcon } from "../../icons/projects.svg";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { ReactComponent as BoltIcon } from "../../icons/bolt.svg";
import { ReactComponent as ProfileIcon } from "../../icons/profile.svg";
import { ReactComponent as TaskaticIcon } from "../../icons/taskatic.svg";
import { ReactComponent as PeopleIcon } from "../../icons/people.svg";
import { ReactComponent as CalendarIcon } from "../../icons/calender.svg";
import { ReactComponent as SupportIcon } from "../../icons/support.svg";
import { ReactComponent as LogoutIcon } from "../../icons/logout.svg";
import { ReactComponent as ProfileSettingsIcon } from "../../icons/profilesettings.svg";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "../Modal/Modal";
import CreateTask from "../Task/CreateTask/CreateTask";
import userContext from "../../Context/userContext";
import { withRouter } from "react-router-dom";

const Navigationbar = ({ history }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(userContext);
  let LeftNavItems = [];
  let RightNavItems = [];

  const LogoutHandler = () => {
    setUser("");
    history.push("/login");
  };

  const LoginHandler = () => {
    setUser("");
    history.push("/login");
  };

  if (user) {
    LeftNavItems = [
      {
        item: "Taskatic",
        to: "/projects",
        appIcon: <TaskaticIcon />,
      },
      {
        item: "Projects",
        to: "/projects",
        icon: <CaretIcon />,
        dropdown: {
          header: "Recent",
          items: [
            { item: "Project1", to: "/project/activesprint" },
            { item: "Project2", to: "/project/activesprint" },
          ],
          footer: {
            item: "View All Projects",
            to: "/projects",
          },
        },
      },
      {
        item: "Calander",
        to: "/calendar",
        appIcon: <CalendarIcon />,
      },
      {
        item: "Create",
        to: "/activesprint",
        button: true,
      },
    ];
    RightNavItems = [
      {
        icon: <BellIcon />,
        to: "/notifications",
        iconButton: true,
      },
      {
        icon: <SupportIcon />,
        to: "/helpandsupport",
        iconButton: true,
      },
      {
        icon: <ProfileIcon />,
        dropdown: {
          header: "Navigation",
          items: [
            {
              item: "Profile",
              to: "/profile",
              icon: <ProfileSettingsIcon />,
            },
            {
              item: "Logout",
              logout: LogoutHandler,
              icon: <LogoutIcon />,
            },
          ],
        },
      },
    ];
  } else {
    LeftNavItems = [
      {
        item: "Taskatic",
        to: "/login",
        appIcon: <TaskaticIcon />,
      },
      {
        item: "About Us",
        to: "/about-us",
        appIcon: <TaskaticIcon />,
      },
      {
        item: "Contact Us",
        to: "/login",
        appIcon: <TaskaticIcon />,
      },
    ];
    RightNavItems = [
      {
        item: "Login",
        to: "/home",
        button: true,
      },
    ];
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const dismissable = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header>
        <nav className="home-navbar">
          <ul className="home-navbar-nav left-nav tabview">
            {LeftNavItems.map((navitem, index) => {
              if (navitem.button) {
                return (
                  <Button
                    key={index}
                    className="createButton"
                    onClick={handleModalOpen}
                  >
                    {navitem.item}
                  </Button>
                );
              }
              return navitem.dropdown ? (
                <LeftNavItem key={index} item={{ ...navitem }}>
                  <DropdownMenu item={{ ...navitem.dropdown }}></DropdownMenu>
                </LeftNavItem>
              ) : (
                <li key={index} className="left-nav-item">
                  {navitem.appIcon ? (
                    <span className="icon-button left-nav">
                      {navitem.appIcon}
                    </span>
                  ) : (
                    ""
                  )}
                  <NavLink to={navitem.to} activeClassName="linkActive">
                    {navitem.item}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <ul className="home-navbar-nav right-nav">
            {LeftNavItems.length > 0 ? (
              <>
                <span className="icon-button left-nav-icon mobileview">
                  <TaskaticIcon />
                </span>
                <NavItem
                  icon={<ProjectsIcon />}
                  className="mobileview"
                  to="/projects"
                >
                  <DropdownMenu item={LeftNavItems[1].dropdown}></DropdownMenu>
                </NavItem>
                <NavItem icon={<CalendarIcon />} className="mobileview" />
                <NavItem
                  icon={<PlusIcon />}
                  to="/project/activesprint"
                  className="mobileview"
                  handleModalOpen={handleModalOpen}
                />
              </>
            ) : (
              ""
            )}
            {RightNavItems.map((item, index) => {
              if (item.button) {
                return (
                  <Button
                    key={index}
                    className="createButton"
                    onClick={LoginHandler}
                  >
                    {item.item}
                  </Button>
                );
              } else if (item.iconButton) {
                return (
                  <NavItem
                    key={index}
                    icon={item.icon}
                    to={item.to}
                    className=""
                  ></NavItem>
                );
              } else {
                return (
                  <NavItem key={index} icon={item.icon} className="">
                    <IconDropdownMenu dropdown={item.dropdown} />
                  </NavItem>
                );
              }
            })}
          </ul>

          <Modal
            visible={isModalOpen}
            children={isModalOpen ? <CreateTask dismiss={dismissable} /> : ""}
          />
        </nav>
      </header>
    </>
  );
};

const LeftNavItem = (props) => {
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    function handleResize() {
      setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <li
      className="left-nav-item"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink to={props.item.to} activeClassName="linkActive">
        {props.item.item}
      </NavLink>
      <span className="icon-button left-nav">{props.item.icon}</span>
      {open && props.children}
    </li>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    function handleResize() {
      setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return props.handleModalOpen ? (
    <li className={props.className ? "mobileview nav-item" : "nav-item"}>
      <NavLink
        to={props.to ? props.to : "/home"}
        className="icon-button"
        onClick={props.handleModalOpen}
      >
        {props.icon}
      </NavLink>
    </li>
  ) : (
    <li
      className={props.className ? "mobileview nav-item" : "nav-item"}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={props.to ? props.to : "/home"}
        className="icon-button"
        activeClassName="linkActive"
      >
        {props.icon}
      </NavLink>
      {open && props.children}
    </li>
  );
};

const DropdownMenu = (props) => {
  function DropdownItem(props) {
    return (
      <NavLink to={props.to} className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </NavLink>
    );
  }
  return (
    <div className="nav-dropdown left-nav">
      {props.item.header ? (
        <div className="txtColor dropdownHeader">{props.item.header}</div>
      ) : (
        ""
      )}
      {props.item.items
        ? props.item.items.map((item, index) => (
            <DropdownItem key={index} leftIcon={item.leftIcon} to={item.to}>
              {item.item}
            </DropdownItem>
          ))
        : ""}
      {props.item.footer ? (
        <NavLink to={props.item.footer.to}>
          <div className="txtColor dropdownFooter">
            {props.item.footer.item}
          </div>
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
};

const IconDropdownMenu = (props) => {
  function DropdownItem(props) {
    if (props.item === "Logout") {
      return (
        <>
          <a className="menu-item" onClick={props.logout}>
            <span className="icon-button">{props.icon}</span>
            {props.children}
          </a>
        </>
      );
    } else {
      return (
        <NavLink to={props.to ? props.to : "/login"} className="menu-item">
          <span className="icon-button">{props.icon}</span>
          {props.children}
        </NavLink>
      );
    }
  }
  return (
    <div className="nav-dropdown right-nav">
      {props.dropdown.header ? (
        <div className="txtColor dropdownHeader">{props.dropdown.header}</div>
      ) : (
        ""
      )}
      {props.dropdown.items
        ? props.dropdown.items.map((item, index) => (
            <DropdownItem
              key={index}
              icon={item.icon}
              to={item.to}
              item={item.item}
              logout={item.logout ? item.logout : ""}
            >
              {item.item}
            </DropdownItem>
          ))
        : ""}
    </div>
  );
};

export default withRouter(Navigationbar);
