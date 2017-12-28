<template>
    <div id="recharge">
        <s-header type="0" title="钱包充值"></s-header>
        <div class="main">
            <div class="rc-tit">充值金额</div>
            <div class="dl-div">
                <dl>
                    <dd v-for="(item,index) in moneyList" @click="payChose(index)" :class="moneyselect==index?'select':''">
                        <span>{{item.feeStr}} 元</span>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="pay-way">
            <div class="blank"></div>
            <div class="pw-tit">支付方式</div>
            <div class="wx" @click="payWay('wx')">
                <i class="wx-i"></i>
                <span>微信支付</span>
                <i :class="['gou',payway=='wx'?'select':'']"></i>
            </div>
        </div>
        <button class="btn_fix_bot" @click="goResult()">确定</button>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import eventBus from '../service/eventbus.js'
import http from '../service/api.js'
import { DOPAY_URL } from '../service/api.js'
export default {
    components: { SHeader },
    data() {
        return {
            moneyselect: 0,
            payway: 'wx',
            moneyList: '',
            rechargeId: 1,
            money: '',
        }
    },
    created() {
//      dplus.track(["_trackEvent", '充值页面', "浏览", "", 0, ""]);
    },
    activated() {
        this.moneyselect = 0,//初始化
            this.initMoneyList();//充值列表
    },
    methods: {
        goResult() {
            var op = 'PAY_RECHARGE';
            var payType = 2;
            console.log(window.location.host);
            var cburl = "https://" + window.location.host + "/mobile/index.html#/rechargesucc?money=" + this.money;
            console.log(cburl);
            cburl = encodeURIComponent(cburl);
            console.log(cburl);
            console.log(DOPAY_URL);
            var url = DOPAY_URL + "?payType=2&operation=" + op + "&rechargeId=" + this.rechargeId + "&cburl=" + cburl;
            console.log(url);
            window.location.href = url;
        },
        payChose(index) {
            this.moneyselect = index;
            this.rechargeId = this.moneyList[index].id;
            this.money = this.moneyList[index].feeStr;
        },
        payWay(str) {
            this.payway = str;
        },
        initMoneyList() {
            //json/GetRechargeSetting
            var self = this;
            http.post('/json/GetRechargeSetting').then(function (res) {
                if (res.errorCode == 0) {
                    self.moneyList = res.body.rechargeSettingList;
                    console.log(self.moneyList);
                    if (!self.money) {
                        self.money = self.moneyList[0].feeStr;
                    }
                }
            });
        }
    }

}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';

.main {
    text-align: left;
    padding-bottom: px2rem(410px);
}

.rc-tit {
    height: px2rem(100px);
    line-height: px2rem(100px);
    padding: 0 px2rem(30px);
    font-size: px2rem(32px);
    color: #666;
    background-color: #fff;
}

.dl-div {
    background-color: #fff;
    padding-bottom: px2rem(50px);
}

dl {
    width: px2rem(500px);
    margin: 0 auto;

    dd {
        text-align: center;
        height: px2rem(100px);
        line-height: px2rem(100px);
        border: px2rem(2px) solid #ccc;
        border-radius: px2rem(3px);
        font-size: px2rem(42px);
        color: #999;
        margin-bottom: px2rem(30px);
    }
    dd.select {
        border: px2rem(2px) solid #2bd6bd;
        border-radius: px2rem(2px);
        color: #2bd6bd;
    }
}

.blank {
    height: px2rem(20px);
    background-color: #F1F2F6;
}

.zf-tit {
    height: px2rem(72px);
    line-height: px2rem(72px);
    padding: 0 px2rem(30px);
    font-size: px2rem(30px);
    color: #666;
    margin-top: px2rem(20px);
}

.pay-way {
    font-size: px2rem(32px);
    text-align: left;
    background-color: #fff;
    position: fixed;
    bottom: px2rem(100px);
    width: 100%;

    .pw-tit,
    .wx,
    .ali {
        height: px2rem(90px);
        line-height: px2rem(90px);
        color: #666;
        padding: 0 px2rem(30px);
        border-bottom: 1px solid #ccc;
    }

    .wx {
        color: #333;
        border: none;
        .wx-i {
            display: inline-block;
            width: px2rem(41px);
            height: px2rem(41px);
            background: url('https://s.1-1dr.com/static/mobile/img/wechat/weixin.png') no-repeat center center;
            background-size: 100% auto;
            vertical-align: middle;
        }
    }
    .ali {
        color: #333;
        .ali-i {
            display: inline-block;
            width: px2rem(41px);
            height: px2rem(41px);
            background: url('https://s.1-1dr.com/static/mobile/img/wechat/zhifubao.png') no-repeat center center;
            background-size: 100% auto;
            vertical-align: middle;
        }
    }
}
</style>