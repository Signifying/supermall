import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin={
  data() {
    return {
      itemImgListener: null,
      refresh:null
    };
  },
  mounted(){
    
    //加入防抖动操作
   this.refresh = debounce(this.$refs.scroll.refresh, 200);
    //对监听事件进行保存
    this.itemImgListener=()=>{
      this.refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log('我是混入内容');
    
  }
}
export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false,
    }
  },
  methods: {
    //回到顶端按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenBackTop(position){
      this.isShowBackTop= -position.y > 1000;
    }
  }
}