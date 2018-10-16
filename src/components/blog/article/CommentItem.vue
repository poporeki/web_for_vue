<template>

  <section class="comment-block" id="comment">
    <h3>发表评论</h3>
    <div class="add-comm clearfix">
      <textarea @keyup="typing($event)" name="comm_textarea" class="comm-textarea" id="comm_textarea"></textarea>
      <a href="javascript:void(0);" class="comm-submit-btn" data-attr="">提交</a>
    </div>
    <div class="comm-list">
      <h3>评论列表({{artTotal}})</h3>
      <!-- 评论列表 -->
      <ul class="list">

        <li v-if="artComms.length===0">目前并没有评论哦</li>
        <li class="comment-item" v-for=" comm in artComms" :key='comm.id' :data-commid='comm.id'>
          <div>
            <div class="head-pic">
              <a href="javascript:void(0);">
                <img :src='comm.user.avatar' alt="avatar">
              </a>
            </div>
            <div class="content">
              <div class="info">
                <div class="lt">
                  <div class="username">
                    {{comm.user.name}}
                  </div>
                  <div class="address">
                    {{comm.submitAddress}}
                  </div>
                  <div class="p-date">
                    {{comm.createTime}}
                  </div>
                </div>
                <div class="floor-blk">
                  {{comm.floor+'楼'}}
                </div>
              </div>
              <p>
                {{comm.text}}
              </p>
              <div class="tools">
                <a href="javascript:void(0);" class="comm-reply-btn">回复</a>
              </div>
            </div>

          </div>
          <div class="reply-block">
            <div class="add-comm clearfix">
              <textarea name="comm_textarea" class="comm-textarea" id="comm_textarea" cols="30" rows="10"></textarea>
              <a href="javascript:void(0);" class="comm-submit-btn">提交</a>
            </div>
            <div class="close-btn"></div>
          </div>
          <!-- 评论中的回复列表 -->

          <ul :class='{"reply-list":true,show:comm.commReps&&comm.commReps.length!=0}'>

            <li class="comment-item" v-for="reply in comm.commReps" :key="reply.id">
              <div>
                <span>'#'{{reply.floor}} </span>
                <div class="head-pic">
                  <a href="javascript:void(0);">
                    <img :src='reply.user.avatar' alt="avatar">
                  </a>
                </div>
                <div class="content">
                  <div class="info">
                    <div class="lt">
                      <div class="username">{{reply.user.name}}</div>
                      <div class="address">{{reply.submitAddress}}</div>
                      <div class="p-date">{{reply.createTime}}</div>
                    </div>
                  </div>
                  if(reply.to==''){
                  <p v-if="reply.to==''">{{reply.repContent}}</p>
                  } else{
                  <p v-if="reply.to!=''">
                    回复 #{{reply.to.floor}} {{reply.to.author_id.user_name}}:{{reply.repContent}}
                  </p>
                  }
                  <div class="tools">
                    <a href="javascript:void(0);" class="comm-reply-btn">回复</a>
                  </div>
                </div>
              </div>
              <div class="reply-block">
                <div class="add-comm clearfix">
                  <textarea name="comm_textarea" class="comm-textarea" id="comm_textarea" cols="30" rows="10"></textarea>
                  <a href="javascript:void(0);" class="comm-submit-btn reply-child" :data-repid='reply.id'>提交</a>
                </div>
                <div class="close-btn"></div>
              </div>
            </li>
            <li class="comment-item" v-if="comm.commReps&&comm.commReps.length!==0&&comm.commReps.count>5">
              还有{{comm.commReps.count-5}}条回复，
              <a href="javascript:void(0);">点击查看</a>
            </li>
          </ul>

        </li>

        <li class="comment-more" v-if="artTotal>artComms.length">
          <a href="javascript:void(0);" class="more-comms-lk">查看更多评论</a>
        </li>
      </ul>
    </div>
  </section>
</template>
<style lang="scss">
@import "../../../assets/scss/mixins/_set-color.scss";
.comment-block {
  h3 {
    padding: 10px 0;
    border-bottom: 1px solid rgb(48, 48, 48);
  }

  .comment-item {
    position: relative;
  }

  .add-comm {
    position: relative;
    box-sizing: border-box;
    align-items: stretch;
    align-content: center;
    margin-bottom: 80px;

    > textarea {
      position: relative;
      display: block;
      width: 100%;
      height: 200px;
      margin: 0;
      padding: 10px;
      padding-right: 30px;
      border: none;
      border-radius: 2px;
      box-sizing: border-box;
      color: rgb(207, 207, 207);
      background-color: rgb(71, 71, 71);
      letter-spacing: 2px;
      resize: none;
      z-index: 100;
      overflow: auto;
    }

    .comm-submit-btn.show {
      transform: translateY(100%);
    }

    .comm-submit-btn {
      position: absolute;
      display: block;
      width: 100%;
      height: 60px;
      left: 0;
      bottom: 0;
      border-radius: 2px;
      line-height: 60px;
      background-color: #4cc37e;
      letter-spacing: 4px;
      font-weight: bold;
      text-align: center;
      box-sizing: border-box;
      z-index: 99;
      transition: transform 0.5s ease;

      &:after {
        content: attr(data-attr);
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9;
        visibility: hidden;
        transform: translateY(-100%);
        transition: transform 0.5s ease, visibility.5s ease;
        background-color: orange;
      }

      &.msg {
        &:after {
          visibility: visible;
          transform: translateY(0);
        }
      }

      &.hide {
        &:after {
          visibility: hidden;
          transform: translateY(-100%);
        }
      }
    }
  }

  .reply-block.show {
    display: block;
  }

  .reply-list {
    display: none;
    position: relative;
    border: 1px solid #424242;
    margin-top: 15px;
    padding: 5px 15px;

    &.show {
      display: block;
    }
  }

  .reply-block {
    display: none;
    position: relative;
    width: 100%;
    height: 110px;
    margin-top: 15px;
    z-index: 100;

    > .add-comm {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 0;
      width: 100%;
      height: 100%;
      z-index: 100;

      > .comm-textarea {
        height: 100% !important;
      }
    }

    .close-btn {
      position: absolute;
      content: "";
      right: 0;
      width: 30px;
      height: 30px;
      text-align: center;
      z-index: 101;
      transform: rotate(45deg);
      transition: transform 0.5s ease;
      cursor: pointer;

      &:after,
      &:before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        transform: translate(-50%, -50%, 0);
        background-color: $color-font;
      }

      &:after {
        width: 100%;
        height: 10%;
        top: 50%;
      }

      &:before {
        height: 100%;
        width: 10%;
        left: 50%;
      }

      &:hover {
        transform: rotate(225deg);
      }
    }
  }
}

.comm-list {
  position: relative;
  background-color: #000;
  padding: 10px;

  ul.list {
    > li {
      position: relative;
      padding-left: 10px;
      margin-bottom: 15px;
      border-left: 5px solid #085e2c;
      transition: border-color 0.4s ease, height 0.3s ease;
      animation: fadeIn 0.5s;

      &:hover {
        border-color: #60bb46;
      }

      .head-pic {
        position: relative;
        width: 10vw;
        height: 10vw;
        max-width: 80px;
        max-height: 80px;
        margin-top: 5px;
        box-sizing: border-box;

        a {
          display: block;
          height: 100%;
          width: 100%;
          border-top-left-radius: 50%;
          overflow: hidden;
          transition: all 0.3s ease;

          > img {
            height: 100%;
          }
        }
      }

      > div:nth-child(1),
      .reply-list > li > div:nth-child(1) {
        display: flex;
        position: relative;
        flex-direction: row;
      }

      .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-left: 10px;

        .info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .lt {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-size: 12px;
            margin-bottom: 10px;

            > div {
              margin-right: 10px;
            }
          }

          .username {
            color: rgb(207, 207, 207);
          }

          .address {
            color: #728092;
          }

          .p-date {
            color: #728092;
          }

          .floor-blk {
            justify-self: flex-end;
            font-size: 12px;
            color: rgb(85, 85, 85);
          }
        }

        > p {
          margin: 0;
          color: #9dafc7;
        }

        .tools {
          display: flex;
          justify-content: flex-end;
          font-size: 14px;
        }
      }
    }

    .comment-item {
      &:hover {
        > div {
          > .head-pic {
            > a {
              height: 90%;
              width: 90%;
              box-shadow: 2px 2px 10px rgb(255, 255, 255);
            }
          }
        }
      }
    }
  }

  .comment-more {
    text-align: center;

    > a.more-comms-lk {
      display: block;
      position: relative;
    }
  }
}
</style>

<script>
export default {
  props: ["artTotal", "artComms", "toComment"],
  methods: {
    /* 跳转到锚点 */
    goAnchor(el) {
      setTimeout(() => {
        let event = document.getElementById(el);
        let offTop = event.offsetTop;
        document.body.scrollTop = offTop; // chrome
        document.documentElement.scrollTop = offTop; // firefox
      }, 100);
    },
    typing(ev) {
      console.log("as:" + ev);
      let target = ev.currentTarget;
      let nextSibling = target.nextSibling;
      if (target.value === "") return this.removeClass(nextSibling, "show");

      if (nextSibling.tagName === "A") {
        this.addClass(nextSibling, "show");
      }
    },
    addClass(el, name) {
      let className = el.className;
      let arr = className.split(" ");
      let newArr = arr.filter(value => {
        return value === name;
      });
      if (newArr.length !== 0) return;
      el.className += " " + name;
    },
    removeClass(el, name) {
      let className = el.className;
      let arr = className.split(" ");
      let filter = arr.filter(value => {
        return value !== name;
      });
      filter.join(" ");
      el.className = filter.join(" ");
    }
  },
  mounted() {
    console.log("comment ishow");
    /* 是否锚点到评论区 */
    this.toComment === true ? this.goAnchor("comment") : "";
  }
};
</script>

