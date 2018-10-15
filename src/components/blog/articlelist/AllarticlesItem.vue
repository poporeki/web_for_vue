<template>
  <div class="wrapper">
    <div class="title">
      <h2 class="list-tit">
        <small>文章列表</small>
      </h2>
    </div>
    <common-item :requestUrl='url'></common-item>
  </div>
</template>
<style lang="scss">
.list-tit {
  small {
    color: rgb(255, 255, 255);
    background-color: #000;
  }
}
</style>

<script>
import CommonItem from "./CommonItem";
export default {
  data() {
    return {
      dataComplete: false,
      artclist: {},
      url: "https://localhost:3000/blog/articlelist"
    };
  },
  methods: {
    getData() {
      const that = this;
      console.log("all");
      this.$axios.post(this.url).then(({ data }) => {
        console.log(data);
        that.arclist = data.data;
        that.dataComplete = true;
      });
    }
  },
  components: {
    CommonItem
  },
  created() {}
};
</script>

