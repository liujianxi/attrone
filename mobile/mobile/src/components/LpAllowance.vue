<template>
    <div id="lp-allowance">
        <s-header type="0" title="长护险补贴明细"></s-header>
        <div class="main">
            <div class="he">
                <div class="bo">
                    <div>
                        <p class="fr">被服务人： {{accountDetail.kinsName}}</p>
                        <p class="sr">服务中的长护险订单： {{accountDetail.orderNum?accountDetail.orderNum:0}}单</p>
                    </div>
                </div>
                <div class="fo">
                    <span>补贴账户余额：</span>
                    <span class="num">{{accountDetail.insureAccount}}</span>
                    <span>元</span>
                </div>
            </div>
    
            <div class="list">
                <div class="list-h">
                    <span @click="getAccountDetail(0)" :class="['ce-sp',tabType == 0?'selected':'']">全部</span>
                    <span @click="getAccountDetail(1)" :class="['ce-sp',tabType == 1?'selected':'']">支出</span>
                    <span @click="getAccountDetail(2)" :class="['ce-sp',tabType == 2?'selected':'']">收入</span>
                </div>
                <dl class="list-b" v-if="accountDetail.recordList">
                    <dd v-for="(item,index) in accountDetail.recordList" :key="index">
                        <p>
                            <span class="tit">{{item.changeDesc}}</span>
                            <span class="num rig">{{item.changeAccountStr}}</span>
                        </p>
                        <p>余额： {{item.accountStr}}</p>
                        <p>
                            <span>申请编号： {{item.orderId}}</span>
                            <span class="rig">{{item.createTime}}</span>
                        </p>
                    </dd>
                </dl>
                <div class="bg-girl" v-else>
                    <i></i>
                    <p>无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { isEmpty } from '../util/common.js'
import http from '../service/api.js'

export default {
    components: { SHeader },
    data() {
        return {
            tabType: 0,
            pageNo: 0,    //当前页数
            pageSize: 10,   //每页条目数
            accountDetail: {
                kinsName: '',
                orderNum: 0,
                insureAccount: '0.00',
                recordList: []
            },
            account: '',
            tabTypeSelected: '0'   //0-全部 1-支出 2-收入
        }
    },
    activated() {
        this.account = this.$route.query;
        console.log(this.account);
        this.getAccountDetail(0);

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;		//还原滚动条位置
    },
    methods: {
        getAccountDetail(type) {
            var self = this;
            self.tabType = type;
            http.post('/json/GetInsureAccountDetail', {
                orderId: self.account.orderId,
                idcard: self.account.idcard,
                tabType: type,
                pageNo: 1,
                pageSize: 1
            }).then(function (res) {
                self.accountDetail = res.body.accountDetail;
            });
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";
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

.main {
    text-align: left;
    height: 100%;
}

.he {
    background-color: #fff;
    font-size: px2rem(32px);
}

.bo,
.fo {
    padding: 0 px2rem(30px);
}

.bo {
    color: #999;
    border-bottom: 1px solid #ccc;
    display: -webkit-box;
    -webkit-box-align: center;

    >div {
        -webkit-box-flex: 1;
    }

    .fr {
        padding-top: px2rem(60px);
    }
    .sr {
        padding: px2rem(30px) 0 px2rem(25px) 0;
    }
}

.fo {
    color: #333;
    height: px2rem(74px);
    line-height: px2rem(74px);

    .num {
        color: #ffc360;
    }
}

.list {
    margin-top: px2rem(20px);
    background-color: #fff;
    height: 100%;
    .list-h {
        font-size: px2rem(32px);
        padding: 0 px2rem(30px);
        color: #333;
        display: -webkit-box;
        height: px2rem(100px);
        line-height: px2rem(100px);
        border-bottom: 1px solid #ccc;

        .ce-sp {
            display: block;
            -webkit-box-flex: 1;
            text-align: center;
        }
        .ce-sp.selected {
            color: #2bd6bd;
        }
    }
    .list-b {
        dd {
            padding: px2rem(20px) px2rem(30px);
            font-size: px2rem(32px);
            color: #666;
            border-bottom: 1px solid #ccc;

            .tit {
                font-size: px2rem(32px);
                color: #333;
            }
            .num {
                color: #ffc360;
            }

            >p {
                margin-bottom: px2rem(20px);
            }
            >p:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.rig {
    float: right;
}
</style>