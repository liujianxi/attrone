<template>
    <div id="recharge-succ">
        <s-header type="0" title="钱包充值" :hasBack='false'></s-header>
        <div class="main">
            <div v-if="rechargeType==1&&type!=0">
                <i class="coin"></i>
                <p class="f0">充值成功</p>
                <p class="f1">本次充值金额</p>
                <p class="f2">{{czmoney}}元</p>
                <p class="f1">钱包余额{{totalAccount}}元</p>
            </div>
            <div v-if="rechargeType==2&&type!=0">
                <p class="r-fail-w f0">充值失败</p>
                <i class="fail-i"></i>
            </div>
            <div v-if="type==0">
                <i class="gou"></i>
                <p class="f0">申请成功</p>
                <p class="f1">本地提现金额</p>
                <p class="f2">{{txmoney}}元</p>
                <p class="f3">七个工作日内金额退还至支付账户</p>
                <p class="f1">钱包余额{{totalAccount}}元</p>
            </div>
        </div>
        <button class="btn_fix_bot" v-if="type==0||rechargeType==1" @click='goBack()'>确定</button>
        <button class="btn_fix_bot" v-if="rechargeType==2" @click='goBack()'>重试</button>
        <!--<button class="btn_fix_bot" v-if="type==2" @click='goBack()'>确定</button>-->
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'

export default {
    components: { SHeader },
    data() {
        return {
            type: '',            //区分type 0充值成功 1充值失败 2申请退款成功
            totalAccount: '',
            txmoney: '',
            rechargeType: '',
            czmoney: '',//充值
        }
    },
    activated() {
        var self = this;//http://dev.1-1dr.com/#/rechargesucc?num=1&success=0
        this.type=-1;
        let theUrl = decodeURIComponent(window.location.href);
		let obj = this.GetRequest(theUrl);
        this.czmoney = obj.money;
        console.log('cz:   ' + this.czmoney);
        this.rechargeType = obj.success;//充值部分 2-失败
        console.log('rechargeType:   ' + this.rechargeType);
        if (this.$route.query.preway == 'tixian') {
            this.type = this.$route.query.success;//提现部分
            this.txmoney = this.$route.query.money;//提现部分
        }
        http.post('/json/GetUserAccount').then(function(res) {
            self.totalAccount = res.body.totalAccount;
        });
    },
    created() {
        // 		var self=this;
        // 		eventBus.$on('txMoney', function(data) {
        // 			self.money=parseFloat(data.txMoney);
        // 			console.log(data.txMoney);
        //		}.bind(this));
    },
    methods: {
        goBack() {
            this.$router.go(-3);
        },
        GetRequest(str) {
			let strs;
			// let str = 'https:www.1-1dr.com/mmseaeesee?insureNO=201705151123022913802&edit=true';
			let theRequest = new Object();
			if (str.indexOf("?") != -1) {
				strs = str.split('?')[1].split('&');
				for (let i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
				}
			}
			return theRequest;
		},
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

#recharge-succ {
    display: flex;
    flex-direction: column;
}

.main {
    background-color: #fff;
    padding-bottom: 0;
    flex: 1;
}

.fail-i {
    display: block;
    width: px2rem(326px);
    height: px2rem(326px);
    margin: 0 auto;
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/fail.png') no-repeat;
    background-size: 100% auto;
}

.coin {
    display: block;
    padding: px2rem(220px) 0 px2rem(40px) 0;
    width: px2rem(209px);
    height: px2rem(212px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/illustrate2.png') no-repeat;
    background-size: 100% auto;
    background-position: center px2rem(220px);
    margin: 0 auto;
}

.r-fail-w {
    padding: px2rem(220px) 0 px2rem(40px) 0;
}

.f0 {
    font-size: px2rem(60px);
    color: #2bd6bd;
    margin-bottom: px2rem(82px);
}

.f1 {
    font-size: px2rem(30px);
    color: #666;
    margin-bottom: px2rem(18px);
}

.f2 {
    font-size: px2rem(30px);
    color: #2bd6bd;
    margin-bottom: px2rem(18px);
}

.f3 {
    font-size: px2rem(30px);
    color: #ccc;
    margin-bottom: px2rem(18px);
}

.gou {
    display: block;
    width: px2rem(154px);
    height: px2rem(154px);
    padding: px2rem(226px) 0 px2rem(100px) 0;
    margin: 0 auto;
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/gou.png') no-repeat;
    background-position: 0 px2rem(226px);
    background-size: 100% auto;
}
</style>