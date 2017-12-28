<template>
    <div id="me">
        <s-header type="4" title="我的" :has-back="false" @rightCall="goSetting()"></s-header>
        <div class="main">
            <div class="info" @click="goProfile()">
                <img :src="userVo.headImgUrl" />
                <div class="words">
                    <p class="name">{{userVo.name}}</p>
                    <p class="phone">手机
                        <span>{{userVo.phone}}</span>
                    </p>
                </div>
                <i></i>
            </div>
            <div class="me-tc"></div>
            <dl>
                <dd @click="goYuE()" class="money">钱包余额
                    <span v-if="isReal">已实名认证</span>
                    <i></i>
                </dd>
                <dd @click="goMsg()">消息通知
                    <i></i>
                </dd>
                <dd @click="goFamily()">家庭成员
                    <i></i>
                </dd>
                <dd @click="goAddrList()">地址管理
                    <i></i>
                </dd>
                <dd @click="goLpFamily()">长护险
                    <i></i>
                </dd>
            </dl>
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
            userVo: {
                headImgId: '',
                headImgUrl: '',
                name: '',
                phone: '',
                sex: '',
                birthday: '',
            },
            isReal: false,
        }
    },
    created() {
        //      dplus.track(["_trackEvent", '我的页面', "浏览", "", 0, ""]);
    },
    activated() {
        // console.warn('me.vue come in');
        var self = this;
        this.checkLogin();//检测登录状态
        http.post('/json/GetUserInfo').then(function(res) {
            if (res.errorCode == 0) {
                self.userVo.headImgId = res.body.userVO.headImg;
                self.userVo.headImgUrl = res.body.userVO.headImgUrl;
                self.userVo.name = res.body.userVO.name;
                self.userVo.phone = res.body.userVO.phone;
                self.userVo.sex = res.body.userVO.sex;
                self.userVo.birthday = res.body.userVO.birthday;
                self.isReal = res.body.isReal;
            } else {
                Toast({ message: res.msg });
            }
        }, function(res) {
            //              Toast({message:res.msg});
        });
    },
    methods: {
        checkLogin() {
            http.post('/json/CheckLogin')
                .then((dt) => {
                    if (!dt.body.g_isLogin) {
                        window.location.href = dt.body.g_login_url;
                    }
                    //	            	if(!dt.body.isBindPhone){
                    //	            		this.$router.push({path: '/login'});
                    //	            	}

                });
        },
        goSetting() {
            this.$router.push({ path: '/setting' });
        },
        goProfile() {
            this.$router.push({ path: '/profile', query: { userVo: this.userVo } });
        },
        goYuE() {
            this.$router.push({ path: '/yue' });
        },
        goAddrList() {
            this.$router.push({ path: '/addrlist', query: { justshow: true } });
        },
        goMsg() {
            this.$router.push({ path: '/message' });
        },
        goFamily() {
            this.$router.push({ path: '/family', query: { justshow: true } });
        },
        goYhj() {
            this.$router.push({ path: '/yhj' });
        },
        goLpFamily() {
            // this.$router.push({path: '/longprotectfamily'});
            this.$router.push({ path: '/lpqualification' });
            //              this.$router.push({path: '/careapply1'});
            //				this.$router.push({path:'/adlassess'})
        },
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
.main {
    text-align: left;
}

.info {
    height: px2rem(180px);
    padding: 0 px2rem(30px);
    display: -webkit-box;
    -webkit-box-align: center;
    background-color: #fff;
    margin-bottom: px2rem(20px);

    img {
        width: px2rem(118px);
        height: px2rem(120px);
    }
    .words {
        -webkit-box-flex: 1;
        margin-left: px2rem(48px);
        font-size: px2rem(32px);

        .name {
            font-size: pxrem(18px);
            color: #333;
            margin-bottom: px2rem(24px);
        }
        .phone {
            color: #666;
        }
    }
    i {
        display: inline-block;
        width: px2rem(14px);
        height: px2rem(26px);
        background: url('https://s.1-1dr.com/static/mobile/img/wechat/more.png') no-repeat;
        background-size: 100% auto;
        vertical-align: middle;
    }
}

dl {
    padding-left: px2rem(30px);
    color: #333;
    font-size: px2rem(32px);
    background-color: #fff;

    dd {
        height: px2rem(98px);
        line-height: px2rem(98px);
        border-bottom: 1px solid #ebebeb;
        padding-right: px2rem(30px);
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
    dd.money {
        position: relative;
        span {
            font-size: pxrem(15px);
            color: #FFC360;
            line-height: pxrem(15px);
            position: absolute;
            right: pxrem(30px);
            top: 50%;
            transform: translateY(-50%);
        }
    }
    dd:last-child {
        border-bottom: 0;
    }
}

.msg-num {
    font-size: px2rem(28px);
    display: inline-block;
    -webkit-box-align: center;
    width: px2rem(50px);
    height: px2rem(30px);
    line-height: px2rem(32px);
    text-align: center;
    color: #fff;
    border-radius: px2rem(15px);
    margin-left: px2rem(38px);
    background-color: #ff5454;
}
</style>