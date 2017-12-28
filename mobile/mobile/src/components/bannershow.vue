<template>
	<div id="l-p-i">
		<div class="main">
			<img class="head-img" src="http://s.1-1dr.com/static/mobile/img/banner1.png" />
			<div class="title-top">
				<h1 class="first-1">不知道长护险评估什么？</h1>
				<p class="first-2">护理易漏题给你看</p>
			</div>

			<div class="show-content" :style="showConStyle">
				<!--<div class="author"><span>4小时前</span></div>-->
				<p class="content-1">想要申请长护险的大伙伴们注意啦！</p>
				<p>在长护险试行阶段，这2个表格作为评分标准，直接影响到参保热源是否能够获得长护险服务。</p>
				<p>一个是 ADL——日常生活能力表，另一个是 MMSE——建议智力状态检查表，如下图表Barthel指数评定量表 (BI)</p>
			</div>
			<div class="tab">
				<p>Barthel指数评定量表 (BI)</p>
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td>项目</td>
						<td>评分</td>
						<td>项目</td>
						<td>评分结果</td>
					</tr>
					<tr>
						<td rowspan="3">1.进食</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="4">2.床-椅双向转移</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要大量帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>需要少量帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">15分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="2">3.个人卫生</td>
						<td>0分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="3">4.用厕</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="2">5.洗澡</td>
						<td>0分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="4">6.平地行走（不能行走时的轮椅使用）</td>
						<td rowspan="2" class="usetd">
							<span class="leftNode">使用轮椅</span>
							<i>
								<div>5分</div>
								<div>5分</div>
							</i>
						</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">需要大量帮助</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="2" class="usetd" style="border-left:0">
							<span>平地行走</span>
							<i>
								<div>5分</div>
								<div>5分</div>
							</i>
						</td>
						<td>需要少量帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="3">7.上下楼梯</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="3">8.穿脱衣物</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="3">9.控制大便</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td rowspan="3">10.控制大小便</td>
						<td>0分</td>
						<td>依赖他人</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">5分</td>
						<td>需要帮助</td>
						<td></td>
					</tr>
					<tr>
						<td style="border-left:0">10分</td>
						<td>独立完成</td>
						<td></td>
					</tr>
					<tr>
						<td colspan="4" class="count">总计</td>
					</tr>
				</table>

			</div>
			<div class="show-content" :style="showConStyle">
				<p> 一个BI得100分的人，可以控制大小便，自行进食，自己穿脱衣裤，可以下床，从椅子上站起来，自己洗澡，至少可以行走一个街区，自己上下楼梯，但这些并不意味着他可以独自生活：他或许不能做饭、不能收拾屋子、不能参与社会活动，但他可以在不需要他人帮助的情况下独立活动。</p>
				<p class="content-title">简易精神状况评价量表(MMSE)</p>
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td rowspan="2"></td>
						<td rowspan="2">项目</td>
						<td>评分</td>
					</tr>
					<tr>
						<td class="noleft">
							<span>正确</span>
							<span>错误</span>
						</td>
					</tr>
					<tr>
						<td rowspan="6">时间定向</td>
						<td class="noright" style="text-align: left;" colspan="2">1.现在是</td>
						<!--<td class="noleft">
							<span></span>
							<span></span>
						</td>-->
					</tr>
					<tr>
						<td class="noleft"> 哪一年？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 哪一季节？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft">几月份？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 几号？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 星期几？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="6">地点定向</td>
						<td class="noright" style="text-align: left;" colspan="2"> 2.我们在：</td>
						<!--<td class="noleft">
							<span></span>
							<span></span>
						</td>-->
					</tr>
					<tr>
						<td class="noleft"> 哪个国家？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 哪个城市？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 什么地址？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 哪个医院？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 第几层楼？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="6">表达 </td>
						<td style="text-align: left;" colspan="2"> 3.复述一下3个物体名称 </td>
						<!--<td class="noleft">
							<span></span>
							<span></span>
						</td>-->
					</tr>
					<tr>
						<td class="noleft" style="text-align: left;" colspan="2"> （由检查者先连续说出）</td>

					</tr>
					<tr>
						<td class="noleft"> 手表</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 钢笔 </td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 眼镜</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 哪个医院？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="6">注意力和计算能力 </td>
						<td class="noright" style="text-align: left;" colspan="2"> 4.计算： </td>
						<!--<td class="noleft">
							<span></span>
							<span></span>
						</td>-->
					</tr>
					<tr>
						<td class="noleft">100-7=？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 93-7=？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 86-7=？ </td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 79-7=？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 72-7=？</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="4">记忆力 </td>
						<td style="text-align: left;" colspan="2"> 5.回忆刚才复述过的3个物体名称 </td>

					</tr>
					<tr>
						<td class="noleft">手表</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 钢笔 </td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 眼镜 </td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="3">语言</td>
						<td style="text-align: left;" colspan="2"> 6.说出所示物体的名称 </td>

					</tr>
					<tr>
						<td class="noleft">帽子</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 毛巾 </td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td>复述</td>
						<td style="text-align: left;"> 7.复述“如果、并且、但是” </td>
						<td>
							<span style="height:54px;line-height: 54px;">1</span>
							<span style="height:54px;line-height: 54px;">0</span>
						</td>
					</tr>

					<tr>
						<td rowspan="2">诵读</td>
						<td class="noright" style="text-align: left;"> 8.诵读卡片上的句子 </td>
						<td class="noleft">
							<!--<span></span>
							<span></span>-->
						</td>
					</tr>
					<tr>
						<td class="noleft">“闭上眼睛”</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="4">语言</td>
						<td class="noright" style="text-align: left;" colspan="2"> 9.按卡片所写的做： </td>
						<!--<td class="noleft">
							<span></span>
							<span></span>
						</td>-->
					</tr>
					<tr>
						<td class="noleft">用右手拿一张纸</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft"> 两手将它对折</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>
					<tr>
						<td class="noleft">“闭上眼睛”</td>
						<td>
							<span>1</span>
							<span>0</span>
						</td>
					</tr>

					<tr>
						<td rowspan="2">句子</td>
						<td style="text-align: left;" colspan="2"> 10.写一个完整的句子 </td>

					</tr>
					<tr>
						<td class="noleft"> （要有主语、谓语、具有一定意义）</td>
						<td>
							<span style="height:54px;line-height: 54px;">1</span>
							<span style="height:54px;line-height: 54px;">0</span>
						</td>
					</tr>
					<tr>
						<td rowspan="2" style="border-bottom:1px solid #D2D2D2 ;">模仿</td>
						<td class="noright" style="text-align: left;" colspan="2"> 11.模仿画出下图 </td>
						<!--<td class="noleft">
							<span></span>
							<span></span>
						</td>-->
					</tr>
					<tr>
						<td class="noleft"> （两个五边形相交叉成一四边形）</td>
						<td>
							<span style="height:54px;line-height: 54px;">1</span>
							<span style="height:54px;line-height: 54px;">0</span>
						</td>
					</tr>
				</table>
				<p class="content-2">是不是看起来很专业？</p>
				<p class="chat">别担心，护理易告诉你怎么自检，为申请长护险做好准备!</p>
				<p class="chat">所谓ADL评定量表，简单来说就是评估“日常生活自理能力”（吃饭、穿衣、梳洗、上厕所、洗澡等）的量表;</p>
				<p class="chat">而MMSE量表，则较为复杂，需要专业的受过培训的评估者进行操作，主要评估各项精神状态的能力。</p>
				<p class="chat">你可以在护理易首页——长护险申请中，填写相关资料，进行自评并申请护理易-长护险服务，由护理易的专业护士，上门为您进行评估及申请。</p>
			</div>
		</div>
		<!--<s-header type="0" 
			:transparent="headerTran"
			:title="headerTit"
			:hasTc="false"
			></s-header>-->
		<!--<div class="footer"v-if="isShowBtn">
				<div class="footer-left">
					<button @click="clickTest()">去自评</button>
				</div>
				<div class="footer-right">
					<button @click="clickQues()">去申请</button>
				</div>
			</div>-->

	</div>
</template>
<script>
import SHeader from './SHeader.vue';
import { isApp } from '../util/common.js';

export default {
	components: {
		SHeader,
	},
	data() {
		return {
			showShare: false,
			headerTran: true,
			headerTit: ''
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
		}
	},
	mounted() {
		document.querySelector('body').scrollTop = 0;		//还原滚动条位置
	},
	activated() {
		try {
			window.current_page = 'longprotectintro';
			var bd = document.querySelector('body');
			var he = document.querySelector('.head-w #header');
			var self = this;
			document.onscroll = function() {
				// console.log(bd.scrollTop);
				if (bd.scrollTop + 40 >= screen.width / 750 * 480) {	//图片刚好消失，显示头部
					if (self.headerTran) {
						self.headerTran = false;
						self.headerTit = '长护险评估';
					}
				} else {
					if (!self.headerTrans) {
						self.headerTran = true;
						self.headerTit = '';
					}
				}
			}
		} catch (e) {
			console.error(e.message);
		}
		//发起异步请求检查用户登录
		// http.post('/json/GetUserInfo');
	},
	deactivated() {
		document.onscroll = null;
	},
	methods: {
		clickShare() {
			this.showShare = true;
		},
		clickCancel() {
			this.showShare = false;
		},
		clickTest() {
			//				window.location.href='http://dev.1-1dr.com/mobile/#/test';
		},
		clickQues() {
			//				window.location.href='http://dev.1-1dr.com/mobile/#/longprotectintro';
		}
	}
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";
.show-content table {
	text-align: center;
}

.show-content table tr td.noleft {
	border-left: 0!important;
}

.show-content table tr td.noright {
	border-right: 0!important;
}

.show-content table tr td span {
	display: inline-block;
	height: 100%;
	width: 40%;
}

.show-content table tr td span:nth-child(1) {
	padding-right: px2rem(10px);
	border-right: 1px solid #D2D2D2;
}

.show-content table tr td {
	position: relative;
	border-right: 1px solid #D2D2D2;
	border-top: 1px solid #D2D2D2;
}

.show-content table tr:nth-last-child(1) td {
	border-bottom: 1px solid #D2D2D2;
}

.show-content table tr td:nth-child(1) {
	width: px2rem(138px);
	border-left: 1px solid #D2D2D2;
}

.show-content table tr td:nth-child(2) {
	width: px2rem(275px);
}

.show-content table tr td:nth-child(3) {
	width: px2rem(264px);
}

.tab {
	padding-left: px2rem(23px);
	margin-top: px2rem(56px);
	text-align: center;
}

.tab>p {
	text-align: center;
	margin-bottom: px2rem(33px);
}

.tab table tr td:nth-child(1) {
	border-left: 1px solid #D2D2D2;
}

.tab table tr td:nth-child(3) {
	width: px2rem(195px);
}

.tab table tr:nth-last-child(1) td {
	border-bottom: 1px solid #D2D2D2;
}

.tab table td {
	width: px2rem(192px);
	border-right: 1px solid #D2D2D2;
	border-top: 1px solid #D2D2D2;
}

.tab table td.count {
	text-align: left;
}

.main {
	color: #999;
	word-break: break-word;
	font-size: px2rem(26px);
	font-weight: 400;
	line-height: 1.7;
	background-color: white;
	padding-bottom: px2rem(200px);
	text-align: left;
	letter-spacing: px2rem(1px);
}

.show-content {
	margin-top: px2rem(38px);
	padding-left: px2rem(23px);
	padding-right: px2rem(23px);
	font-family: "AdobeHeitiStd-Regular";
}

.title-top .first-1 {
	margin: 0;
	font-size: px2rem(48px);
	color: #2BD6BD;
	padding-top: px2rem(32px);
	text-align: center;
	line-height: 1.5;
}

.title-top .first-2 {
	margin: 0;
	font-size: px2rem(48px);
	color: #2BD6BD;
	text-align: center;
	font-weight: bold;
	line-height: 1.5;
}

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
	padding-top: 0;
	font-size: px2rem(48px);
	color: #292d33;
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
	width: 100%;
	/*height: px2rem(500px);*/
	display: block;
}

#header {
	background-color: rgba(0, 0, 0, 0)!important;
}

.author {
	margin-top: px2rem(45px);
	margin-bottom: px2rem(78px);
	font-size: px2rem(30px);
	text-align: right;
}

.usetd {
	position: relative;
}

.usetd>span {
	position: absolute;
	left: px2rem(5px);
	top: 50%;
	transform: translateY(-50%);
	display: inline-block;
}

.usetd>i {
	height: 100%;
	font-style: normal;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0;
	display: inline-block;
	border-left: 1px solid #D2D2D2;
}

.usetd>i div:nth-child(1) {
	border-bottom: 1px solid #D2D2D2;
}

.usetd>i div {
	position: relative;
	/*top:-1px;*/
	display: block;
	width: 100%;
}

.title-top {
	height: px2rem(186px);
	border-bottom: 1px solid #E6E6E6;
}

.content-1 {
	margin: px2rem(20px) 0 px2rem(68px);
}

.content-title {
	margin: px2rem(62px) 0 px2rem(30px);
	text-align: center;
}

.content-2 {
	margin-top: px2rem(25px);
}

.chat span {
	color: #2BD6BD;
	text-decoration: underline;
}

.footer {
	height: px2rem(98px);
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	line-height: px2rem(98px);
	z-index: 1;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
}

.footer-left {
	width: 66%;
	height: 100%;
}

.footer-right {
	width: 34%;
	height: 100%;
}

.footer button {
	height: px2rem(98px);
	font-size: px2rem(36px);
	color: #fff;
	position: absolute;
	top: 0;
}

.footer-left button {
	width: 66%;
	left: 0;
	background: white;
	color: #2BD6BD;
	padding: 0;
	border-top: 1px solid #F0F0F0;
}

.footer-right button {
	right: 0;
	width: 34%;
	background: -webkit-linear-gradient(left, #14ccc8, #39ddb0);
}

.chat {
	margin-top: px2rem(10px);
}
</style>