<template>
	<div id="h-result" :class="type==1?'':'fail'">
		<s-header type="0" title="" :transparent="true" :hasBack='false'></s-header>
		<div class="result-main">
			<div v-if="type==1">
				<p class="fp1">
					<span>成功支付</span>
					<span class="num">{{curCount}}</span>
					<span>元</span>
				</p>
				<p class="sp">钱包余额{{totalAccount}}元</p>
			</div>
			<div v-if="type==2">
				<p class="r-fail-w f0">支付失败</p>
				<i class="fail-i"></i>
			</div>
		</div>
		<button class="btn_fix_bot" @click='goback()' v-if="type==1">确定</button>
		<button class="btn_fix_bot" v-if="type==2" @click='endorder()'>重试</button>
		<div class="gate-mask" v-if="gateFlag&&willPayFlag&&clicksuccess"></div>
		<div class="gate-mess" v-if="gateFlag&&willPayFlag&&clicksuccess">
			<div class="gate-detail">
				<div class="gate-main">
					<div class="content-header">
						<div class="content-title">
							<div>
								<i></i>
								<span>地址：{{extraAddr}}</span>
							</div>
						</div>
						<div class="content-img">
							<img src="https://s.1-1dr.com/static/mobile/img/illustrate.jpg"></img>
						</div>
						<p class="content-text">
							{{extraAddrDesc}}
						</p>
					</div>
					<div class="content-footer" @click="endorder()">知道了</div>
				</div>
			</div>
		</div>
		<div class="gostar" :class="writeStar?'':'hidenode'" v-if="false">
			<p>支付成功</p>
			<ta-editor place="说两句吧..." />
			<div class="rs-block">
				<p>服务评分</p>
				<p>
					<i class="star" v-for="(item,index) in 5" @click="getStar(index)" :key="index"></i>
				</p>
			</div>
			<div class="checkStar">
				<span @click="cancelStar()">取消</span>
				<span @click="sendStar()">确定</span>
			</div>
		</div>
		<div id="gostarBac" :class="writeStar?'':'hidenode'" v-if="false"></div>
	</div>
</template>
<script>
import SHeader from './SHeader.vue'
import TaEditor from './TaEditor.vue'
import http from '../service/api.js'
import { Toast } from 'mint-ui'
import eventBus from '../service/eventbus.js'
export default {
	components: { SHeader, TaEditor },
	data() {
		return {
			type: '',       //根据type出现不同逻辑1成功 2失败
			writeStar: true,
			totalAccount: '',
			curCount: '',
			orderId: '',
			walletType: '',//钱包支付来源
			typeStr: '',//类型来源-待付款-服务中
			gateFlag: true,
			extraAddr: '',
			extraAddrDesc: '',
			willPayFlag: false,//待付款显示门禁卡提示
			clicksuccess: false,//点击成功后门禁卡提示
			returnFlag: true,
		}
	},
	created() {
	},
	activated() {
		var self = this;
		this.walletType = '';
		this.orderId = '';
		let theUrl = window.location.href;
		let obj = this.GetRequest(theUrl);
		console.log(obj);
		this.curCount = obj.money;
		this.orderId = obj.orderId;
		this.type = obj.success;
		if (obj.wallet) {
			this.walletType = obj.wallet;
		}else{
			this.walletType = 'middle-wechat';
		}
		if (obj.typeStr) {
			if (obj.typeStr == 'unpaid' && this.type == 1) {
				self.willPayFlag = true;
				self.initGate();//门禁卡提示
				self.returnFlag = false;
			} else {
				self.willPayFlag = false;
			}
			if (obj.typeStr == 'unpaid') {
				this.typeStr = '待付款';
			} else {
				this.typeStr = '服务中结算';
			}
			if (this.type == 1) {
				dplus.track(["_trackEvent", obj.typeStr + '支付成功页面', "浏览", "", 0, ""]);
			} else {
				dplus.track(["_trackEvent", obj.typeStr + '支付失败页面', "浏览", "", 0, ""]);
			}
		};
		http.post('/json/GetUserAccount').then(function (res) {
			self.totalAccount = res.body.totalAccount;
		});
	},
	methods: {
		initGate() {
			var self = this;
			http.post('/json/PrePayAmountDetail', {
				orderId: self.orderId,
			}).then((res) => {
				if (res.body.needNotice == undefined || !res.body.needNotice || res.body.orderType == 2) {
					self.gateFlag = false;
					return false;
				}
				self.extraAddr = res.body.extraAddr;
				self.extraAddrDesc = res.body.extraAddrDesc;
			})
		},
		GetRequest(str) {
			let strs;
			let theRequest = new Object();
			if (str.indexOf("?") != -1) {
				strs = str.split('?')[1].split('&');
				for (let i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
				}
			}
			return theRequest;
		},
		goback() {
			let self = this;
			self.clicksuccess = true;
			if (!self.gateFlag || self.returnFlag) {//没门禁卡或者是从待结算过来的
				self.payOrder();
			}
		},
		endorder() {
			let self = this;
			self.clicksuccess = false;
			this.payOrder();
		},
		payOrder() {
			let self=this;
			if (self.walletType == 'order') {//支付预交金---钱包支付
				self.$router.go(-1);
			} else if (self.walletType == 'check' || self.walletType == '') {//中间支付--钱包支付
				self.$router.go(-2);
			} else {//中间支付-微信支付
				if(self.type==2){
					self.$router.go(-2);//失败
				}else{
					self.$router.go(-3);//成功
				}
			}
		},
		getStar(index) {
			var starNode = document.querySelectorAll(".star");
			for (var j = 0; j < starNode.length; j++) {
				starNode[j].className = 'star';
			}
			if (!index) {
				starNode[0].className = 'star select';
			} else {
				for (var i = 0; i <= index; i++) {
					starNode[i].className = 'star select';
				}
			}
		},
		cancelStar() {
			this.writeStar = false;
		},
		sendStar() {
			var self = this;
			var textNode = document.querySelector("textarea");
			var starNode = document.querySelectorAll(".select.star");
			if (textNode.value != '') {
				if (starNode.length) {
					http.post('/json/SaveOrderPraise', {
						orderId: self.orderId,
						grade1: starNode.length,
						content: textNode.value,
						version: 1
					})
						.then((dt) => {
							Toast({ message: '评价成功' });
							this.writeStar = false;
							console.log(dt);
						})
				} else {
					Toast({ message: '请给服务评分' });
				}
			} else {
				Toast({ message: '评价不能为空' });
			}
		}
	}
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

#h-result {
	background: url('https://s.1-1dr.com/static/mobile/img/login-bg.png') no-repeat left top;
	background-size: 100% auto;
	position: relative;
	font-family: PingFangSC-Light;
}

#h-result.fail {
	background: white;
}

.result-main {
	width: 100%;
	height: 100%;
}

.result-main>div {
	position: absolute;
	width: 100%;
	bottom: px2rem(352px);
}

.fp1 {
	font-size: px2rem(30px);
	color: #6de7d1;

	.num {
		font-size: px2rem(72px);
	}
}

.fp2 {
	font-size: px2rem(72px);
	color: #6de7d1;
}

.sp {
	margin-top: px2rem(50px);
	font-size: px2rem(30px);
	color: #666;
}

#gostarBac {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #000;
	z-index: 800;
	opacity: 0.5;
}

div.hidenode {
	display: none;
}

.gostar {
	position: absolute;
	left: 50%;
	bottom: px2rem(500px);
	transform: translateX(-50%);
	width: px2rem(500px);
	height: px2rem(520px);
	z-index: 801;
	border-radius: px2rem(30px);
	border: px2rem(1px) solid white;
	background: white;
}

.gostar>p {
	text-align: center;
	font-size: px2rem(48px);
	color: #666;
	line-height: px2rem(94px);
}

.gostar .ta-editor {
	padding: 0;
	height: px2rem(186px);
	background: #F0F0F0;
	color: #ccc;
	font-size: px2rem(30px);
}

.rs-block {
	height: px2rem(130px);
	overflow: hidden;
	color: #666;
	font-size: px2rem(36px);
	position: relative;
	border-bottom: px2rem(1px) solid #E4E4E4;
}

.rs-block p:nth-child(1) {
	float: left;
	line-height: px2rem(130px);
	margin-left: px2rem(36px);
}

.rs-block p:nth-child(2) {
	position: absolute;
	top: 50%;
	right: px2rem(34px);
	transform: translateY(-50%);
}

.star {
	display: inline-block;
	width: px2rem(55px);
	height: px2rem(52px);
	background: url('https://s.1-1dr.com/static/mobile/img/wechat/star.png') no-repeat;
	background-size: 100% auto;
}

.star.select {
	background: url('https://s.1-1dr.com/static/mobile/img/wechat/selstar.png') no-repeat;
	background-size: 100% auto;
}

.checkStar {
	font-size: px2rem(36px);
	color: #666;
	height: px2rem(110px);
	line-height: px2rem(110px);
}

.checkStar span {
	display: inline-block;
	width: 50%;
}

.fail-i {
	display: block;
	width: px2rem(326px);
	height: px2rem(326px);
	margin: 0 auto;
	background: url('https://s.1-1dr.com/static/mobile/img/wechat/fail.png') no-repeat;
	background-size: 100% auto;
}

.f0 {
	font-size: px2rem(60px);
	color: #2bd6bd;
	margin-bottom: px2rem(82px);
}

.gate-mask {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 900;
	width: 100%;
	height: 100%;
	background: rgba(29, 29, 38, 0.5);
}

.gate-mess {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 901;
	width: 100%;
	height: 100%;
	.gate-detail {
		padding: pxrem(40px) pxrem(40px) 0 pxrem(40px);
		.gate-main {
			background: #fff;
			border-radius: pxrem(12px);
			.content-header {
				padding: pxrem(48px) pxrem(18px) 0 pxrem(18px);
			}
			.content-title {
				height: pxrem(26px);
				background: #f4f4f4;
				border-radius: pxrem(5px);
				padding-left: pxrem(40px);
				>div {
					position: relative;
				}
				i {
					display: block;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 0;
					width: pxrem(13px);
					height: pxrem(16px);
					background-image: url('https://s.1-1dr.com/static/mobile/img/wechat/locate.png');
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
					-webkit-background–size: cover;
					-moz-background–size: cover;
					-o-background–size: cover;
				}
				span {
					text-align: left;
					display: block;
					margin-left: pxrem(20px);
					line-height: pxrem(26px);
					font-size: pxrem(15px);
					color: #8e8e93;
				}
				margin-bottom: pxrem(88px);
			}
			.content-img {
				img {
					width: 100%;
					height: 100%;
				}
			}
			.content-text {
				margin-top: pxrem(40px);
				padding: 0 pxrem(12px) pxrem(15px) pxrem(12px);
				text-align: left;
				font-size: pxrem(16px);
				color: rgba(29, 29, 38, 0.5);
			}
			.content-footer {
				cursor: pointer;
				height: pxrem(45px);
				line-height: pxrem(45px);
				font-size: pxrem(15px);
				color: #2bd6bd;
				border-top: pxrem(1px) solid rgba(19, 27, 51, 0.03);
			}
		}
	}
}
</style>