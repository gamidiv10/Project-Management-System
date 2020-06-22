import React, { useState, useEffect } from 'react'
import './Calendar.scss'
import moment from 'moment'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import { Card, Row, Col, Container } from 'react-bootstrap'

import Toolbar from './Toolbar'
import { colorScheme } from './defaultValues'
import dummyEvents from './events'

const CalendarView = () => {
  const [events, setEvents] = useState(dummyEvents)
  const [status, setStatus] = useState()
  const [self, setSelf] = useState(false)

  useEffect(() => {
    let newEvents = dummyEvents
    newEvents = newEvents.filter(e => status ? e.status === status.value : true)
    newEvents = self ? newEvents.filter(e => !!e.self) : newEvents
    setEvents(newEvents)
  }, [status, self])

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
              localizer={momentLocalizer(moment)}
              eventPropGetter={({ status }) => ({ 'style': { 'backgroundColor': colorScheme[status] } })}
              // onSelectEvent={handleEventClick}
              components={{
                toolbar: (props) =>
                  <Toolbar
                    {...props}
                    self={self}
                    event={events}
                    status={status}
                    setSelf={setSelf}
                    setStatus={setStatus}
                  />
              }}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default CalendarView