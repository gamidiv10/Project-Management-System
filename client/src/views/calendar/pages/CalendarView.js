/**
 * @author Sneh Jogani <sjogani16@dal.ca>
 */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import { Card, Row, Col, Container } from 'react-bootstrap'

import CalendarToolbar from '../components/CalendarToolbar'
import { colorScheme } from '../../../constants/defaultValues'

const CalendarView = (props) => {
  const { history } = props
  const [events, setEvents] = useState([])
  const [projectList, setProjectList] = useState([])
  const [projectName, setProjectName] = useState()
  const [taskStatus, setTaskStatus] = useState()
  const userName = localStorage.getItem("user");

  useEffect(() => {
    axios({ url: `/project/getProjects/${userName}` })
      .then(({ data: { data } }) => setProjectList(data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios({
      url: '/task/calendar',
      params: {
        projectName: projectName ? projectName.value : undefined,
        taskStatus: taskStatus ? taskStatus.value : undefined
      }
    })
      .then(({ data: { data } }) => setEvents(data))
  }, [projectName, taskStatus])

  return <Container fluid className="calendar-container">
    <Row className="h-100">
      <Col xs="12">
        <Card className="h-100">
          <Card.Body>
            <BigCalendar
              popup
              events={events}
              views={['month']}
              endAccessor={'dueDate'}
              startAccessor={'dueDate'}
              titleAccessor={'summary'}
              tooltipAccessor={'description'}
              localizer={momentLocalizer(moment)}
              eventPropGetter={({ taskStatus: status }) => ({ 'style': { 'backgroundColor': colorScheme[status] } })}
              onSelectEvent={event => {
                history.push(`/project/${event.projectName}/activesprint`);
              }}
              components={{
                toolbar: (props) =>
                  <CalendarToolbar
                    {...props}
                    event={events}
                    taskStatus={taskStatus}
                    projectList={projectList}
                    projectName={projectName}
                    setTaskStatus={setTaskStatus}
                    setProjectName={setProjectName}
                  />
              }}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default withRouter(CalendarView)