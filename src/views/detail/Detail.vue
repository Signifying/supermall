<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="datail-nav" @titltClick="titltClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
    // BackTop
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // isShowBackTop: false,
    };
  },
  created() {
    //1.保存传入ID
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部轮播图信息
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
    //4.给getThemeToPY赋值
    this.getThemeTopY = debounce(() => {
      // console.log("---");
      //商品参数评论推荐的位置
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    // console.log("mounted");
    //加入防抖动操作
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // //对监听事件进行保存
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  updated() {},
  deactivated() {
    //取消全局事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.refresh();
      this.getThemeTopY();
    },
    titltClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // 监听滚动的位置
    contentScroll(position) {
      // console.log(position);
      //1、获取Y值
      const positionY = -position.y;
      //2.positionY与主题中值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //改为滚入
      //窗口滚动位置
      //1.判断BackTop是否显示
      // this.isShowBackTop = -position.y > 1000;
      this.listenBackTop(position);
    },

    //改为滚入
    //回到顶端按钮
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },

    //添加购物车
    addToCart() {
      // console.log("---");

      // 1.创建对象
      const obj = {};
      // 2.对象信息  获取购物车需要展示的信息
      obj.iid = this.iid;
      obj.image = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.realPrice;
      // console.log(obj);
      
      // 3.添加到Store中  将商品添加到购物车
      // this.$store.commit("addCart", obj);
      // this.$store.dispatch("addCart", obj).then(res=>{
      //   console.log(res);
      this.addCart(obj).then(res=>{
        // console.log(res)
        // console.log(this.$toast.show);
        
        this.$toast.show(res,2000)
      })

      // 添加购物车成功
    }
  }
};
</script>

<style  scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.datail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/* .content {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
} */
.content {
  /* 要注意100% - 44px这个空格要加 */
  height: calc(100% - 44px - 49px);
}
</style>
