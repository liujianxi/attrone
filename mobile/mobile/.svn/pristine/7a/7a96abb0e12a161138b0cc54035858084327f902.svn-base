<template>
	<div id="careApply">
		<div id="orderHead">
			<!--<s-header 
		        type="0"
		        title="申请自照员"
		        :hasBack='true'
		    ></s-header>-->
			<section class="content">
				<div class="content-top" @click="uploadIDCard()" v-if="!idCardLink">
					<div class="apply-id">
						<img src="http://s.1-1dr.com/static/mobile/img/add.png" />
						<span>点击上传身份证正面照</span>
					</div>
				</div>
				<div class="idpic" @click="uploadIDCard()" v-if="idCardLink">
					<div class="pic-w">
						<img class="idCard" :src="idCardLink" />
					</div>
				</div>

				<div class="content-detail">
					<dl>
						<dd>
							<span>姓名：</span>
							<input type="text" v-model="username" placeholder="请输入姓名" />

						</dd>
						<dd>
							<span>手机：</span>
							<input type="tel" v-model="telphone" placeholder="请输入手机号" />
							<i class="del-input" v-show="!!telphone&& telphone.length>0" @click="clearIdCardInput('telphone')"></i>
						</dd>
						<dd @click="goAddrsSearch()">
							<span>您的位置：</span>
							<input type="text" v-model="building" placeholder="请选择地址" />
							<i class="r-more"></i>
						</dd>
						<dd>
							<span>详细地址：</span>
							<input type="text" v-model="addr" placeholder="请输入具体地址" />
							<i class="del-input" v-show="!!addr&& addr.length>0" @click="clearIdCardInput('addr')"></i>
						</dd>
						<dd>
							<span>身份证：</span>
							<input type="text" v-model="idcard" placeholder="请输入身份证号" />
						</dd>
						<dd>
							<span>推荐人手机：</span>
							<input type="tel" v-model="otherPhone" placeholder="请输入推荐人手机号" />
							<i class="del-input" v-show="!!otherPhone&& otherPhone.length>0" @click="clearIdCardInput('otherPhone')"></i>
						</dd>
						<dd>
							<span>请选择拥有的证件照（没有则都不选）</span>
						</dd>
						<dd>
							<span>健康证</span>
							<p>
								<i :class="[paperChose1?'select':'','gou']" @click="paperChose1=!paperChose1"></i>
							</p>
						</dd>
						<dd>
							<span>护理员资格证</span>
							<p>
								<i :class="[paperChose2?'select':'','gou']" @click="paperChose2=!paperChose2"></i>
							</p>
						</dd>
					</dl>
				</div>
			</section>
			<input type="hidden" v-model="checkUsername">
			<button class="btn_fix_bot" @click='gosubmit()'>提交申请</button>
		</div>
	</div>
</template>
<script>
import { Toast, MessageBox, Indicator, Popup } from 'mint-ui'
import SHeader from './SHeader.vue';
import eventBus from '../service/eventbus.js';
import { wxChooseImage, wxUploadImage, isEmpty, isEmptyStr } from '../util/common.js'
import http from '../service/api.js'
export default {
	components: { SHeader },
	data() {
		return {
			//          	username:'',
			//          	telphone:'',
			//          	addr:'',
			//          	idcard:'362201199407123611',
			//          	otherPhone:'14480464857',
			username: '',//用户名
			telphone: '',//电话
			addr: '',//住址
			idcard: '',//身份证
			otherPhone: '',//推荐人电话
			paperChose1: false,
			paperChose2: false,
			submitFlag: false,
			idCardLink: '',//身份证链接
			idcardPic: '',
			isHealth: '',//是否有健康证 1-有 2-无
			isNurse: '',//是否有护理员资格证 1-有 2-无
			adCode: '',//
			building: '',//选中的地图中的地址
			addrDetai: '',
			gpsType: 2,//经纬度类型 1-百度 2-高德
			lat: '',//经度
			lng: '',//维度
			shouldInit: true,
		}
	},
	computed: {
		checkUsername: function() {
			var self = this;
			let pattern = /^[\u4E00-\u9FA5]+$/;
			var textstr = [];
			var arry = [];
			if (self.username) {
				arry = self.username.split('');
			}
			for (var i = 0; i < 4; i++) {
				textstr.push(arry[i]);
			}
			self.username = textstr.join('');
		},
	},
	activated() {
		var self = this;
		eventBus.$on('sureSearchAddr', (data) => {
			console.log(data);
			self.adCode = data.pos.adcode;
			self.building = data.pos.name;
			self.lat = data.pos.location.lat;
			self.lng = data.pos.location.lng;
		});
		if (!self.shouldInit) {
			self.shouldInit = true;      //还原标志位
			return;
		}
		this.adCode = '';
		this.username = '';
		this.telphone = '';
		this.addr = '';
		this.idcard = '';
		this.building = '';
		this.otherPhone = '';
		this.paperChose1 = false;
		this.paperChose2 = false;
		this.idCardLink = '';
	},
	methods: {
		//跳转到地址搜索页面
		goAddrsSearch() {
			this.shouldInit = false;
			this.$router.push({ path: '/addrSearch' });
		},
		gosubmit() {
			let self = this;
			this.submitCheck();
			console.log(this.submitFlag);
			if (!this.submitFlag) {//信息不完整。。。。
				return false;
			}
			self.isHealth = self.paperChose1 ? '1' : '2';
			self.isNurse = self.paperChose2 ? '1' : '2';
			let params = {
				idcardPic: self.idcardPic,//	身份证图片id
				idcard: self.idcard,//身份证号
				applyName: self.username,//申请人
				applyPhone: self.telphone,//	申请人手机号
				isHealth: self.isHealth,//	是否有健康证 1-有 2-无
				isNurse: self.isNurse,//是否有护理员资格证 1-有 2-无
				referrerPhone: self.otherPhone,//推荐人手机号
				adCode: self.adCode,
				building: self.building,
				addrDetail: self.addr,//详细地址
				gpsType: self.gpsType,//经纬度类型 1-百度 2-高德
				lat: self.lat,
				lng: self.lng,
			}
			console.log(params);
			///json/AddInsureStaffApply
			http.post('/json/AddInsureStaffApply', params)
				.then(function(res) {
					//                  Toast({message: '申请成功！'});
					if (res.errorCode == 0) {
						let applyId = res.body.applyId;
						self.$router.push({ path: '/applysucc', query: { applyId: applyId } });
					}

				});
		},
		submitCheck() {
			var self = this;
			if (self.username != '' && self.telphone != '' && self.addr != '' && self.idcard != '' && self.building != '') {
				let temp = /^1[3|4|5|7|8]\d{9}$/;
				let pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if (!temp.test(self.telphone) || !pattern.test(this.idcard)) {

					if (!temp.test(self.telphone)) {
						Toast({ message: '请正确填写本人手机号', duration: 1000 });
					} else {
						Toast({ message: '身份证不合法', duration: 1000 });
					}

				} else {
					self.submitFlag = true;
				}
			} else if (self.username == '') {
				Toast({ message: '用户名不能为空！' });
			} else if (self.telphone == '') {
				Toast({ message: '手机号码不能为空！' });
			} else if (self.building == '') {
				Toast({ message: '请选择您的位置！' });
			} else if (self.addr == '') {
				Toast({ message: '详细地址不能为空！' });
			} else if (self.idcard == '') {
				Toast({ message: '身份证不能为空！' });
			}
		},
		showIdCardImg(mediaId) {
			this.idCardLink = mediaId;
		},
		uploadIDCard() {
			var self = this;
			wxChooseImage(window.wx).then(function(res) {
				console.log('Common.wxChooseImage back!');
				var mediaId = res.localIds[0];
				self.showIdCardImg(mediaId);
				//    				 console.info('Common.wxChooseImage back!'+JSON.stringify(res));
				Indicator.open({
					text: '正在上传身份证...',
					spinnerType: 'fading-circle'
				});
				return wxUploadImage(window.wx, mediaId);
			}).then(function(res) {
				//    				 console.info('Common.wxUploadImage back!');
				var serverId = res.serverId;
				console.log('将微信照片id上传给后端');
				console.info('Common.wxUploadImage back!' + JSON.stringify(res));
				//将微信照片id上传给后端
				return http.post('/json/GetImageToWx', { mediaId: serverId, type: 'idcard' })
				// uploadWxImg(self,serverId,'idcard');
			}).then(function(res) {
				//    				 console.info('/json/GetImageToWx back!');
				Indicator.close();
				console.log('正在识别身份证');
				Indicator.open({
					text: '正在识别身份证...',
					spinnerType: 'fading-circle'
				});
				self.idcardPic = res.body.imgId;
				var params = {
					imgId: res.body.imgId,
					imgUrl: res.body.imgUrl,
					side: 1
				};
				return http.post('/json/IDCardRecognize', params)
				// return recognizeIDCard(self,imgId);
			}).then(function(res) {
				Indicator.close();
				//  				self.person.sex = res.body.sex;
				self.username = res.body.fullName;
				self.idcard = res.body.idcard;
				console.log('self.username:' + self.username);
				//  				self.person.age = res.body.age;
			}).catch(function(res) {
				Indicator.close();
				//  				Toast({message: '身份证上传失败！'+res.msg});
			});
		},
		clearIdCardInput(str) {
			let self = this;
			switch (str) {
				case 'telphone': self.telphone = ''; break;
				case 'addr': self.addr = ''; break;
				default: self.otherPhone = ''; break;

			}

		}
	}
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import '../assets/css/little.scss';
#orderHead {
	height: 100%;
	font-family: '.PingFangSC-Regular';
	background: #fff;
}

.content {
	text-align: left;
	padding-bottom: pxrem(100px);
	.idpic {
		margin-top: pxrem(18px);
	}
	.content-top {
		width: 100%;
		height: pxrem(164px);
		background-image: url('https://s.1-1dr.com/static/mobile/img/apply-bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		line-height: pxrem(24px);
		.apply-id {
			text-align: center;
			font-size: pxrem(24px);
			color: #ffffff;
			padding: pxrem(70px) pxrem(40px);
			span {
				margin-left: pxrem(4px);
			}
			img {
				width: pxrem(21px);
				height: pxrem(21px);
				position: relative;
				top: pxrem(2px);
			}
		}
	}

	.content-detail {
		padding-bottom: pxrem(26px);
		padding-top: pxrem(28px);
		dl {
			/*padding-left: pxrem(35px);*/
			color: #1d1d26;
			dd {
				position: relative;
				background: white;
				padding-top: pxrem(13px);
				padding-bottom: pxrem(13px);
				padding-left: pxrem(35px);
				border-bottom: 1px solid #ebebeb;
				;
				span {
					font-size: pxrem(12px);
					opacity: 0.5;
					filter: Alpha(opacity=50);
				}
				input {
					width: 75%;
					opacity: 1;
					filter: Alpha(opacity=100);
					font-size: pxrem(14px);
				}
			}
			dd:nth-child(1) {
				padding-top: 0;
			}
			dd:nth-child(1),
			dd:nth-child(2) {
				input {
					margin-left: pxrem(40px);
				}
			}
			dd:nth-child(3) {
				position: relative;
				i {
					position: absolute;
					top: pxrem(20px);
					right: pxrem(10px);
				}
				input {
					margin-left: pxrem(14px);
				}
			}
			dd:nth-child(4) {
				input {
					margin-left: pxrem(14px);
				}
			}
			dd:nth-child(5) {
				input {
					margin-left: pxrem(28px);
				}
			}
			dd:nth-child(6) {
				input {
					margin-left: pxrem(4px);
				}
				border-bottom: 0;
			}
			dd:nth-last-child(1),
			dd:nth-last-child(2) {
				position: relative;
				p {
					top: pxrem(13px);
					right: pxrem(36px);
					position: absolute;
					i {
						margin: 0;
					}
				}
			}
			dd:nth-last-child(1) {
				/*padding-bottom:pxrem(26px);*/
				margin-bottom: 0;
				border-bottom: 0;
				height: pxrem(20px);
			}
			dd:nth-last-child(3) {
				background: #F8F8F8;
				border-bottom: 0;
			}
		}
	}
}

.pic-w {
	width: px2rem(405px);
	height: px2rem(238px);
	border: px2rem(6px) dashed #2bd6bd;
	border-radius: px2rem(20px);
	text-align: center;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
	}
}

.del-input {
	position: absolute;
	right: pxrem(10px);
	top: pxrem(13px);
	display: block;
	width: px2rem(36px);
	height: px2rem(36px);
	background: url('https://s.1-1dr.com/static/mobile/img/wechat/delete.png') no-repeat;
	background-size: 100% auto;
}
</style>