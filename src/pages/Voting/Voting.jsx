import React, { useState } from "react";
import { Container, Row, Col, CarouselItem } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import votingimg from "../../assets/7.svg";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import img1 from "../../assets/1.svg";
import img2 from "../../assets/3.svg";
import img3 from "../../assets/4.svg";
import "./Voting.css";

const Voting = () => {
  return (
    <>
      <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
        {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="px-2 mr-auto">
            <Nav.Link className="px-4 nav-items" href="/voter-registration">
              Voter Registration
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/voting">
              Voting
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/votecount">
              Vote Counting
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/audit">
              Audit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="main-container">
        <Row>
          <Col className="justify-content-center align-items-center">
            <img src={votingimg} className="main-img" />
          </Col>
          <Col className="text-container justify-content-center align-items-center left-text">
            <h1 className="web-text-left">
              VOTE <br />
              HERE
            </h1>
          </Col>
          <Col className="text-container justify-content-center align-items-center right-text">
            <h3 className="web-text-right">
              The voters can vote for their proffered candidate here
            </h3>
            <Button
              variant="dark"
              type="submit"
              className="submit-button-admin"
              href="/voter"
            >
              Voter Login
            </Button>
            <Button
              variant="dark"
              type="submit"
              className="submit-button-company"
              href="/company"
            >
              Company Login
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          grabCursor={true}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="slider-slider"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            375: {
              width: 375,
              slidesPerView: 1,
              spaceBetween: 100,
            },
            425: {
              slidesPerView: 1,
              spaceBetween: 405,
            },
            768: {
              width: 768,
              slidesPerView: 2,
              spaceBetween: 230,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 490,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
            2560: {
              slidesPerView: 5,
              spaceBetween: 200,
            },
          }}
        >
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img2} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img3} className="event-slider-img" />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img src={img1} className="event-slider-img" />
          </SwiperSlide>
        </Swiper>
      </Container>
      <Container fluid className="main-container-2">
        <Row xs={1} md={3} className="mt-5 mb-5 g-1">
          <Col>
            <Card className="container-uses-register">
              <Card.Img className="container-uses-vote-img" variant="top" />
              <Card.Body>
                <Card.Title>Register yourself a voter</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Card className="container-uses-vote px-5">
            <Card.Img className="container-uses-vote-img" variant="top" />
            <Card.Body>
              <Card.Title>Cast your vote</Card.Title>
            </Card.Body>
          </Card>
          <Card className="container-uses-result px-4">
            <Card.Img className="container-uses-result-img" variant="top" />
            <Card.Body>
              <Card.Title>Check the results</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Voting;
