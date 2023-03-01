import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const HomePage = () => {
    return (
       <>
       <Navbar bg="dark" expand="lg" variant='dark'>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className="px-2 mr-auto">
            <Nav.Link className='px-4' href="/">Voter Registration</Nav.Link>
            <Nav.Link className='px-4' href="/">Voting</Nav.Link>
            <Nav.Link className='px-4' href="/">Vote Counting</Nav.Link>
            <Nav.Link className='px-4' href="/">Audit</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
          <Row className='container'>
            <Col >

            </Col>
          </Row>
        </>
    )
}

export default HomePage
