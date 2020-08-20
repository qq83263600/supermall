<template>
  <div class="money">
    <div class="money-item">
      <p>0.00<span>元</span></p>
      <p>我的余额</p>
    </div>
    <div class="money-item">
      <p>0<span>个</span></p>
      <p>我的优惠</p>
    </div>
    <div class="money-item">
      <p>0<span>分</span></p>
      <p>我的积分</p>
    </div>
    <div class="line">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Money"
  }
</script>
<style scoped>
  .money {
    display: flex;
    width: 100%;
  }

  .money .money-item {
    display: flex;/*浮动*/
    align-items: center;/*居中对齐弹性盒的各项 <div> 元素*/
    flex: 1;/*设置或检索弹性盒模型对象的子元素如何分配空间*/
    flex-direction: column;/*灵活的项目将垂直显示，正如一个列一样。*/
    justify-content: center;/*项目位于容器的中心*/
    height: 85px;
  }
/*nth-of-type(n)选择器匹配同类型中的第n个同级兄弟元素。*/
  .money .money-item:nth-of-type(1),
  .money .money-item:nth-of-type(2) {
    border-right: 1px solid #eeeeee;
  }

  .money .money-item p:first-child{
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 3px;/*下边距*/
    color: #ff5f3e;
  }

  .money .money-item p:first-child span{
    font-size: 14px;
    margin-left: 3px;
    font-weight: 500;
    color: #666;
  }

  .money .money-item p:last-child{
    font-size: 14px;
    color: #666666;
  }


</style>