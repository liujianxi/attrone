<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <div id="fix-bar" v-show="barShow">
      <dl>
        <dd :class="['home', barSelectIndex==0?'select':'']" @click="clickBar(0)">
          <i></i>
          <p>首页</p>
        </dd>
        <dd :class="['order', barSelectIndex==1?'select':'']" @click="clickBar(1)">
          <i></i>
          <p>订单</p>
        </dd>
        <dd :class="['inquire', barSelectIndex==2?'select':'']" @click="clickBar(2)">
          <i></i>
          <p>问诊</p>
        </dd>
        <dd :class="['me', barSelectIndex==3?'select':'']" @click="clickBar(3)">
          <i></i>
          <p>我的</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { NO_CHECK_PHONE } from "./util/const.js";
import {
  initWx,
  checkLogin,
  wxGetPosition,
  isApp,
} from "./util/common.js";
export default {
  name: "app",
  data() {
    return {
      barSelectIndex: -1, //底部选中状态, 默认跳转首页
      barShow: false //底部栏是否显示
    };
  },
  created() {
    //微信环境
    var self = this;
    this.goCnzz();
    this.routeBar(this.$route.name); //第一次刷新进入时，beforeEach不会被调用，手动调用
    this.$router.beforeEach((to, from, next) => {
      //处理跳转底部栏状态
      this.routeBar(to.name);
      next();
    });
    // if (!isApp(window)) {
    //   //微信上
    //   if (!window.isBindPhone &&NO_CHECK_PHONE.indexOf(self.$route.name) == -1) {
    //     //没绑定手机且需要验证手机号的页面
    //     console.log('appvue---------self.$route');
    //     console.log(window.curr_url);
    //     this.barShow = false;
    //     this.$router.push({
    //       path: "/login",
    //       query: { returnuri: window.curr_url }
    //     }); //中断当前跳转到另外一个;
    //   }
    // }
  },
  watch: {
    $route() {
      this.goCnzz();
    }
  },
  methods: {
    goCnzz() {
      if (_czc) {
        var location = window.location;
        var content_url = location.pathname + location.hash;
        var referer_url = "/";
        dplus.track(["_trackPageview", content_url, referer_url]);
      }
    },
    routeBar(name) {
      switch (name) {
        case "none":
        case "index":
          this.barShow = true;
          this.barSelectIndex = 0;
          break;
        case "orderlist":
          this.barShow = true;
          this.barSelectIndex = 1;
          break;
        case "inquire":
          this.barShow = true;
          this.barSelectIndex = 2;
          break;
        case "wenzhen":
          this.barShow = true;
          this.barSelectIndex = 2;
          break;
        case "me":
          this.barShow = true;
          this.barSelectIndex = 3;
          break;
        default:
          this.barShow = false;
          break;
      }
    },
    clickBar(index) {
      switch (index) {
        case 0:
          this.$router.push({ path: "/index" });
          break;
        case 1:
          this.$router.push({ path: "/orderlist" });
          break;
        case 2:
          this.$router.push({ path: "/wenzhen" });
          break;
        case 3:
          this.$router.push({ path: "/me" });
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import "/assets/css/global.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  > div:first-child {
    height: 100%;
  }
}

html {
  font-family: "SimHei", sans-serif;
  height: 100%;

  body {
    /*border:1px solid red;*/
    height: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: px2rem(16px) !important;
    margin: 0;
    background-color: $form-bgcolor;
    color: #333;
    -webkit-text-size-adjust: none;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

dl,
dd,
p {
  margin: 0;
}

a {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}

dl dd div .txt-content a {
  color: #0369ff;
  text-decoration: underline;
}

.font-black {
  color: #333;
}

input {
  border: none;
  outline: none;
  padding: 0;
  /*ios有padding*/
  height: 100%;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ccc;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ccc;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ccc;
}

button {
  border: none;
  outline: none;
}

.btn_fix_bot {
  position: fixed;
  background: -webkit-linear-gradient(left, #14ccc8, #39ddb0);
  left: 0;
  bottom: 0;
  width: 100%;
  height: px2rem(100px);
  line-height: px2rem(100px);
  text-align: center;
  color: #fff;
  font-size: px2rem(36px);
  z-index: 1;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.page {
  height: 100%;
}

.main {
  padding-bottom: px2rem(120px);
}

#fix-bar {
  width: 100%;
  height: px2rem(100px);
  line-height: px2rem(100px);
  border-top: px2rem(1px) solid #f0f0f0;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 2;

  dl {
    display: -webkit-box;
    padding-top: px2rem(15px);

    dd {
      -webkit-box-flex: 1;
      i {
        display: block;
        width: 100%;
        height: px2rem(45px);
      }
      p {
        font-size: px2rem(28px);
        color: #999;
        line-height: px2rem(30px);
        padding-top: px2rem(5px);
      }
    }
    dd.select {
      p {
        color: #2bd6bd;
      }
    }
    .home {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-home.png") no-repeat center center;
        background-size: auto 100%;
      }
    }
    .home.select {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-home-select.png") no-repeat center
          center;
        background-size: auto 100%;
      }
    }
    .order {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-order.png") no-repeat center
          center;
        background-size: auto 100%;
      }
    }
    .order.select {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-order-select.png") no-repeat
          center center;
        background-size: auto 100%;
      }
    }
    .inquire {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-diagnosis.png") no-repeat center
          center;
        background-size: auto 100%;
      }
    }
    .inquire.select {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-diagnosis-select.png") no-repeat
          center center;
        background-size: auto 100%;
      }
    }
    .me {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-mine.png") no-repeat center center;
        background-size: auto 100%;
      }
    }
    .me.select {
      i {
        background: url("https://s.1-1dr.com/static/mobile/img/wechat/icon-mine-select.png") no-repeat center
          center;
        background-size: auto 100%;
      }
    }
  }
}

/*覆盖minui样式*/

.mint-indicator-wrapper {
  z-index: 100;
}

.mint-indicator-mask {
  z-index: 99;
}

.mint-loadmore-top,
.mint-loadmore-bottom {
}

.mint-loadmore-top {
  .mint-loadmore-text {
    font-size: px2rem(28px);
  }
}

.mint-loadmore-bottom {
  .mint-loadmore-text {
    font-size: px2rem(28px);
  }
}

.mint-indicator .mint-indicator-wrapper {
  padding: px2rem(30px) !important;
}

.mint-indicator .mint-indicator-wrapper .mint-indicator-text {
  font-size: px2rem(30px);
}

.mint-toast {
  padding: px2rem(20px) !important;

  .mint-toast-text {
    font-size: px2rem(28px);
  }
}

.picker-item {
  font-size: px2rem(30px);
}

.picker-item.picker-selected {
}

.mint-cell-title {
  -webkit-box-flex: 0;
  flex: 0;
}

.mint-cell-value {
  -webkit-box-flex: 1;
  flex: 1;
}

/**** 轮播图样式 *****/

.mint-swipe-items-wrap {
  div.mint-swipe-item {
    a {
      display: block;
      img {
        width: 100%;
      }
    }
  }
}

div.mint-swipe-indicators {
  div.mint-swipe-indicator {
    width: px2rem(15px);
    height: px2rem(15px);
    margin: 0 px2rem(10px);
  }
}

.mint-msgbox {
  font-size: px2rem(30px) !important;

  .mint-msgbox-header {
    padding: px2rem(15px) 0 0;

    .mint-msgbox-title {
      font-size: px2rem(30px) !important;
    }
  }
  .mint-msgbox-content {
    padding: px2rem(10px) px2rem(20px) px2rem(15px);
    border-bottom: 1px solid #ddd;
    min-height: px2rem(90px);
    position: relative;

    .mint-msgbox-message {
      line-height: px2rem(90px);
    }
  }

  .mint-msgbox-btns {
    height: px2rem(100px);
    line-height: px2rem(100px);

    .mint-msgbox-btn {
      line-height: px2rem(100px);
      font-size: px2rem(30px) !important;
    }
  }
}


.mint-cell-wrapper {
  padding: 0;
}

.div-item {
  border: 0 !important;
}

.mint-cell {
  margin-bottom: px2rem(20px);
}

.col-sm-3 {
  width: 33.33333333%;
}

.grid-view {
  display: block;
  width: 100%;
}

.table-view {
  position: relative;
  list-style: none;

  .table-view-cell {
    display: inline-block;
  }
}

.picker .picker-items {
  padding: 0 px2rem(100px);
}

/*message部分*/

.div-item .word-w .content {
  line-height: 1.2;
}

.div-item .word-w .content a {
  color: #1587f4;
}

/******************************** 全局CSS样式 ***********************/

.font-ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/*清除number框滚轮*/

input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
