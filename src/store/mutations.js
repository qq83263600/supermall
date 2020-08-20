import {ADD_COUNTER,ADD_TO_CART,SET_LOADING} from "./mutations-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  [SET_LOADING](state, bol) {
    state.isLoading = bol;
  },
}