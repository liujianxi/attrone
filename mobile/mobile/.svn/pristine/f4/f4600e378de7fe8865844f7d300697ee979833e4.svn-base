<template>
    <div id="orderServiceDetail">
        <s-header type="0" title="服务详情" :hasBack='true'> </s-header>
        <div class="container">
            <div class="service-item">
                <p>{{des.serviceItem}}</p>
                <p>{{des.priceStr}}</p>
            </div>
        </div>
        <div id="service-text" class="service-text" v-html="des.description"></div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import { Toast, MessageBox, Popup, Indicator } from 'mint-ui'
export default {
    components: { SHeader, },
    data() {
        return {
            des: '',
            t1: '',
            t2: '',
        }
    },
    activated() {
        Indicator.open();
        this.t1 = new Date().getTime();
        this.des = this.$route.query.description;
        this.checkImage();
    },
    methods: {
        checkImage() {
            let self = this;
            imagesLoaded(document.querySelector('#service-text'), function(instance) {
                self.t2 = new Date().getTime();
                console.log(self.t2 - self.t1);
                Indicator.close();
            });
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#orderServiceDetail {
    .container {
        height: px2rem(100px);
        margin-top: px2rem(80px);
        border-bottom: 1px solid #ccc;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background: #fff;
        font-size: px2rem(24px);
        .service-item {
            padding: 0 px2rem(30px);
            line-height: px2rem(100px);
            overflow: hidden;
            p {
                color: #ccc;
            }
            p:nth-child(1) {
                float: left;
                text-align: left;
            }
            p:nth-child(2) {
                float: right;
                text-align: right;
            }
        }
    }
    .service-text {
        background: #fff;
        margin-top: px2rem(100px);
        font-size: px2rem(24px);
        padding: px2rem(10px) px2rem(30px) px2rem(30px) px2rem(30px);
        text-align: left;
        p {
            width: 100%;
            img {
                display: block;
                width: 100%;
            }
        }
    }
}
</style>