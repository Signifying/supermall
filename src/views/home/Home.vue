<!--  -->
<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-comtrol"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!--  -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 用了better-scroll之后不起效果的类名 -->
      <!-- <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control> -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="shoeGoods"></goods-list>
    </scroll>
    <!-- native监听原生组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",

  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      //请求‘流行','新款','精选’数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // isShowBackTop: false,
      tabOffsetTop: 0,
      //默认不吸顶
      isTabFixed: false,
      //离开页面时保存当前浏览位置
      saveY: 0
    };
  },
  computed: {
    shoeGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destoryed() {
    console.log("home destoryed");
  },
  activated() {
    // console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    //更新一下数据
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log('deactivated');
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    //取消全局事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  created() {
    // console.log('creat');
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // console.log("mounted");

    //3.监听item的图片加载完成   在mounted里监听，在created里可能会获取不到数据   再封装进mixin
    //未防抖动操作
    // this.$bus.$on('itemImageLoad',()=>{
    //   // console.log('---');
    //   this.$refs.scroll.refresh()
    // })
    // //加入防抖动操作
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // //对监听事件进行保存
    // this.itemImgListener=()=>{
    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    //‘流行','新款','精选’按钮切换
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //回到顶端按钮
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    //窗口滚动位置
    contentScroll(position) {
      // console.log(position);
      //1.判断BackTop是否显示
      // this.isShowBackTop = -position.y > 1000;
      this.listenBackTop(position)
      //2.决定tabControl是否吸顶（position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      // console.log("上拉更多");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //4.给'流行','新款','精选'位置赋值 固定他
      //直接获取tabControl是一个组件，要通过所有组件都有的属性$el：获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style  scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时  为了不让导航跟着一起滚
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 流行','新款','精选 固定位置 */
/* 1.用了better-scroll之后不起效果的 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* 2.行不通。。。 */
/* .fiexd{
  position: fixed;
  left: 0;
  top: 44px;
  right: 0;
} */
.tab-comtrol {
  position: relative;
  z-index: 9;
}

/* 通过定位设置高度 */
.content {
  position: absolute;
  top: 44px;
  bottom: 40px;
  left: 0;
  right: 0;
  overflow: hidden;
}

/* 通过height: calc确定滚动窗口高度高度 */
/* .content {
  overflow: hidden;
  height: calc(100% - 93px);
  margin-top: 44px;
} */
</style>
