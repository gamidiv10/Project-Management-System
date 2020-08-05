import React, { useState } from "react"
import className from "classnames"
import { 
    // useSelector, 
    useDispatch 
} from 'react-redux'
import { Accordion, Card, Row, Col, Button, ListGroup } from "react-bootstrap"
import { 
    FaRunning, 
    FaEdit, 
    FaBullseye, 
    FaTrash,
    FaInfoCircle,
    FaTasks
} from "react-icons/fa"
import BacklogItem from './BacklogItem'
import {
    deleteSprint,
    startSprint
} from "../../redux/"

const SprintItem = props => {
    
const projectName = props.projectname
const dispatch = useDispatch()
const [isShow, toggleItem] = useState(false)
const fetchTasks = (tasks, sNumber) => (
    tasks.map((task, index) => (
        <BacklogItem 
            item={task}
            key={`sprint_task`+index}
            isSprintTask
            sprintNumber={sNumber}
        />
    ))
)

const getButton = () => {
    if (props.isanysprintactive && props.item.isActive) {
        return (
            <Button style={{ height: "8%", fontWeight: "600" }} variant="success" disabled={true}>
                {"Started..."}
            </Button>
        )
    } else if (props.isanysprintactive) {
        return ""
    } else {
        return (
            <Button 
                style={{ height: "8%", fontWeight: "600" }} 
                variant="success"
                onClick={() => dispatch(
                    startSprint(
                        props.item.sprintNumber
                    )
                )}
            >
                {"Start"}
            </Button>
        )
    }
}
return (
    <Row  style={{ paddingBottom: "15px" }}>
        <Col xs="12">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle 
                        as={Card.Header}
                        onClick={() => toggleItem(!isShow)}
                    >
                        <FaRunning style={{ display: "inline-block", color: "#001f3f"}} size="1.8em"/>
                        <div style={{ fontSize: "22px" }} className="inline crd-title">
                                {props.item.name} (sprint: {props.item.sprintNumber})
                        </div>
                        <div style={{ float: "right" }}>
                            {getButton()}
                            {/* <span style={{ marginLeft: "20px" }}>
                                <FaEdit style={{ display: "inline-block",  color: "#001f3f"}} size="1.9em"/>
                            </span> */}
                            <span style={{ marginLeft: "20px"}}>
                                <FaTrash 
                                    onClick={() => dispatch(deleteSprint(
                                        props.item._id,
                                        projectName
                                    ))} 
                                    style={{ display: "inline-block",  
                                    color: "#001f3f"}} size="1.5em"
                                />
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
                                {props.item.goal}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span style={{ marginRight: "10px" }}>
                                    <FaInfoCircle style={{ color: "#3f5b77" }}/>
                                </span>
                                <span style={{ display: "inline-block", color: "#001f3f", paddingRight: "8px" }}>
                                    <b>Details :</b>
                                </span>
                                {props.item.description}
                            </ListGroup.Item>
                            {
                                props.item.tasks.length !==0 && 
                                <ListGroup.Item>
                                    <span style={{ marginRight: "10px" }}>
                                        <FaTasks style={{ color: "#3f5b77" }}/>
                                    </span>
                                    <span style={{ display: "inline-block", color: "#001f3f", fontSize: "18px", paddingRight: "8px" }}>
                                        <b>Tasks under Sprint :</b>
                                    </span>
                                    <div style={{ paddingTop: "20px" }}>
                                        {fetchTasks(
                                            props.item.tasks, props.item.sprintNumber
                                        )}
                                    </div>
                                </ListGroup.Item>
                            }
                        </ListGroup>
                    </Card.Body>
                    </div>
                </Card>
            </Accordion>
        </Col>
    </Row>
)}

export default SprintItem