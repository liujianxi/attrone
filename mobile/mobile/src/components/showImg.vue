<template>
    <div id="show-img" class="page">
        <div id="orderHead">
            <s-header type="0" title="图片查看"></s-header>
            <p class='img-more' @click="getType()">更多</p>
        </div>
        <div class="pic-mask">
            <img :src="imgLink">
        </div>
    </div>
</template>
<script>
import SHeader from './SHeader.vue'
import { Toast, Indicator, Popup, MessageBox } from 'mint-ui';
import http from '../service/api.js'
import { wxChooseImage, wxUploadImage, isEmpty, isEmptyStr } from '../util/common.js'
import { uploadWxImg, recognizeIDCard } from '../service/api.js'
import eventBus from '../service/eventbus.js';
export default {
    components: { SHeader, Popup },
    data() {
        return {
            imgLink: '',
            picType: '',
            imgId: '',
            imgIdType: '',
            person: {},
        }
    },
    activated() {
        this.person = {};
        this.imgLink = this.$route.query.pic;//'http://sdfaasad'
        this.picType = this.$route.query.picType;//idCardLink_front
        this.imgIdType = this.$route.query.imgIdType;//idPic_front
        this.imgId = this.$route.query.imgId;//'4765491641'
        this.person = this.$route.query.person;
    },
    deactivated() {
        let self = this;
        let params = new Object();
        params[self.picType] = self.imgLink;
        params['type'] = self.picType;
        params[self.imgIdType] = self.imgId;
        if (self.picType == 'idCardLink_front') {
            params['person'] = self.person;
        }
        eventBus.$emit('showImg', { imginfos: params });
    },
    methods: {
        getType() {
            let self = this;
            if (self.picType == 'idCardLink_front') {
                self.uploadIDCard();
            } else {
                self.uploadImg(self.picType, self.imgId);
            }
        },
        uploadImg(str, id) {
            let self = this;
            try {
                wxChooseImage(window.wx).then(function(res) {
                    var mediaId = res.localIds[0];
                    self.imgLink = mediaId;
                    // console.info('Common.wxChooseImage back!mediaId:' + mediaId);
                    Indicator.open({
                        text: '正在上传...',
                        spinnerType: 'fading-circle'
                    });
                    return wxUploadImage(window.wx, mediaId);
                }).then(function(res) {
                    // console.info('Common.wxUploadImage back!' + JSON.stringify(res));
                    var serverId = res.serverId;
                    // console.info('Common.wxUploadImage back!' + JSON.stringify(res));
                    return http.post('/json/GetImageToWx', { mediaId: serverId, type: 'headImg' });
                }).then(function(res) {
                    // console.info('GetImageToWx come in!' + JSON.stringify(res));
                    Indicator.close();
                    if (res.errorCode == 0) {
                        self.imgId = res.body.imgId;
                        Toast({ message: '图片上传' + res.msg });
                    }
                }).catch(function(res) {
                    Indicator.close();
                    Toast({ message: '图片上传成功！' });
                    // Toast({ message: res.msg });
                });
            } catch (e) {
                // console.error(e.message);
            }
        },
        uploadIDCard() {
            var self = this;
            dplus.track(["_trackEvent", '添加申请人上传身份证', "点击", "", 0, ""]);
            wxChooseImage(window.wx).then(function(res) {
                //    				 console.info('Common.wxChooseImage back!');
                var mediaId = res.localIds[0];
                self.imgLink = mediaId;
                console.log(mediaId);
                //    				 console.info('Common.wxChooseImage back!'+JSON.stringify(res));
                Indicator.open({
                    text: '正在上传身份证...',
                    spinnerType: 'fading-circle'
                });
                return wxUploadImage(window.wx, mediaId);
            }).then(function(res) {
                //    				 console.info('Common.wxUploadImage back!');
                var serverId = res.serverId;
                //    				 console.info('Common.wxUploadImage back!'+JSON.stringify(res));
                //将微信照片id上传给后端
                return http.post('/json/GetImageToWx', { mediaId: serverId, type: 'idcard' })
                // uploadWxImg(self,serverId,'idcard');
            }).then(function(res) {
                //    				 console.info('/json/GetImageToWx back!');
                Indicator.close();
                Indicator.open({
                    text: '正在识别身份证...',
                    spinnerType: 'fading-circle'
                });
                self.imgId = res.body.imgId;
                var params = {
                    imgId: res.body.imgId,
                    imgUrl: res.body.imgUrl,
                    side: 1
                };
                return http.post('/json/IDCardRecognize', params)
                // return recognizeIDCard(self,imgId);
            }).then(function(res) {
                Indicator.close();
                Toast({ message: '身份证识别成功！' });
                self.person.sex = res.body.sex;
                self.person.name = res.body.fullName;
                self.person.idCardNo = res.body.idcard;
                self.person.age = res.body.age;
            }).catch(function(res) {
                Indicator.close();
            });
        },
    },
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";
i,
em {
    font-style: normal;
}

#show-img {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
}

.pic-mask {
    flex: 1;
    width: 100%;
    background: rgba(0, 0, 0, 1);
}

img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-height: 100%;
}

#orderHead {
    position: relative;
    height: pxrem(40px);
    width: 100%;
}

.img-more {
    font-size: pxrem(16px);
    position: absolute;
    right: pxrem(20px);
    color: #2BD6BD;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
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

.pp-content {
    width: px2rem(750px);
    text-align: center;
    font-size: pxrem(15px);
    ul {
        li {
            position: relative;
            height: px2rem(108px);
            line-height: px2rem(108px);
            border-bottom: 1px solid #ebebeb;
        }
    }
}
</style>