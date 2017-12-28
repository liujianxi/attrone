<template>
    <div id="order-list">
        <s-header type="0" title="我的订单" :has-back="false"></s-header>
        <dl class="tab-dl" :style="tabDlStyle">
            <dd :class="[active=='tab-container0'?'select':'']" @click="clickTab(0)">全部订单</dd>
            <dd :class="[active=='tab-container1'?'select':'']" @click="clickTab(1)">进行中</dd>
            <dd :class="[active=='tab-container2'?'select':'']" @click="clickTab(2)">已完成</dd>
        </dl>
        <div class="main">
            <mt-tab-container v-model="active" :swipeable="false">

                <mt-tab-container-item id="tab-container0">
                    <mt-loadmore topLoadingText="加载中..." :auto-fill="false" :top-method="top0Call" :bottom-method="bot0Call" :distanceIndex='2' :bottom-all-loaded="orders[0].allLoaded" ref="loadmore0" v-show="orders[0].list.length>0">
                        <div class="order-w" :style="orderWStyle">
                            <div class="order-item" v-for="(item,index) in orders[0].list" @click="moveflag?'':clickOrder(item)" :key='index'>
                                <div class="fr">
                                    <span>{{item.createTime}}</span>
                                    <span :class="['status', (item.status==-1?'gray':(item.status==1||item.status==2||item.status==5)?'orange':(item.status==4||item.status==0?'red':(item.status==6?'black':'green')))]">{{item.statusStr}}</span>
                                </div>
                                <div>
                                    <order-body :img="item.img" :addr="item.location!=undefined?item.location:item.hospital" :service="item.service" :people="item.kinsName" :waiter="item.serviceStaff" />
                                </div>
                                <div class="tr">
                                    <button :class="['sbtn',item.statusStr=='待付款'?'red':'green']" v-if="item.status==0|| item.status==3">去支付</button>
                                    <a class="sbtn orange" v-if="item.status==1 || item.status==2" @click="stopClick($event)" :href="'tel:'+item.kfPhone">电话催单</a>
                                    <button class="sbtn red" v-if="item.status==4">去结算</button>
                                    <button class="sbtn orange" v-if="item.status==5" @click="nextAssess(item.orderId,0,$event)">去评价</button>
                                    <button class="sbtn black" v-if="item.status==6" @click="nextAssess(item.orderId,1,$event)">查看评价</button>
                                </div>
                            </div>

                        </div>
                    </mt-loadmore>
                    <div class="no-order" :style="orderWStyle" v-if="orders[0].allLoaded && orders[0].list.length<=0">
                        <div class="no-order-ch">
                            <p>您还未使用过我们的服务</p>
                            <p>如有需要请到首页下单</p>
                            <button @click="goHome()">去下单</button>
                        </div>
                    </div>
                </mt-tab-container-item>

                <mt-tab-container-item id="tab-container1">
                    <mt-loadmore topLoadingText="加载中..." :auto-fill="false" :top-method="top1Call" :bottom-method="bot1Call" :bottom-all-loaded="orders[1].allLoaded" ref="loadmore1" v-show="orders[1].list.length>0">
                        <div class="order-w" :style="orderWStyle">
                            <div class="order-item" v-for="(item,index) in orders[1].list" @click="moveflag?'':clickOrder(item)" :key='index'>
                                <div class="fr">
                                    <span>{{item.createTime}}</span>
                                    <span :class="['status', (item.status==-1?'gray':(item.status==1||item.status==2||item.status==5)?'orange':(item.status==4||item.status==0?'red':(item.status==6?'black':'green')))]">{{item.statusStr}}</span>
                                </div>
                                <div>
                                    <order-body :img="item.img" :addr="item.location!=undefined?item.location:(item.hospital || '')+(item.branch || '')+(item.room || '')+(item.bed || '')" :service="item.service" :people="item.kinsName" :waiter="item.serviceStaff" />
                                </div>
                                <div class="tr">
                                    <button :class="['sbtn',item.statusStr=='待付款'?'red':'green']" v-if="item.status==0|| item.status==3">去支付</button>
                                    <a class="sbtn orange" v-if="item.status==1 || item.status==2" @click="stopClick($event)" :href="'tel:'+item.kfPhone">电话催单</a>
                                    <button class="sbtn red" v-if="item.status==4">去结算</button>
                                    <button class="sbtn orange" v-if="item.status==5" @click="nextAssess(item.orderId,0,$event)">去评价</button>
                                    <button class="sbtn black" v-if="item.status==6" @click="nextAssess(item.orderId,1,$event)">查看评价</button>
                                </div>
                            </div>
                        </div>
                    </mt-loadmore>
                    <div class="no-order" :style="orderWStyle" v-if="orders[1].allLoaded && orders[1].list.length<=0">
                        <div class="no-order-ch">
                            <p>您还未使用过我们的服务</p>
                            <p>如有需要请到首页下单</p>
                            <button @click="goHome()">去下单</button>
                        </div>
                    </div>
                </mt-tab-container-item>

                <mt-tab-container-item id="tab-container2">
                    <mt-loadmore topLoadingText="加载中..." :auto-fill="false" :top-method="top2Call" :bottom-method="bot2Call" :bottom-all-loaded="orders[2].allLoaded" ref="loadmore2" v-show="orders[2].list.length>0">
                        <div class="order-w" :style="orderWStyle">
                            <div class="order-item" v-for="(item,index) in orders[2].list" v-if="orders[2].list.length>0" @click="moveflag?'':clickOrder(item)" :key='index'>
                                <div class="fr">
                                    <span>{{item.createTime}}</span>
                                    <span :class="['status', (item.status==-1?'gray':(item.status==1||item.status==2||item.status==5)?'orange':(item.status==4||item.status==0?'red':(item.status==6?'black':'green')))]">{{item.statusStr}}</span>
                                </div>
                                <div>
                                    <order-body :img="item.img" :addr="item.location!=undefined?item.location:(item.hospital || '')+(item.branch || '')+(item.room || '')+(item.bed || '')" :service="item.service" :people="item.kinsName" :waiter="item.serviceStaff" />
                                </div>

                                <div class="tr">
                                    <button :class="['sbtn',item.statusStr=='待付款'?'red':'green']" v-if="item.status==0|| item.status==3">去支付</button>
                                    <a class="sbtn orange" v-if="item.status==1 || item.status==2" @click="stopClick($event)" :href="'tel:'+item.kfPhone">电话催单</a>
                                    <button class="sbtn red" v-if="item.status==4">去结算</button>
                                    <button class="sbtn orange" v-if="item.status==5" @click="nextAssess(item.orderId,0,$event)">去评价</button>
                                    <button class="sbtn black" v-if="item.status==6" @click="nextAssess(item.orderId,1,$event)">查看评价</button>
                                </div>
                            </div>

                        </div>
                    </mt-loadmore>
                    <div class="no-order" :style="orderWStyle" v-if="orders[2].allLoaded && orders[2].list.length<=0">
                        <div class="no-order-ch">
                            <p>您还未使用过我们的服务</p>
                            <p>如有需要请到首页下单</p>
                            <button @click="goHome()">去下单</button>
                        </div>
                    </div>
                </mt-tab-container-item>

            </mt-tab-container>
            <!--<div class="touchback"></div>-->
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { TabContainer, TabContainerItem, Loadmore } from 'mint-ui';
import OrderBody from './OrderBody.vue';
import { isApp } from '../util/common.js';
import http from '../service/api.js';

const PAGE_SIZE = 15;

//orderType 订单类别 1 - 机构订单 2 - 居家订单
//status == 0 且 payFlag = 1 是需要交预交金
//status==-1就是已取消
export default {
    components: { SHeader, OrderBody, Loadmore },
    data() {
        return {
            moveflag: false,
            active: 'tab-container0',
            orders: [
                {
                    pageNum: 1,
                    allLoaded: false,
                    list: []
                },
                {
                    pageNum: 1,
                    allLoaded: false,
                    list: []
                },
                {
                    pageNum: 1,
                    allLoaded: false,
                    list: []
                }
            ],
            noOrderHeight: 600,
            phone: '',
        };
    },
    computed: {
        noOrderStyle: function() {
            return {
                boxSizing: 'border-box',
                height: this.noOrderHeight + 'px',
                paddingTop: (this.noOrderHeight * 0.2) + 'px'
            }
        },
        tabDlStyle: function() {             //main不用计算margin-top,因为s-header已经自己有填充
            return {
                //微信上有header，top：80px; app上没有header设置为0
                top: isApp(window) ? '0' : '1.06666667rem'
            }
        },
        orderWStyle: function() {
            return {
                'min-height': (screen.height / 37.5 - 1.06666667 - 90 / 75 - 90 / 75) + 'rem'
            }
        }
    },
    activated() {
        this.initTabList(0);
    },
    mounted() {
        this.noOrderHeight = document.querySelector('#order-list .main').offsetHeight;      //动态设置no-order高度
    },
    methods: {//0, false
        initTabList(tabType, isLoadMore) {
            var self = this;
            if (!isLoadMore) {
                self.orders[tabType].pageNum = 1;
                self.orders[tabType].list.length = 0;
                self.orders[tabType].allLoaded = false;
            }
            self.getTouched();
            return new Promise((resolve, reject) => {
                http.post('/json/GetOrderList', {
                    tabType: tabType,
                    pageSize: PAGE_SIZE,
                    pageNum: self.orders[tabType].pageNum
                })
                    .then((data) => {
                        data = data.body;
                        resolve();
                        self.orders[tabType].list = self.orders[tabType].list.concat(data.orderVOList);
                        self.orders[tabType].pageNum++;
                        if (self.orders[tabType].pageNum > Math.ceil(data.count / PAGE_SIZE)) {
                            self.orders[tabType].allLoaded = true;
                        }
                    });
            });
        },
        top0Call() {
            var self = this;
            this.initTabList(0, false).then(() => {
                this.$refs.loadmore0.onTopLoaded();
            });
        },
        bot0Call() {
            var self = this;
            this.initTabList(0, true).then(() => {
                this.$refs.loadmore0.onBottomLoaded();
            });
        },
        top1Call() {
            var self = this;
            this.initTabList(1, false).then(() => {
                this.$refs.loadmore1.onTopLoaded();
            });
        },
        bot1Call() {
            var self = this;
            this.initTabList(1, true).then(() => {
                this.$refs.loadmore1.onBottomLoaded();
            });
        },
        top2Call() {
            var self = this;
            this.initTabList(2, false).then(() => {
                this.$refs.loadmore2.onTopLoaded();
            });
        },
        bot2Call() {
            var self = this;
            this.initTabList(2, true).then(() => {
                this.$refs.loadmore2.onBottomLoaded();
            });
        },
        goHome() {
            this.$router.push({ name: 'index' });
        },
        clickTab(i) {
            this.active = 'tab-container' + (i);
            if (this.orders[i].list.length <= 0) {        //未加载就刷新
                if (i == 0) {
                    this.top0Call();
                } else if (i == 1) {
                    this.top1Call();
                } else if (i == 2) {
                    this.top2Call();
                }
            }
        },
        clickOrder(item) {
            //          var type;
            //          if(item.status==0 && item.payFlag==1){          //需要缴纳预付金
            //              type = 1;
            //          } else {
            //              type = 2;
            //          }
            this.$router.push({ path: '/order', query: { orderid: item.orderId } });
        },
        goSettlementList(e) {
            this.$router.push({ path: '/settlementlist' });
            e.stopImmediatePropagation();
        },
        goAssess(e) {
            this.$router.push({ path: '/assess' });
            e.stopImmediatePropagation();
        },
        getTouched() {
            var box = document.getElementsByClassName('order-item');
            var self = this;
            //      	self.moveflag=true;
            var a = true;//判断move过程
            for (var i = 0; i < box.length; i++) {
                (function(index) {
                    box[index].addEventListener('touchstart', function(e) {
                        self.moveflag = true;
                    });
                    box[index].addEventListener('touchmove', function(e) {
                        a = false;
                    });
                    box[index].addEventListener('touchend', function(e) {
                        if (a) {
                            self.moveflag = false;
                        } else {
                            a = true;
                            clearTimeout(aaa);
                            var aaa = setTimeout(function() {
                                self.moveflag = false;
                            }, 1000);
                        }
                    });
                })(i);
            }
        },
        stopClick(event) {
            event.stopPropagation();
        },
        nextAssess(orderId, i, event) {
            event.stopPropagation();
            this.$router.push({ path: '/assess', query: { orderid: orderId, type: i } });
        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/order-common.scss";

.main {
    position: relative;
    margin-top: px2rem(90px);
    padding-bottom: 0;
}

.order-w {
    position: relative;
    padding-bottom: px2rem(120px);
}

.no-order {
    position: relative;

    .no-order-ch {
        width: px2rem(700px);
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
    }
    p {
        font-size: px2rem(36px);
        color: #cccccc;
    }
    p:first-child {
        margin-bottom: px2rem(10px);
    }
    button {
        font-size: px2rem(30px);
        width: px2rem(190px);
        height: px2rem(68px);
        border: 1px solid #55dbc6;
        color: #55dbc6;
        background-color: #fff;
        border-radius: px2rem(10px);

        margin-top: px2rem(100px);
    }
}

.tab-dl {
    position: fixed;
    width: 100%;
    z-index: 2;
    overflow: hidden;
    background-color: #fff;

    dd {
        float: left;
        width: 33.3%;
        height: px2rem(90px);
        line-height: px2rem(90px);
        font-size: px2rem(32px);
        color: #ccc;
        text-align: center;
    }
    dd.select {
        color: #2bd6bd;
    }
}

.order-item {
    background-color: #fff;
    text-align: left;
    margin-top: px2rem(20px);

    .fr {
        height: px2rem(64px);
        line-height: px2rem(64px);
        font-size: px2rem(32px);
        color: #666;
        border-bottom: 1px solid #ebebeb;
        padding: 0 px2rem(25px) 0 px2rem(40px);

        .status {
            float: right;
        }
    }

    .tr {
        border-top: 1px solid #ebebeb;
        height: px2rem(80px);
        line-height: px2rem(80px);
        padding: 0 px2rem(25px) 0 px2rem(40px);
        text-align: right;
        position: relative;
        span {
            font-size: px2rem(28px);
            display: block;
            position: absolute;
            top: 0;
            left: px2rem(40px);
        }
        a {
            display: inline-block;
            line-height: px2rem(64px);
            padding: 0 px2rem(15px);
        }
    }
}

button a {
    color: #ffc360;
}

.touchback {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    background: red;
    opacity: 0;
    z-index: 900;
}
</style>