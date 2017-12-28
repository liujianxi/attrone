<template>
	<div id="insure-again-assess">
		<s-header type="0" title="复审评估报告"></s-header>
		<div class="main">
			<dl>
				<dd>评估结果：
					<span class="green" v-if="status">通过</span>
					<span class="red" v-else>不通过</span>
				</dd>
				<dd v-if="content">
					<div>不通过原因：<span>生活基本自理，无需照护</span></div>
				</dd>
			</dl>

			<div class="chart">
				<p>评估指标：</p>
				<div class="chart-item">
					<span class="item-title">自理能力</span>
					<div class="progress-bar">
						<div :style="'width:'+scoreADL+'%;'">
							<span>{{scoreADL}}</span>
						</div>
					</div>
					<span class="item-name">{{ADLStatus}}</span>
				</div>
				<div class="chart-item">
					<span class="item-title">智力水平</span>
					<div class="progress-bar">
						<div :style="'width:'+scoreMMSE+'%;'">
							<span>{{scoreMMSE}}</span>
						</div>
					</div>
					<span class="item-name">{{MMSEStatus}}</span>
				</div>
				<div class="chart-descript">
					<span>长护险申请资格：</span>
					<span>自理能力得分<40分，或自理能力得分在40至60分并伴有一定程度失智的申请人</span>
				</div>
			</div>
			<div class="guidance" v-if="guide && guide.length > 0">
				<span class="guid-title">疾病护理指导：</span>
				<div v-for="guideItem in guide">
					<span v-html="guideItem.illness"></span>
					<span v-html="guideItem.guideDesc"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast, Indicator } from 'mint-ui'
	import SHeader from './SHeader.vue'
	import http from '../service/api.js'

	export default {
		components: {SHeader},
		data() {
			return {
				insureNo : '',	//订单号
				scoreADL : 0,	//自理能力分数
				scoreMMSE: 0,	//智力能力分数
				status	 : true,	//评估结果,是否通过长护险
				content  : '',  //不通过原因
				guide	 : [],	//
				statusTipList : {
					'ADL_hight' : '基本自理',
					'ADL_normal': '中度功能障碍',
					'ADL_low'	: '重度度功能障碍',
					'MMSE_stupid' : '文盲程度',
					'MMSE_primary': '小学程度',
					'MMSE_middle' : '中学程度',
					'MMSE_adult'  : '正常水平'
				}
			}
		},
		computed : {
			ADLStatus : function(){
				let self = this;
				let score =  parseInt(self.scoreADL);
				// console.log('ADLStatus score:'+score );
				if(score > 60){
					return self.statusTipList.ADL_hight;
				}else if(score <= 60 && score >= 40){
					return self.statusTipList.ADL_normal;
				}else{
					return self.statusTipList.ADL_low;
				}
			},
			MMSEStatus : function(){
				let self = this;
				let score = parseInt(self.scoreMMSE);
				// console.log('MMSEStatus score:'+score);
				if(score < 17){
					return self.statusTipList.MMSE_stupid;
				}else if(score < 20){
					return self.statusTipList.MMSE_primary;
				}else if(score < 24){
					return self.statusTipList.MMSE_middle;
				}else if(score == 30){
					return self.statusTipList.MMSE_adult;
				}
			}
		},
		mounted(){
//			document.querySelector('.main').scrollTop = 0;		//还原滚动条位置
		},
		activated() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;		//还原滚动条位置
			var urlParams = this.$route.query.insureNo;
			if(urlParams) {
				this.insureNo = urlParams;
			}
			this.load();
		},
		methods: {
			load() {
				let self = this;
				http.post('/json/GetInsureAgainAssess', {
					insureNO: self.insureNo
				}).then(function(res) {
					Indicator.close();
					// console.log(JSON.stringify(res));
					if(res.errorCode == 0) {
						self.scoreADL = res.body.scoreADL;
						self.scoreMMSE= res.body.scoreMMSE;
						self.status   = res.body.status;
						self.guide	  = res.body.guide;
					} else {
						Toast({message: res.msg});
					}
				}, function(res) {
					Toast({message: res.msg});
				}).catch(function(res) {
					Toast({message: res.msg});
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/global.scss";
	.main {
		text-align: left;
		font-size: px2rem(30px);
	}
	
	dl {
		color: #666;
		font-size: px2rem(30px);
		background-color: #fff;
		margin-bottom: px2rem(20px);
		dd {
			padding-left: px2rem(30px);
			height: px2rem(98px);
			line-height: px2rem(98px);
			padding-right: px2rem(30px);
			.green {
				color: $theme-color;
			}
			.red {
				color: #ff5257;
			}
		}
		dd:nth-child(0) {
			border-bottom: 1px solid $separate-color;
		}
	}
	
	.chart {
		background-color: #fff;
		font-size: px2rem(30px);
		color: #666;
		margin-bottom: px2rem(20px);
		p {
			height: px2rem(98px);
			line-height: px2rem(98px);
			padding-left: px2rem(30px);
			padding-right: px2rem(30px);
		}
		.chart-item {
			display: table;
			padding-left: px2rem(30px);
			padding-right: px2rem(30px);
			height: px2rem(28px);
			line-height: px2rem(28px);
			margin-bottom: px2rem(20px);
			.progress-bar {
				position: relative;
				width: px2rem(392px);
				background-color: #999;
				div {
					display: block;
					position: relative;
					background: $theme-color;
					color: #fff;
					height: px2rem(20px);
					line-height: px2rem(20px);
					span {
						position: absolute;
						width: px2rem(392px);
						text-align: center;
					}
				}
			}
			.item-title {
				display: table-cell;
				width: 20%;
				font-size: px2rem(24px);
			}
			.progress {
				display: table-c ell;
				height: px2rem(20px);
				width: px2rem(392px);
				background-color: $theme-color;
				text-align: center;
				span {
					height: px2rem(18px);
					line-height: px2rem(18px);
					color: #fff;
				}
			}
			.item-name {
				display: table-cell;
				font-size: px2rem(24px);
				width: 30%;
				height: px2rem(20px);
				line-height: px2rem(20px);
				text-align: left;
				color: $theme-color;
			}
		}
		.chart-item:nth-child(3) {
			margin-bottom: px2rem(48px);
		}
		.chart-descript {
			border-top: px2rem(1px) solid $separate-color;
			color: #ccc;
			font-size: px2rem(28px);
			padding-top: px2rem(20px);
			padding-bottom: px2rem(20px);
			height: auto;
			padding-left: px2rem(30px);
			padding-right: px2rem(30px);
			span {
				display: block;
			}
		}
	}
	
	.guidance {
		padding: px2rem(30px);
		font-size: px2rem(30px);
		background-color: #fff;
		color: #999;
		height: auto;
		span {
			padding: 2px;
			display: block;
		}

		.guid-title{
			margin-bottom:px2rem(20px);
		}
	}
</style>