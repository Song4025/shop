import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {changeName, increase} from "./../store/UserSlice.js"
import {addCount, removeCount} from "./../store.js"
import { useState, memo, useMemo } from 'react';

// 메모는 props가변할때만 재렌더링 해줌. 불필요한 재렌더링을 막을 수 있어요 그러나..
// props가 길고 복잡하면 손해일수도있음
let Child = memo(function Child(){
    console.log('재렌더링')
    return <div>자식이다</div>
})

function 함수(){
    return (
        <div>반복문10억번 돌린결과</div>
    )
}

function Cart(){
let state = useSelector((state)=> state)
// 리덕스 사용하는법
let dispatch = useDispatch()
let [count, setCount]= useState(0)
// useEffect랑 똑같.
let result = useMemo(()=>{return 함수()}, [state])

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((p, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{state.cart[i].id}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(addCount(state.cart[i].id))
                                            console.log(state.cart[i].id)
                                        }}>+</button>
                                        <button onClick={()=>{
                                            dispatch(removeCount(state.cart[i].id))
                                            console.log(state.cart[i].id)
                                        }}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>            
        </div>
    )
}

export default Cart;