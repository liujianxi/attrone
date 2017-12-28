<template>
    <div id="editCard">
        <s-header type=0 :title="editType=='add'?'添加银行卡':'修改银行卡'"></s-header>
        <section class="main">
            <div class="main-content">
                <ul>
                    <li>
                        <span>持卡人姓名：</span>
                        <input type="text" placeholder="请输入姓名" v-model="name">
                        <i></i>
                    </li>
                    <li>
                        <span>银行卡号：　</span>
                        <input type="number" placeholder="请输入银行卡号" v-model="cardNO">
                        <i></i>
                    </li>
                    <li>
                        <span>开户支行：　</span>
                        <input type="text" placeholder="请输入开户支行" v-model="bankBranch">
                        <i></i>
                    </li>
                </ul>
                <p>请确认信息准确无误，否则将导致提现失败</p>
            </div>
            <div class="subtn" v-if="editType=='add'" @click="makeEdit('add')">
                <p>确认添加</p>
            </div>
            <div class="subtn" v-if="editType=='change'" @click="makeEdit('change')">
                <p>确认修改</p>
            </div>
        </section>
    </div>
</template>
<script>
import SHeader from "./SHeader.vue";
import { Toast, MessageBox } from "mint-ui";
import http from "../service/api.js";
import eventBus from "../service/eventbus.js";

export default {
  components: { SHeader },
  data() {
    return {
      editType: "",
      cardNO: "",
      name: "",
      bankBranch: ""
    };
  },
  created() {},
  activated() {
    let self = this;
    self.initData();
    self.name = "";
    self.cardNO = "";
    self.bankBranch = "";
  },
  methods: {
    //6212262103000357830
    initData() {
      let self = this;
      self.editType = self.$route.query.str.type;
      if (self.editType == "change") {
        self.name = self.$route.query.str.name;
        self.cardNO = self.$route.query.str.cardNO;
        self.bankBranch = self.$route.query.str.bankBranch;
      }
    },
    makeEdit(str) {
      let self = this;
      if (!self.name) {
        Toast({ message: "请输入持卡人姓名" });
        return false;
      }
      if (!self.cardNO) {
        Toast({ message: "请输入银行卡号" });
        return false;
      }
      if (!self.bankBranch) {
        Toast({ message: "请输入此卡的开户支行" });
        return false;
      }
      if (str == "change") {
        http
          .post("/json/UpdateUserBank", {
            cardholderName: self.name,
            cardNO: self.cardNO,
            bankBranch: self.bankBranch
          })
          .then(res => {
            if (res.errorCode == 0) {
              Toast({ message: "修改成功" });
              self.$router.go(-1);
            }
          });
      } else {
        http
          .post("/json/AddUserBank", {
            cardholderName: self.name,
            cardNO: self.cardNO,
            bankBranch: self.bankBranch
          })
          .then(res => {
            if (res.errorCode == 0) {
              Toast({ message: "添加成功" });
              self.$router.go(-1);
            }
          });
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
#editCard {
  background: #fff;
  font-family: PingFangSC-Light;
}

.main {
  .main-content {
    padding-top: pxrem(96px);
    > p {
      font-size: pxrem(15px);
      color: #ff3366;
      margin-top: pxrem(22px);
      text-align: center;
    }
    ul {
      text-align: left;
      font-size: pxrem(15px);
      color: #1d1d26;
      li {
        line-height: pxrem(50px);
        height: pxrem(50px);
        padding: 0 pxrem(15px);
        border-bottom: pxrem(1px) solid rgba(19, 27, 51, 0.05);
        position: relative;
        i {
          right: pxrem(15px);
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          display: block;
          width: pxrem(15px);
          height: pxrem(15px);
          background: url("https://s.1-1dr.com/static/mobile/img/wechat/mko_edit.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          -webkit-background–size: cover;
          -moz-background–size: cover;
          -o-background–size: cover;
        }
        input {
          font-size: pxrem(15px);
          line-height: pxrem(50px);
          display: inline-block;
          width: 65%;
          height: 80%;
          color: rgba(29, 29, 38, 0.5);
          text-align: right;
        }
      }
    }
  }
  .subtn {
    margin-top: pxrem(100px);
    padding: 0 pxrem(40px);
    p {
      text-align: center;
      padding: pxrem(10px) 0;
      font-size: pxrem(18px);
      color: #2bd6bd;
      border: pxrem(1px) solid #2bd6bd;
      border-radius: pxrem(3px);
    }
  }
}
</style>