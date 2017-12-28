	<template>
    <div id="hospital-order" class="page">
        <div id="orderHead">
            <s-header type="0" title="住院护理" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()" v-if="preway!='wechat'">
                <i class="l-more-black"></i>
            </div>
        </div>
        <div class="main">
            <div class="row checkMess" v-if="preway!='qrcode'" @click="hospitalPhoto()">
                <span>输入太麻烦? 扫描住院通知书直接获取 </span>
                <i class="more-green"></i>
            </div>
            <!-- 机构订单-选择机构和科室 @click="goHospitalList()"-->
            <div class="addr hos-org" v-if="preway!='qrcode'">
                <span v-if="!isEmpty(choiceOrg)" class="notEmpty">{{choiceOrg.orgName}}</span>
            </div>
            <div class="addr hos-org" v-if="preway=='qrcode'">
                <span class="notEmpty">{{qrdata.orgName}}</span>
            </div>
            <div class="addr" @click="goBranchList()" v-if="preway!='qrcode'">
                <span v-if="kins['branchName']!=undefined&&kins['branchName']!=''" class="notEmpty">
                    {{kins['branchName']}}
                </span>
                <span v-else>请选择科室信息</span>
                <i class="r-more"></i>
            </div>
            <div class="addr" v-if="preway=='qrcode'&&!qrCodeBranchFlag">
                <span class="notEmpty">
                    {{qrdata.branchName}}
                </span>
            </div>
            <div class="addr" @click="goBranchList('qrcode')" v-if="preway=='qrcode'&&qrCodeBranchFlag">
                <span class="notEmpty" v-if="qrdata.branchId!==0&&qrdata.branchId!==undefined&&qrdata.branchId!==''">
                    {{qrdata.branchName}}
                </span>
                <span v-else>请选择科室信息</span>
                <i class="r-more"></i>
            </div>
            <!-- 机构订单-选择机构和科室 -->
            <div class="row time" @click="clickTimeDiv()">
                <!-- <i></i> -->
                <span class="notEmpty ordertime">预约时间</span>
                <span v-if='textDate==""'>请选择开始时间</span>
                <span class="font-black notEmpty" v-else>{{textDate}}&nbsp;{{textTime}}</span>
                <input type="hidden" v-model="serviceStartTime"></input>
                <input type="hidden" v-model="serviceEndTime"></input>
                <i class="r-more"></i>
            </div>
            <div class="subrow">
                <span>被陪护人信息</span>
            </div>
            <div class="care-people" v-if="preway!='qrcode'">
                <p @click="preway!='qrcode'?clickPeople():''">选择已有被陪护人
                    <span v-if="!kins['photoType']">{{kins['name']}}</span>
                    <i class="more-green"></i>
                </p>
            </div>
            <div class="kins" v-if="preway!='qrcode'">
                <span>姓名：</span>
                <input type="text" placeholder="请输入姓名" v-if="kins['photoType']" v-model="kins['name']">
                <span  v-if="!kins['photoType']">{{kins['name']}}</span>
            </div>
            <div class="kins" v-if="preway=='qrcode'">
                <span>姓名：</span>
                <span>{{qrdata.userName}}</span>
            </div>
            <div class="kins" @click="kins['photoType']?clickSex():''" v-if="preway!='qrcode'">
                <span>性别：</span>
                <span v-if="kins['photoType']&&!kins['sex']" class="grey">请选择性别</span>
                <span class="b" v-if="kins['photoType']&&kins['sex']">{{kins['sex'] | sexFilter}}</span>
                <span class="c" v-if="!kins['photoType']">{{kins['sex'] | sexFilter}}</span>
            </div>
            <div class="kins" v-if="preway=='qrcode'">
                <span>性别：</span>
                <span>{{qrdata.sex| sexFilter}}</span>
            </div>
            <div class="kins" v-if="preway!='qrcode'">
                <span>年龄：</span>
                <input type="number" placeholder="请输入年龄" v-if="kins['photoType']" v-model="kins['age']">
                <span v-if="!kins['photoType']">{{kins['age']}}</span>
            </div>
            <div class="kins" v-if="preway=='qrcode'">
                <span>年龄：</span>
                <span>{{qrdata.age}}</span>
            </div>
            <div class="kins" v-if="preway!='qrcode'">
                <span>住院号：</span>
                <input type="number" placeholder="请输入住院号" v-model="kins['orgNO']">
            </div>
            <div class="kins" v-if="preway=='qrcode'">
                <span>住院号：</span>
                <span>{{qrdata.orgNO}}</span>
            </div>
            <div class="kins bed" v-if="preway!='qrcode'">
                <span>床号（没有可不填）</span>
                <input type="text" placeholder="请输入床号 如(19床)" v-model="kins['bedNO']">
            </div>
            <div class="kins bed" v-if="preway=='qrcode'">
                <span>床号（没有可不填）</span>
                <span v-if="qrdata.bedNO!=undefined&&qrdata.bedNO!=''">{{qrdata.bedNO}}</span>
                <input v-if="qrdata.bedNO==undefined||qrdata.bedNO==''" type="text" placeholder="请输入床号 如(19床)" v-model="bedNO">
            </div>
            <div class="kins cometime" @click="clickbirthday()" v-if="preway!='qrcode'">
                <span>入院日期：</span>
                <span placeholder="请输入日期">{{kins['admissionDate']}}</span>
            </div>
            <div class="kins" v-if="preway=='qrcode'">
                <span>入院日期：</span>
                <span>{{qrdata.admissionDate}}</span>
            </div>
            <div class="subrow" v-if="(priceList121.length > 0 || priceList12N.length > 0)&&kins['branchName']!=''">支付项</div>
            <div class="gate-card select down-border" v-if="(priceList121.length > 0 || priceList12N.length > 0)&&kins['branchName']!=''&&preway!='qrcode'">
                <i class="gou-left select"></i>
                <p>陪护预付金
                    <i class="red">(必选)</i>
                </p>
                <span>{{prepayAmount}}元</span>
            </div>
            <div class="gate-card select down-border" v-if="preway=='qrcode'&&qrdata.branchId!==0&&qrdata.branchId!==undefined&&qrdata.branchId!==''">
                <i class="gou-left select"></i>
                <p>陪护预付金
                    <i class="red">(必选)</i>
                </p>
                <span>{{prepayAmount}}元</span>
            </div>
            <div :class="['gate-card',gateChose?'select': '']" @click="checkGate()" v-if="(priceList121.length > 0 || priceList12N.length > 0)&&entranceCardPriceNumber&&preway!='qrcode'">
                <i :class="['gou-left',gateChose?'select': '']"></i>
                <p>办理门禁卡</p>
                <span>{{entranceCardPrice}}元</span>
            </div>
            <div :class="['gate-card',gateChose?'select': '']" @click="checkGate()" v-if="preway=='qrcode'&&qrdata.branchId!==0&&qrdata.branchId!==undefined&&qrdata.branchId!==''&&entranceCardPriceNumber">
                <i :class="['gou-left',gateChose?'select': '']"></i>
                <p>办理门禁卡</p>
                <span>{{entranceCardPrice}}元</span>
            </div>
            <div class="subrow" v-if="(priceList121.length > 0 || priceList12N.length > 0)&&kins['branchName']!=''&&preway!='qrcode'">请选择服务</div>
            <div class="subrow" v-if="preway=='qrcode'&&qrdata.branchId!==0&&qrdata.branchId!==undefined&&qrdata.branchId!==''">请选择服务</div>
            <div class="ser-choose" v-if="(priceList121.length > 0 || priceList12N.length > 0)&&isOrgSev&&kins['branchName']!=''&&preway!='qrcode'">
                <ul>
                    <li :class="['choose-btn',choice121?'select':'']" v-if="priceList121.length" @click="swichBtn('121')">贴心专陪</li>
                    <li :class="['choose-btn',choice121?'':'select']" v-if="priceList12N.length" @click="swichBtn('12N')">温馨普陪</li>
                    <div :class="['bottom-line',choice121?'select':'',!priceList121.length||!priceList12N.length?'one-price':'']"></div>
                </ul>
            </div>
            <div class="ser-choose" v-if="preway=='qrcode'&&qrdata.branchId!==0&&qrdata.branchId!==undefined&&qrdata.branchId!==''">
                <ul>
                    <li :class="['choose-btn',choice121?'select':'']" v-if="priceList121.length" @click="swichBtn('121')">贴心专陪</li>
                    <li :class="['choose-btn',choice121?'':'select']" v-if="priceList12N.length" @click="swichBtn('12N')">温馨普陪</li>
                    <div :class="['bottom-line',choice121?'select':'',!priceList121.length||!priceList12N.length?'one-price':'']"></div>
                </ul>
            </div>
            <div class="row set-item" v-if="!!priceList121&&priceList121.length>0 && choice121&&isOrgSev&&kins['branchName']!=''" v-for='(price,index) in priceList121' @click="surePrice(price)" :class="[price.select&&priceId!=''? 'select' : '']" :key="index" :asselect="price.select">
                <div :class="['gou-left',price.select ? 'select' : '']"></div>
                <span class="service-type">{{price.serviceItem}}</span>
                <span class="ser-price">{{price.priceStr}}</span>
                <em @click='serviceDetail(price,$event)'>
                    <i :class="['r-more',price.select ? '' : '']"></i>
                </em>
            </div>

            <div class="row set-item" v-if="!!priceList12N&&priceList12N.length>0 && !choice121&&isOrgSev&&kins['branchName']!=''" v-for='(price,index) in priceList12N' @click="surePrice(price)" :class="[price.select&&priceId!=''? 'select' : '']" :key="index">
                <div :class="['gou-left',price.select ? 'select' : '']"></div>
                <span class="service-type">{{price.serviceItem}}</span>
                <span class="ser-price">{{price.priceStr}}</span>
                <em @click='serviceDetail(price,$event)'>
                    <i :class="['r-more',price.select ? '' : '']"></i>
                </em>
            </div>
        </div>
        <div class="yuyue">
            <div class="yy-txt txt1" v-if="!entranceCardPriceNumber">总金额{{prepayAmount}}元</div>
            <div class="yy-txt txt2" v-if="entranceCardPriceNumber">总金额{{totalPrice}}元</div>
            <div class="yy-btn" @click="yuyueClick?submit():''">预约</div>
        </div>
        <!-- 性别选择 -->
        <mt-popup v-model="showSexPanel" :closeOnClickModal="true" position="bottom">
            <div class="pp-content">
                <div class="btns" slot="header">
                    <button type="button" class="ctbtn" @click="cancelSex()">取消</button>
                    <button type="button" class="ctbtn" @click="sureSex()">确定</button>
                </div>
                <div>
                    <mt-picker :slots="sexSlots" @change="onSexChange"></mt-picker>
                </div>
            </div>
        </mt-popup>
        <!-- 出生日期选择 -->
        <mt-datetime-picker ref="birthdayPicker" type="date" :startDate="startBirthday" :endDate='endBirthday' year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-model="dateVal" @confirm="sureBirthday">
        </mt-datetime-picker>
        <!-- 时间选择框 -->

        <mt-popup v-model="showTimePanel" :closeOnClickModal="true" position="bottom">
            <div class="pp-content">
                <ul class="btns">
                    <li>
                        <button type="button" class="ctbtn" @click="cancelTime()">取消</button>
                    </li>
                    <li>
                        <button type="button" class="ctbtn" @click="sureTime()">确定</button>
                    </li>
                </ul>
                <div class="dls">
                    <dl class="dates-dl">
                        <dd v-for="(date,index) in dates" :class="[date.dayStr==selectDate ? 'select' : '']" @click="clickDate(date,index)" :key="index">
                            <span v-if="isOrgSev">{{date.alias}}</span>
                            <span class="isOrgSev_time">{{date.dayStr}}</span>
                        </dd>
                    </dl>
                    <dl :class="['clock-dl', isOrgSev ? '' : 'moring']">
                        <dd v-if="isOrgSev" v-for="(time,index) in times.mList" :class="[time.time==selectTime ? 'select' : '']" @click="clickTime(time,index)" :key="index">
                            <span :class="[time.status?'':'out-time']" :dateTime="time.timeStr">{{time.time}}</span>
                            <input type="hidden" class="start_time" v-model="time.serviceStartTime"></input>
                            <input type="hidden" class="end_time" v-model="time.serviceEndTime"></input>
                        </dd>
                        <dd v-if="!isOrgSev" class="noon">
                            <span>上午</span>
                        </dd>
                        <dd v-if="!isOrgSev" v-for="(time,index) in times.amList" :class="[time.time==selectTime ? 'select' : '','timing']" @click="clickTime(time,index,'am')" :key="index">
                            <span :class="[time.status?'':'out-time']">{{time.time}}</span>
                            <input type="hidden" class="start_time" v-model="time.serviceStartTime"></input>
                            <input type="hidden" class="end_time" v-model="time.serviceEndTime"></input>
                        </dd>
                        <dd v-if="!isOrgSev" class="noon">
                            <span>下午</span>
                        </dd>
                        <dd v-if="!isOrgSev" v-for="(time,index) in times.pmList" :class="[time.time==selectTime ? 'select' : '','timing']" @click="clickTime(time,index,'pm')" :key="index">
                            <span :class="[time.status?'':'out-time']">{{time.time}}</span>
                            <input type="hidden" class="start_time" v-model="time.serviceStartTime"></input>
                            <input type="hidden" class="end_time" v-model="time.serviceEndTime"></input>
                        </dd>
                    </dl>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

	<script>
import SHeader from "./SHeader.vue";
import {wxGetPosition,amapGetPosition,isEmpty, wxChooseImage,wxUploadImage} from "../util/common.js";
import { Toast, MessageBox, Popup, Indicator,Picker } from "mint-ui";
import { uploadWxImg, recognizeIDCard } from "../service/api.js";
import http from "../service/api.js";
import EventBus from "../service/eventbus.js";
export default {
  name: "makeorder",
  components: { Popup, SHeader },
  data() {
    return {
      bedNO:'',//床号
      totalPrice: "0.00",
      entranceCardPriceNumber: "", //判断门禁卡
      startBirthday: new Date("1900/01/01"),
      endBirthday: new Date(),
      sexSlots: [
        {
          flex: 1,
          values: ["男", "女"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      showSexPanel: false, //显示性别选择层
      gateChose: true,
      yuyueClick: true,
      preway: "", //前一级路径
      serviceType: "", //服务类型
      serviceName: "新增订单", //服务名称
      isOrgSev: true, //是否为机构订单 true-机构订单/false-居家订单
      // orgId: '', //计算出来的最近医院的id
      // hospitalName: '',	//医院名称
      showTimePanel: false, //是否显示时间面板
      choiceOrg: {
        //选中的医院
        orgId: "",
        orgName: ""
      },
      position: window.position, //当前定位信息
      choiceBranch: {}, //选中的科室
      choiceRoom: {}, //选中的病房
      choiceBed: {}, //选中的病床
      phone: "", //联系电话
      family: "", //亲属
      dates: [], //服务日期
      times: [], //服务时间
      orderType: 1, //订单类型：1-机构 2-居家
      priceList121: [], //一对一服务套餐列表
      priceList12N: [], //一对多服务套餐列表
      homeList: [],
      prepayAmount: 0.0, //预付款
      choice121: true, //是否为一对一服务
      price121: null, //选中的一对一服务项
      price12N: null, //选中的一对多服务
      sureAddr: "", //选中的服务地址
      lastUrl: "", //上一个页面的url
      priceId: "", //选中服务的priceId
      serviceStartTime: null, //服务的开始时间
      serviceEndTime: null, //服务的开始时间
      homebranchId: "", //选择科室的branchId
      selectTime: null, //默认标记具体时间--第一次显示
      selectDate: null, //默认标记的具体日期--第一次显示
      textTime: "", //点击确定显示在页面的时间
      textDate: "", //点击确定显示在页面的日期
      kinsName: "", //输入的新服务人名称
      hospital_price_default: "", //机构时默认选中的价格
      addrFlag: true,
      entranceCardPrice: "",
      kins: {
        name: "",
        sex: "",
        age: "",
        orgNO: "",
        bedNO:"",
        kinsId: 0,
        admissionDate: new Date().format("yyyy-MM-dd"),
        photoType: true, //true是从拍照过来的，false是获取family里的数据
        autowrite: 0
      },
      sexVal: "",
      dateVal: "",
      showDatePanel: "",
      familyFlag: true,
      nokins_flag: false,//有无kinflok
      qrdata:'',//从扫描二维码处过来
      qrCodeBranchFlag:false,//branchid==0时
    };
  },
  computed: {},
  created() {
    let self = this;
    //获取选中的科室
    EventBus.$on("choice",function(data) {
        //赋值
        //加载套餐信息
        if(data.choiceBranch.id===undefined||data.choiceBranch.id===''||data.choiceBranch.id===0){
          return false;
        }
        if(data.choiceBranch.qrcode){//从扫完信息过来，但是没有branchid
          self.qrdata.branchName = data.choiceBranch.branchName;
          self.qrdata.branchId = data.choiceBranch.id;
          self.qrCodeBranchFlag=true;
        }else{
          self.kins["branchName"] = data.choiceBranch.branchName;
          self.kins["branchNameId"] = data.choiceBranch.id;
        }
        self.loadPrice(data.choiceBranch.id);
        this.lastUrl = data.theUrl;
        this.sureLastUrl();
        self.familyFlag = false;
        console.log(data);
      }.bind(this)
    );
    //获取选中的医院
    EventBus.$on(
      "choiceOrg",
      function(data) {
        //更新到全局
        this.choiceOrg = data.org;
        window.nearestOrg = data.org;
        this.lastUrl = data.theUrl;
        this.sureLastUrl();
        this.choiceBranch = {};
        self.familyFlag = false;
        self.kins["branchName"] = "";
        console.log(data);
      }.bind(this)
    );
    //获取选中的服务人信息
    EventBus.$on("hosFamily", data => {
      console.log(data);
      self.kins["name"] = data.family.name;
      self.kins["sex"] = data.family.sex;
      self.kins["age"] = data.family.age;
      self.kins["kinsId"] = data.family.kinsId;
      self.kins["photoType"] = false;
      self.familyFlag = false;
      console.log(self.kins);
      self.lastUrl = data.theUrl;
      self.sureLastUrl();
    });
    //获取选中的服务地址
    EventBus.$on(
      "sureAddr",
      function(data) {
        //更新到全局
        this.sureAddr = data.addr;
        this.lastUrl = data.theUrl;
        this.sureLastUrl();
        this.addrFlag = false;
        self.familyFlag = false;
      }.bind(this)
    );
    EventBus.$on("service", data => {
      self.lastUrl = data.theUrl;
      self.sureLastUrl();
    });
    //		dplus.track(["_trackEvent", this.serviceName + '预约', "浏览", "", 0, ""]);
  },
  // deactivated() {
  //   let self = this;
  //   self.familyFlag = true;
  // },
  activated() {
    var self = this;
    if (this.$route.query.autowrite) {
      self.kins["autowrite"] = this.$route.query.autowrite;
    }
    this.preway = this.$route.query.preway;
    this.lastUrl = "";
    if (this.$route.query.data && self.kins["photoType"]) {
      let photo_data = this.$route.query.data;
      for (let i in photo_data) {
        self.kins[i] = photo_data[i];
      }
    }
    if(this.preway =='qrcode'){//从扫描二维码过来
      if(!self.familyFlag){
        return false;
      }
      if(self.qrdata.branchId===0||self.qrdata.branchId===undefined||self.qrdata.branchId===''){
        self.qrCodeBranchFlag=true;
      }
     self.qrdata=this.$route.query.qrdata;
     self.loadPrice(self.qrdata.branchId);
    }else{//不是从扫描二维码过来
        if (!self.kins["orgName"] && self.familyFlag) {//第一次进来时
        //没有获得医院名称
        //默认获取全局中的最近医院
        self.getPosition().then(function() {
          self.loadSetting();
        }).catch(function() {
          self.loadSetting();
        });
      }
      if (self.kins["orgName"] && self.familyFlag) {
        //从手环识别过来
        this.getOrg(self.kins["orgName"]); //获取相应的医院
      }
      if (self.kins["orgId"]) {
        //从手环识别过来
        this.getBranch(self.kins["orgId"]); //获取相应的科室
      }
      console.log(self.familyFlag);
      if (self.kins["autowrite"] == "1" && self.familyFlag) {
        this.getkinsfolk();
      }
    }
    //进入下单页面的初始化
    // self.initUrlParam();
    //载入数据
    this.loadData();
  },
  methods: {
    getBranch(str) {
      var self = this;
      //发送请求
      http
        .post("/json/GetOrgAndBranch", {
          adcode: window.position.adcode,
          lat: window.position.lat,
          lng: window.position.lng,
          orgId: str
        })
        .then(function(res) {
          if (self.kins["branchName"] != undefined) {
            res.body.orgBranchMap[0].branchList.forEach(function(i) {
              if (self.kins["branchName"] == i.branchName) {
                self.kins["branchNameId"] = i.id;
                self.loadPrice(self.kins["branchNameId"]); //加载科室下的套餐信息
              }
            });
          }
        });
    },
    getOrg(str) {
      var self = this;
      //发送请求
      http
        .post("/json/GetOrgList", {
          keyword: str,
          lat: window.position.lat,
          lng: window.position.lng,
          adcode: window.position.adcode,
          pageNo: 1
        })
        .then(function(res) {
          if (res.body.orgList.length) {
            self.choiceOrg = res.body.orgList[0].orgVO;
            console.log(self.choiceOrg);
          }
        });
    },
    getkinsfolk() {
      let self = this;
      http.post("/json/ListKinsfolk").then(res => {
        if (res.body.kinsfolkList.length) {
          self.nokins_flag = false;
          self.kins["photoType"] = false;
          self.kins["autowrite"] = 0;
          self.kins["name"] = res.body.kinsfolkList[0].name;
          self.kins["sex"] = res.body.kinsfolkList[0].sex;
          self.kins["age"] = res.body.kinsfolkList[0].age;
          self.kins["orgNO"] = res.body.kinsfolkList[0].orgNO || "";
          self.kins["admissionDate"] =
            res.body.kinsfolkList[0].admissionDate ||
            new Date().format("yyyy-MM-dd");
        } else {
          self.nokins_flag = true;
          self.kins["photoType"] = true;
          self.kins["autowrite"] = 1;
        }
      });
    },
    hospitalPhoto() {
      let self = this;
      wxChooseImage(window.wx)
        .then(function(res) {
          // console.info('Common.wxChooseImage back!');
          var mediaId = res.localIds[0];
          // console.info('Common.wxChooseImage back!' + JSON.stringify(res));
          Indicator.open({
            text: "正在上传照片...",
            spinnerType: "fading-circle"
          });
          return wxUploadImage(window.wx, mediaId);
        })
        .then(function(res) {
          // console.info('Common.wxUploadImage back!');
          var serverId = res.serverId;
          // console.info('Common.wxUploadImage back!' + JSON.stringify(res));
          //将微信照片id上传给后端
          return http.post("/json/GetImageToWx", {
            mediaId: serverId,
            type: "hosipatalImg"
          });
          // uploadWxImg(self,serverId,'idcard');
        })
        .then(function(res) {
          //    				 console.info('/json/GetImageToWx back!');
          Indicator.close();
          Indicator.open({
            text: "正在识别照片...",
            spinnerType: "fading-circle"
          });
          var params = {
            imgId: res.body.imgId,
            imgUrl: res.body.imgUrl
            // side: 1
          };
          return http.post("/json/OrgNORecognize", params);
          // return recognizeIDCard(self,imgId);
        })
        .then(function(res) {
          console.log("OrgNORecognize");
          console.log(res);
          Indicator.close();
          if (
            res.body.hospitalBra.name == "" ||
            res.body.hospitalBra.name == undefined ||
            res.body.hospitalBra.orgNO == "" ||
            res.body.hospitalBra.orgNO == undefined
          ) {
            MessageBox.confirm("", {
              message: "图片识别失败，是否手工输入？",
              title: "提示",
              confirmButtonText: "手工输入",
              cancelButtonText: "重新拍照"
            })
              .then(action => {
                if (action == "confirm") {
                  console.log("手工输入");
                }
              })
              .catch(err => {
                if (err == "cancel") {
                  self.hospitalPhoto();
                }
              });
          } else {
            let photo_data = res.body.hospitalBra;
            for (let i in photo_data) {
              self.kins[i] = photo_data[i];
            }
            self.kins["photoType"] = true;
          }
        })
        .catch(function(res) {
          Indicator.close();
          //  				Toast({message: '身份证上传失败！'+res.msg});
        });
    },
    //确定日期选择
    sureBirthday(value) {
      // this.dateVal = value.toString();
      this.kins.admissionDate = value.format("yyyy-MM-dd");
      this.showDatePanel = false;
    },
    clickbirthday() {
      this.dateVal = this.kins.admissionDate;
      this.$refs.birthdayPicker.open();
      this.showDatePanel = true;
    },
    onSexChange(picker, values) {
      this.SexVal = values[0];
      // console.warn('tmpSexVal:'+this.tmpSexVal);
    },
    //确定性别
    sureSex() {
      this.kins["sex"] = this.SexVal == "男" ? 1 : 2;
      this.showSexPanel = false;
    },
    //取消性别选择
    cancelSex() {
      this.showSexPanel = false;
    },
    //点击性别
    clickSex() {
      if(this.preway=='qrcode'){//从扫二维码过来
        return false;
      }
      this.showSexPanel = true;
    },
    loadSetting() {
      console.log("setti--------");
      let self = this;
      //拼接参数，发送请求
      http
        .post("/json/GetSettings", {
          lat: window.position.lat,
          lng: window.position.lng,
          adcode: window.position.adcode,
          cityCode: window.position.citycode
        })
        .then(function(res) {
          window.nearestOrg = res.body.nearestOrg;
          if(self.$route.query.autowrite==1){//从扫描手环处---选择手动输入
            self.choiceOrg=JSON.parse(self.$route.query.orgData);
            if(self.choiceOrg.orgNO!=undefined){//扫描二维码处&&手动输入住院号
              self.kins["orgNO"]=self.choiceOrg.orgNO;
            }
          }else{
            self.choiceOrg = res.body.nearestOrg;
          }
        });
    },
    getPosition() {
      let self = this;
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
            // console.info('getPosition catch come in!');
            reject();
          });
      });
    },
    serviceDetail(str, event) {
      let self=this;
      event.stopPropagation();
      self.familyFlag = false;
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约查看服务详情-" + str.serviceItem,
        "点击",
        "",
        0,
        ""
      ]);
      this.$router.push({
        path: "/orderservicedetail",
        query: {
          description: str
        }
      });
    },
    getInitAddr() {
      let self = this;
      http.post("/json/ListUserAddress").then(res => {
        self.sureAddr = res.body.userAddressVO[0];
      });
    },
    sureLastUrl() {
      if (this.lastUrl == "index") {
        this.totalPrice = "0.00";
        this.gateChose = true;
        this.prepayAmount = "0.00";
        this.textTime = "";
        this.textDate = "";
        this.serviceStartTime = null;
        this.serviceEndTime = null;
        this.choiceBranch = {};
        this.kinsName = "";
        this.priceId = "";
        this.priceList121 = [];
        this.priceList12N = [];
        this.kins = {
          name: "",
          sex: "",
          age: "",
          orgNO: "",
          kinsId: 0,
          admissionDate: new Date().format("yyyy-MM-dd"),
          photoType: true //true是从拍照过来的，false是获取family里的数据
        };
        this.homebranchId = "";
        this.qrdata.branchName='';
        this.qrdata.branchId='';
      }
    },
    //提交订单
    submit() {
      var self = this;
      var flag = false;
      var params={
          serviceStartTime: self.serviceStartTime,
          serviceEndTime: self.serviceEndTime,
          priceId: self.priceId,
          orderType:self.orderType
      };
      if(self.preway!='qrcode'){//普通下单
        params['orgNO']=self.kins["orgNO"];
        params['branchId']=self.kins["branchNameId"];//科室
        params['admissionDate']=self.kins["admissionDate"];
        params["kinsId"] = self.kins["kinsId"];
        params["bedNO"] = self.kins["bedNO"]||'';
        if (!self.kins["kinsId"]) {
          params["kinsName"] = self.kins["name"];
          params["age"] = self.kins["age"];
          params["sex"] = self.kins["sex"];
        }
      }else{//扫描二维码
        params['orgNO']=self.qrdata.orgNO;//医院
        params['branchId']=self.qrdata.branchId;//科室
        params['admissionDate']=self.qrdata.admissionDate;
        params["kinsName"] = self.qrdata.userName;
        params["age"] = self.qrdata.age;
        params["sex"] = self.qrdata.sex;
       
        params["kinsId"] = self.qrdata.kinsId;
        params["bedNO"] = self.bedNO||'';
      }
      if(self.gateChose&&self.entranceCardPriceNumber){
        params['needExtra']=true;
      }else{
        params['needExtra']=false;
      }
      console.log(self.kins);
      console.log(params);
      if(self.preway!='qrcode'){
        if (
          self.serviceStartTime != null &&
          self.priceId != "" &&
          self.choiceOrg.orgName != "" &&
          self.kins["branchNameId"] != undefined &&
          self.kins["kinsName"] != "" &&
          self.kins["sex"] != "" &&
          self.kins["age"] != "" &&
          self.kins["orgNO"] != "" &&
          self.kins["admissionDate"] != ""
        ) {
          if (self.kins["orgNO"].length != 10) {
            Toast({ message: "请输入正确的住院号", duration: 1000 });
            return false;
          }
          flag = true;
        } else if (self.choiceOrg.orgName == "") {
          Toast({ message: "请选择医院", duration: 1000 });
        } else if (
          self.kins["branchNameId"] == undefined ||
          self.kins["branchNameId"] == ""
        ) {
          Toast({ message: "请选择科室", duration: 1000 });
        } else if (self.serviceStartTime == null) {
          Toast({ message: "请选择时间", duration: 1000 });
          setTimeout(() => {
            self.clickTimeDiv();
          }, 200);
        } else if (self.kins["name"] == "") {
          Toast({ message: "请选择或添加被陪护人", duration: 1000 });
        } else if (self.kins["sex"] == "") {
          Toast({ message: "请选择性别", duration: 1000 });
        } else if (self.kins["age"] == "") {
          Toast({ message: "请输入年龄", duration: 1000 });
        } else if (self.kins["orgNO"] == "") {
          Toast({ message: "请输入住院号", duration: 1000 });
        } else if (self.kins["admissionDate"] == "") {
          Toast({ message: "请选择入院日期", duration: 1000 });
        } else if (self.priceId == "") {
          Toast({ message: "请选择服务", duration: 1000 });
        }
      }else{//扫描二维码
        if (self.priceId != "") {
          flag = true;
        }else if (self.priceId == "") {
          Toast({ message: "请选择服务", duration: 1000 });
        }
      }
      if (flag) {
        //发送请求
        http.post("/json/CreateOrder", params).then(
          function(res) {
            if (res.errorCode == 0) {
              Toast({ message: "提交成功！" });
              self.makeOrder(); //下订单跳转至订单详情
            } else {
              Toast({ message: res.msg });
            }
          },
          function(res) {
            //						Toast({message: res.msg});
          }
        );
      }
    },
    checkGate() {
      let self = this;
      self.gateChose = !self.gateChose;
      if (!self.gateChose) {
        self.totalPrice = self.prepayAmount;
      } else {
        self.totalPrice = (parseFloat(self.entranceCardPrice) +
          parseFloat(self.prepayAmount)
        ).toFixed(2);
      }
    },
    makeOrder() {
      var self = this;
      http.post("/json/GetOrderList").then(function(res) {
        var orderId = res.body.orderVOList[0].orderId;
        var type;
        if (parseFloat(self.prepayAmount) > 0) {
          //需交预约金
          type = 1;
          self.$router.push({
            path: "/order",
            query: { orderid: orderId, detailtype: type }
          });
        } else {
          self.$router.push({ path: "/orderlist" });
        }
      });
    },
    //暴露给vue模板使用的非空判断
    isEmpty(obj) {
      return isEmpty(obj);
    },
    swichBtn(type) {
      this.choice121 = type == "121" ? true : false;
    },
    surePrice(price) {
      var self = this;
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约选择服务-" + price.serviceItem,
        "点击",
        "",
        0,
        ""
      ]);
      if (self.priceList121.length) {
        self.priceList121.forEach(function(item, index) {
          if (item.priceId == price.priceId) {
            self.prepayAmount = item.prepayFeeStr;
            item.select = true;
            self.priceId = item.priceId;
            if (self.entranceCardPriceNumber) {
              //有门禁卡
              self.totalPrice = item.totalPrice;
            } else {
              self.totalPrice = item.prepayFeeStr;
            }
          } else {
            item.select = false;
          }
        });
      }
      if (self.priceList12N.length) {
        self.priceList12N.forEach(function(item, index) {
          if (item.priceId == price.priceId) {
            self.prepayAmount = item.prepayFeeStr;
            item.select = true;
            self.priceId = item.priceId;
            if (self.entranceCardPriceNumber) {
              self.totalPrice = item.totalPrice;
            } else {
              self.totalPrice = item.prepayFeeStr;
            }
          } else {
            item.select = false;
          }
        });
      }
    },
    loadPrice(id) {
      if(id===0||id===''||id===undefined){
        return false;
      }
      var self = this;
      //发送请求
      http.post("/json/GetPrice", { branchId: id }).then(
        function(res) {
          if (res.errorCode == 0) {
            self.entranceCardPrice = res.body.entranceCardPrice || "0.00";
            self.entranceCardPriceNumber = res.body.entranceCardPriceNumber;
            self.totalPrice = res.body.totalPrice;
            res.body.priceList121.forEach(function(item, index) {
              item.select = false;
            });
            res.body.priceList12N.forEach(function(item, index) {
              item.select = false;
            });
            let default_flag = true;
            for (let i = 0; i < res.body.priceList121.length; i++) {
              if (res.body.priceList121[i].defaultStatus == 1) {
                res.body.priceList121[i]["select"] = true;
                self.prepayAmount = res.body.priceList121[i].prepayFeeStr;
                if (self.entranceCardPriceNumber) {
                  //有门禁卡
                  self.totalPrice = res.body.priceList121[i].totalPrice;
                } else {
                  self.totalPrice = res.body.priceList121[i].prepayFeeStr;
                }
                self.priceId = res.body.priceList121[i].priceId;
                self.choice121 = false;
                default_flag = false;
              }
            }
            for (let i = 0; i < res.body.priceList12N.length; i++) {
              if (res.body.priceList12N[i].defaultStatus == 1) {
                res.body.priceList12N[i]["select"] = true;
                self.prepayAmount = res.body.priceList12N[i].prepayFeeStr;
                if (self.entranceCardPriceNumber) {
                  //有门禁卡
                  self.totalPrice = res.body.priceList12N[i].totalPrice;
                } else {
                  self.totalPrice = res.body.priceList12N[i].prepayFeeStr;
                }
                self.priceId = res.body.priceList12N[i].priceId;
                self.choice121 = false;
                default_flag = false;
              }
            }
            if (default_flag) {
              self.choice121 = false;
              self.prepayAmount = res.body.prepayAmount;
            }
            self.priceList121 = res.body.priceList121;
            self.priceList12N = res.body.priceList12N;
            if(!self.priceList12N.length){//普陪套餐为空时
              self.choice121 = true;
            }
          } else {
            self.yuyueClick = false;
            // Toast({ message: '获取套餐数据出错!' + res.msg });
          }
        },
        function() {
          self.yuyueClick = false;
          // Toast({ message: '获取套餐数据出错!' });
        }
      );
    },
    goHospitalList() {
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约选择医院",
        "点击",
        "",
        0,
        ""
      ]);
      this.$router.push({ name: "hospitallist" });
    },
    goBranchList(str) {
      let self = this;
      //如果未选择医院，则跳转到医院列表
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约选择科室",
        "点击",
        "",
        0,
        ""
      ]);
      if(str==='qrcode'){//
        self.$router.push({
          path: "branchList",query:{choiceOrg: self.qrdata,preway:str}
        });
      }else{
        self.$router.push({
          path: "branchList",query:{choiceOrg: self.choiceOrg,}
        });
      }
    },
    clickTimeDiv() {
      let self = this;
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约选择时间",
        "点击",
        "",
        0,
        ""
      ]);
      this.showTimePanel = true;
      //textDate
      console.log(self.textDate);
      console.log(self.textTime);
      if (self.textDate) {
        if (!self.isOrgSev) {
          //居家
          let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
          let timeNode_date_span = document.querySelectorAll(
            ".dates-dl dd span"
          ); //日期
          let timeNode_time = document.querySelectorAll(".clock-dl dd.timing"); //时间
          let timeNode_time_span = document.querySelectorAll(
            ".clock-dl dd.timing span"
          );
          for (let i = 0; i < timeNode_date.length; i++) {
            timeNode_date[i].className = "";
            if (timeNode_date_span[i].innerHTML == self.textDate) {
              timeNode_date[i].className = "select";
            }
          }
          for (let j = 0; j < timeNode_time.length; j++) {
            timeNode_time[j].className = "timing";
            if (timeNode_time_span[j].innerHTML == self.textTime) {
              timeNode_time[j].className = "timing select";
            }
          }
        } else {
          let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
          let timeNode_date_span = document.querySelectorAll(
            ".dates-dl dd span.isOrgSev_time"
          ); //日期
          let timeNode_time = document.querySelectorAll(".clock-dl dd"); //时间
          let timeNode_time_span = document.querySelectorAll(
            ".clock-dl dd span"
          );
          for (let i = 0; i < timeNode_date.length; i++) {
            timeNode_date[i].className = "";
            if (timeNode_date_span[i].innerHTML == self.textDate) {
              timeNode_date[i].className = "select";
            }
          }
          for (let j = 0; j < timeNode_time.length; j++) {
            timeNode_time[j].className = "";
            if (
              timeNode_time_span[j].getAttribute("datetime") == self.textTime
            ) {
              timeNode_time[j].className = "select";
            }
          }
        }
      } else {
        //时间选择框为空
        //默认选择第一天
        let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
        for (let i = 0; i < timeNode_date.length; i++) {
          if (i == 0) {
            timeNode_date[i].className = "select";
          } else {
            timeNode_date[i].className = "";
          }
        }
        self.times = self.dates[0].dayTimeData;
        console.log(self.times);
        if (!self.isOrgSev) {
          //居家
          let time_arr = self.times.amList.concat(self.times.pmList);
          let timeNode_time = document.querySelectorAll(".clock-dl dd.timing"); //时间
          let timeNode_time_span = document.querySelectorAll(
            ".clock-dl dd.timing span"
          );
          for (let i = 0; i < timeNode_time.length; i++) {
            timeNode_time[i].className = "timing";
          }
          for (let j = 0; j < timeNode_time.length; j++) {
            if (time_arr[j].status) {
              timeNode_time[j].className = "select timing";
              return;
            }
          }
        } else {
          let time_arr = self.times.mList;
          let timeNode_time = document.querySelectorAll(".clock-dl dd"); //时间
          let timeNode_time_span = document.querySelectorAll(
            ".clock-dl dd span"
          );
          for (let i = 0; i < timeNode_time.length; i++) {
            timeNode_time[i].className = "";
          }
          for (let j = 0; j < timeNode_time.length; j++) {
            if (time_arr[j].status) {
              timeNode_time[j].className = "select";
              return;
            }
          }
        }
      }
    },
    cancelTime() {
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约选择时间-取消按钮",
        "点击",
        "",
        0,
        ""
      ]);
      var self = this;
      this.showTimePanel = false;
    },
    sureTime() {
      let self = this;
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约选择时间-确定按钮",
        "点击",
        "",
        0,
        ""
      ]);
      this.showTimePanel = false;
      if (!self.isOrgSev) {
        //居家
        let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
        let timeNode_date_span = document.querySelectorAll(".dates-dl dd span"); //日期
        let timeNode_time = document.querySelectorAll(".clock-dl dd.timing"); //时间
        let timeNode_time_span = document.querySelectorAll(
          ".clock-dl dd.timing span"
        );
        let timeNode_time_start = document.querySelectorAll(
          ".clock-dl dd.timing input.start_time"
        );
        let timeNode_time_end = document.querySelectorAll(
          ".clock-dl dd.timing input.end_time"
        );
        for (let i = 0; i < timeNode_date.length; i++) {
          if (timeNode_date[i].className == "select") {
            self.textDate = timeNode_date_span[i].innerHTML; //选中的日期
          }
        }
        self.textTime = "";
        for (let j = 0; j < timeNode_time.length; j++) {
          if (timeNode_time[j].className != "timing") {
            self.textTime = timeNode_time_span[j].innerHTML; //选中的日期
            self.serviceStartTime = timeNode_time_start[j].value;
            self.serviceEndTime = timeNode_time_end[j].value;
          }
        }
        if (!self.textTime) {
          self.textDate = "";
          self.serviceStartTime = null;
          self.serviceEndTime = null;
        }
        console.log(self.textTime);
        console.log(self.textDate);
      } else {
        let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
        let timeNode_date_span = document.querySelectorAll(
          ".dates-dl dd span.isOrgSev_time"
        ); //日期
        let timeNode_time = document.querySelectorAll(".clock-dl dd"); //时间
        let timeNode_time_span = document.querySelectorAll(".clock-dl dd span");
        let timeNode_time_start = document.querySelectorAll(
          ".clock-dl dd input.start_time"
        );
        let timeNode_time_end = document.querySelectorAll(
          ".clock-dl dd input.end_time"
        );
        for (let i = 0; i < timeNode_date.length; i++) {
          if (timeNode_date[i].className == "select") {
            self.textDate = timeNode_date_span[i].innerHTML; //选中的日期
          }
        }
        self.textTime = "";
        for (let j = 0; j < timeNode_time.length; j++) {
          if (timeNode_time[j].className == "select") {
            self.textTime = timeNode_time_span[j].getAttribute("datetime"); //选中的日期
            self.serviceStartTime = timeNode_time_start[j].value;
            self.serviceEndTime = timeNode_time_end[j].value;
          }
        }
        if (!self.textTime) {
          self.textDate = "";
          self.serviceStartTime = null;
          self.serviceEndTime = null;
        }
      }
    },
    clickPeople() {
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约添加被服务人",
        "点击",
        "",
        0,
        ""
      ]);
      if (this.nokins_flag) {
        //无亲属
        this.$router.push({
          path: "/addmember",
          query: { goback: "family" }
        });
      } else {
        this.$router.push({
          path: "/family",
          query: { type: "hospital" }
        });
      }
    },
    getOneDayTimes(index) {
      return this.dates[index].times;
    },
    clickDate(tmpdate, index) {
      var self = this;
      console.log(tmpdate);
      self.times = self.dates[index].dayTimeData;
      if (!self.isOrgSev) {
        //居家
        let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
        let timeNode_date_span = document.querySelectorAll(".dates-dl dd span"); //日期
        for (let s = 0; s < timeNode_date.length; s++) {
          timeNode_date[s].className = "";
          if (tmpdate.dayStr == timeNode_date_span[s].innerHTML) {
            timeNode_date[s].className = "select";
          }
        }
        let time_arr = tmpdate.dayTimeData.amList.concat(
          tmpdate.dayTimeData.pmList
        );
        console.log(time_arr);
        let timeNode_dd = document.querySelectorAll(".clock-dl dd.timing");
        let timeNode_span = document.querySelectorAll(
          ".clock-dl dd.timing span"
        );
        for (let i = 0; i < time_arr.length; i++) {
          timeNode_dd[i].className = "timing";
          timeNode_span[i].className = "";
          if (time_arr[i].status) {
            timeNode_span[i].className = "";
          } else {
            timeNode_span[i].className = "out-time";
          }
        }
        for (let j = 0; j < time_arr.length; j++) {
          if (time_arr[j].status) {
            timeNode_dd[j].className = "timing select";
            return;
          }
        }
      } else {
        let timeNode_date = document.querySelectorAll(".dates-dl dd"); //日期
        let timeNode_date_span = document.querySelectorAll(
          ".dates-dl dd span.isOrgSev_time"
        ); //日期
        for (let s = 0; s < timeNode_date.length; s++) {
          timeNode_date[s].className = "";
          if (tmpdate.dayStr == timeNode_date_span[s].innerHTML) {
            timeNode_date[s].className = "select";
          }
        }
        let time_arr = tmpdate.dayTimeData.mList;
        let timeNode_dd = document.querySelectorAll(".clock-dl dd");
        let timeNode_span = document.querySelectorAll(".clock-dl dd span");
        for (let i = 0; i < time_arr.length; i++) {
          timeNode_dd[i].className = "";
          timeNode_span[i].className = "";
          if (time_arr[i].status) {
            timeNode_span[i].className = "";
          } else {
            timeNode_span[i].className = "out-time";
          }
        }
        for (let j = 0; j < time_arr.length; j++) {
          if (time_arr[j].status) {
            timeNode_dd[j].className = "select";
            return;
          }
        }
      }
    },
    clickTime(tmptime, index, str) {
      let self = this;
      if (!tmptime.status) {
        return;
      }
      if (!self.isOrgSev) {
        let timeNode_dd = document.querySelectorAll(".clock-dl dd.timing");
        for (let i = 0; i < timeNode_dd.length; i++) {
          timeNode_dd[i].className = "timing";
          if (str == "am") {
            timeNode_dd[index].className = "timing select";
          } else {
            timeNode_dd[index + 4].className = "timing select";
          }
        }
      } else {
        let timeNode_dd = document.querySelectorAll(".clock-dl dd");
        for (let i = 0; i < timeNode_dd.length; i++) {
          timeNode_dd[i].className = "";
          timeNode_dd[index].className = "select";
        }
      }
    },
    //1是机构，2是居家
    loadData() {
      var self = this;
      //发送请求
      if (this.isOrgSev) {
        self.orderType = 1;
      } else {
        self.orderType = 2;
      }
      http
        .post("/json/GetOrderTime", {
          orderType: self.orderType
        })
        .then(
          function(res) {
            self.dates = res.body.timeDataList;
            self.times = self.dates[0].dayTimeData;
            self.selectDate = self.dates[0].dayStr;
            self.textDate = self.selectDate; //默认选择-日期
            let time_arr = [];
            if (!self.isOrgSev) {
              //居家
              let time_flag = true;
              time_arr = self.times.amList.concat(self.times.pmList);
              for (let i = 0; i < time_arr.length; i++) {
                if (time_arr[i].status) {
                  self.selectTime = time_arr[i].time;
                  self.textTime = self.selectTime;
                  self.serviceStartTime = time_arr[i].serviceStartTime;
                  self.serviceEndTime = time_arr[i].serviceEndTime;
                  time_flag = false;
                  break;
                }
              }
              if (time_flag) {
                //第一天时间已过，选第二天的
                self.selectDate = self.dates[1].dayStr;
                self.textDate = self.selectDate;
                self.times = self.dates[1].dayTimeData;
                time_arr = self.dates[1].dayTimeData.amList.concat(
                  self.dates[1].dayTimeData.pmList
                );
                for (let j = 0; j < time_arr.length; j++) {
                  if (time_arr[j].status) {
                    self.selectTime = time_arr[j].time;
                    self.textTime = self.selectTime;
                    self.serviceStartTime = time_arr[j].serviceStartTime;
                    self.serviceEndTime = time_arr[j].serviceEndTime;
                    break;
                  }
                }
              }
            } else {
              let time_flag = true;
              time_arr = self.times.mList;
              for (let i = 0; i < time_arr.length; i++) {
                if (time_arr[i].status) {
                  self.selectTime = time_arr[i].timeStr;
                  self.textTime = self.selectTime;
                  self.serviceStartTime = time_arr[i].serviceStartTime;
                  self.serviceEndTime = time_arr[i].serviceEndTime;
                  time_flag = false;
                  break;
                }
              }
              if (time_flag) {
                //第一天时间已过，选第二天的
                self.selectDate = self.dates[1].dayStr;
                self.textDate = self.selectDate;
                self.times = self.dates[1].dayTimeData;
                time_arr = self.dates[1].dayTimeData.mList;
                for (let j = 0; j < time_arr.length; j++) {
                  if (time_arr[j].status) {
                    self.selectTime = time_arr[j].timeStr;
                    self.textTime = self.selectTime;
                    self.serviceStartTime = time_arr[j].serviceStartTime;
                    self.serviceEndTime = time_arr[j].serviceEndTime;
                    break;
                  }
                }
              }
            }
          },
          function() {
            Toast({ message: "获取失败!" });
          }
        );
    },
    phoneFocus() {
      dplus.track([
        "_trackEvent",
        this.serviceName + "预约修改电话",
        "点击",
        "",
        0,
        ""
      ]);
    },
    orderGoback() {
      this.$router.push({ path: "/index" });
    }
  }
};
</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/css/little.scss";
@import "../assets/css/order.scss";
i {
  font-style: normal;
}

.ser-choose-tit {
  background-color: white;
}

.bottom-line {
  position: absolute;
  width: 50%;
  height: px2rem(6px);
  left: 50%;
  bottom: pxrem(-1px);
  background: #2bd6bd;
  transition: all 0.2s linear;
}

.bottom-line.select {
  left: 0;
}
.bottom-line.one-price{
  width: 100%;
  left: 0;
}
.ser-choose {
  background-color: white;
  height: px2rem(90px);
  line-height: px2rem(90px);
  padding: 0;
  ul {
    height: px2rem(90px);
    line-height: px2rem(90px);
    position: relative;
    display: flex;
    display: -webkit-flex;
    li {
      font-size: pxrem(16px);
      flex: 1;
      text-align: center;
    }
    li.select {
      color: #2bd6bd;
    }
  }
}

.gate-card {
  background: #fff;
  position: relative;
  font-size: pxrem(14px);
  line-height: pxrem(48px);
  color: #1d1d26;
  text-align: left;
  span {
    display: block;
    position: absolute;
    right: pxrem(80px);
    top: 0;
  }
  p {
    padding-left: pxrem(80px);
  }
}

.gate-card.select {
  color: #2bd6bd;
}
.bed.kins{
  input{
    width: 50%;
    display: inline-block;
  }
}
.kins {
  padding: 0 pxrem(15px);
  height: pxrem(45px);
  line-height: pxrem(45px);
  background: #fff;
  text-align: left;
  font-size: pxrem(16px);
  color: #1d1d26;
  border-bottom: pxrem(1px) solid #e5e5e5;
  input {
    height: 80%;
    width: 70%;
    font-size: pxrem(14px);
    line-height: pxrem(45px);
  }
}

.subrow {
  color: rgba(29, 29, 38, 0.5);
  position: relative;
  height: pxrem(30px);
  line-height: pxrem(30px);
  padding: 0 pxrem(15px);
  background-color: rgba(29, 29, 38, 0.03);
  text-align: left;
  font-size: pxrem(16px);
  span {
    color: rgba(29, 29, 38, 0.5);
  }
}

.care-people {
  position: relative;
  text-align: left;
  background: #fff;
  padding: 0 pxrem(15px);
  box-shadow: 0 1px pxrem(10px) 0 rgba(19, 27, 51, 0.1);
  p {
    color: #2bd6bd;
    font-size: pxrem(15px);
    line-height: pxrem(15px);
    padding: pxrem(15px) 0;
  }
  span{
    margin-left:pxrem(20px);
  }
}

.checkMess {
  position: relative;
  color: #2bd6bd;
  box-shadow: 0 1px pxrem(10px) 0 rgba(19, 27, 51, 0.1);
  font-size: pxrem(14px);
  z-index: 1;
  margin:pxrem(20px) 0;
  span {
    line-height: pxrem(15px);
  }
}
.more-green{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: px2rem(30px);
    display: block;
    width: px2rem(14px);
    height: px2rem(26px);
    background-image: url('https://s.1-1dr.com/static/mobile/img/wechat/more1.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-background–size: cover;
    -moz-background–size: cover;
    -o-background–size: cover;
  }
.main {
  /*医院选择*/
  .addr {
    height: pxrem(45px);
    border-bottom: 1px solid #e5e5e5;
  }
  .notEmpty {
    color: #1d1d26;
  }
  .notEmpty.ordertime {
    margin-right: pxrem(40px);
  }
  .addr.noborder {
    border-bottom: none;
  }
}

.people {
  border-bottom: 1px solid #ebebeb;
  input {
    width: 80%;
    font-size: px2rem(30px);
    padding: px2rem(4px) 0;
    height: 80%;
  }
}

.phone {
  input {
    height: 98%;
  }
}

.dls {
  display: -webkit-box;
  min-height: px2rem(700px);
}

dl {
  width: 50%;
}

dl:first-child {
  span:first-child {
    color: #ffc000;
    font-size: px2rem(24px);
    margin-right: px2rem(20px);
  }
  span:last-child {
    color: #666;
    font-size: px2rem(30px);
  }
}

.clock-dl {
  color: #666;
  span.out-time {
    color: #ccc;
  }
  span:first-child {
    font-size: px2rem(30px);
    margin-right: px2rem(20px);
  }
  span:last-child {
    font-size: px2rem(30px);
  }
}

dd {
  padding: px2rem(25px) px2rem(70px) px2rem(25px) 0;
  text-align: right;
  text-indent: px2rem(30px);
}

dd.select span {
  color: #2bd6bd !important;
}

dl.moring dd {
  padding: px2rem(14px) px2rem(40px) px2rem(14px) 0;
  text-align: right;
}

dl.moring .noon {
  text-align: center;
}

dl.moring .timing span {
  margin-right: px2rem(80px);
}

.dates-dl {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  background-color: #f8f8f8;
}

.clock-dl {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

#hospital-order {
  background: #eee;
}

.set-item {
  em {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: px2rem(80px);
    height: px2rem(100px);
  }
}
.set-item.select {
  color: #2bd6bd;
  font-size: px2rem(34px);
}
.down-border {
  border-bottom: pxrem(1px) solid #e5e5e5;
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
.pp-content {
    width: px2rem(750px);
    .ctbtn {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: pxrem(16px);
        color: #26a2ff;
        background-color: #fff;
    }
    .btns {
        overflow: hidden;
        border-bottom: solid 1px #eaeaea;
    }
    .ctbtn:first-child {
        float: left;
    }
    .ctbtn:last-child {
        float: right;
    }
}
</style>