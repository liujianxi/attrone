<template>
    <div id="hei-wei">
        <s-header type="2" title="身高体重" @rightCall="sureCall"></s-header>
        <div class="main">
            <div class="weight-bar" ref="weightBar" @scroll="weightScroll()">
                <div class="ab-cen">
                    <p class="tz">体重</p>
                    <div class="tan-bot"></div>
                    <div class="tz-num">
                        <span class="num">{{weightVal}}</span>&nbsp;KG</div>
                    <div class="v-line"></div>
                    <div class="tan-top"></div>
                </div>
                <dl :style="weiDlStyle" ref="weightScroller">
                    <dd class="long">
                        <span>0</span>
                    </dd>
                    <dd v-for="(w,index) in maxWeight" :class="[w%5==0 ? 'long' : 'short' ]" :key=index>
                        <span v-if="w%5==0">{{w}}</span>
                    </dd>
                </dl>
            </div>
            <div class="height-bar" ref="heightBar" @scroll="heightScroll()">
                <div class="ab-cen">
                    <p class="tz">身高</p>
                    <div class="tan-bot"></div>
                    <div class="tz-num">
                        <span class="num">{{heightVal}}</span>&nbsp;CM</div>
                    <div class="v-line"></div>
                    <div class="tan-top"></div>
                </div>
                <dl :style="heiDlStyle" ref="heightScroller">
                    <dd class="long">
                        <span>0</span>
                    </dd>
                    <dd v-for="(w,index) in maxHeight" :class="[w%5==0 ? 'long' : 'short' ]" :key=index>
                        <span v-if="w%5==0">{{w}}</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import eventBus from '../service/eventbus.js'

export default {
    components: { SHeader },
    data() {
        return {
            maxWeight: 300, //体重最大值
            weightVal: 0.0, //当前体重
            maxHeight: 250, //身高最大值
            heightVal: 0.0  //当前身高
        }
    },
    computed: {
        weiDlStyle: function () {
            return {
                width: (this.maxWeight) * (2 + 10) + 'px',
                padding: '0 5rem'
            }
        },
        heiDlStyle: function () {
            return {
                width: (this.maxHeight) * (2 + 10) + 'px',
                padding: '0 5rem'
            }
        }
    },
    activated() {
        var self = this;
        //回显数据
        self.heightVal = self.$route.query.nowh;
        self.weightVal = self.$route.query.noww;
        //如果为0则设定默认身高体重
        if (self.heightVal == 0.0) {
            self.heightVal = 170.0;
        }
        if (self.weightVal == 0.0) {
            self.weightVal = 65.0;
        }
        //设置到滚动组件
        this.$refs.weightBar.scrollLeft = this.weightVal * (this.$refs.weightScroller.offsetWidth - this.$refs.weightBar.offsetWidth) / this.maxWeight;
        this.$refs.heightBar.scrollLeft = this.heightVal * (this.$refs.heightScroller.offsetWidth - this.$refs.heightBar.offsetWidth) / this.maxHeight;
    },
    methods: {
        weightScroll() {
            // console.log(this.$refs.weightBar.scrollLeft);
            // console.log(this.$refs.weightScroller.offsetWidth, this.$refs.weightBar.offsetWidth);
            var tmp = this.$refs.weightBar.scrollLeft * this.maxWeight / (this.$refs.weightScroller.offsetWidth - this.$refs.weightBar.offsetWidth);
            if (tmp < 0)
                return;
            else if (tmp > this.maxWeight)
                return;
            this.weightVal = tmp.toFixed(1);
        },
        heightScroll() {
            var tmp = this.$refs.heightBar.scrollLeft * this.maxHeight / (this.$refs.heightScroller.offsetWidth - this.$refs.heightBar.offsetWidth);
            if (tmp < 0)
                return;
            else if (tmp > this.maxWeight)
                return;
            this.heightVal = tmp.toFixed(1);
        },
        sureCall() {
            // console.info('weightVal:'+this.weightVal + ',heightVal:'+this.heightVal);
            eventBus.$emit('sureHw', { newW: this.weightVal + '', newH: this.heightVal + '' });
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.main {
    background: -webkit-linear-gradient(left, #14ccc8, #39ddb0);
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 0;
}

dl {
    display: -webkit-box;
}

dd {
    position: relative;
    display: block;
    width: 2px;
    background-color: #fff;
    margin-right: 10px;
}

dd.short {
    height: px2rem(35px);
    margin-top: px2rem(25px);
}

dd.long {
    height: px2rem(60px);

    span {
        position: absolute;
        font-size: px2rem(26px);
        color: #fff;
        bottom: px2rem(-82px);
        margin-left: px2rem(-10px);
    }
}

.tan-top {
    width: 0;
    height: 0;
    border-width: 0 px2rem(15px) px2rem(25px);
    border-style: solid;
    border-color: transparent transparent #fff;
    /*透明 透明  灰*/
    margin: px2rem(5px) auto;
    position: relative;
}

.tan-bot {
    width: 0;
    height: 0;
    border-width: px2rem(25px) px2rem(15px) 0;
    border-style: solid;
    border-color: #fff transparent transparent;
    /*灰 透明 透明 */
    margin: px2rem(40px) auto px2rem(25px) auto;
    position: relative;
}

.ab-cen {
    position: fixed;
    color: #fff;
    left: px2rem(375px);
    font-size: px2rem(30px);
    -webkit-transform: translate(-50%, 0);
    z-index: -1;

    .tz {
        margin-bottom: px2rem(30px);
    }
    .tz-num {
        margin: px2rem(20px) 0;
        .num {
            font-size: px2rem(72px)
        }
    }
}

.weight-bar,
.height-bar {
    position: absolute;
    width: 100%;
    overflow-x: scroll;
}

.weight-bar {
    top: px2rem(230px);
    padding: px2rem(200px) 0;
    .ab-cen {
        /*相对于main定位，不会跟着滑动*/
        top: px2rem(200px);
    }
}

.height-bar {
    top: px2rem(680px);
    padding: px2rem(200px) 0;
    .ab-cen {
        top: px2rem(650px)
    }
}

.v-line {
    margin: 0 auto;
    height: px2rem(60px);
    width: px2rem(5px);
    background-color: #fff;
}
</style>