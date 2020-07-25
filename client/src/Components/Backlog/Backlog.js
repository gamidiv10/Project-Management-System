import React from "react"
// import { useSelector, useDispatch } from 'react-redux'
import BacklogItem from "./BacklogItem"
import SprintItem from "./SprintItem"
import { 
    Button, 
    Row,
    } from "react-bootstrap"
// import { fetchBacklogIssues } from "../../redux/backlog/backlogAction"
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail"
import VerticalCenteredModal from "./VerticalCenteredModal"
import { 
    get_sprints,
    get_issues
} from "./dbOperations"
import "./Backlog.scss"



const Backlog = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = React.useState({ heading: "", isBacklog: false })
    const issues = get_issues()
    const sprints = get_sprints()
    // const dispatch = useDispatch()
    // redux state variables
    // const issues = useSelector(state => state.backlog.issues)
    // const loading = useSelector(state => state.backlog.loading)
    // const message = useSelector(state => state.backlog.message)
    // const success = useSelector(state => state.backlog.success)

    // useEffect(() => {
    //     dispatch(fetchBacklogIssues())
    // })
    const renderIssues = () => (
        issues.map((item, index) => (
            <BacklogItem 
                item={item}
                key={`issues`+index}
            />
        ))
        )
        
        const renderSprints = () => (
            sprints.map((item, index) => (
                <SprintItem 
                item={item}
                index={index}
                key={`sprints`+index}
            />
        ))
    )

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
                                    setData({ 
                                        heading: "Create Issue", 
                                        name:"Issue Name", 
                                        description: "Issue Description", 
                                        isBacklog: true 
                                    })
                                    setModalShow(true)
                                }}>Create Issue</Button>
                            </div>
                        </Row>
                        {issues && renderIssues()}
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
                        {sprints && renderSprints()}
                        <VerticalCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            data={data}
                        />
                    </div>
                </main>
            </ProjectDetail>
        </>
    )
}

export default Backlog