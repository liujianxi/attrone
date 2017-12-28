	<template>
	<div id="make-order" class="page">
		<s-header :type="preway=='wechat'?'3':'0'" :title="serviceName"></s-header>
		<div class="main">
			<div class="color-line1"></div>
			<!-- 机构订单-选择机构和科室 -->
			<div class="addr" @click="goHospitalList()" v-if="isOrgSev">
				<i></i>
				<span v-if="!isEmpty(choiceOrg)" class="notEmpty">{{choiceOrg.orgName}}</span>
				<span v-else>请选择医院 / 养老院</span>
				<i class="r-more"></i>
			</div>
			<div class="addr" @click="goBranchList()" v-if="isOrgSev">
				<i></i>
				<span v-if="!isEmpty(choiceBranch) || !isEmpty(choiceRoom) || !isEmpty(choiceBed)" class="notEmpty">
					<!-- {{choiceRoom.branchName}}&nbsp;&nbsp;{{choiceRoom.roomNo}}&nbsp;&nbsp;{{choiceBed.bedNo}} -->
					{{choiceBranch.branchName}}
				</span>
				<span v-else>请选择科室信息</span>
				<i class="r-more"></i>
			</div>

			<!-- 居家订单-选择联系地址 -->
			<div class="addr noborder" @click="goBranchList()" v-if="!isOrgSev">
				<i v-if="isEmpty(sureAddr)"></i>
				<div class="address" v-if="!isEmpty(sureAddr)">
					<span class="notEmpty">{{sureAddr.contacts}}</span>
					<span class="notEmpty">{{sureAddr.phone}}</span>
					<i class="r-more"></i>
				</div>
				<p v-if="!isEmpty(sureAddr)" class="notEmpty">
					{{sureAddr.addressInfo}}
					<!--{{sureAddr.building}}-->
				</p>
				<span class="notEmpty" v-else>请填写服务地址</span>

			</div>

			<div class="color-line2"></div>
			<div class="row time" @click="clickTimeDiv()">
				<i></i>
				<span v-if='textDate==""'>请选择预约时间</span>
				<span class="font-black notEmpty" v-else>{{textDate}}&nbsp;{{textTime}}</span>
				<input type="hidden" v-model="serviceStartTime"></input>
				<input type="hidden" v-model="serviceEndTime"></input>
				<i class="r-more"></i>
			</div>
			<div class="row phone">
				<i></i>
				<input type="tel" placeholder="联系电话" v-model='phone' @focus="phoneFocus()">
				<i class="r-edit"></i>
			</div>
			<div class="row people" @click="clickPeople()">
				<i></i>
				<span v-if="isEmpty(family)">被服务人信息</span>
				<span class="font-black notEmpty" v-else>{{ family.name }}&nbsp;{{ family.sex| sexFilter }}&nbsp;{{ family.age==undefined?'':family.age+'岁'}} </span>
				<i class="r-more"></i>
			</div>
			<div class="ser-choose-tit" v-if="!isOrgSev&&(homeList.length>0)">请选择服务</div>
			<div class="row set-item" v-if="!isOrgSev&&(homeList.length>0)" v-for='(price,index) in homeList' @click="surePrice(price)" :class="[price.select&&priceId!=''? 'select' : '']" :key="index">
				<!--<div :class="['tc_radio',price.select ? 'select' : '']">
																																																																																																																																																																																																												<div class="tc_radio_inside"></div>
																																																																																																																																																																																																											</div>-->
				<span>{{price.serviceItem}}</span>
				<span class="ser-price">{{price.priceStr}}</span>
				<em @click='serviceDetail(price,$event)'>
					<i :class="[price.select&&priceId!=''? 'r-more-select' : '','r-more']"></i>
				</em>
			</div>
			<div class="row set-item" v-if="!!priceList121&&priceList121.length>0 && choice121&&isOrgSev" v-for='(price,index) in priceList121' @click="surePrice(price)" :class="[price.select&&priceId!=''? 'select' : '']" :key="index" :asselect="price.select">
				<!--<div :class="['tc_radio',price.select ? 'select' : '']">
																																																																																																																																																																																																												<div class="tc_radio_inside"></div>
																																																																																																																																																																																																											</div>-->
				<span>{{price.serviceItem}}</span>
				<span class="ser-price">{{price.priceStr}}</span>
				<em @click='serviceDetail(price,$event)'>
					<i :class="[price.select&&priceId!=''? 'r-more-select' : '','r-more']"></i>
				</em>
			</div>

			<div class="row set-item" v-if="!!priceList12N&&priceList12N.length>0 && !choice121&&isOrgSev" v-for='(price,index) in priceList12N' @click="surePrice(price)" :class="[price.select&&priceId!=''? 'select' : '']" :key="index">
				<!--<div :class="['tc_radio',price.select ? 'select' : '']">
																																																																																																																																																																																																												<div class="tc_radio_inside"></div>
																																																																																																																																																																																																											</div>-->
				<span>{{price.serviceItem}}</span>
				<span class="ser-price">{{price.priceStr}}</span>
				<em @click='serviceDetail(price,$event)'>
					<i :class="[price.select&&priceId!=''? 'r-more-select' : '','r-more']"></i>
					<i class="r-more"></i>
				</em>
			</div>
		</div>

		<div class="yuyue">
			<div class="yy-txt">预付款{{prepayAmount}}元</div>
			<div class="yy-btn" @click="yuyueClick?submit():''">预约</div>
		</div>

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
import SHeader from './SHeader.vue'
import { Toast, Popup } from 'mint-ui'
import { wxGetPosition, checkLogin, amapGetPosition, getCurrentUrl, isEmpty } from '../util/common.js'
import EventBus from '../service/eventbus.js'
import http from '../service/api.js'

export default {
	name: 'makeorder',
	components: { Popup, SHeader },
	data() {
		return {
			yuyueClick: true,
			preway: '',//前一级路径
			serviceType: '',	//服务类型
			serviceName: '新增订单',	//服务名称
			isOrgSev: false,	//是否为机构订单 true-机构订单/false-居家订单
			// orgId: '', //计算出来的最近医院的id
			// hospitalName: '',	//医院名称
			showTimePanel: false, //是否显示时间面板
			choiceOrg: {	//选中的医院
				orgId: '',
				orgName: ''
			},
			position: window.position, //当前定位信息
			choiceBranch: {}, //选中的科室
			choiceRoom: {}, //选中的病房
			choiceBed: {}, //选中的病床
			phone: '',	//联系电话
			family: '',	//亲属
			dates: [], //服务日期
			times: [],//服务时间
			orderType: 1, //订单类型：1-机构 2-居家
			priceList121: [],	//一对一服务套餐列表
			priceList12N: [],	//一对多服务套餐列表
			homeList: [],
			prepayAmount: 0.00,//预付款
			choice121: true,	//是否为一对一服务
			price121: null,	//选中的一对一服务项
			price12N: null,	//选中的一对多服务
			sureAddr: {},         //选中的服务地址
			lastUrl: '',			//上一个页面的url
			priceId: '',			//选中服务的priceId
			serviceStartTime: null,//服务的开始时间
			serviceEndTime: null,//服务的开始时间
			homebranchId: '',//选择科室的branchId
			selectTime: null,//默认标记具体时间--第一次显示
			selectDate: null,//默认标记的具体日期--第一次显示
			textTime: '',//点击确定显示在页面的时间
			textDate: '',//点击确定显示在页面的日期
			currentKinsFolk: {},//默认的服务人对象,
			kinsName: '',//输入的新服务人名称
			hospital_price_default: '',//机构时默认选中的价格
			familyFlag: true,
			addrFlag: true,
			nokins_flag: false,//有无kinflok
		}
	},
	computed: {
	},
	created() {
		let self = this;
		//默认获取全局中的最近医院
		self.getPosition().then(function() {
			self.loadSetting();
		}).catch(function() {
			self.loadSetting();
		});
		//获取选中的科室
		EventBus.$on('choice', function(data) {
			// console.info('listen choice come back!');
			//赋值
			self.choiceBranch = data.choiceBranch;
			self.choiceRoom = data.choiceRoom;
			self.choiceBed = data.choiceBed;
			self.homebranchId = data.choiceBranch.id;
			this.lastUrl = data.theUrl;
			this.sureLasrUrl();
			console.log(self.choiceBranch);
		}.bind(this))

		//获取选中的医院
		EventBus.$on('choiceOrg', function(data) {
			//更新到全局
			this.choiceOrg = data.org;
			window.nearestOrg = data.org;
			this.lastUrl = data.theUrl;
			this.sureLasrUrl();
			this.choiceBranch = {};
			console.log(self.choiceRoom);
		}.bind(this));

		//获取选中的服务地址
		EventBus.$on('sureAddr', function(data) {
			//更新到全局
			this.sureAddr = data.addr;
			this.lastUrl = data.theUrl;
			this.sureLasrUrl();
			this.addrFlag = false;
		}.bind(this));

		//获取选中的服务人信息
		EventBus.$on('sureFamily', function(data) {
			self.family = data.family;
			self.lastUrl = data.theUrl;
			self.sureLasrUrl();
			self.familyFlag = false;
			console.log(self.family);
		})
		EventBus.$on('service', function(data) {
			self.lastUrl = data.theUrl;
			self.sureLasrUrl();
		})
		//		dplus.track(["_trackEvent", this.serviceName + '预约', "浏览", "", 0, ""]);
	},
	activated() {
		var self = this;
		self.preway = self.$route.query.preway;
		var testurl = window.location.href;
		self.lastUrl = '';
		//进入下单页面的初始化
		self.initUrlParam();
		//载入数据
		self.loadData();
		if (self.addrFlag) {
			self.getInitAddr();
		}
		self.getkinsfolk();
		self.priceId = '';
		//居家默认加载homePrice addrlist
		if (!self.isOrgSev) {
			self.homePrice(self.position.adcode, self.$route.query.st);
		}
	},
	methods: {
		getkinsfolk() {
			let self = this;
			http.post('/json/ListKinsfolk').then((res) => {
				if (res.body.kinsfolkList.length) {
					self.nokins_flag = true;
					if (self.familyFlag) {
						self.currentKinsFolk = res.body.kinsfolkList[0];
						// self.currentKinsFolk = {};
						self.family = self.currentKinsFolk;
					}
				} else {
					self.nokins_flag = false;
					self.currentKinsFolk = {};
					self.family = {}
				}
			})
		},
		loadSetting() {
			// console.info('loadHome come in!'+JSON.stringify(window.position));
			var self = this;
			//拼接参数，发送请求
			http.post('/json/GetSettings', {
				lat: window.position.lat,
				lng: window.position.lng,
				adcode: window.position.adcode,
				cityCode: window.position.citycode
			}).then(function(res) {
				window.nearestOrg = res.body.nearestOrg;
				self.choiceOrg = res.body.nearestOrg;
			});

		},
		getPosition() {
			let self = this;
			return new Promise(function(resolve, reject) {
				wxGetPosition(window.wx).then(function(res) {
					//微信定位获取经纬度
					console.log(res);
					window.position.lat = res.lat;//经度
					window.position.lng = res.lng;//纬度
					return amapGetPosition(window.amap, [res.lng, res.lat]);
				}).then(function(res) {
					//高德地图根据经纬度获取adcode
					window.position.adcode = res.adcode;//区域编号
					window.position.citycode = res.citycode;//城市编码
					resolve();
				}).catch(function() {
					// console.info('getPosition catch come in!');
					reject();
				});
			});
		},
		serviceDetail(str, event) {
			event.stopPropagation();
			dplus.track(["_trackEvent", this.serviceName + '预约查看服务详情-' + str.serviceItem, "点击", "", 0, ""]);
			this.$router.push({
				path: '/orderservicedetail', query: {
					description: str,
				}
			})
		},
		getInitAddr() {
			let self = this;
			http.post('/json/ListUserAddress').then((res) => {
				if (res.body.userAddressVO.length) {
					self.sureAddr = res.body.userAddressVO[0];
				} else {
					self.sureAddr = {};
				}
			})
		},
		sureLasrUrl() {
			if (this.lastUrl == 'index') {
				this.prepayAmount = '0.00';
				this.textTime = '';
				this.textDate = '';
				this.serviceStartTime = null;
				this.serviceEndTime = null;
				this.choiceBranch = {};
				this.kinsName = '';
				this.familyFlag = true;
			}
		},
		//提交订单
		submit() {
			var self = this;
			var flag = false;
			dplus.track(["_trackEvent", this.serviceName + '预约确定按钮', "点击", "", 0, ""]);
			console.log(self.sureAddr);
			//居家时
			if (!self.isOrgSev) {
				if (self.serviceStartTime != null && self.priceId != '' && self.sureAddr.addrId != undefined && self.phone != '' && self.family.name != undefined) {
					var temp = /^1[3|4|5|7|8]\d{9}$/;
					if (!temp.test(self.phone)) {
						Toast({ message: '请填写正确的手机号', duration: 1000 });
					} else {
						flag = true;
					}

				} else if (self.sureAddr.addrId == undefined) {
					Toast({ message: '请选择或添加服务地址', duration: 1000 });
				} else if (self.serviceStartTime == null) {
					Toast({ message: '请选择时间', duration: 1000 });
					setTimeout(() => {
						self.clickTimeDiv();
					}, 200);
				} else if (self.phone == '') {
					Toast({ message: '请填写正确的手机号', duration: 1000 });
				} else if (self.family.name == undefined) {
					Toast({ message: '请选择或添加被服务人', duration: 1000 });
				} else if (self.priceId == '') {
					Toast({ message: '请选择服务套餐', duration: 1000 });
				}
			}
			var params = {
				serviceStartTime: self.serviceStartTime,//null
				serviceEndTime: self.serviceEndTime,//null
				// kinsId: ,//undefined
				priceId: self.priceId,//''
				orderType: self.orderType,
				phone: self.phone,//''
				// roomId: self.choiceRoom.roomId,//undefined
				// bedId: self.choiceBed.bedId,//undefined
				addrId: self.sureAddr.addrId || '',//undefined
				bonus: 0,
			};
			if (isEmpty(self.currentKinsFolk)) {
				params['kinsName'] = self.kinsName;
			} else {
				params['kinsId'] = self.family.kinsId;
			}
			console.log(params);
			if (flag) {
				//发送请求
				http.post('/json/CreateOrder', params).then(function(res) {
					if (res.errorCode == 0) {
						Toast({ message: '提交成功！' });
						self.makeOrder();//下订单跳转至订单详情
					} else {
						Toast({ message: res.msg });
					}

				}, function(res) {
					//						Toast({message: res.msg});
				});
			}

		},
		makeOrder() {
			var self = this;
			http.post('/json/GetOrderList').then(function(res) {
				var orderId = res.body.orderVOList[0].orderId;
				var type;
				if (parseFloat(self.prepayAmount) > 0) {//需交预约金
					type = 1;
					self.$router.push({ path: '/order', query: { orderid: orderId, detailtype: type } });
				} else {
					self.$router.push({ path: '/orderlist' });
				}
			})

		},
		//暴露给vue模板使用的非空判断
		isEmpty(obj) {
			return isEmpty(obj);
		},
		//初始化URL参数
		initUrlParam() {
			var self = this;
			//如果URL有参数，则覆盖当前值
			let urlQueryObj = this.$route.query;
			// this.$route.query.nearestOrg
			try {
				let serviceType = urlQueryObj.st;
				let serviceName = urlQueryObj.name;
				// let nearestOrg = urlQueryObj.nearestOrg;

				// this.nearestOrg = nearestOrg?nearestOrg:{};
				this.serviceType = serviceType ? serviceType : '';
				this.serviceName = serviceName ? serviceName : '新增订单';
				this.isOrgSev = (serviceType.indexOf('org') != -1) ? true : false;

			} catch (e) {
				console.error(e);
			}
		},
		swichBtn(type) {
			this.choice121 = (type == '121') ? true : false;
		},
		surePrice(price) {
			var self = this;
			dplus.track(["_trackEvent", this.serviceName + '预约选择服务-' + price.serviceItem, "点击", "", 0, ""]);
			if (self.homeList.length) {
				self.homeList.forEach(function(item, index) {
					if (item.priceId == price.priceId) {
						item.select = true;
						self.priceId = item.priceId;
						self.prepayAmount = item.prepayAmount;
					} else {
						item.select = false;
					}
				})
			}
		},
		homePrice(id, st) {
			var self = this;
			//发送请求
			http.post('/json/GetPrice', { adcode: id, st: st })
				.then(function(res) {
					if (res.errorCode == 0) {
						res.body.familyPriceList.forEach(function(item, index) {
							if (item.defaultStatus == 1) {
								self.priceId = item.priceId;
								self.prepayAmount = item.prepayAmount;
								item.select = true;
							} else {
								item.select = false;
							}
						})
						self.homeList = res.body.familyPriceList;
					} else {
						self.yuyueClick = false;
					}
				}, function() {
					self.yuyueClick = false;
				});
		},
		goHospitalList() {
			dplus.track(["_trackEvent", this.serviceName + '预约选择医院', "点击", "", 0, ""]);
			this.$router.push({ name: 'hospitallist' });
		},
		goBranchList() {
			let self = this;
			//如果未选择医院，则跳转到医院列表
			if (this.isOrgSev) {
				dplus.track(["_trackEvent", this.serviceName + '预约选择科室', "点击", "", 0, ""]);
				if (isEmpty(this.choiceOrg) || !this.choiceOrg.orgId) {
					this.goHospitalList();
					//选择医院后，才进入选择科室的页面
				} else {
					var params = {
						choiceOrg: this.choiceOrg,
						position: this.position,
						beforePage: 'makeorder'
					}
					self.$router.push({
						name: 'branchList',
						query: { params: params }
					});
				}
			} else {
				dplus.track(["_trackEvent", this.serviceName + '预约选择服务地址', "点击", "", 0, ""]);
				this.$router.push({
					name: 'addrlist'
				});
			}

		},
		clickTimeDiv() {
			let self = this;
			dplus.track(["_trackEvent", this.serviceName + '预约选择时间', "点击", "", 0, ""]);
			this.showTimePanel = true;
			//textDate
			console.log(self.textDate);
			console.log(self.textTime);
			if (self.textDate) {
				if (!self.isOrgSev) {//居家
					let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
					let timeNode_date_span = document.querySelectorAll('.dates-dl dd span');//日期
					let timeNode_time = document.querySelectorAll('.clock-dl dd.timing');//时间
					let timeNode_time_span = document.querySelectorAll('.clock-dl dd.timing span');
					for (let i = 0; i < timeNode_date.length; i++) {
						timeNode_date[i].className = '';
						if (timeNode_date_span[i].innerHTML == self.textDate) {
							timeNode_date[i].className = 'select';
						}
					}
					for (let j = 0; j < timeNode_time.length; j++) {
						timeNode_time[j].className = 'timing';
						if (timeNode_time_span[j].innerHTML == self.textTime) {
							timeNode_time[j].className = 'timing select';
						}
					}
				} else {
					let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
					let timeNode_date_span = document.querySelectorAll('.dates-dl dd span.isOrgSev_time');//日期
					let timeNode_time = document.querySelectorAll('.clock-dl dd');//时间
					let timeNode_time_span = document.querySelectorAll('.clock-dl dd span');
					for (let i = 0; i < timeNode_date.length; i++) {
						timeNode_date[i].className = '';
						if (timeNode_date_span[i].innerHTML == self.textDate) {
							timeNode_date[i].className = 'select';
						}
					}
					for (let j = 0; j < timeNode_time.length; j++) {
						timeNode_time[j].className = '';
						if (timeNode_time_span[j].getAttribute('datetime') == self.textTime) {
							timeNode_time[j].className = 'select';
						}
					}
				}
			} else {//时间选择框为空
				//默认选择第一天
				let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
				for (let i = 0; i < timeNode_date.length; i++) {
					if (i == 0) {
						timeNode_date[i].className = 'select';
					} else {
						timeNode_date[i].className = '';
					}

				}
				self.times = self.dates[0].dayTimeData;
				console.log(self.times);
				if (!self.isOrgSev) {//居家
					let time_arr = self.times.amList.concat(self.times.pmList);
					let timeNode_time = document.querySelectorAll('.clock-dl dd.timing');//时间
					let timeNode_time_span = document.querySelectorAll('.clock-dl dd.timing span');
					for (let i = 0; i < timeNode_time.length; i++) {
						timeNode_time[i].className = 'timing';
					}
					for (let j = 0; j < timeNode_time.length; j++) {
						if (time_arr[j].status) {
							timeNode_time[j].className = 'select timing';
							return;
						}
					}
				} else {
					let time_arr = self.times.mList;
					let timeNode_time = document.querySelectorAll('.clock-dl dd');//时间
					let timeNode_time_span = document.querySelectorAll('.clock-dl dd span');
					for (let i = 0; i < timeNode_time.length; i++) {
						timeNode_time[i].className = '';
					}
					for (let j = 0; j < timeNode_time.length; j++) {
						if (time_arr[j].status) {
							timeNode_time[j].className = 'select';
							return;
						}
					}
				}
			}
		},
		cancelTime() {
			dplus.track(["_trackEvent", this.serviceName + '预约选择时间-取消按钮', "点击", "", 0, ""]);
			var self = this;
			this.showTimePanel = false;
		},
		sureTime() {
			let self = this;
			dplus.track(["_trackEvent", this.serviceName + '预约选择时间-确定按钮', "点击", "", 0, ""]);
			this.showTimePanel = false;
			if (!self.isOrgSev) {//居家
				let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
				let timeNode_date_span = document.querySelectorAll('.dates-dl dd span');//日期
				let timeNode_time = document.querySelectorAll('.clock-dl dd.timing');//时间
				let timeNode_time_span = document.querySelectorAll('.clock-dl dd.timing span');
				let timeNode_time_start = document.querySelectorAll('.clock-dl dd.timing input.start_time');
				let timeNode_time_end = document.querySelectorAll('.clock-dl dd.timing input.end_time');
				for (let i = 0; i < timeNode_date.length; i++) {
					if (timeNode_date[i].className == 'select') {
						self.textDate = timeNode_date_span[i].innerHTML;//选中的日期
					}
				}
				self.textTime = '';
				for (let j = 0; j < timeNode_time.length; j++) {
					if (timeNode_time[j].className != 'timing') {
						self.textTime = timeNode_time_span[j].innerHTML;//选中的日期
						self.serviceStartTime = timeNode_time_start[j].value;
						self.serviceEndTime = timeNode_time_end[j].value;
					}
				}
				if (!self.textTime) {
					self.textDate = '';
					self.serviceStartTime = null;
					self.serviceEndTime = null;
				}
				console.log(self.textTime);
				console.log(self.textDate);
			} else {
				let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
				let timeNode_date_span = document.querySelectorAll('.dates-dl dd span.isOrgSev_time');//日期
				let timeNode_time = document.querySelectorAll('.clock-dl dd');//时间
				let timeNode_time_span = document.querySelectorAll('.clock-dl dd span');
				let timeNode_time_start = document.querySelectorAll('.clock-dl dd input.start_time');
				let timeNode_time_end = document.querySelectorAll('.clock-dl dd input.end_time');
				for (let i = 0; i < timeNode_date.length; i++) {
					if (timeNode_date[i].className == 'select') {
						self.textDate = timeNode_date_span[i].innerHTML;//选中的日期
					}
				}
				self.textTime = '';
				for (let j = 0; j < timeNode_time.length; j++) {
					if (timeNode_time[j].className == 'select') {
						self.textTime = timeNode_time_span[j].getAttribute('datetime');//选中的日期
						self.serviceStartTime = timeNode_time_start[j].value;
						self.serviceEndTime = timeNode_time_end[j].value;
					}
				}
				if (!self.textTime) {
					self.textDate = '';
					self.serviceStartTime = null;
					self.serviceEndTime = null;
				}
			}
		},
		clickPeople() {
			let self = this;
			dplus.track(["_trackEvent", this.serviceName + '预约添加被服务人', "点击", "", 0, ""]);
			if (!self.nokins_flag) {//无亲属
				self.$router.push({
					path: '/addmember', query: { goback: 'family' }
				});
			} else {
				self.$router.push({
					path: '/family',
					query: { type: 'home' },
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
			if (!self.isOrgSev) {//居家
				let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
				let timeNode_date_span = document.querySelectorAll('.dates-dl dd span');//日期
				for (let s = 0; s < timeNode_date.length; s++) {
					timeNode_date[s].className = '';
					if (tmpdate.dayStr == timeNode_date_span[s].innerHTML) {
						timeNode_date[s].className = 'select';
					}
				}
				let time_arr = tmpdate.dayTimeData.amList.concat(tmpdate.dayTimeData.pmList);
				console.log(time_arr);
				let timeNode_dd = document.querySelectorAll('.clock-dl dd.timing');
				let timeNode_span = document.querySelectorAll('.clock-dl dd.timing span');
				for (let i = 0; i < time_arr.length; i++) {
					timeNode_dd[i].className = 'timing';
					timeNode_span[i].className = '';
					if (time_arr[i].status) {
						timeNode_span[i].className = '';
					} else {
						timeNode_span[i].className = 'out-time';
					}
				}
				for (let j = 0; j < time_arr.length; j++) {
					if (time_arr[j].status) {
						timeNode_dd[j].className = 'timing select';
						return;
					}
				}
			} else {
				let timeNode_date = document.querySelectorAll('.dates-dl dd');//日期
				let timeNode_date_span = document.querySelectorAll('.dates-dl dd span.isOrgSev_time');//日期
				for (let s = 0; s < timeNode_date.length; s++) {
					timeNode_date[s].className = '';
					if (tmpdate.dayStr == timeNode_date_span[s].innerHTML) {
						timeNode_date[s].className = 'select';
					}
				}
				let time_arr = tmpdate.dayTimeData.mList;
				let timeNode_dd = document.querySelectorAll('.clock-dl dd');
				let timeNode_span = document.querySelectorAll('.clock-dl dd span');
				for (let i = 0; i < time_arr.length; i++) {
					timeNode_dd[i].className = '';
					timeNode_span[i].className = '';
					if (time_arr[i].status) {
						timeNode_span[i].className = '';
					} else {
						timeNode_span[i].className = 'out-time';
					}
				}
				for (let j = 0; j < time_arr.length; j++) {
					if (time_arr[j].status) {
						timeNode_dd[j].className = 'select';
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
				let timeNode_dd = document.querySelectorAll('.clock-dl dd.timing');
				for (let i = 0; i < timeNode_dd.length; i++) {
					timeNode_dd[i].className = 'timing';
					if (str == 'am') {
						timeNode_dd[index].className = 'timing select';
					} else {
						timeNode_dd[index + 4].className = 'timing select';
					}
				}
			} else {
				let timeNode_dd = document.querySelectorAll('.clock-dl dd');
				for (let i = 0; i < timeNode_dd.length; i++) {
					timeNode_dd[i].className = '';
					timeNode_dd[index].className = 'select';
				}
			}

		},
		//1是机构，2是居家
		loadData() {

			var self = this;
			//发送请求
			if (this.isOrgSev) {
				self.orderType = 1
			} else {
				self.orderType = 2
			}
			http.post('/json/GetOrderTime', {
				orderType: self.orderType

			}).then(function(res) {
				self.phone = res.body.phone;//默认联系电话
				self.dates = res.body.timeDataList;
				self.times = self.dates[0].dayTimeData;
				self.selectDate = self.dates[0].dayStr;
				// self.textDate = self.selectDate;//默认选择-日期
				let time_arr = [];
				if (!self.isOrgSev) {//居家
					let time_flag = true;
					time_arr = self.times.amList.concat(self.times.pmList);
					for (let i = 0; i < time_arr.length; i++) {
						if (time_arr[i].status) {
							self.selectTime = time_arr[i].time;
							self.textTime = self.selectTime;
							// self.serviceStartTime = time_arr[i].serviceStartTime;
							// self.serviceEndTime = time_arr[i].serviceEndTime;
							time_flag = false;
							break;
						}
					}
					if (time_flag) {//第一天时间已过，选第二天的
						self.selectDate = self.dates[1].dayStr;
						// self.textDate = self.selectDate;
						self.times = self.dates[1].dayTimeData;
						time_arr = self.dates[1].dayTimeData.amList.concat(self.dates[1].dayTimeData.pmList);
						for (let j = 0; j < time_arr.length; j++) {
							if (time_arr[j].status) {
								self.selectTime = time_arr[j].time;
								self.textTime = self.selectTime;
								// self.serviceStartTime = time_arr[j].serviceStartTime;
								// self.serviceEndTime = time_arr[j].serviceEndTime;
								break;
							}
						}
					}
				}
			}, function() {
				Toast({ message: '获取失败!' });
			});
		},
		phoneFocus() {
			dplus.track(["_trackEvent", this.serviceName + '预约修改电话', "点击", "", 0, ""]);
		}

	}
}
</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/little.scss';
@import '../assets/css/order.scss';

#make-order {
	background-color: #fff;
}

.ser-choose-tit {
	background-color: #eee;
}

.main {
	/*医院选择*/
	.addr:nth-child(2) {
		border-bottom: 1px solid #E5E5E5;
	}
	/*科室选择*/
	.addr:nth-child(3) {
		/*隐藏图标*/
		i:first-child {
			background: none;
		}
	}
	.notEmpty {
		color: #333;
	}
	.addr.noborder {
		border-bottom: none;
	}
}

.people {
	// border-bottom: 1px solid #ebebeb;
	input {
		width: 80%;
		font-size: px2rem(32px);
		padding: px2rem(4px) 0;
		height: 80%;
	}
}

.phone {
	input {
		height: 98%;
	}
}

.pp-content {
	width: px2rem(750px);
}

.btns {
	height: px2rem(100px);
	border-bottom: 1px solid #f8f8f8;
	line-height: px2rem(100px);
	text-align: center;
	display: flex;
	display: -webkit-flex;
	li {
		flex: 1;
		-webkit-flex: 1;
		text-align: center;
	}
	.ctbtn {
		color: #2bd6bd;
		width: px2rem(120px);
		height: px2rem(48px);
		line-height: px2rem(48px);
		font-size: px2rem(28px);
		border: 1px solid #2bd6bd;
		border-radius: px2rem(60px);
		background-color: #fff;
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
	padding: px2rem(25px) px2rem(90px) px2rem(25px) 0;
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
	-webkit-box-pack: center;
	background-color: #f8f8f8;
}

.clock-dl {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-box-pack: center;
}

#make-order {
	background: #eee;
}

.set-item {
	em {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		width: px2rem(80px);
		height: px2rem(100px)
	}
}
.set-item.select{
    background: #2bd6bd;
    color: white;
    font-size: px2rem(34px);
}
</style>