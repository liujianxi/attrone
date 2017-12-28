<template>
    <div id="lp-quali">
        <s-header :type="preway=='wechat'?'3':'0'" title="长护险资格人"></s-header>
        <div class="main">
            <dl v-if="accountList.length!=0">
                <dd v-for="item in accountList" @key="item">
                    <div class="bo" @click="goAllowance(item)">
                        <div>
                            <p class="fr">被服务人： {{item.kinsName}}</p>
                            <p class="sr">服务中的长护险订单： {{item.orderNum?item.orderNum:0}}单</p>
                        </div>
                        <i class="r-more-green"></i>
                    </div>
                    <div class="fo">
                        <span>补贴账户余额：</span>
                        <span class="num">{{item.accountStr}}</span>
                        <span>元</span>
                    </div>
                </dd>
            </dl>
            <div v-if="accountList.length==0" class="bg-girl">
                <i></i>
                <p>暂无长护险资格人</p>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast } from 'mint-ui'
import http from '../service/api.js'

export default {
    components: { SHeader },
    data() {
        return {
            preway: '',
            accountList: [],   //资格人列表
            idCard: '',
        }
    },
    created() {
//      dplus.track(["_trackEvent", '长护险补贴页面', "浏览", "", 0, ""]);
    },
    methods: {
        goAllowance(item) {
            console.log(item);
            this.$router.push({ path: './lpallowance', query: { idcard: item.idcard } });
        }
    },
    activated() {
        var self = this;
        this.preway = this.$route.query.preway;
        http.post('/json/GetInsureAccount').then(function (res) {
            if (res.errorCode == 0) {
                self.accountList = res.body.accountList;
            } else {
                Toast({ message: res.msg });
            }
        }, function (res) {
            Toast({ message: res.msg });
        });
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";
.bg-girl {
    padding-top: px2rem(322px);
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
        font-size: px2rem(30px);
        margin-top: px2rem(42px);
        color: #ccc;
    }
}

.main {
    text-align: left;
    font-size: px2rem(32px);
}

dd {
    background-color: #fff;
    margin-top: px2rem(20px);
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
    .r-more-green {
        display: block;
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
</style>