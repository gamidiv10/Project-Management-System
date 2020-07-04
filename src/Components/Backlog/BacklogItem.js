import React from "react"
import {
    Row,
    Col,
    Accordion,
    Card,
    Form
} from "react-bootstrap"
import { FaTrash } from "react-icons/fa"

const BacklogItem = props =>  (
        <Row  style={{ paddingBottom: "15px" }}>
            <Col xs="12">
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <span className={`dot `+  props.item.issueType.toLowerCase()}/>
                            <div className="inline crd-title">
                                {props.item.issueName}
                            </div>
                            <FaTrash style={{ float: "right", color: "#001f3f"}} />
                            <span className="issue-label">
                                <span className={`label ` + props.item.issueType.toLowerCase()}>{props.item.issueType}</span>
                            </span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body className="card-body">
                                <div style={{ display: "inline-block", width: "70%" }}>
                                    {props.item.issueDesc}
                                </div>
                                <div style={{ display: "inline-block", float: "right" }}>
                                    <Form>
                                        <Form.Group controlId="issue-type">
                                            <Form.Control as="select" defaultValue={props.item.issueType}>
                                                <option>Bug</option>
                                                <option>Task</option>
                                                <option>Story</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    )

export default BacklogItem