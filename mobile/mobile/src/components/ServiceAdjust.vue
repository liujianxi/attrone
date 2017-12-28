<template>
    <div id="serviceAdjust">
        <s-header type='0' title="附加服务调整明细"></s-header>
        <div class="main">
            <div class="service-content">
                <div class="item-content">
                    <ul class="item-title">
                        <li>
                            <span>服务项</span>
                            <span>单价</span>
                            <span>数量</span>
                            <span>金额</span>
                        </li>
                    </ul>
                    <ul class="item-detail" v-if="orderItemList.length">
                        <li v-for="(item,index) in orderItemList" :key="index">
                            <span>{{item.service}}</span>
                            <span>{{item.priceStr}}元</span>
                            <span>{{item.numberStr}}</span>
                            <span>{{item.costStr}}元</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast, MessageBox } from 'mint-ui'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'

export default {
    components: { SHeader },
    data() {
        return {
            id: '',
            orderItemList: [],
        }
    },
    created() {

    },
    activated() {
        this.id = '';
        this.id = this.$route.query.id;
        this.initData();
    },
    methods: {
        initData() {
            let self = this;
            http.post('/json/GetOrderItemInvertList', {
                orderId: self.id
            }).then((res) => {
                self.orderItemList = res.body.orderItemList || [];
            })
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#serviceAdjust {
    background: #fff;
    font-family: PingFangSC-Light;
}

.main {
    .service-content {
        .item-content {
            .item-title {
                li {
                    color: #1D1D26;
                }
            }
            .item-detail {
                li {
                    color: #1D1D26;
                    span:nth-child(1) {
                        color: rgba(29, 29, 38, 0.5);
                    }
                    span:nth-last-child(1) {
                        color: #FCAB53;
                    }
                }
            }
            li {
                padding: pxrem(10px);
                border-bottom: pxrem(1px) solid rgba(29, 29, 38, 0.05);
                display: flex;
                display: -webkit-flex;
                font-size: pxrem(12px);
                color: rgba(29, 29, 38, 0.5);
                span {
                    flex: 1;
                }
                span:nth-child(1) {
                    text-align: left;
                }
                span:nth-last-child(1) {
                    text-align: right;
                }
            }
        }
    }
}
</style>