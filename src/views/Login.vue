<template>
  <div class="wrapper">
    <div :class="{'login-box':true,success:success}">
      <div class="dog">
        <img src="/images/login_pic.png" alt="">
      </div>
      <div class="inner">
        <form action="/login" method="post" class="login-form">
          <h2>登录</h2>
          <div class="control">
            <input type="text" v-model="username" class="form-control" autocomplete="off" maxlength="14" name="uname" id="username">
            <div class='input-tips'>
              <i class="iconfont icon-head"></i>
              <span>输入用户名</span>
            </div>
          </div>
          <div class="control">
            <input type="password" v-model="password" class="form-control" maxlength="16" name="upwd" id="upassword">
            <div class="input-tips">
              <i class="iconfont icon-password"></i>
              <span>输入密码</span>
            </div>
          </div>
          <div class="login-btn-box">
            <input @click.enter='login' type="button" id="login_btn" class="login-btn" value="登录">
            <span :class="{'status-block':true,show:show,logining:logining,success:success,error:err,hide:hide}">
              {{msg}}
              <div v-if='logining' v-show="logining" class="loading-ani"></div>
            </span>
          </div>
        </form>
        <div class="copyright">By Yansk</div>
        <a href="/" class="back-btn">返回主页</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  background: linear-gradient(rgb(36, 36, 36), rgb(0, 0, 0));
  position: relative;
  color: #fff;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1500px;
  -webkit-perspective: 1500px;
  transform-style: preserve-3d;
}

.loading-ani {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(48, 48, 48, 0.582);
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 5px #fff;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    animation: subLoadAni 2s 200ms infinite;
  }
  @keyframes subLoadAni {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
}

/* --------------login-box-------------- */

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: loginbox_in 1s forwards;
  backface-visibility: hidden;
  box-sizing: border-box;
  .dog {
    position: absolute;
    transform: scale(0);
    top: -19%;
    right: 0;
    height: 30%;
    animation: dog_in 1s 1s forwards;
    z-index: 10;
    > img {
      height: 100%;
    }
  }
  .copyright {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 10;
    color: #444444;
    text-shadow: 0 0 5px rgb(66, 66, 66);
  }
  @keyframes dog_in {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes loginbox_in {
    0% {
      transform: translate(-50%, -50%) rotateY(180deg);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) rotateY(0);
    }
  }
  .inner {
    position: relative;
    transition: all 1s ease-out;
    border-radius: 2px;
    border-top: 4px solid rgba(243, 130, 0, 0.993);
    background-size: contain;
    background-position: right top;
    box-shadow: 0 0 10px rgb(77, 77, 77);
    box-sizing: border-box;
    z-index: 1;
    border-radius: 20px;
    overflow: hidden;
    .back-btn {
      position: absolute;
      width: 100%;
      height: 5vh;
      line-height: 5vh;
      top: 0;
      left: 0;
      color: #b8b8b8;
      letter-spacing: 4px;
      z-index: -1;
      text-align: center;
      text-decoration: none;
      white-space: 24px;
    }
  }
  &.success {
    .inner {
      animation-fill-mode: forwards;
      animation-delay: 0.5s;
      animation-duration: 1s;
      animation-name: loginBox_out;
    }
    .dog {
      animation: dog_out 0.5s forwards;
    }
  }
  @keyframes dog_out {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
  @keyframes loginBox_out {
    0% {
      transform: scale(1) rotateY(0);
      opacity: 1;
    }
    100% {
      transform: scale(2) rotateY(-180deg);
      opacity: 0;
    }
  }
  &:hover .clock-block {
    top: -10%;
  }
}

form.login-form {
  background-color: rgb(65, 66, 65);
  padding: 20px 100px;
  box-sizing: border-box;
  transition: transform 1s ease;
  h2 {
    font-size: 26px;
    color: rgb(190, 190, 190);
  }
  .control {
    position: relative;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(73, 73, 73, 0.902);
    width: 200px;
    transition: border 0.3s ease;
    &.active {
      border-bottom: 1px solid rgba(146, 146, 146, 0.902);
      .input-tips {
        transform: translateY(-20px);
        font-size: 12px;
        .iconfont {
          transform: rotate(-45deg);
          font-size: 12px;
        }
      }
    }
    &,
    .input-tips {
      padding: 20px 10px 10px;
    }
    .input-tips {
      position: absolute;
      left: 0;
      top: 0;
      padding-left: 0;
      color: rgb(189, 189, 189);
      pointer-events: none;
      transition: transform 0.3s ease, font-size 0.3s ease;
      > .iconfont {
        display: inline-block;
        transition: transform 0.5s ease, font-size 0.3s ease;
      }
    }
    .form-control {
      display: block;
      position: relative;
      width: 100%;
      height: 20px;
      border: none;
      box-shadow: none;
      background-color: transparent;
      font-size: 14px;
      color: rgb(121, 121, 121);
      transition: border 0.3s ease;
      box-sizing: border-box;
      &:focus,
      &:hover,
      &:active {
        outline: none;
      }
    }
  }
  .login-btn-box {
    position: relative;
    width: 100%;
    margin: 40px 0 40px 2px;
    overflow: hidden;
    &:hover {
      &:after,
      &:before {
        transform: translateX(0%);
      }
    }
    &:before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      background-color: rgba(55, 77, 151, 0.712);
      transition: transform 0.2s ease;
      z-index: 0;
    }
    &:after {
      position: absolute;
      content: "";
      height: 100%;
      width: 5px;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      background-color: rgba(221, 168, 52, 0.712);
      transition: transform 0.2s ease 0.2s;
      z-index: 1;
    }
    input.login-btn {
      position: relative;
      border-radius: 2px;
      background-color: transparent;
      transition: all 0.3s ease;
      padding: 5px;
      height: 30px;
      width: 100%;
      border: 1px solid rgba(22, 124, 219, 0.363);
      color: rgba(22, 124, 219, 0.712);
      outline: none;
      cursor: pointer;
    }
    input.login-btn.error {
      background-color: rgb(187, 77, 3);
      color: rgb(247, 226, 170);
      border-color: rgb(179, 96, 41);
    }
    input.login-btn.success {
      background-color: #1abc9c;
      color: rgb(247, 226, 170);
    }
    .login-btn:hover {
      background-color: transparent;
      border-color: transparent;
      color: rgba(255, 255, 255, 0.712);
    }
    .status-block {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 30px;
      transition: background-color 0.5s ease;
      transform: translateY(-100%);
      &.show {
        animation: statusBlock_in 0.5s forwards;
      }
      &.logining {
        background-color: orange;
      }
      &.success {
        background-color: #1abc9c; // animation: statusBlock_out .5s 1s forwards;
      }
      &.error {
        background-color: rgb(189, 69, 60);
      }
      &.hide {
        animation: statusBlock_out 1s forwards;
      }
    }
    @keyframes statusBlock_in {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes statusBlock_out {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-100%);
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      success: false,
      msg: "登陆中",
      err: false,
      logining: false,
      hide: false,
      show: false
    };
  },
  methods: {
    login() {
      let _this = this;
      if (this.show || this.hide) return;
      this.show = true;
      this.logining = true;
      this.$axios
        .post("https://localhost:3000/login", {
          uname: this.username,
          upwd: this.password
        })
        .then(({ data }) => {
          console.log(11);
          _this.logining = false;
          let status = data.status;
          let msg = data.msg;
          if (status) {
            _this.success = true;
            this.goBack();
          } else {
            _this.err = true;
          }
          _this.msg = msg;
          setTimeout(() => {
            _this.msg = "";

            _this.success = false;
            _this.err = false;
            _this.hide = true;
            setTimeout(() => {
              _this.hide = false;
              _this.show = false;
            }, 1500);
          }, 2000);
        });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  computed: {}
};
</script>
