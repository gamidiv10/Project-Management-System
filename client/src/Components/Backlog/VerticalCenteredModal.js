import React from "react"
import { 
    Button, 
    Modal,
    Container, 
    Form, 
    } from "react-bootstrap"
import { 
    insert_issue,
    insert_sprint,
} from "./dbOperations"

const VerticalCenteredModal = props => {
    // const [error, setError] = React.useState({ name: "", goal: "", description: "" })
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
            dataObj.sprintName = e.target.field1.value
            dataObj.sprintGoal = e.target.field2.value 
            dataObj.sprintDesc = e.target.field3.value || ""
            insert_sprint(dataObj)
            props.onHide()
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
                            <Form.Control required type="text" placeholder={"Enter " + props.data.name + " please."}/>
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
                                    <Form.Control required type="text" placeholder="Please enter sprint goal." />
                                </Form.Group>
                        }
                        <Form.Group controlId="field3">
                            <Form.Label>{props.data.description}</Form.Label>
                            <Form.Control  as="textarea" rows="3" placeholder={"Enter " + props.data.description + " please."}/>
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