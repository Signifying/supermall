<template>
  <div class="bottom-bar">
    <CheckButton class="select-all" @click.native="checkBtnClick" :is-checked="isSelectAll"></CheckButton>
    <!-- <CheckButton></CheckButton> -->
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去结算({{cartLength}})</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton//CheckButton";
import { mapGetters } from "vuex";
import CartList from "./CartList";
export default {
  name: "BottomBar",
  components: {
    CheckButton,
    CartList
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
    totalPrice() {
      const cartList = this.cartList;
      // console.log(cartList);
      return cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    isSelectAll() {
      // return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkBtnClick() {
      // 1.判断是否有未选中的按钮
      // let isSelectAll = this.cartList.find(item => !item.checked);

      // 2.有未选中的内容, 则全部选中
      // if (isSelectAll) {
      //   this.cartList.forEach(item => {
      //     item.checked = true;
      //   });
      // } else {
      //   this.cartList.forEach(item => {
      //     item.checked = false;
      //   });
      // }
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品')
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  /* box-shadow: 0 -2px 3px rgba(0, 0, 0, .2); */
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #f8f8f8;
}

.bottom-bar .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-bar .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-bar .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
