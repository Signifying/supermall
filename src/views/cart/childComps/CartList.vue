<!--  -->
<template>
<scroll ref="scroll">
    <div>
    <Cart-list-item v-for="(item,index) in cartList" :item-info="item"></Cart-list-item>
  </div>
</scroll>

</template>

<script>
import { mapGetters } from "vuex";
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartLength","cartList"])
  },
  activated() {
    //更新一下数据
    this.$refs.scroll.refresh();
  },
};
</script>

<style  scoped>
</style>
