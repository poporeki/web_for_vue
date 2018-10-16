<template>
  <article class="article-box" data-artID=art.id>
    <div class="article-header">
      <div class="art-title">
        <h2>
          {{art.title}}
        </h2>
      </div>
      <div class="pt-info">
        <span class="pubtime">发表时间：
          {{art.createTime}}
        </span>
        <span class="source">分类：
          <a class="type-lk" :href="'/blog/articlelist?by[type_id]='+art.type.id">
            {{art.type.name}} </a>
        </span>
        <span class="author">发布:
          {{art.author}}
        </span>
        <span class="count">阅读数:
          {{art.readNum}}
        </span>
      </div>
    </div>
    <div class="article-body" v-html="art.content">

      <div>
        <br>原帖地址：<a :href="art.from">{{art.from}}</a>
      </div>

    </div>
    <p v-if="art!==null">--THE END--</p>
    <div v-if="art.tags!==null" class="article-tags-list">
      <div class="tit">TAG标签</div>
      <a v-for="tag in art.tags" :key='tag.id' :href="'/blog/articlelist?by[tags_id]='+tag._id" class="tag-lk">
        {{tag.tag_name}}
      </a>
    </div>
  </article>
</template>
<style lang="scss">
@import "../../../assets/scss/mixins/_set-color.scss";
.article-header {
  .art-title {
    > h2 {
      text-align: center;
    }
  }

  .pt-info {
    text-align: center;
    margin-bottom: 50px;

    span {
      margin-right: 20px;
      color: #8c9cb3;
      text-shadow: 0 0 5px #424242;
    }

    .type-lk {
      display: inline-block;
      color: #fff;
      background-color: #000000;
      border-radius: 50%;
      padding: 0 5px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(-5deg);
        background-color: #222222;
      }
    }
  }
}
.article-body {
  color: rgba(236, 236, 236, 1);
  a {
    color: #70917e;
    word-wrap: break-word;
    text-decoration: underline;
  }
  img {
    width: 100%;
  }
  blockquote {
    padding: 0;
    margin: 0;
  }
  figure {
    margin: 0;

    > table {
      display: block;
      overflow: auto;
      // background-color: #000;
    }
  }

  table {
    display: block;
    overflow: auto;

    tbody {
      padding: 5px;
      background-color: $color-block-wrap;

      tr {
        th,
        td {
          padding: 5px;
        }
      }
    }
  }

  figure > table,
  pre {
    &::-webkit-scrollbar {
      width: 10px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #535353;
    }
  }

  pre {
    background-color: #000000;
    color: darkorange;
    padding: 5px 5px;
    border-radius: 2px;
    box-sizing: border-box;
    overflow-x: auto;
  }
}
.article-tags-list {
  .tag-lk {
    position: relative;
    display: inline-block;
    padding: 5px 10px;
    margin: 5px 0;
    margin-right: 20px;
    background-color: #085e2c;

    &:hover {
      background-color: #064922;
    }

    &:after,
    &:before {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 20%;
      transform: skewX(30deg);
      background-color: inherit;
      z-index: -1;
    }

    &:before {
      transform: skewX(-30deg) !important;
    }
  }
}
</style>

<script>
export default {
  props: ["art"]
};
</script>

