import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { Context1 } from './../App.js'

// class Detail2 extends React.Component{
//   componentDidMount(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){
    
//   }
// }

let Box = styled.div`
  background: ${props => props.bg};
  color: ${props => props.bg == 'blue'? 'white' : 'black'};
  padding: 20px;
`
let NewBox = styled.div`
  border: solid 1px red;
`;

function Detail(props){
  
  // 언제쓰면 좋을까요? 렌더링이 되고나서 실행되어야 할 코드를 작성하면 좋음.
  let [fade2, setFade2] = useState('');
  useEffect(()=>{
    setFade2('end')
    return()=>{
      setFade2('')
    }
  },[])

  let [count, setCount] = useState(0);
  let {id} = useParams();
  let picture = parseInt(id) + 1;
  let 찾은상품 = props.shoes.find(function(p){
    return p.id == id
  });
  let [탭 , 탭변경]= useState(0);
  let [alert, setAlert] = useState(true)

  // 보관함 해체 함수
  let {재고} = useContext(Context1)
  
  useEffect(()=>{
    let a = setTimeout(()=>{ setAlert(false) }, 2000)
    return() =>{
      // useEffect가 실행되기전에 실행하고 싶으면 여기에 작성
      // ex) 기존타이머는 제거해주세요. , 기존데이터는 제거해주세요.
      clearTimeout(a);
    }
  }, [])

  // let [num, setNum] = useState('');
  // useEffect(()=>{
  //   if(isNaN(num)== true){
  //     alert('숫자를 입력하셈')
  //   }
  // },[])
  // return (
  //   <input onChange={(e)=>{
  //     setNum(e.target.value)
  //   }}></input>
  // )
  

  // useEffect(()=>{
  //   1. 리렌더링마다 코드 실행하고 싶으면
  // })

  // useEffect(()=>{
  //   2. mount시 1회만 코드실행하고 싶으면
  // }, [])

  // useEffect(()=>{
  //   return(
  //   3. unmount시 1회 코드실행하고 싶으면
  //   )
  // }, [])

    return(
    <>
      { 
        alert == true ? 
        <div className="alert alert-warning">2초 이내에 구매시 할인</div> 
        : null
      } 
    <div className={'container start ' + fade2} >
      {/* <Box bg="blue">여기에 글씨가있으면?</Box>
      <NewBox bg="blue">여기에 글씨가있으면?</NewBox> */}
      <button onClick={()=>{
        setCount(count + 1)
      }}>리렌더링</button>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + picture + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button> 
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
      {/* 
      1. html/css로 미리 디자인
      2. ui의 상태를 저장해 둘 state 만들기
      3. component로 만들어서 적용 
      */}
      {/* 그런데 여기까지 해보니 나의 ui가 멋대가리가 없다...
      애니메이션 추가.
      1. 애니메이션 동작 전 className / 후 className 만들기
      2. className에 transition속성 추가
      3. 원할대 2번 className을 부착
      */}
    </>
  )
}

  function TabContent({탭}){

    // if(탭 == 0){
    //   return(<div>여기1</div>)
    // }else if(탭 == 1){
    //   return(<div>여기2</div>)
    // }else if(탭 == 2){
    //   return(<div>여기3</div>)
    // }
    // 그런데 만약 if문이 길어지는게 싫다면 아래 방법도있음.
    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)
  
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
        <div>{재고}</div>,
        <div>여기2</div>,
        <div>여기3</div>
      ][탭]}
    </div>
    )
  }  
export default Detail;  