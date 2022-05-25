import './App.css';
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data.js';
import Detail from './pages/Detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [탭 , 탭변경]= useState(0);

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
      <Button variant="secondary" onClick={()=>{
        // axios로 요청하는거 해볼래
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((결과)=>{
          console.log(결과.data);
          // 가져온 데이터를 추가해주세요.
          let copy = [...shoes, ...결과.data];
          console.log(결과.data);
          setShoes(copy);
        })
        .catch(()=>{
          console.log('axios 실패')
        })
        // ajax통신방법중 fetch라는 방법도있지만.... JSON-> array/object로 변환해주는 과정필요해서 그냥 axios 씁니다.
        // fetch('https://codingapple1.github.io/shop/data2.json')
        // .then(결과 => 결과.json())
        // .then(data=>{})


        // 데이터 실어 서버로 보내기
        // axios.post('/safdfas',{name: 'kim'})
        // ajax를 여러군대로 보내고싶어요.
        //Promise.all([axios.get('/url1'), axios.get('url2')]).then(()=>{}) then은 생략가능
      }}>더보기</Button>
      <div style={{margin:"20px"}}></div>
      <Nav variant="pills" defaultActiveKey="1" className='NavTab'>
      <Nav.Item>
        <Nav.Link eventKey="1" title="Item" onClick={()=>{
          탭변경(0)
        }}>
          NavLink 1 content
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="2" title="Item" onClick={()=>{
          탭변경(1)
        }}>
          NavLink 2 content
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3" title="Item" onClick={()=>{
          탭변경(2)
        }}>
          NavLink 3 content
        </Nav.Link>
      </Nav.Item>
      </Nav>
      <TabContent 탭={탭}></TabContent>
      {/* 
      1. html/css로 미리 디자인
      2. ui의 상태를 저장해 둘 state 만들기
      3. component로 만들어서 적용 
      */}
    </div>
  );
}
function TabContent({탭, props2}){
  // if(탭 == 0){
  //   return(<div>여기1</div>)
  // }else if(탭 == 1){
  //   return(<div>여기2</div>)
  // }else if(탭 == 2){
  //   return(<div>여기3</div>)
  // }
  // 그런데 만약 if문이 길어지는게 싫다면 아래 방법도있음.
  return([<div>여기1</div>,<div>여기2</div>,<div>여기3</div>][탭])
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
