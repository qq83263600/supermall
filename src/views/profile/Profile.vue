<template>
  <div class="profile">
    <nav-bar class="profile-bar"><div slot="center">商城</div></nav-bar>
    <UserInfo></UserInfo>
    <money></money>
    <div class="line"></div>
    <list-view></list-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navigationbar/NavBar";
  import UserInfo from "./ChildComps/UserInfo";
  import Money from "./ChildComps/Money";
  import ListView from "./ChildComps/ListView";

  export default {
    name:"Profile",
    components:{
      NavBar,
      UserInfo,
      Money,
      ListView,
    },
    data(){
     return{}
    }
  }
</script>

<style scoped>
  .profile{
    width: 100%;
    height: 100%;
  }
  .profile-bar{
    background-color: var(--color-tint);
    color: #eeeeee;
    font-weight: 600;
  }
  .line{
    width: 100%;
    height: 10px;
    background-color: #eeeeee;
  }
</style>
