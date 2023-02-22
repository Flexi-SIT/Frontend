import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CompanyLoginSection.css'

const LoginSection = () => {
  return (
        <Row xs={1} lg={2} className='container'>
            <Col className='img-container d-flex justify-content-center align-items-center'>
              <img src='./1.svg' alt='login' className='login-img' />
            </Col>
            <Col className='text-container d-flex justify-content-center'>
              <Form className='mb-4'>
                <Form.Group className="mb-4 login-email" controlId="formBasicEmail">
                <Form.Control type="email" placeholder='Email Address' className='email-input'/>
                </Form.Group>

                <Form.Group className="mb-4 login-password" controlId="formBasicEmail">
                <Form.Control type="password" placeholder='Password' className='password-input'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me"/>
                </Form.Group>
                <Button variant="primary" type="submit" className='submit-button'>
                  SIGN IN
                </Button>
              </Form>
            </Col>
        </Row>
  )
}

export default LoginSection
