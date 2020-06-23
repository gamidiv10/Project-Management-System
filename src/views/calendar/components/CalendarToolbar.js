import React from 'react';
import chroma from 'chroma-js'
import Select from 'react-select'
import { Navigate } from 'react-big-calendar'
import { OverlayTrigger, Tooltip, ToggleButton, ButtonGroup } from 'react-bootstrap'

import { colorScheme, status as taskStatus } from '../../../constants/defaultValues'

const selectComponentStyles = () => ({
  control: style => ({ width: '175px', ...style }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      }
    }
  }
})

const CalendarToolbar = ({ self, status, onNavigate, label, setSelf, setStatus }) => {
  const selectOptions = Object
    .keys(taskStatus)
    .map(value => ({ value, label: taskStatus[value], color: colorScheme[value] }))

  return <div className="d-flex justify-content-between mb-3" style={{ zIndex: 100 }}>
    <div className="d-flex">
      {/* Month Label */}
      <h4 className="mb-0 pt-1 pr-2">{label}</h4>
      {/* Link to current month */}
      <span className="pointer pt-2 px-2" onClick={() => onNavigate(Navigate.TODAY)}>
        {"Today"}
      </span>
      {/* Link to Previous month */}
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-bottom">
            <div style={{ fontSize: '11px' }}>{"Previous Month"}</div>
          </Tooltip>
        }
      >
        <span
          className="pointer pt-1 px-2"
          style={{ color: 'gray', fontSize: '1.25rem', }}
          onClick={() => onNavigate(Navigate.PREVIOUS)}
        >
          <i className="fa fa-chevron-circle-left" />
        </span>
      </OverlayTrigger>
      {/* Link to Next Month */}
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-bottom">
            <div style={{ fontSize: '11px' }}>{"Next Month"}</div>
          </Tooltip>
        }
      >
        <span
          className="pointer pt-1 px-2"
          style={{ color: 'gray', fontSize: '1.25rem', }}
          onClick={() => onNavigate(Navigate.NEXT)}
        >
          <i className="fa fa-chevron-circle-right" />
        </span>
      </OverlayTrigger>
    </div>
    <div className="d-flex">
      {/* Task status filter */}
      <Select
        isClearable
        value={status}
        placeholder="Status"
        onChange={setStatus}
        styles={selectComponentStyles()}
        options={selectOptions}
      />
      {/* Task assignee filter (own tasks and everyone's tasks) */}
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-bottom">
            <div style={{ fontSize: '11px' }}>{self ? "Show Everyone's Tasks" : "Show My Tasks"}</div>
          </Tooltip>
        }
      >
        <ButtonGroup toggle className="ml-3">
          <ToggleButton type="checkbox" variant={self ? 'primary' : 'outline-primary'} value={self} onChange={() => setSelf(!self)}>
            <i className="fa fa-user pr-2" />{"Me"}
          </ToggleButton>
        </ButtonGroup>
      </OverlayTrigger>
    </div>
  </div>
}

export default CalendarToolbar