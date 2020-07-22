import React, { useState } from "react"
import className from "classnames"
import { Accordion, Card, Row, Col, Button, ListGroup } from "react-bootstrap"
import { 
    FaRunning, 
    FaEdit, 
    FaBullseye, 
    FaTrash,
    FaInfoCircle
} from "react-icons/fa"

const SprintItem = props => {
const [isShow, toggleItem] = useState(false)
return (
    <Row  style={{ paddingBottom: "15px" }} 
        onMouseEnter={() => toggleItem(true)}
        onMouseLeave={() => toggleItem(false)}
    >
        <Col xs="12">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle 
                        as={Card.Header} 
                        
                    >
                        <FaRunning style={{ display: "inline-block", color: "#001f3f"}} size="1.8em"/>
                        <div style={{ fontSize: "22px" }} className="inline crd-title">
                                {props.item.sprintName}
                        </div>
                        <div style={{ float: "right" }}>
                            <Button style={{ height: "8%", fontWeight: "600" }} variant="success" disabled={props.index === 0}>
                                {
                                    props.index === 0
                                    ? "Started..."
                                    : "Start"
                                }
                            </Button>
                            <span style={{ marginLeft: "20px" }}>
                                <FaEdit style={{ display: "inline-block",  color: "#001f3f"}} size="1.9em"/>
                            </span>
                            <span style={{ marginLeft: "20px"}}>
                                <FaTrash style={{ display: "inline-block",  color: "#001f3f"}} size="1.5em"/>
                            </span>
                        </div>
                    </Accordion.Toggle>
                    <div className={
                            className(
                                "collapse",
                                {
                                    "show": isShow,
                                },
                            )
                        }>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                <span style={{ marginRight: "10px" }}>
                                    <FaBullseye style={{ color: "#DC143C" }}/>
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
                    </div>
                </Card>
            </Accordion>
        </Col>
    </Row>
)}

export default SprintItem