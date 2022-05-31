import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { Context1 } from './../App.js'
import { addProduct } from './../store.js'
import { useDispatch } from "react-redux";

let Box = styled.div`
  background: ${props => props.bg};
  color: ${props => props.bg == 'blue'? 'white' : 'black'};
  padding: 20px;
`
let NewBox = styled.div`
  border: solid 1px red;
`;

function Detail(props){
  
  let [fade2, setFade2] = useState('');
  useEffect(()=>{
    setFade2('end')
    return()=>{
      setFade2('')
    }
  },[])

  let {id} = useParams();
  let picture = parseInt(id) + 1;
  let 찾은상품 = props.shoes.find(function(p){
    return p.id == id
  });
  let [탭 , 탭변경]= useState(0);
  let [alert, setAlert] = useState(true)
  let dispatch = useDispatch()
  
  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched')

    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  },[])
  
  useEffect(()=>{
    let a = setTimeout(()=>{ setAlert(false) }, 2000)
    return() =>{
      clearTimeout(a);
    }
  }, [])

    return(
    <>
      { 
        alert == true ? 
        <div className="alert alert-warning">2초 이내에 구매시 할인</div> 
        : null
      } 
    <div className={'container start ' + fade2}  style={{marginTop: "20px", marginBottom: "20px"}}>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + picture + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addProduct({id : 1, name : 'Red Knit', count : 1}))
          }}>주문하기</button> 
        </div>
      </div>
    </div> 
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
      <TabContent 탭={탭} />
    </>
  )
}

  function TabContent({탭}){

    let [fade, setFade] = useState('')

    useEffect(()=>{
      let a = setTimeout(()=>{
        setFade('end')
      }, 10)
      return()=>{
        clearTimeout(a)
        setFade('')
      }
    }, [탭])
  
    return(
      <div className={'start '+ fade}>
      {[
        <div>상품정보</div>,
        <div>후기</div>,
        <div>Q&A</div>
      ][탭]}
    </div>
    )
  }  
export default Detail;  