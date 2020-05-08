<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backTop" v-show="isShowBackTop"/>
<!--    <toast message="" :show=""/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import {mapActions} from 'vuex'

  import Toast from "components/common/toast/Toast";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodList,
      Toast,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopsY:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    created() {
      //1.报错传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        //1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //6.取出评论信息
        if (data.rate.cRate !==0) {
          this.commentInfo = data.rate.list[0]
        }

        //1.第一次获取值，值不对
        //值不对的原因：$el没有被渲染

        // this.$nextTick(()=>{
        //   //2.第二次获取值，值不对
        //   //值不对原因：图片没有计算在内
        //   //根据最新的数据，对应的DOM是已经被渲染出来
        //   //但是图片依然是没有加载完（目前获取的offsetTop不包含其中的图片）
        //   //offsetTop值不对的时候，都是因为图片的问题
        //   this.themeTopsY = []
        //   this.themeTopsY.push(0);
        //   this.themeTopsY.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopsY.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopsY.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopsY);
        // })
      })

      //3.请求推荐的数据
      getRecommend().then(res=>{
        // console.log(res);
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值（对给this.themeTopY赋值的操作进行防抖）
      this.getThemeTopY = debounce(()=>{
          this.themeTopsY = []
          this.themeTopsY.push(0);
          this.themeTopsY.push(this.$refs.params.$el.offsetTop)
          this.themeTopsY.push(this.$refs.comment.$el.offsetTop)
          this.themeTopsY.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopsY.push(Number.MAX_VALUE)
          // console.log(this.themeTopsY);
      },100)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.refresh()

        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopsY[index],200)
      },
      contentScroll(position){
        //1.获取y值
        const positionY = -position.y
        //2.positionY和主题中的值进行对比
        let length = this.themeTopsY.length
        for(let i=0;i<length-1;i++){
          if (this.currentIndex !==i && (positionY >= this.themeTopsY[i] && positionY < this.themeTopsY[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //3.是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const obj = {}
        obj.image = this.topImages[0]
        obj.title = this.goods.title;
        obj.desc = this.goods.desc;
        obj.price = this.goods.realPrice;
        obj.iid = this.iid;

        //2.将商品添加到购物车(1.promise  2.mapActions)
        // this.$store.cartList.push(obj)
        // this.$store.commit('addCart',obj)

        this.addCart(obj).then(res=>{
          this.$toast.show()
          console.log(this.$store);
        })

      }
    },
    mounted() {

    },
    updated() {
    }
  }
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }

 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }

  .content {
    height: calc(100% - 44px - 49px);
    /*overflow: hidden;*/
  }

</style>