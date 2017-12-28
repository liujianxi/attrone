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
// 注册一个全局自定义指令 `v-drag`
Vue.directive('drag', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
	el.onmousedown = function(e) {
		e.preventDefault();
		var e = e || window.event;
		var posX = e.clientX - el.offsetLeft;
		var posY = e.clientY - el.offsetTop;
		document.onmousemove = function(e) {
			var e = e || window.event;
			var winW = document.documentElement.clientWidth;
			var winH = document.documentElement.clientHeight;
			var left = e.clientX - posX;
			var top = e.clientY - posY;
			if(left < 50) {
				left = 0;
			} else if(left > winW - el.offsetWidth - 50) {
				left = winW - el.offsetWidth;
			}
			if(top < 50 ) {
				top = 0;
			} else if (top > winH - el.offsetHeight - 50) {
				top = winH - el.offsetHeight;
			}
			el.style.left = left + 'px';
			el.style.top = top + 'px';
		}
		document.onmouseup = function(e) {
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
  }
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})