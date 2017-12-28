<template>
    <div id="order">
        <div id="orderHead">
            <s-header type="0" title="订单详情" :hasBack='false'> </s-header>
            <div class="orderBack" @click="orderGoback()">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main" v-if="true">
            <div class="he">
                <div class="pak-name">{{orderdata.service}}</div>
                <div class="nopay" v-if="orderdata.statusStr=='待付款'">
                    <p class="red">待付款</p>
                    <p>{{expireDesc}}</p>
                </div>
                <div v-if="orderdata.statusStr=='已取消'" class="gray">已取消</div>
                <div v-if="orderdata.statusStr=='待派工'" class="orange">待派工</div>
                <div v-if="orderdata.statusStr=='待服务'" class="orange">待服务</div>
                <div v-if="orderdata.statusStr=='服务中'" class="green">服务中</div>
                <div v-if="orderdata.statusStr=='待结算'" class="red">待结算</div>
                <div v-if="orderdata.statusStr=='待评价'" class="orange">待评价</div>
                <div v-if="orderdata.statusStr=='已评价'" class="gray">已评价</div>
                <div v-if="orderdata.statusStr=='待评估'" class="orange">待评估</div>
            </div>
            <div class="ban">
                <div class="ban-txt">
                    <p>订单号：{{orderdata.orderId}}</p>
                    <p>下单时间：{{orderdata.createTime}}</p>
                </div>
                <i></i>
            </div>
            <div class="fro forro">
                <p class="lef">
                    <i class="contact-i"></i>
                    <span class="tit">联系人</span>
                    <span class="txt" v-if="orderdata.contactName!=undefined&&orderdata.contactName.length<8&&orderdata.orderType==1">{{orderdata.contactName}}</span>
                    <span class="txt" v-if="orderdata.contactName!=undefined&&orderdata.contactName.length<8&&orderdata.orderType!=1">{{orderdata.addrContacts}}</span>
                </p>
                <p class="rig">
                    <i class="phone-i"></i>
                    <span>
                        <i class="tit">电话</i>
                        <span class="txt" v-if="orderdata.contactPhone!=''&&orderdata.contactPhone!=undefined">{{orderdata.contactPhone}}</span>
                        <span class="txt" v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                </p>
            </div>
            <div class="sro">
                <div>
                    <i class="pos-i"></i>
                </div>
                <div class="sro-txt">
                    <p class="tit">服务地点</p>
                    <p class="txt" v-if="orderdata.location!=undefined">{{orderdata.locationMinute}}</p>
                    <p class="txt" v-if="orderdata.location==undefined">{{(orderdata.hospital || '')+'&nbsp;&nbsp;'+(orderdata.branch||'')+'　　'+(orderdata.bed||'')}}</p>
                </div>
            </div>
            <div class="sro">
                <div>
                    <i class="clock-i"></i>
                </div>
                <div class="sro-txt">
                    <p class="tit">预约时间</p>
                    <p class="txt">{{orderdata.serviceTime}}</p>
                </div>
            </div>
            <div class="sro start-time" v-if="orderdata.status>=3">
                <div>
                    <i class="startclock-i"></i>
                </div>
                <div class="sro-txt">
                    <p class="tit">服务开始时间</p>
                    <p class="txt">{{orderdata.orderStartTime}}</p>
                </div>
            </div>
            <div class="forro">
                <p class="lef">
                    <i class="be-ser-i"></i>
                    <span class="tit">被服务人</span>
                    <span class="txt">{{orderdata.kinsName}}</span>
                </p>
                <p class="rig">
                    <i class="ser-i"></i>
                    <span>
                        <i class="tit">服务人员</i>
                        <span class="txt" v-if="orderdata.serviceStaff!=undefined">{{orderdata.serviceStaff}}</span>
                        <span class="txt" v-if="orderdata.serviceStaff==undefined">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                </p>
            </div>
            <div class="forro org-num" v-if="orderdata.orderType==1">
                <p class="lef">
                    <i class="be-org-i"></i>
                    <span class="tit">住院号</span>
                    <span class="txt">{{orderdata.orgNO}}</span>
                </p>
            </div>
            <div class="pay-detail" v-if="orderdata.statusStr=='待付款'">
                <div>支付明细</div>
                <div>
                    <span>预付款</span>
                    <span class="rig"> {{data.prePayAmount}}元</span>
                </div>
                <div v-if="data.hasEntranceFee">
                    <span>门禁卡押金</span>
                    <span class="rig"> {{data.entranceFee}}元</span>
                </div>
                <div>
                    <span>总金额：</span>
                    <span class="num">{{data.needPay}}</span>
                    <span>元</span>
                </div>
            </div>

            <div class="butie-block" v-if="orderdata.statusStr=='服务中'||orderdata.statusStr=='待结算'">
                <div>
                    <p class="lef">
                        <span>消费总额</span>
                        <span class="num orange"> {{confirmCost}} </span>
                        <span>元</span>
                    </p>
                    <p class="rig">
                        <span>预付款</span>
                        <span class="num orange"> {{orderdata.preRealFee}} </span>
                        <span>元</span>
                    </p>
                </div>
            </div>
            <div class="butie-block" v-if="insureType==1">
                <div>
                    <p class="lef">
                        <span>补贴余额:</span>
                        <span class="num orange"> {{insureAccount}} </span>
                        <span>元</span>
                    </p>
                    <p class="rig" @click="goLongDetail()">
                        <span class="look-detail">查看补贴明细</span>
                        <i class="r-more-green"></i>
                    </p>
                </div>
            </div>
            <div class="butie-list-block" v-if="orderdata.updateTime!=undefined&&orderdata.reviseFee!=undefined">
                <dl>
                    <dd>
                        <div>
                            <div>
                                <p>附加服务调整</p>
                                <p>服务调整时间：{{orderdata.updateTime}}</p>
                                <p>调减金额：{{orderdata.reviseFee}}元</p>
                            </div>
                        </div>
                        <p>
                            <span class="rig look-detail" @click="serviceAdjust()">
                                <span>查看明细</span>
                                <i class="r-more-green"></i>
                            </span>
                        </p>
                    </dd>
                </dl>
            </div>
            <div class="butie-list-block" v-if="orderdata.statusStr=='服务中'||orderdata.statusStr=='待结算'||orderdata.status==5||orderdata.status==6">
                <dl>
                    <dd v-for="(item,key) in serviceData" :key='key'>
                        <div @click="orderdata.status!=4?serviceStuff(key):''">
                            <div v-if="orderdata.status!=4&&item.payState!=1">
                                <i class="check-i" :settleDate='item.settleDate'></i>
                            </div>
                            <div>
                                <p>服务时间：{{item.serviceTime}}</p>
                                <p>消费金额：{{item.confirmCostStr}} 元</p>
                                <p>已缴金额：{{item.paidFeeStr}} 元</p>
                                <p>
                                    <span>待缴金额：{{item.needPayStr}} 元</span>
                                </p>
                            </div>
                        </div>
                        <p>
                            <span class="rig look-detail" @click="dayDetail()">
                                <span>查看明细</span>
                                <i class="r-more-green"></i>
                            </span>
                        </p>
                        <div v-if="item.payState==1" class="order-paid">
                            <img src="https://s.1-1dr.com/static/mobile/img/wechat/order-hadpaid.png">
                        </div>
                    </dd>
                </dl>
            </div>

            <div class="pay-ways" v-if="orderdata.statusStr=='待付款'">
                <div class="pay-tit">支付方式</div>
                <div :class="['qb','pay-it',data.usePurse?'':'unpaid']" @click="data.usePurse?initPay('qb'):''">
                    <i class="qb-i"></i>
                    <span>钱包支付</span>
                    <div class="yu-e" v-if='data.usePurse'>余额{{data.purse}}元</div>
                    <div class="yu-e" v-else>钱包余额不足</div>
                    <i :class="[moneyselect=='qb'?'select':'','gou']"></i>
                </div>
                <div class="wx pay-it" @click="initPay('wx')">
                    <i class="wx-i"></i>
                    <span>微信支付</span>
                    <i :class="[moneyselect=='wx'?'select':'','gou']"></i>
                </div>
            </div>
            <div class="he danger-text" v-if="dangerText!=''&&orderdata.status==0">
                <p>{{dangerText}}</p>
            </div>
        </div>
        <div :class="['order-pay',!payment?'grayBac':'']" v-if="orderdata.statusStr=='服务中'||orderdata.statusStr=='待结算'||orderdata.statusStr=='待支付'" @click="goPay('ordersettle')">
            <span>支 付</span>
        </div>
        <div class="order-pay" v-if="orderdata.status==4" @click="goPay('willsettle')">
            <span>结算</span>
        </div>
        <div class="order-pay" v-if="orderdata.status==5" @click="goStar(0)">
            <span>去评价</span>
        </div>
        <div class="order-pay" v-if="orderdata.status==6" @click="goStar(1)">
            <span>查看评价</span>
        </div>
        <div class="order-fix-bot" v-if="orderdata.statusStr!='待结算'&&orderdata.statusStr!='待支付'&&orderdata.statusStr!='服务中'&&orderdata.statusStr!='已取消'&&orderdata.statusStr!='已评价'&&orderdata.statusStr!='待评价'||orderdata.statusStr=='待服务'||orderdata.statusStr=='待评估'">
            <button class="sbtn black" v-if="orderdata.statusStr!='待派工'&&orderdata.statusStr!='待评估'&&orderdata.statusStr!='待服务'&&expireDesc!='订单已过期'&&orderdata.statusStr!='服务中'&&orderdata.statusStr!='待评价'&&orderdata.statusStr!='已取消'" @click="cancelPay()">取消订单</button>
            <a class="sbtn orange" v-if="orderdata.statusStr=='待派工'||orderdata.statusStr=='待服务'||orderdata.statusStr=='待评估'" :href="'tel:'+orderdata.kfPhone">电话催单</a>
            <button class="sbtn red" v-if="orderdata.statusStr=='待付款'&&expireDesc!='订单已过期'" @click="goPay('preamount')">去支付</button>
            <!-- <button class="sbtn black" v-if="orderdata.statusStr=='待评价'||orderdata.statusStr=='已评价'" @click="goOrderDetail()">查看详情</button> -->
        </div>
    </div>
</template>
<script>
import SHeader from "./SHeader.vue";
import OrderBody from "./OrderBody.vue";
import http from "../service/api.js";
import { DOPAY_URL } from "../service/api.js";
import { MessageBox } from "mint-ui";
export default {
  components: { SHeader, OrderBody },
  data() {
    return {
      orderId: "",
      data: "",
      timer: null,
      orderdata: "", //data.order.order//数据
      moneyselect: "qb",
      purse: "", ///账户余额,
      serviceData: "",
      confirmCost: "", //消费总额
      payment: false, //true 选择项目
      selectmonths: "",
      insureType: "", //根据长护险类型判断是否补贴
      insureAccount: "",
      usePurse: true,
      dangerText: ""
    };
  },
  created() {
    //      dplus.track(["_trackEvent", '订单详情页', "浏览", "", 0, ""]);
  },
  computed: {
    expireDesc: function() {
      let self = this;
      if (this.data == null) return;
      if (this.data.expire <= 0 && this.orderdata.status == 0) {
        self.initPrePayDetail();
        return "订单已过期";
      } else {
        var ex = Math.floor(this.data.expire / 1000);
        var se = ex % 60;
        var rse = Math.floor(ex / 60);
        var mi = rse % 60;
        var ho = Math.floor(rse / 60);
        se = se < 10 ? "0" + se : se;
        mi = mi < 10 ? "0" + mi : mi;
        ho = ho < 10 ? "0" + ho : ho;
        return "剩余时间：" + ho + "小时" + mi + "分钟" + se + "秒";
      }
    }
  },
  activated() {
    this.orderId = this.$route.query.orderid;
    this.initPrePayDetail();
    this.payment = false;
    this.usePurse = true;
    var iconNode = document.querySelectorAll(".check-i"); //初始化勾选
    if (iconNode.length) {
      for (var i = 0; i < iconNode.length; i++) {
        iconNode[i].className = "check-i";
      }
    }
  },
  deactivated() {
    clearInterval(this.timer);
  },
  methods: {
    serviceAdjust() {
      let self = this;
      this.$router.push({
        path: "/serviceadjust",
        query: { id: self.orderId }
      });
    },
    goPay(str) {
      //服务中ordersettle//结算,支付order//支付预交金preamount//
      //,支付预交金 - PAY_PREAMOUNT,结算,支付订单 - PAY_ORDER, 中途支付订单-PAY_ORDERSETTLE
      var self = this;
      console.log("str:   " + str);
      var op;
      var payType = 2;
      if (str == "ordersettle" || str == "willsettle") {
        //服务中，待结算
        dplus.track([
          "_trackEvent",
          self.orderdata.statusStr + "-去支付按钮",
          "点击",
          "",
          0,
          ""
        ]);
        if (str == "willsettle") {
          //待结算默认全选中
          self.payment = true;
          let month_arr = [];
          self.serviceData.forEach(function(item, index) {
            month_arr.push(item.settleDate);
          });
          self.selectmonths = month_arr.join(",");
        }
        if (self.payment) {
          op = "PAY_ORDERSETTLE";
          self.$router.push({
            path: "/checkdetail",
            query: { orderid: self.orderId, op: op, months: self.selectmonths }
          });
        }
      } else {
        //刚下完订单待付款
        dplus.track([
          "_trackEvent",
          self.orderdata.statusStr + "-去支付按钮",
          "点击",
          "",
          0,
          ""
        ]);
        if (self.moneyselect == "wx") {
          //微信支付
          op = "PAY_PREAMOUNT";
          var cburl =
            "https://" +
            window.location.host +
            "/mobile/index.html#/handleresult?money=" +
            self.data.needPay +
            "&orderId=" +
            self.orderId +
            "&typeStr=unpaid";
          cburl = encodeURIComponent(cburl);
          var url =
            DOPAY_URL +
            "?payType=2&operation=" +
            op +
            "&orderId=" +
            self.orderId +
            "&cburl=" +
            cburl;
          window.location.href = url;
        } else {
          //钱包支付
          let payType = 6;
          http
            .post("/json/DoPay", {
              operation: "PAY_PREAMOUNT",
              payType: payType,
              orderId: self.orderId
            })
            .then(res => {
              self.$router.push({
                path: "/handleresult",
                query: {
                  money: self.data.needPay,
                  orderId: self.orderId,
                  success: 1,
                  wallet: "order",
                  typeStr: "unpaid"
                }
              });
            });
        }
      }
    },
    initPrePayDetail() {
      //支付预交金
      var self = this;
      http
        .post("/json/PrePayAmountDetail", {
          orderId: self.orderId
        })
        .then(dt => {
          self.data = dt.body;
          self.purse = self.data.purse;
          self.dangerText = self.data.payHint || "";
          self.usePurse = self.data.usePurse;
          if (self.usePurse) {
            self.moneyselect = "qb";
          } else {
            self.moneyselect = "wx";
          }
          self.orderdata = dt.body.order[0];
          if (self.data.expire > 0) {
            //启动计时器
            self.timer = setInterval(() => {
              self.data.expire -= 1000;
            }, 1000);
          }
          if (dt.body.order[0].status > 0) {
            self.initOrderDetail(); //服务中的数据
          }
        });
    },
    initOrderDetail() {
      //获取订单详情
      let self = this;
      console.log("order:" + self.orderId);
      http
        .post("/json/GetOrderDetail", {
          orderId: self.orderId
        })
        .then(dt => {
          console.log(dt);
          self.orderdata = dt.body.order.order;
          self.serviceData = dt.body.order.voList;
          self.confirmCost = dt.body.order.confirmCost;
          self.insureType = dt.body.order.order.insureType;
          self.insureAccount = dt.body.order.insureAccount;
        });
    },
    goSettlementList(e) {
      this.$router.push({ path: "/settlementlist" });
      e.stopImmediatePropagation();
    },
    initPay(str) {
      this.moneyselect = str; //选择支付方式
    },
    cancelPay() {
      var self = this;
      dplus.track(["_trackEvent", "取消订单按钮", "点击", "", 0, ""]);
      MessageBox.confirm("是否取消").then(res => {
        if (res == "confirm") {
          clearInterval(self.timer);
          http
            .post("/json/CancelOrder", {
              orderId: self.orderId
            })
            .then(dt => {
              Toast({ message: '成功取消' , duration: 1000 });
              self.$router.push({ path: "/orderlist" });
            });
        }
      });
    },
    serviceStuff(key) {
      var self = this;
      console.log(key);
      var iconNode = document.querySelectorAll(".check-i");
      if (iconNode[key].className == "check-i") {
        iconNode[key].className = "select check-i";
      } else {
        iconNode[key].className = "check-i";
      }
      var selectNode = document.querySelectorAll(".select.check-i");
      var strmonths = [];
      for (var i = 0; i < selectNode.length; i++) {
        strmonths.push(selectNode[i].getAttribute("settleDate"));
      }
      self.selectmonths = strmonths.join(",");
      console.log(self.selectmonths);
      if (selectNode.length) {
        self.payment = true;
      } else {
        self.payment = false;
      }
    },
    orderGoback() {
      this.$router.push({ path: "/orderlist" });
    },
    dayDetail() {
      this.$router.push({
        path: "/daydetail",
        query: { orderid: this.orderId }
      });
    },
    goOrderDetail() {
      let self = this;
      // let op = 'PAY_ORDERSETTLE';
      // this.$router.push({ path: '/daydetail', query: { orderid: this.orderId } });
      this.$router.push({
        path: "/orderDetail",
        query: { orderid: this.orderId }
      });
    },
    goStar(i) {
      //      	this.$router.push({path:'/handleresult',query:{orderid:this.orderId,type:i}});
      this.$router.push({
        path: "/assess",
        query: { orderid: this.orderId, type: i }
      });
    },
    goLongDetail() {
      dplus.track([
        "_trackEvent",
        this.orderdata.statusStr + "-长护险补贴按钮",
        "点击",
        "",
        0,
        ""
      ]);
      this.$router.push({
        path: "/lpallowance",
        query: { orderId: this.orderId }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/order-common.scss";
@import "../assets/css/little.scss";
@import "../assets/css/payways.scss";
i {
  font-style: normal;
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

.main {
  text-align: left;
  font-size: px2rem(32px);
}

.he {
  background-color: #fff;
  height: px2rem(90px);
  display: -webkit-box;
  -webkit-box-align: center;
  padding: 0 px2rem(30px);

  .pak-name {
    -webkit-box-flex: 1;
    line-height: px2rem(90px);
  }
  .nopay {
    font-size: px2rem(24px);
    text-align: right;

    > p:first-child {
      color: #ff5454;
      margin-bottom: px2rem(10px);
    }
    > p:last-child {
      color: #333;
    }
  }
}

.ban {
  margin-top: px2rem(20px);

  background: -webkit-linear-gradient(left, #14ccc8, #39ddb0);
  min-height: px2rem(150px);
  display: -webkit-box;
  padding: 0 px2rem(60px) 0 px2rem(30px);
  -webkit-box-align: center;

  .ban-txt {
    -webkit-box-flex: 1;
    color: #fff;

    > p:first-child {
      font-size: px2rem(30px);
      margin-bottom: px2rem(10px);
    }
    > p:last-child {
      font-size: px2rem(24px);
    }
  }
  i {
    display: block;
    width: px2rem(185px);
    height: px2rem(127px);
    margin-top: px2rem(15px);
    background: url("https://s.1-1dr.com/static/mobile/img/wechat/banner.png") no-repeat;
    background-size: 100%;
  }
}

.tit {
  color: #999;
}

.txt {
  color: #333;
}

.sro {
  // min-height: px2rem(180px);
  display: -webkit-box;
  padding: px2rem(30px) px2rem(30px); // -webkit-box-align:center;
  background-color: #fff;
  border-bottom: pxrem(1px) solid #e5e5e5;
  i {
    margin-right: px2rem(15px);
  }
  .sro-txt {
    -webkit-box-flex: 1;

    .tit {
      margin-bottom: px2rem(18px);
    }
    .txt {
      line-height: px2rem(48px);
    }
  }
}

.fro,
.tro,
.forro {
  height: px2rem(90px);
  line-height: px2rem(90px);
  background-color: #fff;
  padding: 0 px2rem(30px);
  overflow: hidden;
}

.org-num.forro {
  border-top: pxrem(1px) solid #e5e5e5;
}

.fro {
  border-bottom: 1px solid #e5e5e5;
}

.tro {
  border-top: 1px solid #e5e5e5;
}

.forro {
  position: relative;
  .rig {
    padding-right: px2rem(310px);
    > span {
      position: absolute;
      top: 50%;
      right: px2rem(30px);
      transform: translateY(-50%);
      line-height: 1;
      display: inline-block;
      width: px2rem(300px);
    }
  }
}

.lef {
  float: left;
}

.rig {
  float: right;
}

.contact-i,
.phone-i,
.pos-i,
.clock-i,
.be-ser-i,
.ser-i,
.be-org-i,
.startclock-i {
  display: inline-block;
  width: px2rem(32px);
  height: px2rem(32px);
  vertical-align: middle;
  position: relative;
  top: pxrem(-2px);
}

.contact-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_contact.png") no-repeat;
  background-size: 100% auto;
  margin-right: px2rem(6px);
}

.phone-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_phone.png") no-repeat;
  background-size: 100% auto;
  margin-right: px2rem(6px);
}

.pos-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_adress.png") no-repeat;
  background-size: 100% auto;
}

.clock-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_time.png") no-repeat;
  background-size: 100% auto;
  margin-right: px2rem(6px);
}

.startclock-i {
  margin-right: px2rem(6px);
}

.be-ser-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_service-object.png") no-repeat;
  background-size: 100% auto;
  margin-right: px2rem(6px);
}

.be-org-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_org.png") no-repeat;
  background-size: 100% auto;
  margin-right: px2rem(6px);
}

.ser-i {
  background: url("https://s.1-1dr.com/static/mobile/img/wechat/order_service-people.png") no-repeat;
  background-size: 100% auto;
  margin-right: px2rem(6px);
}

.pay-detail {
  background-color: #fff;
  margin-top: px2rem(20px);
  > div {
    height: px2rem(90px);
    line-height: px2rem(90px);
    padding: 0 px2rem(30px);
    border-bottom: 1px solid #e5e5e5;
  }
  > div:nth-child(2) {
    color: #999;
  }
  > div:nth-child(3) {
    color: #999;
  }
  > div:last-child {
    text-align: right;

    .num {
      color: #ffb93f;
    }
  }
}

.pay-ways {
  margin-top: px2rem(20px);

  .pay-tit {
    height: px2rem(90px);
    line-height: px2rem(90px);
    background-color: #fff;
    padding: 0 px2rem(30px);
    border-bottom: 1px solid #e5e5e5;
  }
}

.butie-block {
  background-color: #fff;
  margin-top: px2rem(20px);

  > div {
    height: px2rem(90px);
    line-height: px2rem(90px);
    padding: 0 px2rem(30px);
    overflow: hidden;
  }
  .see-bt-detail {
    color: #2bd6bd;
  }
}

.butie-list-block {
  padding: px2rem(36px) 0;
  dl {
    margin: 0 px2rem(18px);
  }
  dd {
    margin-bottom: pxrem(15px);
    position: relative;
    background-color: #fff;
    padding: px2rem(50px) px2rem(30px);
    display: -webkit-box;
    font-size: px2rem(28px);
    box-shadow: px2rem(0px) px2rem(3px) px2rem(10px) px2rem(2px) #ccc;
    .order-paid {
      position: absolute;
      top: 0;
      left: 0;
      img {
        width: px2rem(100px);
        height: px2rem(100px);
      }
    }
    > div {
      overflow: hidden;
      position: relative;
    }
    > div > div:first-child {
      float: left;
      height: 100%;
    }
    > div > div:first-child i {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    }
    > div > div:last-child {
      margin-left: px2rem(60px);
      -webkit-box-flex: 1;

      p {
        margin-bottom: px2rem(20px);
      }
      p:last-child {
        margin-bottom: 0;
      }
    }
    > p {
      position: absolute;
      right: px2rem(30px);
      bottom: px2rem(50px);
    }
  }
}

.look-detail {
  color: #2bd6bd;
  font-size: pxrem(16px);
}

.order-fix-bot {
  a {
    display: inline-block;
    line-height: px2rem(64px);
    padding: 0 px2rem(15px);
  }
}

.danger-text {
  font-size: pxrem(14px);
  color: #ff3366;
  p {
    width: 100%;
    text-align: left;
  }
}
</style>