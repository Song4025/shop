import './App.css';
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import bg from './img/bg.png';
import { lazy,Suspense, createContext, useState, useEffect } from 'react';
import data from './data.js';
// import Detail from './pages/Detail.js';
// import Cart from './routes/Cart.js'
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [재고]= useState([10, 11, 12])
  let [more, setMore] = useState(2)

  let result = useQuery('작명', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{
      console.log('요청됨')
      return a.data
    }),
    { staleTime : 2000 }
  })

  return (
    <div className="App">
      <Navbar className='Nav'>
        <Container>
        <Navbar.Brand className='Title' style={{color: 'white'}}>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          {result.isLoading && '로딩중'}
          {result.error && '에러남'}
          {result.data && result.data.name}
        </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중중중</div>}>
      <Routes>
      <Route path="/" element={
        <>
        <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')'}}></div>
        <Row sm={3}>
          {
          shoes.map(((a, i)=>{
            return(
              <Card shoes={shoes[i]} i={i} key={i}></Card>
            )}
            ))
          }
        </Row>

          { more == 2 || more == 3 ?
        
        <Button variant="secondary" onClick={()=>{
        setMore(more + 1);
        axios.get('https://codingapple1.github.io/shop/data'+(more)+'.json')
        .then((결과)=>{
          let copy = [...shoes, ...결과.data];
          setShoes(copy);
          console.log(copy)
        })
        .catch(()=>{
          console.log('axios 실패')
        })
      }}>더보기</Button>
       : null
      }
        {
          console.log(axios.getdata)
        }
        </>
      } />
        <Route path="/detail/:id" element={
          <Detail shoes={shoes} />
        } />
        <Route path="/cart" element={<Cart />} />
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
      </Suspense>
      <div style={{margin:"20px"}}></div>
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
  let navigate = useNavigate();
  return (
  <Col sm>
    <Nav.Link onClick={()=>{navigate('/detail/'+(props.i))}}>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" />
      <h4 style={{color:"black"}}>{props.shoes.title}</h4>
      <p style={{color:"black"}}>{props.shoes.price}</p>
    </Nav.Link>
  </Col>
  )
}

export default App;
