<template>
  <div class="tags-box">
    <h2>Tag标签</h2>
    <div class="articletag-list">
      <a v-for="item in taglist" :key='item.id' class='tag-lk' :href="'/blog/articlelist?by[tags_id]='+item._id">
        {{item.tag_name}}
        <div class="lk-inner">
          <div class="front"> <span> {{item.tag_name}}</span></div>
          <div class="back"><span>{{item.count}}</span></div>
        </div>
      </a>
    </div>
  </div>
</template>
<style lang="scss">
@import "../../../../public/scss/mixins/_set-color.scss";
.articletag-list {
  display: flex;
  flex-wrap: wrap;

  .tag-lk {
    position: relative;
    display: inline-block;
    flex-grow: 1;
    margin: 3px;
    padding: 10px 20px;
    transition: transform 0.2s ease-out;
    transform: scale(1);
    color: rgba(0, 0, 0, 0);

    .lk-inner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      color: #fff;
      perspective: 1200px;
      transform-style: preserve-3d;
      transition: transform 0.3s ease;
      background-color: $color-pink;
    }

    .front,
    .back {
      position: absolute;
      backface-visibility: hidden;
      background-color: $color-pink;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease;

      > span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .front {
      /* z-index: 1; */
      transform: rotateX(0);
    }

    .back {
      /* z-index: 0; */
      transform: rotateX(-180deg);
      background-color: $color-green;
    }

    &:hover {
      transform: scale(1);

      .lk-inner {
        transform: rotateX(180deg);
      }

      /* .front {
          z-index: 0;
        }
        .back {
          z-index: 1;
        } */
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      taglist: []
    };
  },
  methods: {
    getData() {
      let _this = this;
      this.$axios
        .get("https://localhost:3000/blog/gettags")
        .then(({ data }) => {
          _this.taglist = data;
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

