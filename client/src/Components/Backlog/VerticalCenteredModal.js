import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import { 
    Button, 
    Modal,
    Container, 
    Form, 
    } from "react-bootstrap"
import { 
    // insert_sprint,
    insert_issue
} from "./dbOperations"
import "../ContactUs/ContactUs.scss"

import {
    createSprint
} from '../../redux/'


const VerticalCenteredModal = props => {
    // console.log('Vertical model', props);
    const [error, setError] = React.useState({ name: "", goal: "" })
    const dispatch = useDispatch()
    const sprintState = useSelector(state => state.sprint)
    const onChange = (e) => {
        e.preventDefault()
        setError({ name: "", goal: "" })
    }

    const onSubmit = e => {
        e.preventDefault()
        const dataObj = {}
        const isIssue = props.data.isBacklog
        
        if (isIssue) {
            dataObj.issueName = e.target.field1.value
            dataObj.issueType = e.target.field2.value 
            dataObj.issueDesc = e.target.field3.value || ""
            insert_issue(dataObj)
            props.onHide()
        } else {
            const sprintName = e.target.field1.value
            const sprintGoal = e.target.field2.value 
            const sprintDesc = e.target.field3.value || ""
            const error = {}
            let isError = false
            if (!sprintName) {
                isError = true
                error.name = "Sprint name cannot be empty."
            }
            if (!sprintGoal) {
                isError = true
                error.goal = "Issue type cannot be empty."
            }
            if (isError) {
                setError(error)
            } else {
                // insert_sprint(dataObj)
                dispatch(createSprint(
                    sprintName,
                    sprintGoal,
                    props.projectname,
                    sprintDesc
                ))
                props.onHide()
            }
        }
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.data.heading}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form id="modal-form" onSubmit={onSubmit}>
                        <Form.Group controlId="field1">
                            <Form.Label>{props.data.name}</Form.Label>
                            <div className={error.name ? "error" : ""}>
                                <Form.Control 
                                    type="text" 
                                    placeholder={"Please enter" + props.data.name  + "."}
                                    onChange={onChange}
                                />
                            </div>
                            {
                                error.name && 
                                <p style={{ color: "red", fontSize: "13px" }}>{error.name}</p>
                            }
                        </Form.Group>
                        {
                            props.data.isBacklog 
                            ? 
                                <Form.Group controlId="field2">
                                    <Form.Label>Issue Type</Form.Label>
                                    <Form.Control as="select">
                                        <option>Task</option>
                                        <option>Bug</option>
                                        <option>Story</option>
                                    </Form.Control>
                                </Form.Group>
                            :
                                <Form.Group controlId="field2">
                                    <Form.Label>Sprint Goal</Form.Label>
                                    <div className={error.goal ? "error" : ""}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Please enter sprint goal." 
                                            onChange={onChange}
                                        />
                                    </div>
                                    {
                                        error.goal && 
                                        <p style={{ color: "red", fontSize: "13px" }}>{error.goal}</p>
                                    }
                                </Form.Group>
                        }
                        <Form.Group controlId="field3">
                            <Form.Label>{props.data.description}</Form.Label>
                            <Form.Control  
                                as="textarea" 
                                rows="3" 
                                placeholder={"Enter " + props.data.description + " please."}
                                onChange={onChange}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <div className="buttons">
                    <Button form="modal-form" type="submit">Create</Button>
                </div>
            </Modal.Footer>
        </Modal>
        );
    }

export default VerticalCenteredModal