<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view />
  </div>
</template>

<style lang="less">
//定义全局样式
body {
  background-color: #f5f5f5;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.auto-img {
  width: 100%;
  display: block;
}
.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
p {
  margin: 0;
}
</style>
<script>
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true //控制视图是否显示的变量
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  }
};
</script>


