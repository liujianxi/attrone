<template>
    <div id="message">
        <s-header type="0" :title="title"></s-header>

        <dd class="div-item">
            <dl class="word-w" v-for="(item,index) in listdetail" @click='longdetail(item.url)' :key=index>
                <p class="time">{{item.createTime}}</p>
                <p class="content" v-html="item.content"></p>
            </dl>
        </dd>

    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js'

export default {
    components: { SHeader },
    data() {
        return {
            listdetail: [],
            msgType: '',
            title: '',
        }
    },
    created() {
        //      dplus.track(["_trackEvent", '消息通知详情页面', "浏览", "", 0, ""]);
    },
    activated() {
        this.msgType = this.$route.query.msgType;
        this.title = this.$route.query.title;
        this.initmessList().then((res) => {
            setTimeout((res) => {
                let pNode = document.querySelectorAll('p.content span');
                for (let i = 0; i < pNode.length; i++) {
                    (function(index) {
                        pNode[i].onclick = function(e) {
                            e.stopPropagation();
                        }
                    })(i);
                }
            }, 500);
        })
    },
    methods: {
        initmessList() {
            return new Promise((resolve, reject) => {
                var self = this;
                http.post('/json/GetUserMsgByType', {
                    msgType: self.msgType,
                    pageNo: 1,
                    pageSize: 30
                }).then(function(res) {
                    self.listdetail = res.body.msgList;
                });
                resolve();
            })
        },
        longdetail(str) {
            if (str) {
                window.location.href = str;
            }
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
.div-item {
    width: 100%;
    /*display:-webkit-box;*/
    -webkit-box-align: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    padding: px2rem(20px) 0;

    .msg-c {
        display: inline-block;
        width: px2rem(90px);
        height: px2rem(90px);
        margin: 0 px2rem(28px) 0 px2rem(30px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/messege.png') no-repeat;
        background-size: 100% auto;
    }
    .word-w {
        /*-webkit-box-flex: 1;*/
        padding: px2rem(20px) px2rem(30px);
        /*margin-bottom:px2rem(20px);*/
        color: #666;
        border-bottom: 1px solid #ccc;
        text-align: left;
        p.content {
            color: #999;
            font-size: px2rem(32px);
            line-height: 1.4;
        }
        p.time {
            color: #999;
            font-size: px2rem(32px);
        }
    }
    .word-w:nth-last-child(1) {
        border: 0;
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