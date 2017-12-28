<template>
    <div id="his-input">
        <div id="orderHead">
            <s-header type="0" title="住院护理" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()">
                <i class="l-more-black"></i>
            </div>
        </div>
        <p>请输入被陪护人的住院号</p>
        <div class="orgnum-input">
            <span>住院号</span>
            <input type="text" placeholder="请输入住院号或扫描手环" v-model="orgNumber">
            <i @click="uploadQrcode()"></i>
        </div>
        <div class="btn-submit" @click="checkOrg()">
            <p>下一步</p>
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue';
import http from '../service/api.js';
import { Toast,MessageBox} from 'mint-ui';
import eventBus from '../service/eventbus.js';
import { wxChooseImage, wxUploadImage, isEmpty, isEmptyStr ,wxUploadQrcode} from '../util/common.js'
export default {
    components: { SHeader },
    data() {
        return {
            choiceOrg:'',
            orgNumber:'',//住院号
        }
    },
    activated() {
        let self=this;
        self.orgNumber='';
        self.choiceOrg=JSON.parse(self.$route.query.orgData);
        console.log(self.choiceOrg);
    },
    methods: {
        uploadQrcode() {
            let self = this;
            let org=self.choiceOrg;
            try {
                wxUploadQrcode(window.wx).then(function(res) {
                    self.checkOrgQrcode(res,org);//进行住院号匹配
                }).catch(function(res) {
                    Indicator.close();
                });
            } catch (e) {
                console.error(e.message);
            }
        },
        checkOrgQrcode(num,org){
            let self=this;
            http.post('/json/GetUserInfoByOrgNO',{
                orgId:org.orgId,
                orgNO:num
            }).then((res)=>{
                console.log(res);
                if (res.body.rspFlag>=10) {
                    MessageBox.confirm('', {
                        message: '扫描失败，是否手工输入？',
                        title: '提示',
                        confirmButtonText: '手工输入',
                        cancelButtonText: '重新扫描'
                    }).then(action => {
                        if (action == 'confirm') {//手工输入

                        }
                    }).catch(err => {
                        if (err == 'cancel') {
                            self.uploadQrcode(org);//重新扫描二维码
                        }
                    });
                } else if(res.body.rspFlag==1){
                    eventBus.$emit('service', { theUrl: 'index' });
                    self.$router.push({ path: '/hospitalorder', query: { autowrite: 1,orgData:JSON.stringify(org) } });
                }else {
                    eventBus.$emit('service', { theUrl: 'index' });
                    self.$router.push({ path: '/hospitalorder', query: { qrdata: res.body, preway:'qrcode'} });
                }
            })
        },
        orderGoback() {
            this.$router.push({ path: '/index' });
        },
        checkOrg(){
            let self=this;
            if(!self.orgNumber){
                Toast({ message: "请输入住院号", duration: 1000 });
                return false;
            }
            if(self.orgNumber.length!=10){
                Toast({ message: "请输入10位数的住院号", duration: 1000 });
                return false;
            }
            http.post('/json/GetUserInfoByOrgNO',{
                orgId:self.choiceOrg.orgId,
                orgNO:self.orgNumber
            }).then((res)=>{
                if (res.body.rspFlag>=10) {
                   Toast({ message: "未查询到住院号", duration: 1000 });
                    return false;
                }else if(res.body.rspFlag==1){
                    MessageBox.confirm('', {
                        message: '<p style="text-align:center;">未查询到该被陪护人的住院信息，</p><p style="text-align:center;">是否继续下单？</p>',
                        // title: '提示',
                        confirmButtonText: '继续下单',
                        cancelButtonText: '重新输入'
                    }).then(action => {
                        if (action == 'confirm') {//继续下单
                            self.choiceOrg['orgNO']=self.orgNumber;
                            self.$router.push({ path: '/hospitalorder', query: { autowrite: 1,orgData:JSON.stringify(self.choiceOrg) } });
                            eventBus.$emit('service', { theUrl: 'index' });
                        }
                    }).catch(err => {
                        if (err == 'cancel') {//重新输入
                        }
                    });
                }else{
                    eventBus.$emit('service', { theUrl: 'index' });
                    self.$router.push({ path: '/hospitalorder', query: { qrdata: res.body, preway:'qrcode'} });
                }
            })
        },
    },
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';
#his-input{
    text-align: left;
}
p{
    line-height: pxrem(30px);
    background: #F8F8F8;
    padding-left: pxrem(20px);
    color: rgba(0,0,0,0.5);
    font-family: PingFangSC-Regular;
    font-size: pxrem(12px);
}
.orgnum-input{
    position: relative;
    line-height: pxrem(40px);
    height: pxrem(40px);
    background: #fff;
    padding-left: pxrem(20px);
    font-size: pxrem(15px);
    input{
        display: inline-block;
        margin-left:pxrem(10px);
        width: 60%;
        height: 80%;
        line-height: pxrem(40px);
        font-size: pxrem(15px);
    }
    i{
        position: absolute;
        width:pxrem(25px);
        height: pxrem(25px);
        right: pxrem(35px);
        top:50%;
        transform: translateY(-50%);
        background-image: url('https://s.1-1dr.com/static/mobile/img/qrcode.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
    }
}
.btn-submit{
    margin:pxrem(60px) pxrem(35px) 0 pxrem(35px);
    p{
        padding: pxrem(15px) 0;
        text-align: center;
        background: #2BD6BD;
        box-shadow: 0 pxrem(1px) pxrem(10px) 0 rgba(19,27,51,0.10);
        border-radius: pxrem(12px);
        color: #fff;
        font-size: pxrem(18px);
    }
    
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
</style>