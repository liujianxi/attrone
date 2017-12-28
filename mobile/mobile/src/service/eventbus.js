import Vue from 'vue'

/**
 * 定义空的vue实例，作为 eventbus实现非父子组件之间的通信(vue2.x中去掉了broadcast)https://zengxiaotao.github.io/2017/01/07/vue%E9%9D%9E%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E6%80%8E%E4%B9%88%E9%80%9A%E4%BF%A1/
 */
var eventBus = new Vue({});
export default eventBus;