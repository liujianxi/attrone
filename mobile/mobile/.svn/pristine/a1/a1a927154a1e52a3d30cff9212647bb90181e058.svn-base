<template>
    <div id="message">
        <s-header :type="preway=='wechat'?'3':'0'" title="消息通知"></s-header>
        <mt-cell v-for="item in msgList" :key="item" v-if="msgList.length">
            <div class="div-item" @click="goMsgDetail(item)">
                <i :class="['msg-c',item.msgTypeClass]"></i>
                <div class="word-w">
                    <p class="title">{{item.title}}</p>
                    <p class="content" v-html='item.content'></p>
                    <p class="time">{{item.createTime}}</p>
                </div>
            </div>
        </mt-cell>
        <div class="bg-girl" v-if="!msgList.length">
            <i></i>
            <p>暂无消息</p>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast, MessageBox, CellSwipe } from 'mint-ui';
import http from '../service/api.js'

export default {
    components: { SHeader },
    data() {
        return {
            preway: '',
            msgList: []    //消息列表
        }
    },
    created() {
        //      dplus.track(["_trackEvent", '消息通知页面', "浏览", "", 0, ""]);
    },
    activated() {
        var self = this;
        this.preway = this.$route.query.preway;
        this.initMsgList().then((res) => {
            setTimeout((res) => {
                let pNode = document.querySelectorAll('p.content span');
                for (let i = 0; i < pNode.length; i++) {
                    (function(index) {
                        pNode[i].onclick = function(e) {
                            e.stopPropagation();
                        }
                    })(i)
                }
            }, 500);
        })
    },
    methods: {
        initMsgList() {
            return new Promise((resolve, reject) => {
                let self = this;
                http.post('/json/GetMsgList').then(function(res) {
                    self.msgList = res.body.msgList;

                    //(1-50) 缴费
                    //(51-100)提现
                    //(101-200)服务
                    //(201-300)长护险
                    for (let i = 0; i < self.msgList.length; i++) {
                        let msg = self.msgList[i];
                        if (msg.msgType >= 1 && msg.msgType <= 50) {
                            msg['msgTypeClass'] = 'jiaofei';
                        } else if (msg.msgType >= 51 && msg.msgType <= 100) {
                            msg['msgTypeClass'] = 'tixian';
                        } else if (msg.msgType >= 101 && msg.msgType <= 200) {
                            msg['msgTypeClass'] = 'fuwu';
                        } else {
                            msg['msgTypeClass'] = 'changhuxian';
                        }
                    }
                    resolve();
                });
            })

        },
        goMsgDetail(item) {
            this.$router.push({ path: '/messagedetail', query: { msgType: item.msgType, title: item.title } });
            event.stopPropagation();
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
.bg-girl {
    padding-top: px2rem(100px);
    text-align: center;
    i {
        display: inline-block;
        width: px2rem(322px);
        height: px2rem(322px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/family.png') no-repeat;
        background-size: 100% auto;
    }
    p {
        font-family: 'SimHei';
        font-size: px2rem(32px);
        margin-top: px2rem(42px);
        color: #ccc;
    }
}
.div-item {
    width: 100%;
    display: -webkit-box;
    /*-webkit-box-align: center;*/
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    padding: px2rem(20px) 0;
    position: relative;
    .msg-c {
        display: block;
        width: px2rem(90px);
        height: px2rem(90px);
        margin: 0 px2rem(28px) 0 px2rem(30px);
        /*position:absolute;
            top:px2rem(20px);
            left:0;*/
    }

    .msg-c.jiaofei {
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/jiaofei.png') no-repeat;
        background-size: 100% auto;
    }

    .msg-c.tixian {
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/tixian.png') no-repeat;
        background-size: 100% auto;
    }

    .msg-c.fuwu {
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/fuwu.png') no-repeat;
        background-size: 100% auto;
    }

    .msg-c.changhuxian {
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/changhuxian.png') no-repeat;
        background-size: 100% auto;
    }


    .word-w {
        -webkit-box-flex: 1;
        padding-right: px2rem(30px);
        color: #666;
        p.title {
            text-align: left;
            font-size: px2rem(30px);
            color: #333;
        }
        p.content {
            text-align: left;
            color: #999;
            font-size: px2rem(28px);
            line-height: 1.4;
        }
        p.time {
            color: #999;
            font-size: px2rem(32px);
        }

        p:first-child {
            font-size: px2rem(30px);
            margin-bottom: px2rem(18px);
            text-align: left;
        }
        p:last-child {
            margin-top: px2rem(10px);
            font-size: px2rem(32px);
            line-height: px2rem(36px);
            text-align: left;
        }
    }
    .del-btn {
        height: 100%;
        width: px2rem(142px);
        background-color: #ff8383;
        line-height: 100%;

        i {
            display: inline-block;
            width: px2rem(55px);
            height: px2rem(57px);
            background: url('https://s.1-1dr.com/static/mobile/img/wechat/deleteicon.png') no-repeat;
            background-size: 100%;
        }
    }
}
</style>