<template>
  <div class="home">
    <div id="pageContain">
      <div class="page page1">
        <h1>这是第一页</h1>
      </div>
      <div class="page page2">
        <h1>这是第二页</h1>
      </div>
    </div>
    <ul id="navBar">
      <li v-for='(item,index) in fullPageSize' :key="index" @click="changePage(index)">
        <span :class="current==index?'selected':''"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      fullPageSize: 2,
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
  },
  methods: {
    getSize() {
      let self = this;
      window.onresize = function () {
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
      document.getElementById("pageContain").style.WebkitTransform = "translateY(" + (-self.wHeight) * self.current + "px)";
      /* IE 9 */
      document.getElementById("pageContain").style.msTransform = "translateY(" + (-self.wHeight) * self.current + "px)";
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
</style>
