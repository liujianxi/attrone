<template>
	<div id="l-p-i">
		<div class="main">
			<img class="head-img" src="http://s.1-1dr.com/static/mobile/img/banner2.png" />
			<div class="show-content" :style="showConStyle">
				<h1>护理易需要你</h1>
				<p class="first-el">加入护理易，带你成长带你飞</p>
				<!--<div class="author"><span>4小时前</span></div>-->
				<p>无论你是想照定时定岗、工作稳定、团队协作的机构陪护工作，还是想找雇主作息、工作变动快、独自照顾的居家照护，亦或是把握上门时间，护理完毕即可离开的钟点照护。</p>
				<p>加入护理易，让专业的健康经理为你选择合适的工作，如你所愿。</p>
				<br />
				<p>每次接完单总是要花费大量的时间寻找下一单，挂靠中介公司又会被抽取大量辛苦钱。</p>
				<p>加入护理易，供不应求的陪护需求，专职人员实时指派，免费试用的护理平台，让辛劳都有收获。</p>
				<br />
				<p>想掌握更多的护理专业技能，想考取国家护理员资格，想要更好的福利和保障。</p>
				<p>加入护理易，我们为您准备了免费的专业护理课程，国家补贴的护理员资格(免费培训、报名)，完善的保障制度，护理易让我们成为一家人。</p>
				<br />
				<p>护理易深知，每一位护理员都是是我们最珍贵的伙伴。</p>
				<p>您可拨打
					<span class="phonecall">
						<a href="tel:020-38026917-6045">020-38026917-6045</a>
					</span>, 护理易欢迎您！</p>
				<!--<div style="position:relative; padding-top:69.7%;">
										<img style="position:absolute;top:0;left:0;" class="head-img" src="http://s.1-1dr.com/static/mobile/img/1.png"  />
									</div>-->
			</div>
		</div>
		<s-header type="0" :transparent="headerTran" :hasTc="false"></s-header>
		<!--<button class="btn_fix_bot" @click="clickShare()" v-if="isShowBtn">分&nbsp;&nbsp;享</button>-->
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
						self.headerTit = '';
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
		}
	}
}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.main {
	color: #999;
	word-break: break-word;
	font-size: px2rem(28px);
	font-weight: 400;
	line-height: 1.7;
	background-color: white;
	padding-bottom: 1.6rem;
	text-align: left;
	font-family: "AdobeHeitiStd-Regular";
}

.show-content {
	padding-left: px2rem(23px);
	padding-right: px2rem(23px);
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
	text-align: center;
	padding-top: 0;
	font-size: px2rem(48px);
	color: #2BD6BD;
	line-height: px2rem(98px);
	font-family: "AdobeHeitiStd-Regular";
	font-weight: normal;
}

h2 {
	text-align: left;
	margin: 0;
	font-size: px2rem(36px);
	color: #ccc;
	padding-top: px2rem(78px);
	padding-bottom: px2rem(50px);
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

.btn_fix_bot {
	height: px2rem(98px);
	font-size: px2rem(36px);
	color: #fff;
}

.first-el {
	margin: px2rem(32px) 0;
	font-weight: bold;
	font-size: px2rem(30px);
}

.phonecall {
	a {
		color: #2BD6BD;
		text-decoration: underline;
	}
}
</style>