<!--  -->
<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>
    <bottom-bar></bottom-bar>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import BottomBar from "./childComps/BottomBar";
import CartList from "./childComps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    // cartLength(){
    //   return this.$store.getters.cartLength
    // },
    // 封装
    ...mapGetters(["cartLength", "cartList"])
  }
};
</script>

<style  scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.cart-list {
  position: absolute;
  top: 44px;
  bottom: 93px;
  width: 100%;
  overflow: hidden;
}
</style>
