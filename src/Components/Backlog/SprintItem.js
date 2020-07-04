import React from "react"
import { Accordion, Card, Row, Col, Button, ListGroup } from "react-bootstrap"
import { 
    FaRunning, 
    FaSkype, 
    FaBullseye, 
    FaTrash,
    FaInfoCircle
} from "react-icons/fa"

const SprintItem = props => (
    <Row  style={{ paddingBottom: "15px" }}>
        <Col xs="12">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <FaSkype style={{ display: "inline-block", color: "#001f3f"}} size="1.8em"/>
                        <div style={{ fontSize: "22px" }} className="inline crd-title">
                                {props.item.sprintName}
                        </div>
                        <div style={{ float: "right" }}>
                            <Button style={{ height: "8%" }} variant="success">Start Sprint</Button>
                            <span style={{ marginLeft: "20px" }}>
                                <FaRunning style={{ display: "inline-block",  color: "#001f3f"}} size="2em"/>
                            </span>
                            <span style={{ marginLeft: "20px"}}>
                                <FaTrash style={{ display: "inline-block",  color: "#001f3f"}} size="1.5em"/>
                            </span>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                <span style={{ marginRight: "10px" }}>
                                    <FaBullseye style={{ color: "red" }}/>
                                </span>
                                <span style={{ display: "inline-block", color: "#001f3f", paddingRight: "8px" }}>
                                    <b>Sprint Goal :</b>
                                </span>
                                {props.item.sprintGoal}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span style={{ marginRight: "10px" }}>
                                    <FaInfoCircle style={{ color: "#3f5b77" }}/>
                                </span>
                                <span style={{ display: "inline-block", color: "#001f3f", paddingRight: "8px" }}>
                                    <b>Details :</b>
                                </span>
                                {props.item.sprintDesc}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Col>
    </Row>
)

export default SprintItem