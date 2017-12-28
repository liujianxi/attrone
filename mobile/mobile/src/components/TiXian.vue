<template>
    <div id="ti-xian">
        <s-header type="0" title="钱包提现"></s-header>
        <div class="main">
            <div class="yu-e">
                <span>可提现余额</span>
                <span class="money">{{count}}元</span>
            </div>
            <div>
                <div class="tx-tit">提现金额</div>
                <div class="rmb-w">
                    <i class="rmb"></i>
                    <input class="money-input" type="number" v-model="txMoney" @input="inputCall()" placeholder="提现金额" />
                </div>
                <button type="button" id="toMoney" class="tx-btn" @click="goResult()">申请提现</button>
                <div class="remark">7个工作日内金额退还至原支付账户</div>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'
import { Toast} from 'mint-ui'
export default {
    components: { SHeader },
    data() {
        return {
            txMoney: '',
            count: '',
        }
    },
    computed: {
    },
    activated() {
        var self = this;
        var loc = 'https://' + window.location.host + '/#/rechargesucc&success=1';
        loc = loc.split('&')[1];
        loc = loc.split('=')[1];
        this.txMoney = '';
        var buttNode = document.getElementById("toMoney");
        http.post('/json/GetUserAccount').then(function(res) {
            self.count = res.body.account;
        });
    },
    methods: {
        inputCall() {
            var self = this;
            var floatnum = [];
            var splitnum = [];
            var floatcount = [];//接收小数位
            var intcount = '';//接收整数位
            var floatstr = '';//小数位字符串
            if (self.txMoney) {
                floatnum = self.txMoney.split('.');
                intcount = floatnum[0];
                if (floatnum.length > 1) {//有小数
                    splitnum = floatnum[1].split('');
                    if (splitnum.length >= 2) {//限制两位小数
                        floatcount = [];
                        for (var i = 0; i < 2; i++) {
                            floatcount.push(splitnum[i]);
                        }
                        //  					floatstr=parseFloat(parseFloat(floatcount.join(''))/100);
                    } else {
                        floatcount = [];
                        floatcount.push(splitnum[0]);
                        //  					floatstr=parseFloat(parseFloat(floatcount.join(''))/10);
                    }
                    self.txMoney = parseFloat(intcount) + '.' + floatcount.join('');
                } else {
                    self.txMoney = parseFloat(intcount);
                }

            }
            self.count = this.count.replace(/,/g, '');
        },
        goResult() {
            ///json/Withdraw
            var self = this;
            console.log(self.txMoney);
            if(self.txMoney === ''){
                Toast({message:'请输入提现金额',time:1000});
                return false;
            }
            if(parseFloat(self.txMoney) > parseFloat(self.count)){
                Toast({message:'输入金额不得超过可提现余额',time:1000});
                self.txMoney='';
                return false;
            }
            if(self.txMoney <= 0){
                Toast({message:'请重新输入提现金额',time:1000});
                self.txMoney='';
                return false;
            }
            http.post('/json/Withdraw', { fee: self.txMoney })
                .then((dt) => {
                    self.$router.push({ path: './rechargesucc', query: { success: 0, money: self.txMoney, preway: 'tixian' } });
                })
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.main {
    font-family: 'SimHei';
    font-size: px2rem(30px);
    color: #666;
    text-align: left;
    background-color: #fff;
    bottom: 0;
}

.yu-e {
    padding: 0 px2rem(30px);
    height: px2rem(80px);
    line-height: px2rem(80px);

    .money {
        float: right;
        color: #2bd6bd;
    }
}

.tx-tit {
    margin: px2rem(27px) 0 0 px2rem(30px);
}

.rmb-w {
    position: relative;
    margin: px2rem(68px) 0 px2rem(60px) 0;
    height: px2rem(90px);
}

.rmb {
    position: absolute;
    display: block;
    width: px2rem(67px);
    height: px2rem(100px);
    top: 55%;
    left: px2rem(150px);
    margin-top: px2rem(-50px);
    background: url('https://s.1-1dr.com/static/mobile/img/wechat/rmb.png') no-repeat;
    background-size: 100% auto;
    vertical-align: middle;
}

.money-input {
    display: block;
    text-align: left;
    font-size: px2rem(80px);
    line-height: px2rem(80px);
    width: 65%;
    color: #666;
    margin: 0 auto;
    vertical-align: middle;
    margin-left: px2rem(250px);
}

.tx-btn {
    width: px2rem(600px);
    height: px2rem(86px);
    border-radius: px2rem(3px);
    background-color: #ccc;
    color: #fff;
    font-size: px2rem(36px);
    display: block;
    margin: 0 auto;
    background-color: #2bd6bd;
}


.remark {
    font-size: px2rem(28px);
    color: #2bd6bd;
    margin-top: px2rem(28px);
    text-align: center;
}
</style>