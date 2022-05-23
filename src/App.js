import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data.js';

function App() {
  let [shoes] = useState(data); 
  return (
    <div className="App">
      <Navbar className='Nav'>
        <Container>
        <Navbar.Brand href="#home" className='Title' style={{color: 'white'}}>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <div className='main-bg' style={{backgroundImage : 'url(' + bg + ')'}}></div>
      <Row>{
        shoes.map(((a, i)=>{
          return(
            <Card shoes={shoes[i]} i={i}></Card>
          )}
          ))
        }
      </Row>
    </div>
    
  );
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
