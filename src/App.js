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

// state 보관함 ContextAPI... 그런데 성능이슈때매 실전에선 안써요
export let Context1 = createContext()

function App() {

  //컴퓨터한테 명령하는 방법
  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
    // 로컬스토리지에 watched 가 이미 있으면 []이거 실행하지 말아주세요.
  },[])

  // 1. 누가 detail페이지로 접속하면
  // 2. 상품id를 가져와서
  // 3. localStorage에 보관하고 ..등등

  // let obj = {name : 'kim'}
  // JSON.stringify(obj)
  // console.log(obj)
  // localStorage.setItem('data', JSON.stringify(obj))
  // // json으로 변환했기때문에 꺼내도 json형태로 되어있음
  // let 꺼낸거 = localStorage.getItem('data')
  // console.log(꺼낸거)
  // JSON.parse(꺼낸거)
  // console.log(JSON.parse(꺼낸거))

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [재고]= useState([10, 11, 12])
  const name = '리액트';

  let result = useQuery('작명', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{
      console.log('요청됨')
      return a.data
    }),
    { staleTime : 2000 }
  })

  // reactQuery로 아래 명령을 사용할 수 있어요.
  // result.data
  // result.isLoading
  // result.error
  // 걔다가 ajax데이터를 props로 내려줄 필요가 엄씀
  // 캐씽기능이 있음. (성공결과 5분동안 기록)
  // 리덕스툴킷에도 쿼리가 있긴한데...문법이더러워서 리액트쿼리씀.

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
        <div>{name === '리액트' ? <h1>리액트입니다.</h1> : <h1>리액트가 아닙니다</h1>}</div>
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
        {
          console.log(axios.getdata)
        }
        </>
      } />
        {/* URL 파라미터쓰면 여러페이지 만들 수 있음 */}
        <Route path="/detail/:id" element={
          <Context1.Provider value={{재고, shoes}}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="/cart" element={<Cart />} />
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
