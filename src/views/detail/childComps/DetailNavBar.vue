<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="tittle">
        <div v-for="(item,index) in titles"
             class="itemTittle"
             :class="{active:index===currentIndex}"
              @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navigationbar/NavBar";

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .tittle{
    display: flex;
    font-size: 13px;
  }

  .itemTittle{
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 10px;
  }
</style>