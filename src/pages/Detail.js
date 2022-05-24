import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  useEffect(()=>{
    for(let i = 0; i < 5000; i++){
      console.log(1);
    }
  })

  let [count, setCount] = useState(0);
  let {id} = useParams();
  let picture = parseInt(id) + 1;
  let 찾은상품 = props.shoes.find(function(p){
    return p.id == id
  });
  let [alert, setAlert] = useState(true);
  
  useEffect(()=>{
    let a = setTimeout(()=>{ setAlert(false) }, 2000)
    console.log(2);
    return() =>{
      // useEffect가 실행되기전에 실행하고 싶으면 여기에 작성
      // ex) 기존타이머는 제거해주세요. , 기존데이터는 제거해주세요.
      clearTimeout(a);
      console.log(1);
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
    <div className="container">
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
    </>
  )}
export default Detail;  