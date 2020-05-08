import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context,payload){
    //1.查找数组中是否存在该商品
    return new Promise((resolve, reject) => {
      let findIndex = context.state.cartList.find(item=>item.iid===payload.iid)

      //2.判断old是否有值
      if (findIndex){  //数量+1
        // findIndex.count +=1
        context.commit(ADD_COUNTER,findIndex)
        resolve('当前的商品数量+1')
      }else {  //添加了新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了薪的商品')
      }
    })
  }
}