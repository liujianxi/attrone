<template>
    <div id="hospital-photo">
        <div id="orderHead">
            <s-header type="0" title="住院护理" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()">
                <i class="l-more-black"></i>
            </div>
        </div>
        <section class="photo-main">
            <div class="photo-content">
                <div class="img-box">
                    <div class="photo-img" @click="getPhoto()">
                        <span v-if="!idPic"></span>
                        <p v-if="!idPic">点击上传照片</p>
                        <img :src="idPic" v-if="idPic"></img>
                    </div>
                </div>
                <p class="danger_text">竖着手机拍，识别率更高!</p>
                <p class="please_text">请拍摄住院手环或入院通知书！</p>
            </div>
            <p @click="hospitalOrder()">
                <span>跳过拍摄，手工输入</span>
            </p>
        </section>

    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { wxChooseImage, wxUploadImage, isEmpty, isEmptyStr } from '../util/common.js';
import { uploadWxImg, recognizeIDCard } from '../service/api.js';
import http from '../service/api.js';
import eventBus from '../service/eventbus.js';
import {wxGetPosition, amapGetPosition,} from "../util/common.js";
export default {
    components: { SHeader },
    data() {
        return {
            preway: '',
            idPic: '',
            choiceOrg:{},
        }
    },
    created(){
        let self=this;
        //获取地理位置后加载首页数据
        if(window.nearestOrg.orgId==''||window.nearestOrg.orgName==''){
            self.getPosition().then(function() {
                self.loadHome();
                }).catch(function() {
                self.loadHome();
            });
        }else{
            self.choiceOrg=JSON.parse(self.$route.query.orgData);
        }
    },
    activated() {
        this.preway = this.$route.query.preway;
        this.idPic = '';
        console.log(this.choiceOrg);
    },
    methods: {
        loadHome() {
        var self = this;
        //拼接参数，发送请求
        http.post("/json/GetSettings", {
                lat: window.position.lat,
                lng: window.position.lng,
                adcode: window.position.adcode,
                cityCode: window.position.citycode
            })
            .then(function(res) {
                if(self.preway=='hoslocation'){//从医院选择处过来
                    self.choiceOrg=JSON.parse(self.$route.query.orgData);
                }else{
                    self.choiceOrg = res.body.nearestOrg;
                }
            });
        },
        hospitalOrder() {
            let hdata = {
                // age: 40,
                name: '黄云霞',
                // orgId: 10030,
                // orgNO: '0000363580',
                orgName: '中山大学附属肿瘤医院',
                // branchName: '内一区',
                // admissionDate: '2017-01-19',
                // sex: 2
            }
            let self=this;
            this.$router.push({ path: '/hospitalorder', query: { autowrite: 1,orgData:JSON.stringify(self.choiceOrg)} });
            eventBus.$emit('service', { theUrl: 'index' });
        },
        getPhoto() {
            dplus.track(["_trackEvent", '住院手环/入院通知书上传', "点击", "", 0, ""]);
            let self = this;
            wxChooseImage(window.wx).then(function(res) {
                // console.info('Common.wxChooseImage back!');
                var mediaId = res.localIds[0];
                self.idPic = mediaId;
                // console.info('Common.wxChooseImage back!' + JSON.stringify(res));
                Indicator.open({
                    text: '正在上传照片...',
                    spinnerType: 'fading-circle'
                });
                return wxUploadImage(window.wx, mediaId);
            }).then(function(res) {
                // console.info('Common.wxUploadImage back!');
                var serverId = res.serverId;
                // console.info('Common.wxUploadImage back!' + JSON.stringify(res));
                //将微信照片id上传给后端
                return http.post('/json/GetImageToWx', { mediaId: serverId, type: 'hosipatalImg' })
                // uploadWxImg(self,serverId,'idcard');
            }).then(function(res) {
                //    				 console.info('/json/GetImageToWx back!');
                Indicator.close();
                Indicator.open({
                    text: '正在识别照片...',
                    spinnerType: 'fading-circle'
                });
                var params = {
                    imgId: res.body.imgId,
                    imgUrl: res.body.imgUrl,
                    // side: 1
                };
                return http.post('/json/OrgNORecognize', params)
                // return recognizeIDCard(self,imgId);
            }).then(function(res) {
                console.log('OrgNORecognize');
                console.log(res);
                Indicator.close();
                if (res.body.hospitalBra.name == '' || res.body.hospitalBra.name == undefined || res.body.hospitalBra.orgNO == '' || res.body.hospitalBra.orgNO == undefined) {
                    MessageBox.confirm('', {
                        message: '图片识别失败，是否手工输入？',
                        title: '提示',
                        confirmButtonText: '手工输入',
                        cancelButtonText: '重新拍照'
                    }).then(action => {
                        if (action == 'confirm') {//手工输入
                            self.$router.push({ path: '/hospitalorder' });
                            eventBus.$emit('service', { theUrl: 'index' });
                        }
                    }).catch(err => {
                        if (err == 'cancel') {//重新拍照
                            self.getPhoto();
                        }
                    });
                } else {
                    eventBus.$emit('service', { theUrl: 'index' });
                    self.$router.push({ path: '/hospitalorder', query: { data: res.body.hospitalBra } });
                }
            }).catch(function(res) {
                Indicator.close();
                //  				Toast({message: '身份证上传失败！'+res.msg});
            });
        },
        orderGoback() {
            this.$router.push({ path: '/index' });
        },
        getPosition: function() {
            var self = this;
            return new Promise(function(resolve, reject) {
            wxGetPosition(window.wx)
                .then(function(res) {
                    //微信定位获取经纬度
                    console.log(res);
                    window.position.lat = res.lat; //经度
                    window.position.lng = res.lng; //纬度
                    return amapGetPosition(window.amap, [res.lng, res.lat]);
                })
                .then(function(res) {
                    //高德地图根据经纬度获取adcode
                    window.position.adcode = res.adcode; //区域编号
                    window.position.citycode = res.citycode; //城市编码
                    resolve();
                })
                .catch(function() {
                    console.info('getPosition catch come in!');
                    reject();
                });
            });
        },
    }
}
</script>
<style scoped lang="scss">
@import '../assets/css/global.scss';
@import '../assets/css/little.scss';
@import '../assets/css/order.scss';
#hospital-photo {
    background-image: linear-gradient(-135deg, #14CBC9 0%, #18D9BC 51%, #3ADDB0 100%);
    .photo-main {
        padding: pxrem(58px) pxrem(10px) 0 pxrem(10px);
        .photo-content {
            position: relative;
            height: pxrem(290px);
            background: #fff;
            box-shadow: 0 pxrem(1px) pxrem(10px) 0 rgba(19, 27, 51, 0.10);
            border-radius: pxrem(12px);
            .img-box {
                padding: pxrem(60px) pxrem(75px) 0 pxrem(75px);
                .photo-img {
                    border: pxrem(3px) dashed #2BD6BD;
                    width: 100%;
                    height: pxrem(125px);
                    border-radius: pxrem(15px);
                    span {
                        margin: pxrem(27px) pxrem(78px) 0 pxrem(78px);
                        display: block;
                        width: pxrem(51px);
                        height: pxrem(40px);
                        background-image: url('https://s.1-1dr.com/static/mobile/img/wechat/hospital-img-2.png');
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        -webkit-background–size: cover;
                        -moz-background–size: cover;
                        -o-background–size: cover;
                    }
                    p {
                        font-size: pxrem(14px);
                        margin-top: pxrem(20px);
                        color: #2BD6BD;
                        letter-spacing: pxrem(1px);
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .please_text {
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                padding: pxrem(15px) 0;
                font-size: pxrem(16px);
                color: #FF3366;
                border-top: pxrem(1px) solid #f0f0f0;
            }
            .danger_text {
                width: 100%;
                position: absolute;
                left: 0;
                bottom: pxrem(60px);
                font-size: pxrem(16px);
                color: #2BD6BD;
            }
        }
        >p {
            margin-top: pxrem(24px);
            background: #FFFFFF;
            box-shadow: 0 pxrem(1px) pxrem(10px) 0 rgba(19, 27, 51, 0.10);
            border-radius: pxrem(12px);
            span {
                display: block;
                padding: pxrem(18px) pxrem(80px);
                font-size: pxrem(20px);
                color: #2BD6BD;
                letter-spacing: pxrem(0.38px);
            }
        }
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