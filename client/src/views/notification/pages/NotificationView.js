/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import NotificationItem from '../components/NotificationItem';
import axios from 'axios';

const NotificationView = () => {
  const [showNew, setShowNew] = useState(true)
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = () => {
    const user = localStorage.getItem('user')
    axios({
      method: "GET",
      url: "/notification/list",
      params: { user }
    })
      .then(({ data: { data, total } }) => {
        if (total !== notifications.length) {
          setNotifications(data)
        }
      })
      .catch(err => err)
  }

  useEffect(() => {
    setInterval(() => {
      fetchNotifications()
    }, [5000])
  }, [])

  const markAsRead = (id) => {
    axios({
      method: "GET",
      url: "/notification/markAsRead/" + id
    })
      .then(() => setNotifications(notifications.map(item => ({ ...item, read: item._id === id ? true : item.read }))))
      .catch(err => err)
  }

  return <Container className="notification-container">
    <div className="notification-header">
      <span className="title">Updates</span>
    </div>
    <div className="notification-sub-header">
      <div className="d-flex" style={{ alignItems: 'center' }}>
        <div
          className={`sub-header-item${showNew ? '-selected' : ''}`}
          onClick={() => setShowNew(true)}
        >
          {"New"}
        </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div
          className={`sub-header-item${!showNew ? '-selected' : ''}`}
          onClick={() => setShowNew(false)}
        >
          {"Cleared"}
        </div>
      </div>
    </div>
    <div className="notification-body">
      {notifications.length
        ? notifications.filter(({ read }) => read !== showNew).length
          ? notifications.filter(({ read }) => read !== showNew).map(item =>
            <NotificationItem
              key={item._id}
              item={item}
              markAsRead={markAsRead}
            />
          )
          : <div className="no-record-message">{"\"You're all caught up\""}</div>
        : <div className="no-record-message">{"\"You're all caught up\""}</div>
      }
    </div>
  </Container>
}

export default NotificationView