import React from "react"
import BacklogItem from "./BacklogItem"
import SprintItem from "./SprintItem"
import { 
    Button, 
    Row,
    } from "react-bootstrap"
import ProjectDetail from "../Projects/ProjectDetail/ProjectDetail"
import VerticalCenteredModal from "./VerticalCenteredModal"
import { 
    get_issues,
    get_sprints
} from "./dbOperations"
import "./Backlog.scss"



const Backlog = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = React.useState({ heading: "", isBacklog: false })
    const issues = get_issues()
    const sprints = get_sprints()
    
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
                            <h1>Backlog</h1>
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