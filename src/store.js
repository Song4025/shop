import { configureStore, createSlice } from '@reduxjs/toolkit'
import test from './store/UserSlice.js'

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers:{
    addCount(state, action){
      let 번호 = state.findIndex((a)=>{return a.id === action.payload})
      state[번호].count++
    },
    removeCount(state, action){
      let 번호 = state.findIndex((a)=>{return a.id === action.payload})
      state[번호].count--
      console.log(state[번호].count)
      if(state[번호].count <= -1){return state[번호].count === 0} 
    },
    addProduct(state, action){
      state.push(action.payload)
    }
  }
})

export let {addCount, removeCount, addProduct} = cart.actions 

export default configureStore({
  reducer: { 
    cart : cart.reducer,
    test : test.reducer,
  }
})