<!--  -->
<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <span class="privateImage-svg left">
          <img  src="~assets/img/profile/avatar.svg" />
        </span>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img class="icon-mobile" src="~assets/img/profile/phone.svg" />
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="arrow-svg right">></div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style  scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

#user-info .privateImage-svg {
  width: 60px;
  height: 60px;
  /* background-color: #fff; */
  border-radius: 30px;
}

#user-info .privateImage-svg img{
  width: 100%;
  height: 100%;
}

.left {
  float: left;
}
.right {
  float: right;
}
#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
  font-size: 18px;
  color: #fff;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}

#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 20px;
  height: 25px;
  left: -20px;
  top: -5px;
}
</style>
