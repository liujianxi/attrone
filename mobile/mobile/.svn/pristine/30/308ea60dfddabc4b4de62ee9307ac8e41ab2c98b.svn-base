<template>
    <div id="my-l-p">
        <div id="orderHead">
            <s-header type="0" title="我的长护险申请" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()" v-if="preway!='wechat'||payensureWay">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main">
            <dl>
                <dd v-for="(order,index) in orderVOList" :key="order" @click="goOrderDetail(order)">
                    <div>
                        <div class="ribbon">
                            <i></i>
                            <div>申请编号：{{order.insureNO}}</div>
                        </div>
                        <div class="ro1">被服务人：{{order.kinsName}}</div>
                        <div class="ro2">申请时间：{{order.createTime}}</div>
                    </div>
                    <div class='ro3'>
                        <span :class="order.status=='50'||order.status=='51'||order.status=='52'?'red':'green'">申请进度：{{order.statusDesc}}</span>
                    </div>
                </dd>
            </dl>
            <div v-if="orderVOList.length==0" class="bg-girl">
                <i></i>
                <p>暂无长护险申请</p>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue';
import http from '../service/api.js'
import { isEmpty } from '../util/common.js'
export default {
    components: { SHeader },
    data() {
        return {
            tabType: 0, //查看订单类型：0-全部；1-进行中；2-已完全
            pageSize: 10, //每页展示条目数
            pageNum: 1, //页码
            voList1: [],
            voList2: [],
            orderVOList: [],
            preway: '',//上一级路径
            payensureWay: '',//从支付保证金跳回来时
        }
    },
    activated() {
        let loc = window.location.href;
        if (loc.indexOf("?") != -1 && loc.indexOf('preway') == -1) {
            this.payensureWay = loc.split('?')[1];
        }
        console.log(loc);
        this.preway = this.$route.query.preway;
        this.load();
    },
    methods: {
        orderGoback() {
            this.$router.push({ path: '/index' });
        },
        goOrderDetail(order) {
            console.log(order);
            this.$router.push({ path: '/lpdetail', query: order });
        },
        load() {
            var self = this;

            var params = {
                tabType: self.tabType,
                pageSize: self.pageSize,
                pageNum: self.pageNum
            }

            http.post('/json/GetInsureList', params).then(function(res) {
                if (isEmpty(res.body)) {
                    self.orderVOList = [];
                } else {
                    self.orderVOList = res.body.insureList;
                }

            });
        }
    }
}
</script>
<style scoped lang="scss">
@import '../assets/css/little.scss';
@function px2rem($px) {
    $rem: 75px;
    @return ($px/$rem)+rem;
}

.main {
    padding-bottom: px2rem(20px);
}

.ribbon {
    float: right;
    font-size: px2rem(24px);
    color: #fff;
    background-color: #f6b63a;
    margin-top: px2rem(20px);
    position: relative;

    i {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-top: px2rem(18px) solid transparent;
        border-bottom: px2rem(18px) solid transparent;
        border-left: px2rem(10px) solid #fff;
    }
    >div {
        padding: 0 px2rem(10px) 0 px2rem(25px);
        height: px2rem(36px);
        line-height: px2rem(36px);
    }
}

dd {
    background-color: #fff;
    font-size: px2rem(32px);
    color: #999;
    margin-top: px2rem(20px);

    .ro1,
    .ro2 {
        text-align: left;
    }
    .ro1 {
        padding: px2rem(74px) 0 0 px2rem(40px);
    }
    .ro2 {
        padding: px2rem(26px) 0 px2rem(30px) px2rem(40px);
    }

    .ro3 {
        height: px2rem(66px);
        line-height: px2rem(66px);
        border-top: 1px solid #ebebeb;
        .green {
            color: #2bd6bd;
        }
        .red {
            color: #e05543;
        }
    }
}

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
#orderHead {
    position: relative;
}

.orderBack {
    width: px2rem(80px);
    height: px2rem(80px);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}

.l-more-black {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>