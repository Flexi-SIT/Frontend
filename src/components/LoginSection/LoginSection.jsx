import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './LoginSection.css'

function LoginSection() {
  return (
    <Container fluid className='p-3 my-5'>
        <Row>
            <Col lg='10' md='6'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid login-img" alt="Phone image" />
            </Col>
            <Col lg='4' md='6'>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="email" />
                </Form.Group>
            </Col>
        </Row>
    </Container>
  )
}

export default LoginSection
