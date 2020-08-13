<!--  -->
<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :src="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  //获取数据
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      //只要一次位置 所以要判断是否发出过Load，
      if (!this.isLoad) {
        // console.log('----');
        this.$emit("swiperImageLoad");
        this.isLoad=true
      }
    }
  }
};
</script>

<style  scoped>
</style>
