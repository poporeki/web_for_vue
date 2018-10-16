<template>
  <transition enter-active-class="animated fadeInRight">
    <div class="top-box" v-if='isShow'>
      <transition enter-active-class="animated fadeInRight">
        <div class="login-before" v-if="!this.$store.state.isLogin">
          <div class="link-box">
            <router-link to="/login">登录</router-link>
          </div>
          <div class="link-box">
            <router-link to="/reg">注册</router-link>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeInRight">
        <div class="login-after" v-if="this.$store.state.isLogin">
          <div class="link-box">
            <a href="javascript:void(0);" @click="logout">退出登录</a>
          </div>
        </div>
      </transition>

    </div>

  </transition>
</template>
<style lang="scss">
.top-box {
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  flex-direction: row;
  .login-before,
  .login-after {
    display: flex;
    flex-direction: row;
  }
  .link-box {
    position: relative;

    &:nth-child(even) {
      > a {
        border-left: 1px solid rgb(139, 139, 139);
      }
    }
    > a {
      display: block;
      padding: 2px 5px;
      left: 0;
      top: 0;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>


<script>
export default {
  data() {
    return {
      isLogout: false,
      isShow: false
    };
  },
  methods: {
    logout() {
      let _this = this;

      console.log("logout");
      this.$axios.post("http://192.168.199.208:3000/logout").then(({ data }) => {
        console.log("logout success");
        data.status ? (_this.$store.state.isLogin = false) : "";
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  mounted() {
    this.isShow = true;
  }
};
</script>
