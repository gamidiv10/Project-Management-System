import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import BacklogItem from "./BacklogItem"
import SprintItem from "./SprintItem"
import { 
    Button, 
    Row,
    } from "react-bootstrap"
// import { fetchBacklogIssues } from "../../redux/backlog/backlogAction"
import {
    fetchTasks,
    fetchSprintList
} from '../../redux/'
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail"
import VerticalCenteredModal from "./VerticalCenteredModal"
import CreateModal from "../Modal/Modal"
import CreateTask from "../Task/CreateTask/CreateTask"
import "./Backlog.scss"



const Backlog = props => {
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch()
    const [data, setData] = React.useState({ heading: "", isBacklog: false })
    const backlogState = useSelector(state => state.backlog)
    const sprintState = useSelector(state => state.sprint)
    // console.log('__ProJName', props.match.params.projectName);
    const projectName = props.match.params.projectName

    useEffect(() => {
        // console.log('---Task', backlogState.tasks );

            // console.log('__Backlog dispatched');
            dispatch(fetchTasks(projectName, 0))
            // console.log('__Sprint dispatched');
            dispatch(fetchSprintList(projectName))
    }, [])
    // console.log('---Sprint', sprintState.sprints);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const dismissable = () => {
        setIsModalOpen(false);
    };
    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    };
    const loading = () => (
        <div>
            <h4><b>Loading...</b></h4>
        </div>
    )
    const renderIssues = () => {
        if (backlogState.loading) {
            loading()
        } else {
            return (
                backlogState.tasks.map((item, index) => {
                    if (item.sprintNumber === 0) {
                        return (
                            <BacklogItem 
                                item={item}
                                key={`task`+index}
                            />
                        )
                    }
                    return null
                }))
        }
    }
        
    const renderSprints = () => {
        if (sprintState.loading) {
            loading()
        } else {
            return (
                sprintState.sprints.map((item, index) => (
                    <SprintItem 
                        item={item}
                        index={index}
                        key={`sprints`+index}
                        projectname={projectName}
                        isanysprintactive={sprintState.isAnySprintActive}
                />))
            )
        }
        
    }

    return (
        <>
            <ProjectDetail>
                <main className="ProjectDetailMain">
                    <div className="backlog-container">
                        <Row className="peopleHeader">
                            <div>
                                <h1>Backlog</h1>
                                {/* <FaThList style={{ display: "inline-block" }}/> */}
                            </div>
                            <div className="buttons">
                                <Button onClick={() => {
                                    handleModalOpen()
                                }}>Create Issue</Button>
                            </div>
                        </Row>
                        {renderIssues()}
                        <Row className="peopleHeader">
                            <h1>Sprints</h1>
                            <div className="buttons">
                            <Button onClick={() => {
                                    setData({ 
                                        heading: "Create Sprint", 
                                        name:"Sprint Name", 
                                        description: "Sprint Description", 
                                        isBacklog: false 
                                    })
                                    setModalShow(true)
                                }}>Create Sprint</Button>
                            </div>
                        </Row>
                        {renderSprints()}
                        <VerticalCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            data={data}
                            projectname={projectName}
                        />
                    </div>
                </main>
                <CreateModal
                    visible={isModalOpen}
                    children={isModalOpen ? <CreateTask dismiss={dismissable} /> : ""}
                />
            </ProjectDetail>
        </>
    )
}

export default Backlog