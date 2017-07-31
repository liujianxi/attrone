<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

p,
body,
ul,
dl,
li {
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  *cursor: default;
  overflow: hidden;
  font: 16px/1.5 "Microsoft YaHei", Helvetica, STHeiti STXihei, Microsoft JhengHei, Arial;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
