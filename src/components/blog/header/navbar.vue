<template>
  <ul class="navbar">
    <li v-for="item in navlist" :key='item.id'>
      <a :href="item.href">{{item.name}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      navlist: [
        { name: "首页", href: "/blog" },
        {
          name: "Web前端",
          href: "/blog/articlelist?by[type_id]=5b16cd78bbe59122b43bf2c1"
        },
        {
          name: "服务端",
          href: "/blog/articlelist?by[type_id]=5b198d59be1c73036d50c176"
        },
        {
          name: "数据库",
          href: "/blog/articlelist?by[type_id]=5b16ce950100982448b19d55"
        },
        { name: "个人简历", href: "/iresume" }
      ]
    };
  }
};
</script>

