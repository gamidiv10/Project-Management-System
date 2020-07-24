import React, { useState } from "react"
import {
    Row,
    Col,
    Accordion,
    Card
} from "react-bootstrap"
import className from "classnames"
import { FaTrash, FaEdit } from "react-icons/fa"

const BacklogItem = props =>  {
    const [isShow, toggleItem] = useState(false)

    return (
        <Row  
            style={{ paddingBottom: "15px" }}
            onMouseEnter={() => toggleItem(true)}
            onMouseLeave={() => toggleItem(false)}
        >
            <Col xs="12">
                <Accordion>
                    <Card>
                        <Accordion.Toggle 
                            as={Card.Header} 
                        >
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
                        <div className={
                            className(
                                "collapse",
                                {
                                    "show": isShow,
                                },
                            )
                        }>
                        <Card.Body className="card-body">
                                <div style={{ display: "inline-block", width: "70%" }}>
                                    {props.item.issueDesc}
                                </div>
                        </Card.Body>
                        </div>
                    </Card>
                </Accordion>
            </Col>
        </Row>
    )
}
export default BacklogItem