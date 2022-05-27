import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {changeName, increase} from "./../store/UserSlice.js"
import {addCount} from "./../store.js"

function Cart(){
// 리덕스 사용하는법
let state = useSelector((state)=> state)
let dispatch = useDispatch()
    return(
        <div>

            {state.test.age}장바구니
            <button onClick={()=>{
                dispatch(increase(1))
            }}>버튼</button>
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