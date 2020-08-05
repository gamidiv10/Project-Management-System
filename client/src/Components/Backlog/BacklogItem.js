import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import {
    Row,
    Col,
    Accordion,
    Card,
    Form,
    Button
} from "react-bootstrap"
import className from "classnames"
import {
    updateTaskToSprint
} from '../../redux/'
import "./Backlog.scss"

const BacklogItem = props =>  {
    const [sprintNumber, setSprintNumber] = useState(0)
    const [isShow, toggleItem] = useState(false)
    const dispatch = useDispatch()

    return (
        <Row  
            style={{ paddingBottom: "15px" }}
        >
            <Col xs="12">
                <Accordion>
                    <Card>
                        <Accordion.Toggle 
                            as={Card.Header} 
                            onClick={() => toggleItem(!isShow)}
                        >
                            <span className={`dot `+  props.item.issueType.toLowerCase()}/>
                            <div className="inline crd-title">
                                {props.item.summary}
                            </div>
                            <div style={{ float: "right" }}>
                                <span className="issue-label" style={{ display: "inline-block" }}>
                                    <span className={`label ` + props.item.issueType.toLowerCase()}>{props.item.issueType}</span>
                                </span>
                                {/* <span style={{ marginLeft: "15px", display: "inline-block" }}>
                                    <FaEdit style={{ display: "inline-block",  color: "#001f3f"}} size="1.5em"/>
                                </span>
                                <span style={{ marginLeft: "15px", display: "inline-block" }}>
                                    <FaTrash style={{ color: "#001f3f"}} />
                                </span> */}
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
                                <div style={{ paddingBottom: "10px" }}>
                                    <div style={{ display: "inline-block" }}>
                                        <b>Summary :</b>
                                        {props.item.summary}
                                    </div>
                                    <div style={{ display: "inline-block", paddingLeft: "20px" }}>
                                        <b>Description :</b>
                                        {props.item.description}
                                    </div>
                                    <div style={{ display: "inline-block", paddingLeft: "20px" }}>
                                        <b>Status :</b>{props.item.taskStatus}
                                    </div>
                                    <div style={{ display: "inline-block", paddingLeft: "20px" }}>
                                        <b>Priority :</b>{props.item.priority}
                                    </div>
                                </div>
                                <div>
                                    {
                                        props.isSprintTask
                                        ? 
                                            (<div style={{ display: "inline-block" }}>
                                                <Button 
                                                    variant="danger"
                                                    onClick={() => {
                                                        dispatch(updateTaskToSprint(
                                                            props.item._id,
                                                            props.sprintNumber,
                                                            0
                                                        ))
                                                    }}
                                                >
                                                    Remove Task
                                                </Button>
                                            </div>) 
                                        :
                                            <Form>
                                            <div style={{ display: "inline-block", width: "50%"}}>
                                                <Form.Group controlId="sprintNumber">
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter sprint Number to add this task to sprint." 
                                                        onChange={e => {
                                                            // console.log('---Sprint Number', e.target.value);
                                                            setSprintNumber(e.target.value)
                                                        }}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div style={{ display: "inline-block", width: "30%", marginLeft: "15px"}}>
                                                <Button 
                                                    variant="primary"
                                                    onClick={() => {
                                                        dispatch(updateTaskToSprint(
                                                            props.item._id,
                                                            sprintNumber,
                                                            sprintNumber
                                                        ))
                                                    }}
                                                >
                                                    Add to Sprint
                                                </Button>
                                            </div>
                                        </Form>
                                    }
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