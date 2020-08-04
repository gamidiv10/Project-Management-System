/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

import React, { Fragment } from 'react';
import moment from 'moment'
import { withRouter } from 'react-router-dom'

import Tooltip from '../../../common/Tooltip'
import NotificationTypeRenderer from './NotificationType'

const NotificationItem = ({ item, history, markAsRead }) => {
  const { _id, projectName, taskName, user, read, createdAt, type } = item
  const url = `/project/${projectName}/${type === 'TASK_CREATE' ? 'backlog' : 'activesprint'}`
  return <div className="notification">
    <div className="item-header">
      <div className="item-title">
        <Tooltip placement="top" tooltip="Go to Task">
          <span onClick={() => history.push(url)}>{taskName}</span>
        </Tooltip>
      </div>
      {!read
        ? <Fragment>
          <Tooltip placement="top" tooltip="Mark As Read">
            <div id="mark_as_read" className="item-close" onClick={() => markAsRead(_id)}>
              <i className="fa fa-eye-slash" />
            </div>
          </Tooltip>
        </Fragment>
        : undefined
      }
    </div>
    <div className="item-body">
      <div>
        <div><i className="fa fa-user-circle" style={{ fontSize: '1.5rem' }} /></div>
        <div className="author">{user !== localStorage.getItem('user') ? user : 'You'}</div>
        <div className="type">
          <NotificationTypeRenderer item={item} />
        </div>
        <div className="divider" />
        <div className="time">{moment(createdAt).format('MMM D [at] h:mm a')}</div>
      </div>
    </div>
  </div>
}

export default withRouter(NotificationItem)