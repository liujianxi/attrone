<template>
    <div id="day-detail">
        <s-header type="0" title="每日明细"></s-header>
        <div class="main">
            <div class="xf" v-if='false'>
                <div> 消费总额
                    <span class="num">2900</span>元 </div>
                <div> 预付款
                    <span class="num">2000</span>元 </div>
            </div>
            <dl>
                <dd v-for="(item,index) in listItem" :key='index' class="service-dd">
                    <div>
                        <p>{{item.serviceTime}}</p>
                        <p>服务地点： {{item.location}}</p>
                        <p>服务内容： {{item.service}}</p>
                        <p>服务费用： {{item.costStr}}元</p>
                        <p class="last-p" @click="clickMore(index)">服务人员： {{item.staffName}}
                            <span v-if='item.extraVOList!=undefined'>附加服务
                                <i></i>
                            </span>
                        </p>
                        <div class="ta-div" v-if='item.extraVOList!=undefined'>
                            <div v-for="(obj,index) in item.extraVOList" :key="index">
                                <span>
                                    <i>{{obj.service}}</i>
                                </span>
                                <span>{{obj.serviceTimes}}次</span>
                                <span>{{obj.priceDesc}}</span>
                            </div>
                        </div>
                    </div>
                    <p v-if='item.payState==1'>
                        <img src="https://s.1-1dr.com/static/mobile/img/wechat/prepaid.png">
                    </p>
                </dd>
            </dl>
        </div>
        <button class="btn_fix_bot" v-if="false">查看更多</button>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js';
export default {
    components: { SHeader },
    data() {
        return {
            showMore: [],
            orderId: '',
            serviceData: '',
            listItem: '',
        }
    },
    created() {
        //      dplus.track(["_trackEvent", '每日明细', "浏览", "", 0, ""]);
    },
    activated() {
        this.orderId = this.$route.query.orderid;
        this.initData();
    },
    methods: {
        clickMore(index) {
            let iNode = document.getElementsByClassName('last-p');
            let ddNode = document.getElementsByClassName('service-dd');
            let listNode = ddNode[index].getElementsByClassName('ta-div')[0];
            if (iNode[index].className == 'last-p up') {
                iNode[index].className = 'last-p';
                listNode.className = 'ta-div';
            } else {
                listNode.className = 'ta-div show';
                iNode[index].className = 'last-p up';
            }
        },
        initData() {
            var self = this;
            http.post('/json/GetOrderDetail', {
                orderId: self.orderId
            })
                .then((dt) => {
                    self.serviceData = dt.body.order.voList[0];
                    self.getListItem();
                })
            //      	 
        },
        getListItem() {
            var self = this;
            http.post('/json/ListOrderItem', {
                orderId: self.orderId,
                settDate: self.serviceData.settleDate,
                pageSize: 31,
            })
                .then((dt) => {
                    self.listItem = dt.body.voList;
                })
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.main {
    text-align: left;
}

.xf {
    height: px2rem(90px);
    line-height: px2rem(90px);
    font-size: px2rem(32px);
    padding: 0 px2rem(30px);
    background-color: #fff;
    margin-bottom: px2rem(20px);

    div {
        display: inline-block;
    }
    >div:last-child {
        float: right;
    }
    .num {
        color: #ffb93f;
        margin: 0 px2rem(10px);
    }
}

dl {
    font-size: px2rem(28px);
    color: #666;
    dd {
        background-color: #fff;
        position: relative;
        >div {
            margin-bottom: px2rem(20px);
            padding: px2rem(18px) px2rem(30px) px2rem(18px) px2rem(30px);
            >p {
                margin-bottom: px2rem(18px);
                margin-right: px2rem(120px);
            }
            >p:nth-child(1) {
                font-size: pxrem(16px);
            }
            >p:nth-last-child(2) {
                margin-right: 0;
            }
            .last-p {
                margin-bottom: 0;
                >span {
                    font-size: pxrem(16px);
                    float: right;
                    i {
                        display: inline-block;
                        width: px2rem(28px);
                        height: px2rem(16px);
                        background: url('https://s.1-1dr.com/static/mobile/img/wechat/bottommore.png') no-repeat;
                        background-size: 100% auto;
                        margin-left: px2rem(20px);
                        -webkit-transform: rotate(0deg);
                        transition: all 0.1s linear;
                    }
                }
            }
            .last-p.up {
                i {
                    -webkit-transform: rotate(180deg);
                }
            }
        }
        >p {
            position: absolute;
            top: 0;
            right: px2rem(30px);
            img {
                width: px2rem(106px);
                height: px2rem(85px);
            }
        }
    }
}

.ta-div {
    border-collapse: collapse;
    color: #999;
    width: 100%;
    display: none;
    margin-top: px2rem(18px);
    >div {
        font-size: px2rem(28px);
        height: px2rem(70px);
        line-height: px2rem(70px);
        border-top: 1px solid #ebebeb;
        display: flex;
        display: -webkit-flex;
        >span {
            display: block;
            flex: 1;
            -webkit-flex: 1;
        }
        >span:nth-child(1) {
            margin-left: px2rem(30px);
            width: px2rem(200px);
            line-height: normal;
            position: relative;
            i {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                font-style: normal;
            }
        }
        >span:nth-child(2) {
            text-align: center;
        }
        >span:nth-child(3) {
            text-align: center;
        }
    }
    td {
        width: 33.3%
    }
}

.ta-div.show {
    display: block;
}
</style>