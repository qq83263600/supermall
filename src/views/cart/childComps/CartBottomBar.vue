<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
              :is-checked="isSelectAll"
              class="check-button"
              @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算：{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  import {itemListenerMixin} from "../../../common/mixin";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton,
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          return preValue + item.price*item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item=>item.checked).length
      },
      isSelectAll(){
        if (this.cartList.length === 0)  return false;
        //1.使用filter
        // return !(this.cartList.filter(item=>!item.checked).length)

        //2.使用find
        return !this.cartList.find(item => !item.checked)

        //3.普通遍历
        // for (let item of this.cartList){
        //   if (!item.checked){
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods:{
      checkClick(){
        if (this.isSelectAll){
          this.cartList.forEach(item=>item.checked = false)
        }else {
          this.cartList.forEach(item=>item.checked = true)
        }

        // this.cartList.forEach(item => item.checked =!this.isSelectAll)
      },
      calcClick(){
        if (!this.isSelectAll){
          this.$toast.show('请选择需要购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 15px;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 60px;
  }

  .check-button{
    width: 22px;
    height: 22px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 30px;
    flex: 1;
  }

  .calculate{
    width: 95px;
    background-color:red;
    color: #ffffff;
    text-align: center;
  }
</style>