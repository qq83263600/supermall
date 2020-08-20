<template>
  <div class="user-info">
    <div class="user-img">
      <img src="~assets/img//profile/user.png" alt="">
    </div>
    <div class="login">
      <p>登录/注册</p>
      <div class="phone">
        <img src="~assets/img//profile/phone.png" alt="" class="icon-phone">
        <p>暂未绑定手机号</p>
      </div>
    </div>
    <div class="right">
      <img src="~assets/img//profile/arrow_right.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  .user-info{
    position: relative;/*相对定位*/
    display: flex;/*浮动*/
    align-items: center;
    width: 100%;
    height: 105px;
    padding: 0 20px;
    background-color: var(--color-tint);

  }
  .user-img{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: white;
  }
  .user-img img{
    display: block;
    width: 60px;
    height: 60px;
  }
  .login{
    font-size: 16px;
    margin-left: 20px;/*距离左边的距离*/
    color: white;
  }
  .login p{
    font-size: 18px;
  }
  .phone{
    display: flex;/*浮动*/
    margin-top: 8px;
    text-align:center;
  }
  .phone p{
    font-size: 12px;
    margin-left: 3px;
    margin-top: 3px;
  }
  .right{
    position: absolute;/*绝对定位*/
    right: 10px;
    width: 20px;
    height: 20px;
  }
  .right img{
    display: inline-block;
    /*使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度.*/
    width: 20px;
    height: 20px;
  }
</style>
