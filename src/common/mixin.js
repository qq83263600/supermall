import{debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "./const";
import {POP,NEW,SELL} from "./const"

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      refresh:null,
    }
  },
  mounted(){
    this.refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemListener = () =>{
      this.refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemListener)
    // console.log('我是混入的');
  }
}

export const backTopMixin={
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y >BACKTOP_DISTANCE
    }
  }
}


export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}