// import Row from 'react-bootstrap/Row';
// import React, { Component } from 'react';
// import { Grid, Button, Header, Icon, Image, Menu, Sidebar, Container, Card } from 'semantic-ui-react';
// import web3 from '../../Ethereum/web3';
// import Election from '../../Ethereum/election';
// import Cookies from 'js-cookie';


// import { Link, Routes, Route, useNavigate } from 'react-router-dom';


// class VotingList extends Component {
//     state = {
//         numCand: '',
//         election_address: Cookies.get('address'),
//         election_name: '',
//         election_description: '',
//         candidates: [],
//         cand_name: '',
//         cand_desc: '',
//         buffer: '',
//         ipfsHash: null,
//         loading: false
//     };
//     //GridExampleGrid = () => <Grid>{columns}</Grid>
//     SidebarExampleVisible = () => (

//         <Sidebar.Pushable>
//             <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' style={{ backgroundColor: 'white', borderWidth: "10px" }}>
//                 <Menu.Item as='a' style={{ color: 'grey' }} >
//                     <h2>MENU</h2>
//                 </Menu.Item>
//                 <Menu.Item as='a' style={{ color: 'grey' }} >
//                     <Icon name='dashboard' />
//                     Dashboard
//                 </Menu.Item>
//                 {/* <hr /> */}
//                 <br />
//                 <Menu.Item as='a' style={{ color: 'grey' }}>
//                     <Icon name='user outline' />
//                     Candidate List
//                 </Menu.Item> 
//                 <br />   
//                 <Menu.Item as='a' style={{ color: 'grey' }}>
//                     <Icon name='list' />
//                     Voter List
//                 </Menu.Item>
//                 <br />
//                 <Button onClick={this.signOut} style={{ backgroundColor: 'white' }}>
//                     <Menu.Item as='a' style={{ color: 'grey' }}>
//                         <Icon name='sign out' />
//                         Sign Out
//                     </Menu.Item>
//                 </Button>
//             </Sidebar>
//         </Sidebar.Pushable>
//     )

//     signOut() {
//         Cookies.remove('address');
//         Cookies.remove('voter_email');
//         alert("Logging out.");
//         //navigate('/homepage');
//     }

//     async componentDidMount() {

//         try {
//             const add = Cookies.get('address');
//             const election = Election(add);
//             const summary = await election.methods.getElectionDetails().call();
//             this.setState({
//                 election_name: summary[0],
//                 election_description: summary[1]
//             });
//             const c = await election.methods.getNumOfCandidates.call();

//             let candidates = [];
//             for (let i = 0; i < c; i++) {
//                 candidates.push(await election.methods.getCandidate(i).call());
//             }
//             let i = -1;
//             const items = candidates.map(candidate => {
//                 i++;
//                 return {
//                     header: candidate[0],
//                     description: candidate[1],
//                     image: (
//                         <Image id={i} src={`https://ipfs.io/ipfs/${candidate[2]}`} style={{ maxWidth: '100%', maxHeight: '190px' }} />
//                     ),
//                     extra: (
//                         <div>
//                             <Icon name='pie graph' size='big' iconPostion='left' />
//                             {candidate[3].toString()}
//                             <Button id={i} style={{ float: 'right' }} onClick={this.vote} primary>Vote!</Button>
//                         </div>
//                     )
//                 };

//             });
//             this.setState({ item: items });
//         } catch (err) {
//             console.log(err.message);
//             alert("Session expired. Redirecting you to login page...");
//             //navigate('/voter_login');
//         }
//     }
//     getElectionDetails = () => {
//         const {
//             election_name,
//             election_description
//         } = this.state;

//         return (
//             <div style={{ marginLeft: '45%', marginBottom: '2%', marginTop: '2%' }}>
//                 <Header as="h2">
//                     <Icon name="address card" />
//                     <Header.Content>
//                         {election_name}
//                         <Header.Subheader>{election_description}</Header.Subheader>
//                     </Header.Content>
//                 </Header>
//             </div>
//         );
//     }

//     renderTable = () => {
//         return (<Card.Group items={this.state.item} />)
//     }

//     vote = async event => {
//         const e = parseInt(event.currentTarget.id, 10);
//         const accounts = await web3.eth.getAccounts();
//         const add = Cookies.get('address');
//         const election = Election(add);
//         await election.methods.vote(e, Cookies.get('voter_email')).send({ from: accounts[0] });
//         alert("Voted!")
//     }

//     render() {
//         return (
//             <div>
//                 <title>Vote</title>
//                 <link rel="shortcut icon" type="image/x-icon" href="../../static/logo3.png" />
//                 <Grid>
//                     <Grid.Row>
//                         <Grid.Column width={2}>
//                             {this.SidebarExampleVisible()}
//                         </Grid.Column>
//                         {this.getElectionDetails()}
//                         <br />
//                         <br />
//                         {/* <Grid.Column style={{ minHeight: '77vh', marginLeft: '10%' }}>
//                             <Container>
//                                 {this.renderTable()}
//                             </Container>
//                         </Grid.Column> */}
//                         <Grid.Column width={14} style={{minHeight: '630px'}}>

//                         </Grid.Column>
//                     </Grid.Row>
//                 </Grid>
//             </div>
//         );
//     }
// }

// export default VotingList

import { Container, Row, Col } from 'react-bootstrap';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar'
import { FaList } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { AiFillDashboard } from "react-icons/ai";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "react-pro-sidebar/dist/css/styles.css";
import './VotingList.css';

const VotingList = () => {
    return (
        <Container>
            <Row className='px-5 mx-5 justify-content-center'>
                <h1 className='header'>BLOCK VOTES</h1>
                <hr />
            </Row>
            <Row>
                <Col className='py-5'>
                    <h3>Voter List</h3>
                    <Row>
                        <Col className='px-5 py-5 my-3 voter-container'>
                            <p>Hello</p>
                        </Col>
                        <Col className='px-5 py-5 voter-container'>
                            <p>Hello</p>
                        </Col>
                    </Row>
                </Col>
                <Col className='py-5 register-container'>
                    <h3>Register Voter</h3>
                    <br />
                    <Form className='mb-4'>
                    <Form.Group className="mb-4 login-email" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder='Enter Your Email Address' className='email-input'/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='submit-button'>
                    Register
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default VotingList;
