<!--  -->
<template>
  <div id="list">
    <div class="info">
      <span class="icon">
        <img src="~assets/img/profile/message.svg" />
      </span>
      我的消息
    </div>
    <div class="info">
      <span class="icon">
        <img src="~assets/img/profile/shopping.svg" />
      </span>
      积分商城
    </div>
    <div class="info">
      <span class="icon">
        <img src="~assets/img/profile/vip.svg" />
      </span>
      会员卡
    </div>
    <div class="info">
      <span class="icon">
        <img src="~assets/img/profile/cart.svg" />
      </span>

      我的购物车
    </div>
    <div class="info">
      <span class="icon">
        <img src="~assets/img/profile/pointer.svg" />
      </span>
      下载购物APP
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
};
</script>

<style  scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  padding-bottom: 12px;
}
.info {
  /* height: 30px; */
  line-height: 15px;
  margin: 0 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 10px;
}
.icon {
  margin-top: 10px;
  left: 16px;
  top: -7px;
}
img {
  width: 16px;
  height: 16px;
}
.info:first-of-type {
  padding-top: 13px;
}
.info:last-of-type {
  border-bottom: none;
}
</style>
