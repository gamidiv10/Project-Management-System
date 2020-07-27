import React, {useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Form, 
    Button,
    Row,
    Col,
    Container,
    Alert
} from "react-bootstrap"
import { FaPenFancy } from "react-icons/fa"

import { fetchQuery } from '../../redux/query/queryAction'
import "./ContactUs.scss"

const ContactUs = () => {
    const query = useSelector(state => state.query)
    const dispatch = useDispatch()

    const [error, setError] = useState({ isFormOkay: false, fullName: "", email: "" })
    
    const validEmailRegex = RegExp(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
    );

    const onSubmit = e => {
        e.preventDefault()
        const message = {}
        const query = {
            fullName: e.target.fullName.value,
            subject: e.target.querySubject.value,
            email: e.target.userEmail.value,
            description: e.target.description.value
        }
        
        if (!query.fullName) {
            message.fullName = "Full name cannot be empty."
        } else if (query.fullName.split(" ").length < 2) {
            message.fullName = "Full name should have first name and last name."
        }
        if (!query.email || !validEmailRegex.test(query.email)) {
            message.email = "Invalid email! Please enter valid email."
        }
        if (!query.subject) {
            message.subject = 'Query subject cannot be empty.'
        }
        if (!query.description) {
            message.description = "Description cannot be empty."
        } else if (query.description.split(" ").length < 10) {
            message.description = "Description must at least be 10 words long."
        }
        if (Object.keys(message).length === 0) {
            dispatch(fetchQuery(query))
            setError({ isFormOkay: true })
        } else {
            setError(message)
        }
    }

    const onChange = (e) => {
        e.preventDefault()
        setError({ fullName: "", email: "" })
    }

    const getView = () => {
        if (error.isFormOkay) {
            if (!query.isIdle && query.isError) {
                return (
                    <Alert variant="danger">
                        <Alert.Heading>Oops! Some error occurred in adding query response</Alert.Heading>
                        <p>
                            Please refresh the page and submit your response again.
                        </p>
                        <hr />
                        <p className="mb-0">
                            For further queries contact <b>taskatic@gmail.com</b>
                        </p>
                    </Alert>
                )
            } else if (!query.isIdle && !query.isError) {
                return (
                    <Alert variant="success">
                        <Alert.Heading>Thank you! for submitting your response</Alert.Heading>
                        <p>
                            Your response is been recorded, our representative will contact you shortly on your provided email.
                        </p>
                        <hr />
                        <p className="mb-0">
                            For further queries contact <b>taskatic@gmail.com</b>
                        </p>
                    </Alert>
                )
            }
        } else {
            return (
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <div className={error.email ? "error" : ""}>
                            <Form.Control className={error.fullName ? "error" : ""} onChange={onChange} type="input" placeholder="Enter your full name"/>
                        </div>
                        {
                            error.fullName && 
                            <p style={{ color: "red", fontSize: "13px" }}>{error.fullName}</p>
                        }
                    </Form.Group>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <div className={error.email ? "error" : ""}>
                            <Form.Control  onChange={onChange} type="email" placeholder="Enter your valid email address" />
                        </div>
                        {
                            error.email && 
                            <p style={{ color: "red", fontSize: "13px" }}>{error.email}</p>
                        }
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="querySubject">
                        <Form.Label>Query Subject</Form.Label>
                        <div className={error.subject ? "error" : ""}>
                            <Form.Control type="text" placeholder="Enter subject of your query" />
                        </div>
                        {
                            error.subject && 
                            <p style={{ color: "red", fontSize: "13px" }}>{error.subject}</p>
                        }
                    </Form.Group>
                    
                    <Form.Group controlId="description">
                        <Form.Label>Query Description</Form.Label>
                        <div className={error.description ? "error" : ""}>
                            <Form.Control as="textarea" placeholder="Enter description of your query" rows="4" />
                        </div>
                        {
                            error.description && 
                            <p style={{ color: "red", fontSize: "13px" }}>{error.description}</p>
                        }
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </Form>
            )
        }
    }
    return (
        
        <Container fluid>
            <Row>
            <Col></Col>
            <Col xs={5}>
                <div className="form-title">
                    <span className="pen-icon"><FaPenFancy size="3em"/></span>
                    <p className="title-text">Drop us a message!</p>
                </div> 
                {getView()}
            </Col>
            <Col></Col>
            </Row>
        </Container>
    )
}

export default ContactUs