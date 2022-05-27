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
      // state[action.payload].count++
      let 번호 = state.findIndex((a)=>{return a.id === action.payload})
      state[번호].count++
    },
    addProduct(state, action){
      state.push(action.payload)
    }
  }
})
// [
//   {id : 0, name : 'White and Black', count : 2},
//   {id : 2, name : 'Grey Yordan', count : 1}
// ] 
export let {addCount, addProduct} = cart.actions 

export default configureStore({
  reducer: { 
    cart : cart.reducer,
    test : test.reducer,
  }
})