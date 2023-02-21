import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './LoginSection.css'

const LoginSection = () => {
  return (
        <Row xs={1} lg={2} className='container'>
            <Col className='img-container d-flex justify-content-center align-items-center'>
              <img src='./1.svg' alt='login' className='login-img' />
            </Col>
            <Col className='text-container d-flex justify-content-center'>
              <InputGroup className='mb-4'>
                <Form.Group className="mb-4 login-email" controlId="formBasicEmail">
                <Form.Control type="email" placeholder='Email Address'/>
                </Form.Group>

                <Form.Group className="mb-4 login-password" controlId="formBasicEmail">
                <Form.Control type="password" placeholder='Password'/>
                </Form.Group>
              </InputGroup>

               <InputGroup className='mb-4'>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <Form.Control aria-label="Text input with checkbox" />
              </InputGroup>
            </Col>
        </Row>
  )
}

export default LoginSection
