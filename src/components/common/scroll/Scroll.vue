<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    //2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        //自定义事件并传出去
        this.$emit("scroll", position);
      });
    }
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多');
        //自定义事件并传出去
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //返回顶部方法
    scrollTo(x, y, time = 300) {
      //判断有没有值先
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //完成上拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //从新加载图片
    refresh() {
      //判断有没有值先
      // console.log('----');
      this.scroll && this.scroll.refresh();
    },
    //获取当前滚动的y值
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0;
    }
  }
};
</script>

<style  scoped>
</style>
