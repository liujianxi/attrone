<template>
	<div class="login login-background">
		<div class="login-panel">
			<div class="item">
				<label>手机号</label>
				<input type="tel" placeholder="请输入手机号" maxlength="11" v-model="phone" />
				<div class="separator">
					<a href="javascript:void(0);" :class="{'active':codeBtnActive}" v-model="codeTxt" @click="getSMSCode">{{codeTxt}}</a>
				</div>
			</div>
			<div class="item">
				<label>验证码</label>
				<input type="number" placeholder="请输入验证码" maxlength="4" v-model="code" />
			</div>
			<button :class="{'active':loginBtnActive}" :disabled="!loginBtnActive" @click="goLogin">登&nbsp;&nbsp;录</button>
			<span>登录后默认同意
				<a href="#/agreement">《护理易用户协议》</a>
			</span>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import http, { GET_SMS_CODE, USER_LOGIN } from '../service/api.js'
import {checkLogin, } from '../util/common.js'
/**
 * Login.vue组件对象
 */
export default {
	name: 'login',
	components: {},
	data() {
		return {
			phone: "",	//手机号码
			code: "",	//手机验证码
			count: 60,	//验证码倒计时
			ticktock_is_work: false,	//计时器是否开启 
			codeTxt: "获取验证码",		//验证码按钮文字
			returnuri: '', //重定向跳转的页面
		}
	},
	computed: {
		codeBtnActive: function () {
			if (this.test(this.phone, 'phone') && (!this.ticktock_is_work)) {
				return true;
			} else {
				return false;
			}
		},
		loginBtnActive: function () {
			if ((this.test(this.phone, 'phone')) && (this.test(this.code, 'code'))) {
				return true;
			} else {
				return false;
			}
		}
	},
	activated() {
		var self = this;
		this.phone = '';
		this.code = '';
		this.returnuri = '';
		var urlParams = self.$route.query;
		if (urlParams.returnuri) {
			self.returnuri = urlParams.returnuri;
			console.log('11111');
			console.log(urlParams);
		}
	},
	methods: {
		//执行登录
		'goLogin': function () {
			var self = this;
			//发送请求
			http.post(USER_LOGIN, {
				'phone': this.phone,
				'code': this.code,
				'source': 0
			}).then(function (res) {
				Toast({ message: '登录成功' });
				//跳转到首页
				window.sid= res.body.sid;
				console.log('登录进来：' + res.body.sid);
				//重新拉取登录信息
				checkLogin().then(function (dt) {
					if (dt.isBindPhone) {
						window.isBindPhone = true;		//一定要及时修改标识
						if (self.returnuri) {
							self.$router.push({ path: self.returnuri});
						} else {
							self.$router.push({ path: '/index' });
						}
					} else {
						Toast({ message: '手机号绑定失败' });
					}
				});

			});
		},
		//请求获取验证码
		'getSMSCode': function () {
			var self = this;
			if (self.codeBtnActive) {
				//发送请求
				http.post(GET_SMS_CODE, {
					'phone': self.phone,
					'purpose': 'Login',
					'source': 0
				})
					.then(function (res) {
						if (res.errorCode == 0) {
							//开启重新获取验证码倒计时
							self.startTicktock();
						}
					}, function () {
						Toast({ message: '验证码获取失败!' });
					});
			}
		},
		//获取验证码倒计时
		'startTicktock': function () {
			var self = this;
			self.ticktock_is_work = true;	//倒计时是否进行中
			self.codeBtnActive = false;
			var ticktock = setInterval(function () {
				var str = "剩" + (self.count -= 1) + "秒";
				self.codeTxt = str;
				if (self.count == 0) {
					clearInterval(ticktock);
					self.codeTxt = "获取验证码";
					self.count = 60;
					self.ticktock_is_work = false;
					self.codeBtnActive = true;
				}
			}, 1000);
		},
		//执行验证
		'test': function (value, type) {
			var phoneReg = /^1[34578]\d{9}$/;//手机号校验正则
			var codeReg = /^[\d|\D]{4,}$/;	//验证码及密码验证正则
			if ("phone" == type) {
				return (phoneReg.test(value) && value != undefined) ? true : false;
			} else {
				return (codeReg.test(value) && value != undefined) ? true : false;
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/css/global.scss";

$theme-color:#2BD6BD;
$gradient:(to right, #14cbc9 0%, #18d9bc 40%, #3addb0 100%);

#app>div:first-child {
	height: auto;
}

.login {
	height: auto;
	width: auto;
	padding: px2rem(715px) px2rem(30px) 0 px2rem(30px);
	.login-panel {
		min-height: 200px;
		width: 100%;

		.item {
			display: table;
			border-bottom: 1px solid #ccc;
			width: 100%;
			min-height: px2rem(61px);
			font-size: px2rem(30px);
			color: #666;
			text-align: left;
			padding: px2rem(18px) 0 px2rem(8px) 0;

			label,
			input,
			div {
				height: px2rem(30px);
				line-height: px2rem(30px);
				display: table-cell;
			}

			label {
				width: px2rem(130px);
			}

			input {
				display: block;
				min-height: px2rem(51px);
				padding: px2rem(5px) 0;
				background: transparent;
				border: none;
				font-size: px2rem(28px);
				width: px2rem((130px + 192px));
				&::-webkit-input-placeholder {
					color: #CCCCCC;
					font-size: px2rem(30px);
				}
			}

			div.separator {
				height: px2rem(40px);
				width: px2rem(147px + 40px + 30px);

				a {
					display: block;
					border-left: 1px solid #ccc;
					padding-left: px2rem(30px);
					font-size: px2rem(30px);
					color: #CCCCCC;
				}
				a.active {
					color: $theme-color;
				}
			}
		}

		button {
			background-color: #999;
			width: 100%;
			height: px2rem(83px);
			margin-top: px2rem(99px);
			border-radius: px2rem(10px);
			border: none;
			color: #FFFFFF;
			font-size: px2rem(30px);
		}

		button.active {
			background: linear-gradient($gradient);
		}

		span {
			display: block;
			margin-top: px2rem(34px);
			font-size: px2rem(23px);
			color: #999;

			a {
				color: $theme-color;
			}
		}
	}
}

.login-background {
	background-image: url('https://s.1-1dr.com/static/mobile/img/login-bg.png');
	background-repeat: no-repeat;
	background-size: 100%;
	background-position-y: -1.5px;
}
</style>
