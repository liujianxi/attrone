<template>
    <div id="setting">
        <s-header type="0" title="设置"></s-header>
        <div class="main">
            <dl>
                <dd @click="goReback()">意见反馈
                    <i></i>
                </dd>
                <!--<dd @click="goComplaintList()">订单投诉 <i></i></dd>-->
                <dd @click="goAbout()">关于我们
                    <i></i>
                </dd>
                <dd @click="goAgreement()">用户协议
                    <i></i>
                </dd>
            </dl>
        </div>
        <button class="btn_fix_bot" @click="logOut()">退出登录</button>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast, MessageBox } from 'mint-ui'
export default {
    components: { SHeader },
    created() {
        //      dplus.track(["_trackEvent", '设置页面', "浏览", "", 0, ""]);
    },
    methods: {
        goAgreement() {
            this.$router.push('/agreement');
        },
        goReback() {
            this.$router.push('/reback');
        },
        goAbout() {
            this.$router.push('/about');
        },
        goComplaintList() {
            this.$router.push('/complaintlist');
        },
        logOut() {
            let self = this;
            MessageBox.confirm('确定退出登录？').then(action => {
                if (action == 'confirm') {
                    window.sid='';
                    Toast({ message: '退出成功' , duration: 1000 });
                    self.$router.push('/login');
                }
            });

        }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

#setting {
    display: flex;
    flex-direction: column;
}

.main {
    background-color: #fff;
    text-align: left;
    padding-bottom: 0;
    flex: 1;
}

dl {
    margin-left: px2rem(20px);

    dd {
        height: px2rem(98px);
        line-height: px2rem(98px);
        font-size: px2rem(32px);
        color: #666;
        padding-right: px2rem(30px);
        border-bottom: 1px solid #ccc;

        i {
            display: inline-block;
            width: px2rem(14px);
            height: px2rem(26px);
            background: url('https://s.1-1dr.com/static/mobile/img/wechat/more.png') no-repeat;
            background-size: 100% auto;
            float: right;
            margin-top: px2rem(37px);
        }
    }
}
</style>