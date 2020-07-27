import React from 'react'
import { Link } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'
import "./HelpAndSupport.scss";

function HelpAndSupport() {
    return (
        <div>
            <div className="title-help-support">
                FAQ's
            </div>
            <div className="faq-parent">
                <div style={{ paddingBottom: "40px" }}>
                    <div className="q_and_a">
                        <div className="question">How do I create new project?</div>
                        <div className="answer">
                            To Add project to the system you just have to visit our Taskatic site click on "Projects" button.
                            After clicking on projects button you will see list of projects, on top right corner just click on 
                            <b> Create Project</b> and you will see modal asking you to add project details, so fill the form and click 
                            <b> Create Project</b> button inside modal and project gets added successfully.
                        </div>
                    </div>
                    <div className="q_and_a">
                        <div className="question">What is use of calendar view?</div>
                        <div className="answer">
                            Calendar view is to keep of track of sprit tasks along with its deadlines, using which you can see which tasks are
                            due on which date. You see issues/tasks which is at different state, for instance, you can ses which tasks
                            are <b>pending</b>, <b>in progress</b>, <b>open</b>, <b>closed</b>, etc. 
                        </div>
                    </div>
                    <div className="q_and_a">
                        <div className="question">How to add an Issue to a Backlog?</div>
                        <div className="answer">
                            To add Issue to backlog you have to first select the project from projects drop-down menu
                            after selecting project, click on <b>Backlog</b>, it will open the backlog for that project.
                            Click <b>Create Issue</b> and it will open the modal for adding the issue details, from which
                            you can fill the form and on clicking <b>Create</b>, it would add issue to backlog.
                        </div>
                    </div>
                </div>
                
                <Card className="text-center">
                        <Card.Body>
                            <h5 style={{ color: '#001f3f' }}>Still have questions?</h5>
                            <p style={{ paddingTop: "10px", color: "#3f5b77" }}>
                                Checkout our other supporting links below
                            </p>
                            <Card.Text style={{ color: "#3f5b77" }}>
                                Submit your queries by contacting us or know about our brilliant Taskatic team!
                            </Card.Text>
                            <div style={{ display: "inline-block" }}>
                                <Link to={'/contact-us'}>
                                    <Button variant="primary">Contact us</Button>
                                </Link>
                                <Link to={'/about-us'}>
                                    <div style={{ display: "inline-block" }} className="link-button">
                                        <Button 
                                            style={{ margin: "0 4em" }}variant="primary">
                                            Know about us
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default HelpAndSupport
