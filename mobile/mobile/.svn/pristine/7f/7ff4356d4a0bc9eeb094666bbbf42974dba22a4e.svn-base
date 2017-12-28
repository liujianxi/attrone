<template>
    <div id="bankQues">
        <s-header type='0' title="常见问题" v-if="isShowBtn"></s-header>
        <div class="content-main" :style="showConStyle">
            <span>问1.提现有什么限制？</span>
            <p>
                <i>答：为了保证账户和资金的安全，首次提现前需要经过实名认证、并绑定银行卡。</i>
            </p>
            <span>问2.添加银行账户有什么注意事项？</span>
            <p>
                <i>请认真填写银行卡号信息（开户银行，帐户名，银行账号），填写错误可能导致退款失败。</i>
            </p>
            <span>问3.提现到哪里是如何确定的，我可以自己选择提现到哪里吗？</span>
            <p>
                <i>系统会根据您的余额来源选择退款途径，线上支付的部分将会原路退回，现金支付的部分会退回到绑定的银行卡里。目前不支持自己选择提现账户，请您谅解。</i>
            </p>
            <span>问4.申请提现后多久到账？</span>
            <p>
                <i>根据不同的退款途径，退款时间会有所差异，一般会在3~7个工作日内到账。</i>
            </p>
            <span>问5.提现详情显示提现成功，但没收到钱怎么办？</span>
            <p>
                <i>建议您先查看您的银行或第三方的收支记录，如果仍未到账，请您拨打我们的客服电话进行查询。</i>
            </p>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import http from '../service/api.js'
import eventBus from '../service/eventbus.js'
import { isApp } from '../util/common.js';
export default {
    components: { SHeader },
    data() {
        return {

        }
    },
    computed: {
        isShowBtn: function () {
            if (isApp(window)) {
                return false
            } else {
                return true;
            }
        },
        showConStyle: function () {
            return {
                'padding-top': (isApp(window) ? '1.06666667rem' : '0')
            }
        }
    },
    created() {

    },
    activated() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;		//还原滚动条位置
    },
    methods: {

    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#bankQues {
    background: #fff;
    font-size: pxrem(14px);
    text-align: left;
    padding-bottom: pxrem(100px);
    .content-main {
        padding: 0 pxrem(15px);
    }
    span {
        background: #fff;
        padding-top: pxrem(15px);
        display: block;
        line-height: pxrem(21px);
        color: #1D1D26;
        padding-left: pxrem(7px);
    }
    p {
        background: rgba(19, 27, 51, 0.03);
        border-radius: pxrem(12px);
        margin-top: pxrem(15px);
        color: rgba(29, 29, 38, 0.5);
        padding: pxrem(10px) pxrem(7px);
        i {
            font-style: normal;
        }
    }
}
</style>