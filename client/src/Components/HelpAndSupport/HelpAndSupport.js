import React from 'react'
import "./HelpAndSupport.scss";

function HelpAndSupport() {
    return (
        <div>
            <div className="title-help-support">
                FAQ's
            </div>
            <div className="faq-parent">
                <div className="q_and_a">
                    <div class="question">How do I create new project?</div>
                    <div className="answer">
                        To Add project to the system you just have to visit our Taskatic site click on "Projects" button.
                        After clicking on projects button you will see list of projects, on top right corner just click on 
                        <b> Create Project</b> and you will see modal asking you to add project details, so fill the form and click 
                        <b> Create Project</b> button inside modal and project gets added successfully.
                    </div>
                </div>
                <div className="q_and_a">
                    <div class="question">What is use of calendar view?</div>
                    <div className="answer">
                        Calendar view is to keep of track of sprit tasks along with its deadlines, using which you can see which tasks are
                        due on which date. You see issues/tasks which is at different state, for instance, you can ses which tasks
                        are <b>pending</b>, <b>in progress</b>, <b>open</b>, <b>closed</b>, etc. 
                    </div>
                </div>
                <div className="q_and_a">
                    <div class="question">How to add an Issue to a Backlog?</div>
                    <div className="answer">
                        To add Issue to backlog you have to first select the project from projects drop-down menu
                        after selecting project, click on <b>Backlog</b>, it will open the backlog for that project.
                        Click <b>Create Issue</b> and it will open the modal for adding the issue details, from which
                        you can fill the form and on clicking <b>Create</b>, it would add issue to backlog.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpAndSupport
