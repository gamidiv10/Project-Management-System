import React from "react"
import {
    Row,
    Col,
    Accordion,
    Card
} from "react-bootstrap"
import { FaTrash, FaEdit } from "react-icons/fa"

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
                            <div style={{ float: "right" }}>
                                <span className="issue-label" style={{ display: "inline-block" }}>
                                    <span className={`label ` + props.item.issueType.toLowerCase()}>{props.item.issueType}</span>
                                </span>
                                <span style={{ marginLeft: "15px", display: "inline-block" }}>
                                    <FaEdit style={{ display: "inline-block",  color: "#001f3f"}} size="1.5em"/>
                                </span>
                                <span style={{ marginLeft: "15px", display: "inline-block" }}>
                                    <FaTrash style={{ color: "#001f3f"}} />
                                </span>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body className="card-body">
                                <div style={{ display: "inline-block", width: "70%" }}>
                                    {props.item.issueDesc}
                                </div>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    )

export default BacklogItem