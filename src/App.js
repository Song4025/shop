import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data.js';
import Detail from './pages/Detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      
      <Navbar className='Nav'>
        <Container>
        <Navbar.Brand className='Title' style={{color: 'white'}}>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Routes>
      <Route path="/" element={
        <>
        <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')'}}></div>
        <Row>{
          shoes.map(((a, i)=>{
            return(
              <Card shoes={shoes[i]} i={i} key={i}></Card>
            )}
            ))
          }
        </Row>
        </>
      } />
        {/* URL 파라미터쓰면 여러페이지 만들 수 있음 */}
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        
        {/* 아래처럼 Route안에 Route넣는걸 Nested Route라고함
        1. 장점: 소스가 간단해짐
        2. 장점: element 여러개를 한페이지안에 보여줄 수 있음. <Outlet>으로..
        언제씀? 여러가지 페이지를 보여줘야하는데 페이지마다 차이가 별로없으면.
        */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={<EventPage/>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
        </Route>
        <Route path="*" element={<div>없는페이지요</div>} />
      </Routes>
      <button onClick={()=>{
        // axios로 요청하는거 해볼래
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((결과)=>{
          console.log(결과.data);
        })
        .catch(()=>{
          console.log('axios 실패')
        })
      }}>버튼</button>
    </div>
  );
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function EventPage(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
} 

function Card(props){
  return (
  <Col sm>
    <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" />
    <h4>{props.shoes.title}</h4>
    <p>{props.shoes.price}</p>
  </Col>
  )
}

export default App;
