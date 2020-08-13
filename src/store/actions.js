import {
  ADD_COUNTER,
  ADD_TOCART
} from './mutation-types'

export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
       //购物车添加商品
    // 1.查找之前数组中是否有该商品
    const oldpayload = context.state.cartList.find(item => item.iid === payload.iid)
    // 2.+1或者新添加
    if (oldpayload) {//数量+1
      // oldpayload.count += 1
      context.commit(ADD_COUNTER,oldpayload)
      resolve('当前商品数量+1')
    } else {//添加新的商品
      payload.count = 1
      payload.checked = true
      // context.cartList.push(payload)
      context.commit(ADD_TOCART,payload)
      resolve('添加了新商品')
    }
    // state.cartList.push(payload)
    })
   
  }
}