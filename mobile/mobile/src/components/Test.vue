<template>
	<div id="l-p-i">
		<div id="orderHead">
            <s-header type="0" title="自理能力测评" :hasBack='false'></s-header>
            <div class="orderBack" @click="orderGoback()">
                <i class="l-more-black"></i>
            </div>
        </div>
		<div class="main">
			<div class="test-row">
				<p>为了让我们能更好地为你服务，请对申请人的日常生活能力做以下评估，请根据实际情况选择（总分100分）</p>
			</div>

			<div class="test-row">
				<p>{{isEat.title}}</p>
				<div class="row test-item" @click="sureItem(item,isEat)" v-for='(item,index) in isEat.list' :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isCarry.title}}</p>
				<div class="row test-item" v-for='(item,index) in isCarry.list' @click="sureItem(item,isCarry)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isFace.title}}</p>
				<div class="row test-item" v-for='(item,index) in isFace.list' @click="sureItem(item,isFace)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isToilet.title}}</p>
				<div class="row test-item" v-for='(item,index) in isToilet.list' @click="sureItem(item,isToilet)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isWater.title}}</p>
				<div class="row test-item" v-for='(item,index) in isWater.list' @click="sureItem(item,isWater)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isWalk.title}}</p>
				<div class="row test-item" v-for='(item,index) in isWalk.list' @click="sureItem(item,isWalk)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isStair.title}}</p>
				<div class="row test-item" v-for='(item,index) in isStair.list' @click="sureItem(item,isStair)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isWear.title}}</p>
				<div class="row test-item" v-for='(item,index) in isWear.list' @click="sureItem(item,isWear)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isFaec.title}}</p>
				<div class="row test-item" v-for='(item,index) in isFaec.list' @click="sureItem(item,isFaec)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>

			<div class="test-row">
				<p>{{isPee.title}}</p>
				<div class="row test-item" v-for='(item,index) in isPee.list' @click="sureItem(item,isPee)" :key="index">
					<i :class="['gou',item.select ? 'select' : '']"></i>
					<div class="label">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>

		<button class="btn_fix_bot" @click="count()">提&nbsp;&nbsp;交</button>
	</div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import http from '../service/api.js'
import SHeader from './SHeader.vue'
import { isApp,} from '../util/common.js'

export default {
	components: { SHeader },
	data() {
		return {
			headerTran: true,
			headerTit: '',
			isPass: false, //是否已提交
			score: 0,		//自评分数
			insureNO: '',	//订单编号
			idcard: '',	//身份证号
			insureAssess: {}, //重载的数据
			comeFrom: '',//来源页面
			isEat: {
				choiceItem: {},
				title: '1 进食：指用餐具将食物由容器送到口中、咀嚼、吞咽等过程',
				list: [{
					id: 3,
					name: '需极大帮助或完全依赖他人，或有留置营养管（0分）',
					select: false
				},
				{
					id: 2,
					name: '需部分帮助（5分）',
					select: false
				},
				{
					id: 1,
					name: '可独立进食（10分）',
					select: false
				},
				]
			},
			isCarry: {
				choiceItem: {},
				title: '2 床椅双向转移',
				list: [{
					id: 4,
					name: '完全依赖他人（0分）',
					select: false
				},
				{
					id: 3,
					name: '需极大帮助（5分）',
					select: false
				},
				{
					id: 2,
					name: '需部分帮助（10分）',
					select: false
				},
				{
					id: 1,
					name: '可独立完成（15分）',
					select: false
				}
				]
			},
			isFace: {
				choiceItem: {},
				title: '3 个人卫生：指洗脸、刷牙、梳头、刮脸等',
				list: [{
					id: 2,
					name: '需他人帮助（0分）',
					select: false
				},
				{
					id: 1,
					name: '可自己独立完成（5分）',
					select: false
				},
				]
			},
			isToilet: {
				choiceItem: {},
				title: '4 如厕：包括去厕所、解开衣裤、擦净、整理衣裤、冲水',
				list: [{
					id: 3,
					name: '需极大帮助或完全依赖他人（0分）',
					select: false
				},
				{
					id: 2,
					name: '需部分帮助（需他人搀扶去厕所、需他人帮忙冲水或整理衣裤等）（5分）',
					select: false
				},
				{
					id: 1,
					name: '可独立完成（10分）',
					select: false
				},
				]
			},
			isWater: {
				choiceItem: {},
				title: '5 洗澡',
				list: [{
					id: 2,
					name: '在洗澡过程中需他人帮助（0分）',
					select: false
				},
				{
					id: 1,
					name: '准备好洗澡水后，可自己独立完成洗澡过程（5分）',
					select: false
				},
				]
			},
			isWalk: {
				choiceItem: {},
				title: '6 平地行走（不能行走时使用轮椅）',
				list: [{
					id: 4,
					name: '使用轮椅需要帮助（0分）',
					select: false
				},
				{
					id: 3,
					name: '使用轮椅独立完成（5分）',
					select: false
				},
				{
					id: 2,
					name: '平地行走需要帮助（10分）',
					select: false
				},
				{
					id: 1,
					name: '平地行走独立完成（15分）',
					select: false
				},
				]
			},
			isStair: {
				choiceItem: {},
				title: '7 上下楼梯',
				list: [{
					id: 3,
					name: '需极大帮助或完全依赖他人（0分）',
					select: false
				},
				{
					id: 2,
					name: '需部分帮助（5分）',
					select: false
				},
				{
					id: 1,
					name: '可独立上下楼梯（10分）',
					select: false
				},
				]
			},
			isWear: {
				choiceItem: {},
				title: '8 穿衣：指穿脱衣服、系扣、拉拉链、穿脱鞋袜、系鞋带',
				list: [{
					id: 3,
					name: '需极大帮助或完全依赖他人（0分）',
					select: false
				},
				{
					id: 2,
					name: '需部分帮助（能自己穿脱，但需他人帮助整理衣物、系扣/鞋带、拉拉链）（5分）',
					select: false
				},
				{
					id: 1,
					name: '可自己独立完成（10分）',
					select: false
				},
				]
			},
			isFaec: {
				choiceItem: {},
				title: '9 大便控制',
				list: [{
					id: 3,
					name: '完全失控（0分）',
					select: false
				},
				{
					id: 2,
					name: '偶尔失控（5分）',
					select: false
				},
				{
					id: 1,
					name: '可控制大便（10分）',
					select: false
				},
				]
			},
			isPee: {
				choiceItem: {},
				title: '10 小便控制',
				list: [{
					id: 3,
					name: '完全失控，或留置导尿管（0分）',
					select: false
				},
				{
					id: 2,
					name: '偶尔失控（5分）',
					select: false
				},
				{
					id: 1,
					name: '可控制小便（10分）',
					select: false
				},
				]
			}
		}
	},
	computed: {
		isShowBtn: function() {
			if (isApp(window)) {
				return false
			} else {
				return true;
			}
		},
		showConStyle: function() {
			return {
				'padding-top': (isApp(window) ? '1.06666667rem' : '0')
			}
		},
		mainConStyle: function() {
			return {
				'padding-top': (isApp(window) ? '0' : '1.06666667rem')
			}
		}

	},
	mounted() {
		//			document.querySelector('body').scrollTop = 0;		//还原滚动条位置
	},
	activated() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;		//还原滚动条位置
		let self = this;
		let allQuesion = [self.isEat, self.isWater, self.isFace, self.isWear,
		self.isFaec, self.isPee, self.isToilet, self.isCarry, self.isWalk, self.isStair
		];
		for (var i = 0; i < allQuesion.length; i++) {
			for (var j = 0; j < 4; j++) {
				if (allQuesion[i].list[j] != undefined) {
					allQuesion[i].list[j]['select'] = false;
				}
			}
		}
		var testurl = window.location.href;
		console.log('testurl:' + testurl);
		let urlParamObj = this.$route.query;
		// console.log(JSON.stringify(urlParamObj));
		//H5页面跳转则从URL获取参数
		self.insureNO = (urlParamObj.insureNO) ? (urlParamObj.insureNO) : '';
		self.idcard = (urlParamObj.idcard) ? (urlParamObj.idcard) : '';
		self.comeFrom = (urlParamObj.comeFrom) ? (urlParamObj.comeFrom) : '';
		// console.warn('test.vue come in!insureNO:'+self.insureNO+',idcard:'+self.idcard);
		//非空校验
		self.valid();
		//发起异步请求检查用户登录
		// http.post('/json/GetUserInfo');
	},
	deactivated() {
		document.onscroll = null;
	},
	methods: {
		valid() {
			//非空判断
			if (!this.idcard) {
				Toast({ message: '获取身份证号失败，请重新进入页面！' });
			}
		},
		getChoiceItemById(id, list) {
			let choiceItem = null;
			list.forEach(function(listItem, index) {
				if (id == listItem.id) {
					listItem.select = true;
					choiceItem = listItem;
				} else {
					listItem.select = false;
				}
			});
			return choiceItem;
		},
		sureItem(item, itemObj) {
			itemObj.choiceItem = item;
			item.select = true;
			itemObj.list.forEach(function(listItem, index) {
				if (item.id != listItem.id) {
					listItem.select = false;
				}
			});
		},
		/*
		 * 执行评测计算
		 */
		count() {
			var self = this,
				allQuesion = [self.isEat, self.isWater, self.isFace, self.isWear,
				self.isFaec, self.isPee, self.isToilet, self.isCarry, self.isWalk, self.isStair
				];

			self.score = 0;
			self.isPass = true;
			//遍历校验是否选中
			for (let i = 0; i < allQuesion.length; i++) {
				//console.info(JSON.stringify(allQuesion[i]))
				if (!self.isEmpty(allQuesion[i].choiceItem)) {
					//由后端统一计算分数
					// self.score += allQuesion[i].choiceItem.score;
				} else {
					Toast({
						message: '请完善自理能力评估!'
						//							message: allQuesion[i].title + '请完善自理能力评估!'
					});
					self.isPass = false; //测验未通过
					return false;
				}
			}
			if (self.isPass) {
				self.submit();	//提交申请
			}
		},
		rightCallFather() {
			MessageBox.confirm('有自评分数我们能更好为您提供服务，是否放弃自评？', '提示').then(action => {
				if (action == 'confirm') {
					this.$router.go(-1);
				}
			});
		},
		/*
		 * 提交跳转到结果页（2017-05-06新流程，跳转到自评结果页）
		 */
		submit() {
			var self = this;
			var params = {
				insureNO: self.insureNO,
				idcard: self.idcard,
				score: self.score,
				isEat: self.isEat.choiceItem.id,
				isWater: self.isWater.choiceItem.id,
				isFace: self.isFace.choiceItem.id,
				isWear: self.isWear.choiceItem.id,
				isFaec: self.isFaec.choiceItem.id,
				isPee: self.isPee.choiceItem.id,
				isToilet: self.isToilet.choiceItem.id,
				isCarry: self.isCarry.choiceItem.id,
				isWalk: self.isWalk.choiceItem.id,
				isStair: self.isStair.choiceItem.id
			};

			//发送请求
			http.post('/json/AddInsureAssess', params).then(function(res) {
				if (res.errorCode == 0) {
					Toast({
						message: '上传自评报告请求成功!'
					});
					var assessId = res.body.assessId;
					self.score = res.body.score;
					self.$router.push({ path: '/testresult', query: { score: self.score, assessId: assessId, comeFrom: self.comeFrom, insureNO: self.insureNO, kinsid: self.$route.query.kinsid } });
				} else {
					Toast({ message: res.msg });
				}
			}, function(res) {
				//					Toast({message: res.msg});
			});
		},
		isEmpty(obj) {
			for (var name in obj) {
				return false;
			}
			return true;
		},
		orderGoback() {
			let self=this;
			if(self.$route.query.test){//从长护险申请过来，返回直接---申请详情
				self.$router.push({ path: './lpdetail', query: {insureNO: self.insureNO, test: 'test' } });
			}else{//返回上一级
				self.$router.go(-1);
			}
        },
	}
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";

#l-p-i {
	text-align: left;
	background-color: white;
}

body {
	text-align: left;
	margin: 0;
}

h1 {
	text-align: left;
	font-size: px2rem(48px);
	color: #2BD6BD;
}

h2 {
	font-size: px2rem(28px);
}

ol {
	padding: 0;
	margin-left: px2rem(40px);
	margin-bottom: px2rem(20px);
}

li {
	margin-bottom: px2rem(10px);
	line-height: px2rem(30px);
}

blockquote {
	margin-left: 0;
	padding: px2rem(20px);
	margin-bottom: px2rem(25px);
	background-color: #f7f7f7;
	border-left: 6px solid #b4b4b4;
	word-break: break-word;
	font-size: px2rem(24px);
	font-weight: 400;
	line-height: px2rem(30px);
}

blockquote p {
	font-size: px2rem(24px);
	font-weight: 400;
	line-height: 1.7;
}

.image-package {
	padding-bottom: px2rem(25px);
	width: px2rem(700px);
	height: auto;
	width: 100%;
	text-align: center;
}

.image-package img {
	width: 100%;
	height: 100%;
	max-width: 100%;
	height: auto;
	vertical-align: middle;
	border: 0;
	transition: all .25s ease-in-out;
	box-sizing: border-box;
}

.head-img {
	/* 设定图片高度占位，防止闪烁 */
	width: px2rem(750px);
	height: px2rem(480px);
}

.main {
	position: absolute;
	width: 100%;
	-webkit-overflow-scrolling: touch;
	background-color: white;
	height: auto !important;
	padding-top: px2rem(80px);
	padding-bottom: px2rem(200px);
	div.test-row {
		margin-left: px2rem(30px);
		/*margin-right: px2rem(30px);*/
		margin-bottom: px2rem(40px);
		div.test-item {
			// margin-top: px2rem(17px);
			height: px2rem(30px + 17px + 35px);
			line-height: px2rem(82px);
			text-align: left;
			position: relative;
			padding-left: pxrem(30px);
			div.label {
				/*margin-top: px2rem(10px);*/
				/*padding-top: px2rem(20px);*/
				font-size: px2rem(28px);
				color: #000;
				vertical-align: middle;
				position: relative;
				height: px2rem(82px);
				p {
					line-height: 1.4;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			i {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				margin-top: 0;
			}
		}
		>p {
			font-size: px2rem(32px);
			color: #000;
			font-weight: bold;
			text-align: left;
			margin-right: px2rem(40px);
		}
	}

	div.test-row:first-child {
		margin-bottom: px2rem(70px);
		p {
			line-height: px2rem(60px);
			font-size: px2rem(30px);
			color: #000;
		}
	}

	div.result {
		border-top: 1px solid #E5E5E5;
		padding-left: px2rem(30px);
		margin-bottom: px2rem(60px);
		text-align: left;

		h3 {
			text-align: left;
			font-size: px2rem(48px);
			color: #2BD6BD;
		}
		p {
			font-size: px2rem(26px);
			color: #999;
		}
		p:last-child {
			margin-top: px2rem(50px);
		}
	}
}

div.btn {
	display: -webkit-box;
	height: px2rem(100px) !important;
	line-height: px2rem(100px);
	font-size: px2rem(36px);
	position: fixed;
	bottom: 0;
	width: 100%;
	color: #fff;
	background-color: #2bd6bd;
	div.test,
	div.submit {
		width: 100%;
		text-align: center;
	}
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
</style>