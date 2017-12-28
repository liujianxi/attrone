<template>
    <div id="verfiedCard">
        <s-header type=0 title="实名认证"></s-header>
        <section class="main">
            <div class="main-card">
                <div class="card-pic" @click="uploadIDCard()">
                    <div class="nopic" v-if="!idCardLink">
                        <span></span>
                        <p>点击上传您的身份证正面照</p>
                    </div>
                    <div class="idcard-img" v-if="idCardLink">
                        <img :src="idCardLink"></img>
                    </div>
                </div>
            </div>
            <div class="edit-text">
                <ul>
                    <li>
                        <span>真实姓名：</span>
                        <input type="text" placeholder="请输入您的真实姓名" v-model="name">
                    </li>
                    <li>
                        <span>身份证号：</span>
                        <input type="text" placeholder="请输入身份证号" v-model="idCardNo">
                    </li>
                </ul>
            </div>
            <div class="subtn" @click="verfied()">
                <p>认证</p>
            </div>
        </section>
    </div>
</template>
<script>
import SHeader from "./SHeader.vue";
import {
  wxChooseImage,
  wxUploadImage,
  isEmpty,
  isEmptyStr
} from "../util/common.js";
import { uploadWxImg, recognizeIDCard } from "../service/api.js";
import { Toast, Indicator, Popup } from "mint-ui";
import eventBus from "../service/eventbus.js";
import http from "../service/api.js";
export default {
  components: { SHeader },
  data() {
    return {
      idCardLink: "", //身份证链接
      idPic: "", //身份证图片ID
      name: "",
      idCardNo: "",
      idislaw: ""
    };
  },
  created() {},
  activated() {},
  methods: {
    verfied() {
      //UpdateUserInfo
      let self = this;
      let pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
      if (!self.name) {
        Toast({ message: "请输入姓名" });
        return false;
      }
      if (!pattern.test(self.idCardNo)) {
        Toast({ message: "请输入正确的身份证号" });
        return false;
      }
      http
        .post("/json/UpdateUserInfo", {
          idcard: self.idCardNo,
          realName: self.name
        })
        .then(res => {
          if (res.errorCode == 0) {
            Toast({ message: "成功认证" });
            this.$router.go(-1);
          }
        });
    },
    idcheck() {
      let self = this;
      let pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
      if (!pattern.test(self.idCardNo)) {
        self.idislaw = false;
        Toast({ message: "身份证不合法" });
      } else {
        self.idislaw = true;
      }
    },
    showIdCardImg(mediaId) {
      this.idCardLink = mediaId;
    },
    uploadIDCard() {
      let self = this;
      wxChooseImage(window.wx)
        .then(function(res) {
          console.info("Common.wxChooseImage back!");
          var mediaId = res.localIds[0];
          self.showIdCardImg(mediaId);
          console.info("Common.wxChooseImage back!" + JSON.stringify(res));
          Indicator.open({
            text: "正在上传身份证...",
            spinnerType: "fading-circle"
          });
          return wxUploadImage(window.wx, mediaId);
        })
        .then(function(res) {
          //    				 console.info('Common.wxUploadImage back!');
          var serverId = res.serverId;
          //    				 console.info('Common.wxUploadImage back!'+JSON.stringify(res));
          //将微信照片id上传给后端
          return http.post("/json/GetImageToWx", {
            mediaId: serverId,
            type: "idcard"
          });
          // uploadWxImg(self,serverId,'idcard');
        })
        .then(function(res) {
          //    				 console.info('/json/GetImageToWx back!');
          Indicator.close();
          Indicator.open({
            text: "正在识别身份证...",
            spinnerType: "fading-circle"
          });
          self.idPic = res.body.imgId;
          var params = {
            imgId: res.body.imgId,
            imgUrl: res.body.imgUrl,
            side: 1
          };
          return http.post("/json/IDCardRecognize", params);
          // return recognizeIDCard(self,imgId);
        })
        .then(function(res) {
          Indicator.close();
          self.name = res.body.fullName;
          self.idCardNo = res.body.idcard;
        })
        .catch(function(res) {
          Indicator.close();
          //  				Toast({message: '身份证上传失败！'+res.msg});
        });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#verfiedCard {
  background: #fff;
}

.main-card {
  padding: pxrem(20px) pxrem(85px);
  border-bottom: 1px solid rgba(19, 27, 51, 0.05);
  .card-pic {
    height: pxrem(125px);
    border: pxrem(3px) dashed #2bd6bd;
    border-radius: pxrem(15px);
    .nopic {
      span {
        margin: pxrem(30px) pxrem(83px) pxrem(26px) pxrem(84px);
        display: block;
        width: pxrem(41px);
        height: pxrem(35px);
        background-image: url("https://s.1-1dr.com/static/mobile/img/wechat/camera.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        -webkit-background–size: cover;
        -moz-background–size: cover;
        -o-background–size: cover;
      }
      p {
        font-size: pxrem(12px);
        color: #2bd6bd;
      }
    }
    .idcard-img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.edit-text {
  ul {
    li {
      height: pxrem(45px);
      line-height: pxrem(45px);
      text-align: left;
      padding: pxrem(15px) 0 0 pxrem(15px);
      border-bottom: pxrem(1px) solid rgba(19, 27, 51, 0.05);
      span {
        font-size: pxrem(15px);
        color: #1d1d26;
      }
      input {
        display: inline-block;
        width: 70%;
        height: 80%;
        font-size: pxrem(14px);
        color: rgba(29, 29, 38, 0.5);
      }
    }
  }
}

.subtn {
  margin-top: pxrem(72px);
  padding: 0 pxrem(40px);
  p {
    text-align: center;
    padding: pxrem(10px) 0;
    font-size: pxrem(18px);
    color: #fff;
    background: #2bd6bd;
    border-radius: pxrem(3px);
  }
}
</style>