// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import { Button} from 'element-ui'
import {textFilter,timeFilter} from './filter/filter.js';
//qq-登录信息
window.qqMes={};
Vue.config.productionTip = false
/* eslint-disable no-new */
/*
 * 注册过滤器
 */
Vue.filter('textFilter', textFilter);
Vue.filter('timeFilter', timeFilter);
// 引入组件
Vue.component(Button.name, Button);
let curr_url = location.hash.match(/#\/([^?]*)/i)[1];
if(curr_url=='basketball'){
	document.querySelector('title').innerHTML="科比--青春不说再见";
}else{
	document.querySelector('title').innerHTML="webdemo";
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})