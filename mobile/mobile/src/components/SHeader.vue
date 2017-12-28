<template>
    <div id="header-w" v-if="headerShow">
        <div id="header" :style="bgStyle">
            <div class="back" :style="backStyle" v-if="type!=3 && type!=5&&type!=101&&type!=102" @click="backCall()">
                <i></i>
            </div>
            <div class="back" :style="backStyle" v-if="type==101" @click="indexBackCall()">
                <i></i>
            </div>
            <div class="back" :style="backStyle" v-if="type==102" @click="indexBackCall()">
                <i></i>
            </div>
            <div class="back" :style="backStyle" v-if="type==5" v-on:click="backCallFather">
                <i></i>
            </div>
            <div class="title">{{title}}</div>
            <div class="right" v-if="type==0 || type==5">
                <i class="novisible"></i>
            </div>
            <div class="right" v-if="type==101" @click="rightCall()">
                <i class="ser-icon"></i>
            </div>
            <div class="right" v-if="type==2" @click="rightCall()">
                <span class="sure">确定</span>
            </div>
            <div class="right" v-if="type==4" @click="rightCall()">
                <i class="setting-icon"></i>
            </div>
            <div class="right" v-if="type==6" @click="rightCall()">
                <i class="share-icon"></i>
            </div>
            <div class="right-ques" v-if="type==7" @click="rightCall()">
                常见问题
            </div>
        </div>
        <div class="tianchong" v-if="hasTc" :style="tcStyle"></div>
    </div>
</template>
<script>
import { isApp } from '../util/common.js';
export default {
    props: {
        type: {                  //type 0:默认的只含有标题和返回键； type 1：右侧多一个search icon；type 2：右侧是确定按钮 3没有返回按钮 4设置icon 6是分享按钮
            type: String,
            default: '0'
        },
        title: {
            type: String,
            default: ''
        },
        transparent: {
            type: Boolean,
            default: false
        },
        hasTc: {                //是否需要header填充，以撑开header的高度
            type: Boolean,
            default: true
        },
        hasBack: {              //是否需要返回键
            type: Boolean,
            default: true
        },
        alignBottom: {          //在底部显示
            type: Boolean,
            default: false
        }
    },
    computed: {
        backStyle: function() {
            return {
                visibility: this.hasBack ? 'visible' : 'hidden'
            }
        },
        bgStyle: function() {
            return {
                backgroundColor: this.transparent ? 'rgba(0,0,0,0)' : '#f7f7f7',
                top: this.alignBottom ? 'auto' : 0,
                bottom: this.alignBottom ? 0 : 'auto'
            }
        },
        tcStyle: function() {
            return {
                display: this.transparent ? 'none' : 'block'
            }
        }
    },
    data() {
        return {
            headerShow: true
        }
    },
    methods: {
        backCallFather() {
            this.$emit('backCallFather');
        },
        backCall() {
            this.$router.go(-1);
        },
        rightCall() {
            this.$emit('rightCall');
        },
        indexBackCall(){
            this.$router.push({ path: '/index'});
        }
    },
    created() {
        this.headerShow = isApp(window) ? false : true;
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#header-w {
    width: 100%;
}

.right-ques {
    font-size: pxrem(16px);
    color: #2BD6BD;
    margin-right: pxrem(18px);
}

#header {
    display: -webkit-box;
    z-index: 2;
    width: 100%;
    height: px2rem(80px);
    line-height: px2rem(80px);
    position: fixed;
    top: 0;
    background-color: #fff;
    -webkit-transition: all 0.2s linear 0s;
}

.tianchong {
    height: px2rem(80px);
}

.back,
.right {
    width: px2rem(80px);
    height: 100%;
}

.title {
    text-align: center;
    -webkit-box-flex: 1;
    height: 100%;
    font-size: px2rem(32px);
    color: #333;
}

.back {
    text-align: left;
    padding-left: px2rem(25px);
}

.back i {
    display: inline-block;
    width: px2rem(16px);
    height: px2rem(28px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/back.png') no-repeat;
    background-size: 100% auto;
    margin-top: px2rem(25px);
}

.right {
    text-align: right;
    padding-right: px2rem(25px);
}

.ser-icon {
    display: inline-block;
    width: px2rem(29px);
    height: px2rem(29px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/search.png') no-repeat;
    background-size: 100% auto;
    margin-top: px2rem(25px);
}

.novisible {
    display: inline-block;
    width: px2rem(16px);
    height: px2rem(28px);
}

.sure {
    font-size: px2rem(32px)
}

.setting-icon {
    display: inline-block;
    width: px2rem(36px);
    height: px2rem(36px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/setting.png') no-repeat;
    background-size: 100% auto;
    margin-top: px2rem(22px);
}

.share-icon {
    display: inline-block;
    width: px2rem(36px);
    height: px2rem(36px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/share.png') no-repeat;
    background-size: 100% auto;
    margin-top: px2rem(22px);
}
</style>