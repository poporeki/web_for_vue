<template>
  <transition enter-active-class="animated flipInX">
    <div class="rt" v-if="isShow">
      <div class="s-wrap">
        <div :class="{'search-box':true,'show':searchBoxIsShow}" @mouseover="searchBoxIsShow=true" @mouseout="sFn" id="search_box">
          <div class="s-btn"></div>
          <div class="input-box">
            <Loading></Loading>
            <input type="text" class="search" v-model="keywords" @blur="sFn" placeholder="search" @keyup="searchkws">
            <div class="msg-box"></div>
          </div>
        </div>
        <div :class="{dropdown:true, 'search-dropdown':true, hide:dropDownIsShow===false,show:dropDownIsShow}">

          <div v-if='dropDownIsShow'>
            <ul>
              <li v-for="item in searchData" :key='item.id'>
                <a class="arc-lk" :href="'/blog/article/' + item._id "> {{item.title}} </a>
              </li>
              <li v-if="searchData===undefined||Object.keys(searchData).length===0">
                <p>没有查询到与<span class="highlight">{{keywords}}</span>相关的信息</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss">
.highlight {
  color: rgb(255, 166, 0);
  &:after,
  &::before {
    content: " ";
  }
}
</style>

<script>
import Loading from "./search_loading";

export default {
  data() {
    return {
      isShow: false,
      keywords: "" /* 搜索字符 */,
      searchBoxIsShow: false /* 搜索栏状态 */,
      dropDownIsShow: false /* 搜索栏下拉菜单状态 */,
      searchData: {} /* 搜索数据 */,
      isRequest: false /* 请求状态 */
    };
  },
  components: {
    Loading /* 等待动画组件 */
  },
  methods: {
    sFn() {
      let kws = this.keywords;
      if (kws !== "" || kws !== null) return;
      this.searchBoxIsShow = false;
      this.dropDownIsShow = false;
      this.searchData = {};
    },
    searchkws() {
      let _this = this;
      if (this.keywords === "") {
        this.searchData = {};
        this.dropDownIsShow = false;
        return;
      }
      if (this.isRequest) return;
      this.isRequest = true;
      this.$axios
        .post("https://localhost:3000/blog/search/like", {
          wd: this.keywords
        })
        .then(({ data }) => {
          let ds = data.data;
          _this.dropDownIsShow = true;
          _this.searchData = ds;
          _this.isRequest = false;
          console.log(`${JSON.stringify(ds)}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    search() {
      return this.keywords ? this.sFn() : "";
    }
  },
  mounted() {
    this.isShow = true;
  }
};
</script>

