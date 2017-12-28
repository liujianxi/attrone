<template>
    <div id="order">
        <div id="orderHead">
            <s-header type="0" title="结算详情" :hasBack='true'> </s-header>

        </div>
        <div class="main" v-if="true">
            <div class="he">
                <div class="pak-name">{{orderdata.service}}</div>
                <div class="nopay">
                    <div class="red">{{orderdata.statusStr}}</div>
                </div>
            </div>
            <div class="ban">
                <div class="ban-txt">
                    <p>订单号：{{orderId}}</p>
                    <p>下单时间：{{orderdata.createTime}}</p>
                </div>
                <i></i>
            </div>

            <div class="pay-detail">
                <div>消费明细</div>
                <div @click="serviceShow=!serviceShow" class="service-detail">
                    <span>服务费用</span>
                    <span class="rig orange"> {{payDetail.serviceTotalFee}}元
                        <i :class="[serviceShow ? 'up': '']"></i>
                    </span>
                </div>
                <div class="service-list" v-if="serviceShow">
                    <div>
                        <span>服务</span>
                        <span>服务次/天数</span>
                        <span>单价</span>
                        <span>合计</span>
                    </div>
                    <div v-for='(item,index) in serviceList' :key="index">
                        <span>{{item.service}}</span>
                        <span>+{{item.serviceDays}}</span>
                        <span>{{item.PriceDesc}}</span>
                        <span>{{item.totalCostStr}}元</span>
                    </div>
                </div>
                <div @click="extraServiceShow=!extraServiceShow" class="service-detail extra-detail" v-if="extraList.length">
                    <span>附加费用</span>
                    <span class="rig orange"> {{payDetail.extraTotalFee}}元
                        <i :class="[extraServiceShow ? 'up': '']"></i>
                    </span>
                </div>
                <div class="service-list extra-list" v-if="extraServiceShow&&extraList.length">
                    <div>
                        <span>服务</span>
                        <span>服务次/天数</span>
                        <span>已付金额</span>
                        <span>未付金额</span>
                    </div>
                    <div v-for='(item,index) in extraList' :key="index">
                        <span>{{item.service}}</span>
                        <span>+{{item.serviceDays}}</span>
                        <span>{{item.PriceDesc}}</span>
                        <span>{{item.totalCostStr}}元</span>
                    </div>
                </div>
                <div class="service-num num">
                    <span>消费总金额</span>
                    <span class="rig"> {{payDetail.totalFee}}元</span>
                </div>
                <div class="num">
                    <span>已支付金额</span>
                    <span class="rig"> - {{payDetail.realPay}}元</span>
                </div>
                <div class="num">
                    <span>预付款抵扣</span>
                    <span class="rig"> - {{payDetail.preRealFee==undefined?'0.00':payDetail.preRealFee}}元</span>
                </div>
                <div class="num">
                    <span>优惠金额</span>
                    <span class="rig"> - {{payDetail.hgRebateFee==undefined?'0.00':payDetail.hgRebateFee}}元</span>
                </div>
                <div>
                    <div v-if="payDetail.returnPay==undefined">
                        <span>应付金额：</span>
                        <span>{{payDetail.needPay}}</span>
                        <span>元</span>
                    </div>
                    <div v-else>
                        <span>应退金额：</span>
                        <span>{{payDetail.returnPay}}</span>
                        <span>元</span>
                    </div>
                </div>
            </div>

            <div class="pay-ways" v-if="payDetail.returnPay==undefined">
                <div class="pay-tit">支付方式</div>
                <div :class="['qb','pay-it',payDetail.usePurse?'':'unpaid']" @click="payDetail.usePurse?initPay('qb'):''">
                    <i class="qb-i"></i>
                    <span>钱包支付</span>
                    <div class="yu-e" v-if='payDetail.usePurse'>余额{{payDetail.purse}}元</div>
                    <div class="yu-e" v-else>钱包余额不足</div>
                    <i :class="[moneyselect=='qb'?'select':'','gou']"></i>
                </div>
                <div class="wx pay-it" @click="initPay('wx')">
                    <i class="wx-i"></i>
                    <span>微信支付</span>
                    <i :class="[moneyselect=='wx'?'select':'','gou']"></i>
                </div>
            </div>
            <div class="he danger-text" v-if="dangerText!=''&&orderdata.status==0">
                <p>{{dangerText}}</p>
            </div>
        </div>
        <div class="order-pay" @click="goPay()" v-if="payDetail.returnPay==undefined">
            <span>支付</span>
        </div>
        <div class="order-pay" @click="returnMoney()" v-if="payDetail.returnPay!=undefined">
            <span>完成</span>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import OrderBody from './OrderBody.vue'
import { Toast,} from 'mint-ui'
import http from '../service/api.js'
import { DOPAY_URL } from '../service/api.js'
import eventBus from '../service/eventbus.js'
export default {
    components: { SHeader, OrderBody },
    data() {
        return {
            usePurse: '',//可以使用钱包
            orderId: '',
            orderdata: '',
            moneyselect: 'qb',
            serviceData: "",
            confirmCost: '',
            purse: '',
            op: '',
            months: '',//服务的月份
            serviceShow: true,
            payDetail: '',
            extraServiceShow: true,
            serviceList: '',//服务费用列表
            extraList: '',//附加费用列表
            dangerText: '',
        }
    },
    created() {
        //      dplus.track(["_trackEvent", '订单结算页面', "浏览", "", 0, ""]);
    },
    activated() {
        this.orderId = this.$route.query.orderid;
        this.op = this.$route.query.op;
        this.months = this.$route.query.months;
        this.initcheckDetail();
    },
    deactivated() {
        clearInterval(this.timer);
    },
    methods: {
        goPay() {
            let self = this;
            let payType = '';
            dplus.track(["_trackEvent", '订单结算-支付按钮', "点击", "", 0, ""]);
            if (self.moneyselect == 'wx') {
                payType = 2;
                let cburl = "https://" + window.location.host + "/mobile/index.html#/handleresult?money=" + self.payDetail.needPay + "&orderId=" + this.orderId + "&typeStr=serving";
                console.log(cburl);
                cburl = encodeURIComponent(cburl);
                console.log(this.op);
                let url = DOPAY_URL + "?payType=" + payType + "&operation=" + this.op + "&orderId=" + this.orderId + "&cburl=" + cburl + "&months=" + self.months;
                window.location.href = url;
            } else {
                payType = 6;
                http.post('/json/DoPay', {
                    operation: self.op,
                    payType: payType,
                    orderId: self.orderId,
                    months: self.months,
                }).then((res) => {
                    // Toast({ message: '支付成功', duration: 1000 });
                    self.$router.push({ path: '/handleresult', query: { money: self.payDetail.needPay, orderid: self.orderId, success: 1, wallet: 'check', typeStr: 'serving' } });
                })
            }

        },
        initcheckDetail() {                         //支付预交金
            var self = this;
            http.post('/json/SettlPayDetail', {
                orderId: self.orderId,
                settIds: self.months,
            })
                .then((dt) => {
                    self.dangerText = dt.body.payHint || '';
                    self.orderdata = dt.body.order[0];
                    self.payDetail = dt.body;
                    if (!self.payDetail.usePurse) {//不能使用钱包支付时
                        self.moneyselect = 'wx';
                    }
                    self.serviceList = dt.body.serviceList;
                    self.extraList = dt.body.extraList;
                })
        },
        initPay(str) {
            this.moneyselect = str;//选择支付方式
        },
        returnMoney() {//确认退款成功
            let self = this;
            http.post('/json/ConfirmOrderFinish', {
                orderId: self.orderId,
            }).then((res) => {
                Toast({ message: '退款成功', duration: 1000 });
                self.$router.go(-1);
            })
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/order-common.scss";
@import '../assets/css/little.scss';
@import "../assets/css/payways.scss";
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

.main {
    text-align: left;
    font-size: px2rem(32px);
}

.he {
    background-color: #fff;
    height: px2rem(90px);
    display: -webkit-box;
    -webkit-box-align: center;
    padding: 0 px2rem(30px);

    .pak-name {
        -webkit-box-flex: 1;
        line-height: px2rem(90px);
    }
    .nopay {
        font-size: px2rem(24px);
        text-align: right;

        >p:first-child {
            color: #ff5454;
            margin-bottom: px2rem(10px);
        }
        >p:last-child {
            color: #333;
        }
    }
}

.ban {
    margin-top: px2rem(20px);

    background: -webkit-linear-gradient(left, #14ccc8, #39ddb0);
    min-height: px2rem(150px);
    display: -webkit-box;
    padding: 0 px2rem(60px) 0 px2rem(30px);
    -webkit-box-align: center;

    .ban-txt {
        -webkit-box-flex: 1;
        color: #fff;

        >p:first-child {
            font-size: px2rem(30px);
            margin-bottom: px2rem(10px);
        }
        >p:last-child {
            font-size: px2rem(24px);
        }
    }
    i {
        display: block;
        width: px2rem(185px);
        height: px2rem(127px);
        margin-top: px2rem(15px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/banner.png') no-repeat;
        background-size: 100%;
    }
}

.tit {
    color: #999;
}

.txt {
    color: #333;
}

.sro {
    // min-height: px2rem(180px);
    display: -webkit-box;
    padding: px2rem(40px) px2rem(30px); // -webkit-box-align:center;
    background-color: #fff;

    i {
        margin-right: px2rem(15px);
    }
    .sro-txt {
        -webkit-box-flex: 1;

        .tit {
            margin-bottom: px2rem(18px);
        }
        .txt {
            line-height: px2rem(40px)
        }
    }
}

.fro,
.tro,
.forro {
    height: px2rem(90px);
    line-height: px2rem(90px);
    background-color: #fff;
    padding: 0 px2rem(30px);
    overflow: hidden;
}

.fro {
    border-bottom: 1px solid #e5e5e5;
}

.tro {
    border-top: 1px solid #e5e5e5;
}

.forro {
    border-top: 1px solid #e5e5e5;
}

.lef {
    float: left;
}

.rig {
    float: right;
}

.contact-i,
.phone-i,
.pos-i,
.clock-i,
.be-ser-i,
.ser-i {
    display: inline-block;
    width: px2rem(32px);
    height: px2rem(32px);
    vertical-align: middle;
}

.contact-i {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/order_contact.png') no-repeat;
    background-size: 100% auto;
    margin-right: px2rem(6px);
}

.phone-i {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/order_phone.png') no-repeat;
    background-size: 100% auto;
    margin-right: px2rem(6px);
}

.pos-i {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/order_adress.png') no-repeat;
    background-size: 100% auto;
}

.clock-i {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/order_time.png') no-repeat;
    background-size: 100% auto;
    margin-right: px2rem(6px);
}

.be-ser-i {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/order_service-object.png') no-repeat;
    background-size: 100% auto;
    margin-right: px2rem(6px);
}

.ser-i {
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/order_service-people.png') no-repeat;
    background-size: 100% auto;
    margin-right: px2rem(6px);
}

.pay-detail {
    background-color: #F1F2F6;
    margin-top: px2rem(20px);
    .service-list {
        background: #fff;
        color: #999;
        font-size: px2rem(26px);
        border-bottom: 0;
        padding-left: px2rem(140px);
        >div {
            height: px2rem(50px);
            display: flex;
            display: -webkit-flex;
            padding: px2rem(10px) 0;
            position: relative;
            border-bottom: 1px solid #e5e5e5;
        }
        span {
            display: inline-block;
        }
        span:nth-child(1) {
            // word-break: normal;
            line-height: 1;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: px2rem(150px);
        }
        span:nth-child(2) {
            margin-left: px2rem(140px);
        }
        span:nth-child(2),
        span:nth-child(3) {
            line-height: px2rem(50px);
            text-align: center;
            flex: 1;
            -webkit-flex: 1; // margin-right: px2rem(32px);
        }
        span:nth-child(4) {
            line-height: px2rem(50px);
            text-align: center;
            flex: 1;
            -webkit-flex: 1;
        }
    }
    .extra-list {
        >div:nth-last-child(1) {
            border-bottom: 0;
        }
    }
    .service-num {
        // border-top: 1px solid #e5e5e5;
        margin-top: px2rem(30px);
    }
    i {
        display: inline-block;
        width: px2rem(28px);
        height: px2rem(16px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/bottommore.png') no-repeat;
        background-size: 100% auto;
        -webkit-transform: rotate(0deg);
        transition: all 0.1s linear;
    }
    i.up {
        -webkit-transform: rotate(180deg);
    }
    >div {
        color: #999;
        background: #fff;
        line-height: px2rem(90px);
        padding: 0 px2rem(30px);
        border-bottom: 1px solid #e5e5e5;
    }
    >div:nth-child(1),
    >div:nth-last-child(3) {
        color: #333;
    }
    >div:last-child {
        text-align: right;
        color: red;
    }
    .num {
        color: #333;
    }
}

.pay-ways {
    margin-top: px2rem(20px);

    .pay-tit {
        height: px2rem(90px);
        line-height: px2rem(90px);
        background-color: #fff;
        padding: 0 px2rem(30px);
        border-bottom: 1px solid #e5e5e5;
    }
}

.danger-text {
    font-size: pxrem(14px);
    color: #FF3366;
    p {
        width: 100%;
        text-align: left;
    }
}

.butie-block {
    background-color: #fff;
    margin-top: px2rem(20px);

    >div {
        height: px2rem(90px);
        line-height: px2rem(90px);
        padding: 0 px2rem(30px);
        overflow: hidden;
    }
    .see-bt-detail {
        color: #2bd6bd;
    }
}

.butie-list-block {
    padding: px2rem(36px) 0;
    dl {
        margin: 0 px2rem(18px);
    }
    dd {
        position: relative;
        margin-bottom: px2rem(35px);
        background-color: #fff;
        padding: px2rem(50px) px2rem(30px);
        display: -webkit-box;
        font-size: px2rem(26px);
        box-shadow: px2rem(0px) px2rem(3px) px2rem(10px) px2rem(2px) #ccc;
        >div {
            overflow: hidden;
            position: relative;
        }
        >div>div:first-child {
            float: left;
            height: 100%;
        }
        >div>div:first-child i {
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        >div>div:last-child {
            margin-left: px2rem(50px);
            -webkit-box-flex: 1;

            p {
                margin-bottom: px2rem(20px);
            }
            p:last-child {
                margin-bottom: 0;
            }
        }
        >p {
            position: absolute;
            right: px2rem(30px);
            bottom: px2rem(50px);
        }
        .look-detail {
            color: #2bd6bd;
        }
    }
}
</style>