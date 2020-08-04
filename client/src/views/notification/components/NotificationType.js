/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

import React, { Fragment } from 'react';
import moment from 'moment'
import { Badge } from 'react-bootstrap';

import { notificationType, colorScheme, status } from '../../../constants/defaultValues'

const NotificationTypeRenderer = ({ item }) => {
  const { type, updates } = item
  const { field, newValue, oldValue } = JSON.parse(updates)
  const variant = type === 'TASK_ASSIGN' ? 'primary' : 'secondary'
  return <Fragment>
    <Badge
      className="d-flex ml-2"
      variant={variant}
      style={{ color: variant === 'primary' ? 'white' : undefined }}
    >
      {notificationType[type]} {field ? field.charAt(0).toUpperCase() + field.slice(1) : null}
    </Badge>
    {type === 'TASK_ASSIGN' || type === 'TASK_CREATE'
      ? <Fragment>
        <div style={{ marginLeft: '10px', fontSize: '14px' }}>
          <i className="fa fa-user-alt" />
        </div>
        <div className="pointer" style={{ marginLeft: '8px', fontWeight: '500', fontSize: '13px', paddingBlock: '3px' }}>
          {newValue}
        </div>
      </Fragment>
      : type === 'DUE_DATE_UPDATE'
        ? <div className="d-flex" style={{ marginLeft: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', marginRight: '10px' }}>
            <i className="fa fa-calendar-check" />
          </div>
          <div style={{ fontWeight: '400', fontSize: '12px' }}>{moment(newValue).format('MMM D')}</div>
        </div>
        : type === 'STATUS_UPDATE'
          ? <Fragment>
            <div style={{ marginLeft: '10px' }}>
              <div className="status" style={{ backgroundColor: colorScheme[oldValue] }}>
                {status[oldValue]}
              </div>
            </div>
            <i className="fa fa-arrow-right" style={{ margin: '0 10px' }} />
            <div>
              <div className="status" style={{ backgroundColor: colorScheme[newValue] }}>
                {status[newValue]}
              </div>
            </div>
          </Fragment>
          : type === 'COMMENT_CREATE'
            ? <Fragment>
              <div className="d-flex" style={{ marginLeft: '10px', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', marginRight: '10px' }}>
                  <i className="fa fa-comment" />
                </div>
                <div style={{ fontWeight: '400', fontSize: '12px' }}>{newValue}</div>
              </div>
            </Fragment>
            : <Fragment>
              <div className="d-flex" style={{ marginLeft: '10px', alignItems: 'center' }}>
                <div style={{ fontWeight: '400', fontSize: '12px' }}>{oldValue}</div>
                {/* <div style={{ fontSize: '12px', marginRight: '10px' }}> */}
                <i className="fa fa-arrow-right" style={{ margin: '0 10px' }} />
                {/* </div> */}
                <div style={{ fontWeight: '400', fontSize: '12px' }}>{newValue}</div>
              </div>
            </Fragment>
    }
  </Fragment>
}

export default NotificationTypeRenderer