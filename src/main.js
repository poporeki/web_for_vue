import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import Axios from "axios";
import progressive from "progressive-image/dist/vue";
import "../src/assets/scss/font_face.scss";

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;
Axios.defaults.withCredentials = true;
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  let _store = store;
  console.log("router before");
  window.document.title = to.meta.title;
  let notshow = to.meta.notshow;
  console.log(`路由前${notshow}`);
  notshow
    ?
    notshow.loading ?
    (store.state.isLoading = false) :
    (store.state.isLoading = true) :
    "";

  Axios.post("http://192.168.199.208:3000/auth").then(({
    data
  }) => {
    next();
    console.log("auth");
    if (data.auth.status) {
      _store.state.isLogin = true;
      _store.state.userInfo = data.auth.info.user;
      return;
    }

    _store.state.isLogin = false;
    _store.state.userInfo = {};
  });
});

//定义一个请求拦截器
Axios.interceptors.request.use(function (config) {
  if (config.url === "http://192.168.199.208:3000/auth") return config;
  store.dispatch("showloader");
  if (config.data && config.data.isGlobalLoading === false) {
    true;
  } else {
    let notshow = vm.$route.meta.notshow;
    console.log(`route:${vm.$route}######请求发起：${notshow}`);
    if (notshow) {
      notshow.loading ?
        (store.state.isLoading = false) :
        (store.state.isLoading = true);
    } else {
      store.state.isLoading = true;
    }
  }

  return config;
});
//定义一个响应拦截器
Axios.interceptors.response.use(function (config) {
  console.log("response");
  store.dispatch("hideloader");
  store.state.isLoading = false;
  let data = config.data;
  if (data.status === -9) {
    router.replace({
      path: "login",
      query: {
        redirect: router.currentRoute.fullPath
      }
    });
  }

  return config;
});
Vue.use(progressive, {
  removePreview: true,
  scale: true
});
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");