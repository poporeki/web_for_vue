<template>
  <header>
    <transition enter-active-class="animated fadeIn">
      <Header-top v-if="true"></Header-top>
    </transition>
    <nav>
      <Header-navbar></Header-navbar>
      <Header-search></Header-search>
    </nav>
  </header>
</template>

<style lang="scss">
@import "../../../assets/scss/mixins/_set-color.scss";
@font-face {
  font-family: "Loto";
  src: url("https://fonts.googleapis.com/css?family=Lato:300");
}

@media (width: 360px) {
  header {
    height: 80px;

    nav {
      flex-direction: column-reverse !important;

      .rt {
        align-self: flex-end !important;
        margin-bottom: 50px;
        width: 100% !important;

        .s-wrap {
          width: 100% !important;
        }
      }

      .navbar {
        display: none !important;

        a {
          padding: 5px 15px !important;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  header {
    height: 100px;

    nav {
      padding: 50px 0 20px !important;
      flex-direction: column-reverse !important;

      .rt {
        align-self: flex-end !important;
        margin-bottom: 50px;
        width: 100% !important;

        .s-wrap {
          width: 100% !important;
        }
      }

      .navbar {
        display: none !important;

        a {
          padding: 5px 15px !important;
        }
      }
    }
  }
}

header {
  position: relative;
  max-height: 300px;

  nav {
    display: flex;
    flex-direction: row;
    padding: 100px 0;
    justify-content: space-between;

    ul.navbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;

      li {
        a {
          position: relative;
          display: flex;
          flex-grow: 1;
          align-self: center;
          font-size: 1.2rem;
          font-weight: bold;
          padding: 15px 20px;
          margin: 0 10px;
          box-sizing: border-box;
          transition: color 0.3s ease;
          overflow: hidden;
          color: #fff;

          &:after,
          &:before {
            content: "";
            position: absolute;
            width: 20%;
            padding-top: 20%;
            border: 2px solid #000;
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          &:after {
            bottom: 0;
            right: 0;
            transform: translate(-50%, -50%);
            border-left-color: transparent;
            border-top-color: transparent;
          }

          &:before {
            top: 0;
            left: 0;
            transform: translate(50%, 50%);
            border-right-color: transparent;
            border-bottom-color: transparent;
          }
        }

        &:hover {
          > a {
            color: $color-bg;

            &:after,
            &:before {
              transform: translate(0);
              opacity: 1;
            }
          }
        }
      }
    }

    .rt {
      display: flex;
      position: relative;
      align-self: center;
      justify-content: flex-end;

      .s-wrap {
        position: relative;
        width: 200px;
      }

      .search-box {
        position: relative;
        border-radius: 2px;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        z-index: 101;

        &.show {
          .input-box {
            transform: translateX(0);
          }

          .s-btn {
            transform: rotate(360deg);
          }
        }

        .s-btn {
          position: absolute;
          height: 40px;
          width: 40px;
          top: 0;
          right: 0;
          background-color: #212121;
          cursor: pointer;
          z-index: 2;
          border-radius: $bor-radius;
          box-sizing: border-box;
          transition: transform 1s ease;

          &:after {
            content: "";
            position: absolute;
            width: 40%;
            height: 40%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            border-radius: 50%;
            border: 2px solid rgb(226, 226, 226);
          }

          &:before {
            content: "";
            position: absolute;
            top: 70%;
            left: 65%;
            width: 10%;
            border: 1px solid rgb(184, 184, 184);
            transform: rotate(45deg);
          }
        }

        .input-box {
          display: flex;
          position: relative;
          height: 40px;
          width: 100%;
          padding: 10px;
          padding-right: 50px;
          border-top-right-radius: $bor-radius;
          border-bottom-right-radius: $bor-radius;
          background-color: rgb(161, 161, 161);
          transition: transform 1s ease;
          z-index: 1;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          transform: translateX(100%);

          .search {
            background-color: transparent;
            outline: none;
            border: none;
            width: 100%;
            color: #2a2a2a;
            justify-self: center;
          }

          .loading-ani-searchlike {
            position: absolute;
            height: 2px;
            width: 100%;
            left: 0;
            top: 0;
            padding-right: 50px;
            box-sizing: border-box;
            transform: scale(0);
            animation: inputLoadAni 1s infinite;
            background-color: #000;
          }

          @keyframes inputLoadAni {
            0% {
              transform: scale(0);
            }

            50% {
              transform: scale(1);
              background-color: rgb(131, 131, 131);
            }

            100% {
              transform: scale(0);
            }
          }
        }
      }

      .search-dropdown {
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        padding: 30px 0;
        background-color: #fff;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        box-shadow: 0 2px 5px rgb(129, 129, 129);
        transition: all 1s ease;
        z-index: 100;

        &.show {
          display: block;
          animation: ddAni_in 1s both;
        }

        &.hide {
          display: none;
          animation: ddAni_out 1s both;
        }

        .arc-lk {
          display: block;
          margin: 0 5px;
          padding: 10px 10px;
          font-size: 12px;
          border-bottom: 1px solid rgba(218, 218, 218, 0.445);
          color: rgb(95, 95, 95);

          &:hover,
          &:active {
            background-color: #e2e2e2;
          }
        }

        @keyframes ddAni_in {
          0% {
            opacity: 0;
            transform: translateY(-10%);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ddAni_out {
          0% {
            opacity: 1;
            transform: translateY(0);
          }

          100% {
            opacity: 0;
            transform: translateY(-10%);
          }
        }
      }
    }
  }
}
</style>


<script>
import Topitem from "./topitem.vue";
import Navbar from "./navbar.vue";
import Search from "./search.vue";
export default {
  components: {
    "Header-navbar": Navbar,
    "Header-top": Topitem,
    "Header-search": Search
  }
};
</script>
