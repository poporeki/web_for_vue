<template>
  <div>
    <transition enter-active-class="animated fadeInUp">
      <section class="article-wrapper" v-if='isShow'>
        <bread-crumb :arcid='articleData.arcInfo.id' :arctitle="articleData.arcInfo.title" :typename="articleData.arcInfo.type.name"></bread-crumb>

        <article-content :art='articleData.arcInfo'></article-content>
        <div class="line"></div>
        <article-comment :toComment='isToComment' :artTotal="articleData.arcTotal" :artComms="articleData.arcComms"></article-comment>
      </section>
    </transition>
  </div>
</template>
<style lang="scss">
section.article-wrapper {
  position: relative;
  width: 90%;
  max-width: 1190px;
  margin-bottom: 200px;
  margin: 0 auto;
}
</style>

<script>
import Loading from "../../../views/Loading";
import BreadCrumb from "./BreadcrumbItem";
import ArticleContent from "./ArcConItem";
import ArticleComment from "./CommentItem";
export default {
  data() {
    return {
      isShow: false,
      isToComment: false,
      articleData: {}
    };
  },
  components: {
    Loading,
    BreadCrumb,
    ArticleContent,
    ArticleComment
  },
  methods: {
    getArticle() {
      console.log("geetarticle");
      let _this = this;
      this.$axios
        .get("http://192.168.199.208:3000/blog/article/a/" + this.arcid)
        .then(({ data }) => {
          console.log(`文章:${data.data}`);
          if (data.status && data.code === 404) {
            _this.$router.replace({
              path: "404"
            });
            return;
          }
          _this.isShow = true;
          _this.isComment();
          _this.articleData = data.data;
        });
    },
    isComment() {
      this.$route.hash === "#comment" ? (this.isToComment = true) : "";
    }
  },
  computed: {
    arcid() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.arcid;
    }
  },
  created() {
    this.getArticle();
  }
};
</script>

