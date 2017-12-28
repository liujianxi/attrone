<template>
    <div id="lp-detail">
        <div id="orderHead">
            <s-header type="0" title="申请详情" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()" v-if="istest==''">
                <i class="l-more-black"></i>
            </div>
            <p class="golist" @click="goList()" v-else>
                申请列表
            </p>
        </div>
        <div class="main">
            <div class="he">
                <p>
                    <span>申请编号：</span>{{insureNO}}</p>
                <p>
                    <span>提交时间：</span>{{createTime}}</p>
                <p>
                    <span>被服务人：</span>{{kinsName}}</p>
                <p v-if="score >= 0">
                    <span>自理得分：</span>{{score}}分</p>
                <p v-else>
                    <span>自理得分：</span>
                    <a href="javascript:void(0);" @click="goTest()">去自评</a>
                </p>
                <p>
                    <span>身份证号：</span>{{idcard}}</p>
            </div>
            <div class="bo">
                <div class="bo-tit">申请进度</div>
                <dl class="bo-dl">
                    <dd v-for="(detail,index) in detailList" :key='index'>
                        <div class="pot-w">
                            <i class="pot orange" v-if="index == 0"></i>
                            <i class="pot green" v-if="index == 1"></i>
                            <i class="pot blue" v-if="index == 2"></i>
                            <i class="pot green" v-if="index == 3"></i>
                            <i class="pot red" v-if="index == 4"></i>
                        </div>
                        <div class="txt" v-if="index == 0" style=" color:#2bd6bd;">
                            <span>{{detail.createTime}}</span>
                            <span class="txt-content" v-html="detail.content"></span>
                        </div>
                        <div class="txt" v-else>
                            <span>{{detail.createTime}}</span>
                            <span class="txt-content" v-html="detail.content"></span>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
        <button class="btn_fix_bot" v-if="status=='2'&&forceFlag=='2'" @click="payEnsure()">
            支付保证金
        </button>
        <button class="btn_fix_bot" v-if="!(status=='2'&&forceFlag=='2')||status=='50'">
            <a :href="'tel:'+kfPhone">联系客服</a>
        </button>
    </div>
</template>
<script>
import {MessageBox } from 'mint-ui'
import SHeader from './SHeader.vue';
import http from '../service/api.js'
import eventBus from '../service/eventbus.js';
export default {
    components: { SHeader },
    data() {
        return {
            order: {},
            progressColor: ['orange', 'green', 'blue', 'red'],
            insureNO: '',
            createTime: '',
            kinsName: '',
            idcard: '',
            depositFee: '',
            kfPhone: '',
            purse: '',
            usePurse: '',
            detailList: '',
            score: null,
            istest: '',
            gopay: '',//判断支付保证金按钮
            ensuremoney: '',
            status: '',
            forceFlag: '',
        }
    },
    activated() {
        // this.order = this.$route.query;
        var self = this;
        this.istest = '';
        console.log(this.istest);
        this.insureNO = this.$route.query.insureNO;
        this.score = this.$route.query.score;
        if (this.$route.query.test) {//判断是否从testresult过来的
            self.istest = self.$route.query.test;
        }
        console.info('insureNO:' + this.$route.query.insureNO);
        this.load();
    },
    methods: {
        showMessage() {
            var self = this;
            // MessageBox.confirm('继续提交需缴纳' + this.depositFee + '元保证金,我们会直接将申请人资料直接提交至终审机构').then(action => {
            //     if (action == 'confirm') {
            //         //确定则重新评测
            //         self.payEnsure();
            //     }
            // });
            //无需支付保证金，强制提交
            MessageBox.confirm('继续提交，我们会派专业护士上门为您评估').then(action => {
                if (action == 'confirm') {
                    http.post('/json/ForceSubmitInsure', {
                        insureNO: self.insureNO,
                    }).then((res) => {
                        window.location.reload();
                    })
                }
            })
        },
        payEnsure() {
            var self = this;
            this.$router.push({ path: '/payensure', query: { ensuremoney: self.ensuremoney, insureNO: self.insureNO } });
        },
        orderGoback() {
            this.$router.push({ path: '/mylongprotect', query: { preway: 'lptail' } });
        },
        goList() {
            this.$router.push({ path: '/mylongprotect', query: { preway: 'lptail' } });
        },
        goTest() {
            // this.$router.push({path:'./test',query:{insureNO:this.insureNO,idcard:this.idcard, comeFrom:'ldDetail'}});
            this.$router.push({ path: './test', query: { insureNO: this.insureNO, idcard: this.idcard } });
        },
        load() {
            var self = this;

            http.post('/json/GetInsureDetail', { insureNO: self.insureNO }).then(function(res) {
                self.insureNO = res.body.insureNO;
                self.createTime = res.body.createTime;
                self.kinsName = res.body.kinsName;
                self.idcard = res.body.idcard;
                self.depositFee = res.body.depositFee;
                self.kfPhone = res.body.kfPhone;
                self.purse = res.body.purse;
                self.usePurse = res.body.usePurse;
                self.detailList = res.body.detailList;
                self.ensuremoney = res.body.depositFee;
                self.status = res.body.status || '';
                self.forceFlag = res.body.forceFlag || '';
                if (self.detailList) {
                    self.gopay = self.detailList[0].content;
                }
                self.score = res.body.score;
            });
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';
button.btn_fix_bot {
    a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #fff;
    }
}

.main {
    text-align: left;
    font-size: px2rem(32px);
}

.he {
    padding: px2rem(35px) px2rem(30px);
    color: #666;
    background-color: #fff;
    margin: px2rem(20px) 0;

    >p {
        margin-bottom: px2rem(20px);
    }
    p:last-child {
        margin-bottom: 0;
    }

    a {
        color: #2bd6bd;
    }
    span {
        min-width: px2rem(150px);
        display: inline-block;
    }
}

.bo {
    background-color: #fff;
    padding: 0 px2rem(30px) 0 px2rem(30px);

    .bo-tit {
        font-size: px2rem(32px);
        color: #666;
        padding: px2rem(62px) 0 px2rem(52px) 0;
    }
    .bo-dl {
        dd {
            min-height: px2rem(130px);
            display: -webkit-box;

            position: relative;
        }
    }
}

.pot-w {
    width: px2rem(15px);
    margin-right: px2rem(50px);
    position: relative;
    .pot {
        display: block;
        position: absolute;
        height: px2rem(15px);
        width: px2rem(15px);
        border-radius: px2rem(7.5px);
        margin-top: px2rem(10px);
    }
    .pot.red {
        background-color: #ff5257;
    }
    .pot.green {
        background-color: #88c057;
    }
    .pot.blue {
        background-color: #48a0dc;
    }
    .pot.orange {
        background-color: #eeaf4b;
    }
}

.pot-w:before {
    content: "";
    position: absolute;
    top: px2rem(10px);
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    z-index: 0;
    background-color: #e5e5e5;
}

dd:first-child .pot-w:before {
    top: px2rem(10px);
}

dd:last-child .pot-w:before {
    height: px2rem(10px);
}

.txt {
    -webkit-box-flex: 1;
}

.atag {
    color: #0369ff;
    border-bottom: px2rem(2px) solid #0369ff;
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

.golist {
    position: absolute;
    top: 0;
    height: 100%;
    right: px2rem(40px);
    text-align: center;
    z-index: 902;
    font-size: px2rem(30px);
    line-height: px2rem(80px);
    color: #2bd6bd;
}
</style>