<template>
  <div class="rt">
    <div class="s-wrap">
      <div :class="{'search-box':true,'show':searchBoxIsShow}" @mouseover="searchBoxIsShow=true" @mouseout="sFn" id="search_box">
        <div class="s-btn" ></div>
        <div class="input-box" >
          <input type="text" class="search" v-model="keywords" placeholder="search">
          <div class="msg-box"></div>
        </div>
      </div>
      <div class="dropdown search-dropdown hide" @keyup="searchkws">
      </div>
    </div>
  </div>
</template>
<script>
import Axois from "axois";
export default {
  data() {
    return {
      keywords: "",
      searchBoxIsShow: false
    };
  },
  methods: {
    sFn() {
      let kws = this.keywords;
      kws === "" || kws === null ? (this.searchBoxIsShow = false) : "";
    },
    searchkws() {}
  }
};
</script>

