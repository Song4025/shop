import { createSlice } from "@reduxjs/toolkit"

let test = createSlice({
    name : 'user',
    initialState : {name: 'kim', age: '30'},
  
    // state 변경하는법
    // 1. store에서 state 변경하는 함수를 만들고 
    // 2. store에서 export한다
    // 3. 사용하고자하는 곳에서 dispatch(state변경함수())
    reducers:{
      changeName(state){
        state.name= 'park'
      },
      increase(state, action){
        state.age = parseInt(state.age) + action.payload
      }
    }
  })

  export let {changeName, increase} = test.actions 

  export default test