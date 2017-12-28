<template>
    <div id="yu-e">
        <s-header :type="preway=='wechat'?'3':'7'" title="钱包余额" @rightCall="moneyQues()"></s-header>
        <div class="main">
            <i class="wallet"></i>
            <p class="ye-tit">钱包余额 （元）</p>
            <p class="ye-num">{{totalAccount}}元</p>
            <button type="button" class="rc y-btn" @click="goRecharge()">充值</button>
            <button type="button" class="tx y-btn" @click="goTiXian()">提现</button>
            <p class="check-card" @click="bankCard()">查看银行卡></p>
        </div>
        <div :class="['true-name-bg',truename?'showname':'']"></div>
        <div :class="['true-name',truename?'showname':'']">
            <p>根据《非银行支付机构网络支付业务管理办法》要求，网上提现需实名认证</p>
            <div>
                <div @click="truename=false">返回</div>
                <div @click="goTrue()">去实名</div>
            </div>
        </div>
    </div>
</template>
<script>
import SHeader from "./SHeader.vue";
import { Toast } from "mint-ui";
import http from "../service/api.js";
import eventBus from "../service/eventbus.js";

export default {
  components: { SHeader },
  data() {
    return {
      truename: false,
      preway: "",
      totalAccount: 0.0, //余额,
      hasCash: true,
      bankNum: 0,
      isReal: true
    };
  },
  created() {
    //      dplus.track(["_trackEvent", '余额页面', "浏览", "", 0, ""]);
  },
  activated() {
    var self = this;
    this.preway = this.$route.query.preway;
    this.initUser();
    http.post("/json/GetUserAccount").then(function(res) {
      self.totalAccount = res.body.totalAccount;
    });
  },
  methods: {
    initUser() {
      let self = this;
      http.post("/json/GetUserInfo").then(res => {
        self.isReal = res.body.isReal;
        self.hasCash = res.body.hasCash;
        self.bankNum = res.body.bankNum;
      });
    },
    goRecharge() {
      var self = this;
      eventBus.$emit("goRecharge", { count: self.account });
      this.$router.push({ path: "/recharge" });
    },
    goTiXian() {
      let self = this;
      if (self.totalAccount <= 0) {
        Toast({
          message: "可提现金额为0元",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (!self.hasCash) {
        self.$router.push({ path: "/tixian" });
      } else {
        if (!self.isReal) {
          //去实名
          self.truename = true;
        } else {
          if (!self.bankNum) {
            self.$router.push({ path: "/bankcard" });
          } else {
            self.$router.push({ path: "/tixian" });
          }
        }
      }
    },
    moneyQues() {
      this.$router.push({ path: "/bankquestion" });
    },
    goTrue() {
      let self = this;
      self.truename = false;
      this.$router.push({ path: "/verfiedcard" });
    },
    bankCard() {
      let self = this;
      if (!self.isReal) {
        //去实名
        self.truename = true;
      } else {
        this.$router.push({ path: "/bankcard" });
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
.showname {
  display: block !important;
}

#yu-e {
  display: flex;
  flex-direction: column;
  position: relative;
  .true-name-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(29, 29, 38, 0.35);
    z-index: 900;
  }
  .true-name {
    display: none;
    width: pxrem(300px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: pxrem(12px);
    z-index: 991;
    p {
      text-align: left;
      padding: pxrem(26px) pxrem(20px) pxrem(23px) pxrem(20px);
      font-size: pxrem(15px);
      color: rgba(29, 29, 38, 0.5);
      line-height: pxrem(20px);
      border-bottom: 1px solid rgba(19, 27, 51, 0.05);
    }
    > div {
      height: pxrem(40px);
      display: flex;
      display: -webkit-flex;
      > div {
        color: #2bd6bd;
        font-size: pxrem(15px);
        line-height: pxrem(40px);
        flex: 1;
        -webkit-flex: 1;
      }
      > div:nth-child(1) {
        color: rgba(29, 29, 38, 0.5);
      }
    }
  }
}

.main {
  text-align: center;
  flex: 1;
  background-color: #fff;
  padding-bottom: 0;
}

.check-card {
  margin-top: pxrem(25px);
  text-decoration: underline;
  font-size: pxrem(16px);
  color: #4a90e2;
}

.wallet {
  display: block;
  width: px2rem(203px);
  height: px2rem(178px);
  padding: px2rem(140px) 0 px2rem(86px) 0;
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/illustrate1.png") no-repeat;
  background-position: center px2rem(140px);
  background-size: 100% auto;
  margin: 0 auto;
}

.ye-tit {
  font-size: px2rem(36px);
  color: #333;
  margin-bottom: px2rem(30px);
}

.ye-num {
  font-size: px2rem(60px);
  color: #ffc360;
  margin-bottom: px2rem(120px);
}

.y-btn {
  display: block;
  width: px2rem(600px);
  height: px2rem(86px);
  line-height: px2rem(86px);
  text-align: center;
  font-size: px2rem(36px);
  margin: 0 auto;
  border-radius: px2rem(3px);
}

.rc {
  color: #fff;
  background-color: #2bd6bd;
}

.tx {
  box-sizing: border-box;
  background-color: #fff;
  color: #2bd6bd;
  border: px2rem(2px) solid #2bd6bd;
  margin-top: px2rem(50px);
}
</style>