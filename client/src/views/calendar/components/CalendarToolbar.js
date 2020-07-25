import React from 'react';
import chroma from 'chroma-js'
import Select from 'react-select'
import { Navigate } from 'react-big-calendar'
// import { ToggleButton, ButtonGroup } from 'react-bootstrap'

import { colorScheme, status } from '../../../constants/defaultValues'
import Tooltip from '../../../common/Tooltip'

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

const CalendarToolbar = ({
  projectList,
  projectName,
  taskStatus,
  onNavigate,
  label,
  setProjectName,
  setTaskStatus
}) => {
  const projectListOptions = projectList
    .map(({ projectName }) => ({ value: projectName, label: projectName }))
  const selectOptions = Object
    .keys(status)
    .map(value => ({ value, label: status[value], color: colorScheme[value] }))

  return <div className="d-flex justify-content-between mb-3" style={{ zIndex: 100 }}>
    <div className="d-flex">
      {/* Month Label */}
      <h4 className="mb-0 pt-1 pr-2">{label}</h4>
      {/* Link to current month */}
      <span className="pointer pt-2 px-2" onClick={() => onNavigate(Navigate.TODAY)}>
        {"Today"}
      </span>
      {/* Link to Previous month */}
      <Tooltip placement="top" tooltip="Previous Month">
        <span
          className="pointer pt-1 px-2"
          style={{ color: 'gray', fontSize: '1.25rem', }}
          onClick={() => onNavigate(Navigate.PREVIOUS)}
        >
          <i className="fa fa-chevron-circle-left" />
        </span>
      </Tooltip>
      {/* Link to Next Month */}
      <Tooltip placement="top" tooltip="Next Month">
        <span
          className="pointer pt-1 px-2"
          style={{ color: 'gray', fontSize: '1.25rem', }}
          onClick={() => onNavigate(Navigate.NEXT)}
        >
          <i className="fa fa-chevron-circle-right" />
        </span>
      </Tooltip>
    </div>
    <div className="d-flex">
      {/* Task taskStatus filter */}
      <Select
        isClearable
        value={projectName}
        placeholder="Project"
        onChange={setProjectName}
        styles={({ control: style => ({ width: '175px', ...style }) })}
        options={projectListOptions}
      />
      <span className="ml-2">
        <Select
          isClearable
          value={taskStatus}
          placeholder="Status"
          onChange={setTaskStatus}
          styles={selectComponentStyles()}
          options={selectOptions}
        />
      </span>
    </div>
  </div>
}

export default CalendarToolbar