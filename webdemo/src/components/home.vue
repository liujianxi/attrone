<template>
  <div class="home">
    <div id="pageContain">
    	<div id="snow-back"></div>
    	<div class="home-text"><p>This is T-one<span><i class="el-icon-location"></i><i class="el-icon-location-outline"></i><router-link to="/textlist">文章列表</router-link></span></p></div>
      <!--<div class="page page1">
        <div class="container">
        	
        </div>
      </div>-->
      <!--<div class="page page2">
        <h1>这是第二页</h1>
      </div>-->
    </div>
    <ul id="navBar" v-if="false">
      <li v-for='(item,index) in fullPageSize' :key="index" @click="changePage(index)">
        <span :class="current==index?'selected':''"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import richText from './richText.vue'
import http from '../service/api.js'
export default {
  components: { richText },
  name: 'home',
  data() {
    return {
      fullPageSize: 1,
      current: 0,
      wHeight: '',
      resiezeFlag: true,
    }
  },
  activated() {
    this.getSize();
    let oDiv = document.getElementById('pageContain');
    this.addEvent(oDiv, 'mousewheel', this.onMouseWheel);
    this.addEvent(oDiv, 'DOMMouseScroll', this.onMouseWheel);
    new JParticles.snow('#snow-back');
  },
  methods: {
    getSize() {
      let self = this;
      window.onresize = function() {
        self.resiezeFlag = false;
        self.wHeight = document.body.clientHeight;
        self.getTransform();
      }
    },
    changePage(i) {
      this.current = i;
      if (this.resiezeFlag) {
        this.wHeight = document.body.clientHeight;
      }
      this.getTransform();
    },
    getTransform() {
      let self = this;
      document.getElementById("pageContain").style.transform = "translateY(" + (-self.wHeight) * self.current + "px)";
      /* Opera、Chrome 和 Safari */
      // document.getElementById("pageContain").style.WebkitTransform = "translateY(" + (-self.wHeight) * self.current + "px)";
      /* IE 9 */
      // document.getElementById("pageContain").style.msTransform = "translateY(" + (-self.wHeight) * self.current + "px)";
    },
    onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/
      let self = this;
      var ev = ev || window.event;
      var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作  
      down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
      if (down) {
        if (self.current != self.fullPageSize - 1) {
          self.current = self.current + 1;
        }
      } else {
        if (self.current) {
          self.current = self.current - 1;
        }
      }
      if (this.resiezeFlag) {
        this.wHeight = document.body.clientHeight;
      }
      self.getTransform();
      if (ev.preventDefault) {/*FF 和 Chrome*/
        ev.preventDefault();// 阻止默认事件  
      }
      return false;
    },
    addEvent(obj, xEvent, fn) {
      if (obj.attachEvent) {
        obj.attachEvent('on' + xEvent, fn);
      } else {
        obj.addEventListener(xEvent, fn, false);
      }
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "../assets/global.scss";
body,
div,
p,
h1 {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

h1 {
  padding-top: 100px;
}

.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
#snow-back{
	width: 100%;
	height: 100%;
	background: url(../assets/background.png) repeat;
}
#navBar {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  li {
    cursor: pointer;
    margin-bottom: 20px;
    span {
      display: block;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      border: 2px solid #5a666f;
    }
    span.selected {
      background: #5a666f;
    }
    span:hover {
      background: #5a666f;
    }
  }
  li:nth-last-child(1) {
    margin-bottom: 0;
  }
}

#pageContain {
  width: 100%;
  height: 100%;
  transition: all .5s linear;
  .page {
    width: 100%;
    height: 100%;
  }
  .page2 {
    background: red;
  }
}
.home-text{
	border-radius: 8px;
	background: #fff;
	font-size: 20px;
	position: absolute;
	top:50%;
	left: 50%;
	transform: translate(-50%,-50%);
	height: 120px;
	width: 500px;
	max-width: 90%;
	box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1), 0 4px 8px 0 rgba(0,0,0,0.2);
	animation:moveBox 1s;
	overflow: hidden;
	text-align: left;
	p{
		padding-left: 20px;
		position: relative;
		line-height: 120px;
		animation:moveKeys 1s 1s linear forwards;
		opacity: 0;
		filter: Alpha(opacity=0);
		span{
			position: absolute;
			right: 20px;
			top:50%;
			transform: translateY(-50%);
		}
	}
	&:hover{
		box-shadow: 5px 5px 25px #97a8be;
	}
}
@keyframes moveBox{
    0%{
        height: 0px;
    }
    100%{
        height: 120px;
    }
}
@keyframes moveKeys{
    0%{
    	opacity: 0;
    	filter: Alpha(opacity=0);
    	}
    100%{
      opacity: 1;
      filter: Alpha(opacity=100);
    }
}
</style>
