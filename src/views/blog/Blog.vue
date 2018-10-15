<template>
  <div class="blog-page" @scroll="imgload">
    <blog-header></blog-header>
    <div class="body" ref="page">
      <transition enter-active-class="animated  lightSpeedIn" leave-active-class="animated bounceOutDown">
        <router-view />
      </transition>
    </div>
    <img src="" alt="">
    <div class="bg-block">
      <div class="progressive parallax-window " ref='bg'>
        <img class="preview" v-progressive="bg.lowRes" :data-srcset="bg.original" :src="bg.original" />
      </div>
      <div class="gradient"></div>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<style lang="scss">
@import "../../../public/scss/mixins/_set-color.scss";
html {
  height: 100%;
  width: 100%;
}

html,
body {
  font-family: "Lato", "Microsoft YaHei", sans-serif;
  font-size: 14px;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: $color-font;
  font-size: 100%;
  font-size: 16px;
  font-size: 1em;
  width: 100%; // background-image: url(/images/dark_geometric2.png);
  background-color: $color-bg;

  overflow-x: hidden;
}

a {
  color: #fff;
  text-decoration: none;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
.wrapper,
header {
  position: relative;
  max-width: 1190px;

  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
}
.wrapper {
  min-height: 500px;
}
.blog-page {
  position: relative;
}
.body {
  min-height: 40vh;
}
.p10 {
  padding: 10px;
}

.p10-lr {
  padding-left: 10px;
  padding-right: 10px;
}
.bg-block {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  .gradient {
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(231, 51, 104, 0),
      $color-bg
    );
  }
}
.parallax-window {
  transition: transform 0.001s ease;

  > img {
    position: relative;
    height: 100%;
  }
}
</style>

<script>
import Header from "../../components/blog/header";
import Body from "../../components/blog/home";
import Footer from "../../components/blog/footer";
import "../../../public/css/icon/blog.css";
import "../../../node_modules/progressive-image/dist/index.css";
export default {
  name: "Blog",
  data() {
    return {
      bg: {
        original: "/images/blog_bg.jpg",
        lowRes: "/images/placeholder/blog_bg.jpg"
      }
    };
  },
  methods: {
    imgload() {
      let bodyHeight = this.$refs.bg.clientHeight;
      this.$refs.page.style.minHeight = bodyHeight + "px";
    }
  },
  components: {
    "blog-header": Header,
    "blog-body": Body,
    "blog-footer": Footer
  },
  mounted() {
    console.log("blog");
    const _this = this;
    let img = new Image();
    img.src = this.bg.original;
    img.onload = () => {
      this.imgload();
    };

    window.onresize = function temp() {
      _this.imgload();
    };
  }
};
</script>


