<template>
	<div class="body1">
		<div class="test-container">
			<div class="result">
				<h3>自评得分：
					<span>{{score}}</span>分</h3>
	
				<div class="result-title-contanier">
					<div class="title-content">
						<p class="result-title">结果分析：</p>
						<p class="result-title">{{resultStr}}</p>
					</div>
				</div>
				<div class="result-tips-container">
					<div class="tip-content">
						<p>61分以上评定为良，表示有轻度功能障碍，但日常基本生活自理。</p>
						<p>60-41分表示有中度功能障碍，日常生活需要一定的帮助。</p>
						<p>40-0分表示有重度功能障碍，日常生活明显需要依赖他人。</p>
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="submit()">
			<button class="submit">完&nbsp;&nbsp;&nbsp;成</button>
		</div>
	</div>
</template>

<script>
import { isApp } from '../util/common.js'
import eventBus from '../service/eventbus.js';

export default {
	name: 'testresult',
	data() {
		return {
			score: 0,	//评测分数
			assessId: '',
			comeFrom: '',	//发起自评页面
			result: {
				'mix': '申请人得分在60分以上，日常生活基本可以自理，申请长期护理保险有较大的几率被驳回，我们会派出专业护士联系您做更详情的评估。', 'moderate': '申请人得分在40至60分，有中度功能障碍，日常生活需要一定的帮助。中度功能障碍者且伴随一定程度的失智可享受长期护理保险。我们会派出专业护士联系您做更详情的评估。', 'severe': '申请人的得分在40分以下，有中度功能障碍，日常生活需要一定的帮助，可以享受长期护理保险。我们会派出专业护士联系您做更详情的评估。'
			},
			resultStr: '',
			insureNO: '',
		}
	},
	created() {

	},
	activated() {
		var self = this;
		console.log(this.$route.query);
		self.score = this.$route.query.score;//分数
		self.assessId = this.$route.query.assessId;
		self.comeFrom = this.$route.query.comeFrom;
		self.insureNO = this.$route.query.insureNO;
		self.getTips();
		var testresurl = window.location.href;
		console.log('testresurl:' + testresurl);
		console.log(window.location);
	},
	methods: {
		//获取建议
		getTips() {
			var self = this;
			var scoreInt = parseInt(self.score);
			if (scoreInt < 40) {
				//重度
				self.resultStr = self.result.severe;
			} else if (scoreInt >= 40 && scoreInt <= 60) {
				//中度
				self.resultStr = self.result.moderate;
			} else if (scoreInt > 60) {
				//轻度
				self.resultStr = self.result.mix;
			}
		},
		submit() {
			var self = this;
			if (isApp(window)) {
				// console.info('isApp come in!');
				//如果是APP：点击完成退回到APP界面
				window.callInsureAssessHandle = function () {
					console.info('callInsureAssessHandle come in!');
					window.pageBridge.callHandler('callInsureAssessHandle', { score: self.score, 'callTime': new Date().getTime() },
						function (response) {
							console.info('callInsureAssessHandle call back!');
						}
					);
				}
				window.callInsureAssessHandle();
			} else {

				//H5页面逻辑
				if (self.comeFrom == 'addmember') {
					//如果是申请人页面，则回到申请人页面
					self.$router.push({ path: './addmember', query: { score: self.score, kinsid: self.$route.query.kinsid } });
				} else {
					//其他情况跳转到申请详情页
					self.$router.push({ path: './lpdetail', query: { score: self.score, insureNO: self.insureNO, test: 'test' } });
				}

				//					eventBus.$emit('sureScore', { score: this.score });		//页面传参方式			
				//					this.$router.go(-2);		//回退两个记录：testresult和test
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "../assets/css/global.scss";
@import "../assets/css/little.scss";

.body1 {
	background: url('https://s.1-1dr.com/static/mobile/img/test-bg.jpg');
	background-repeat: no-repeat;
	background-position: center 0;
	background-size: 100%;
}

.test-container {
	-webkit-overflow-scrolling: touch;
	width: 100%;
	position: absolute;
	top: 50%;
	height: auto;
	margin-top: px2rem(-320px);

	div.result {
		height: auto;
		text-align: left;
		background-color: white;

		h3 {
			height: px2rem(130px);
			line-height: px2rem(130px);
			padding-left: px2rem(30px);
			text-align: left;
			font-size: px2rem(48px);
			color: #333;
			border-bottom: 1px solid $separate-color;
			margin: 0;

			span {
				color: #ffc360;
			}
		}
		p {
			padding-left: px2rem(30px);
			padding-right: px2rem(30px);
			line-height: px2rem(35px);
			color: #999;
		}

		.result-title-contanier {
			height: px2rem(200px);
			display: table;

			.title-content {
				display: table-cell;
				vertical-align: middle;

				p {
					font-size: px2rem(26px);
				}
			}
		}

		div.result-tips-container {
			border-top: 1px solid $separate-color;
			height: px2rem(204px);
			display: table;

			.tip-content {
				display: table-cell;
				vertical-align: middle;

				p {
					font-size: px2rem(24px);
				}
			}
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

	button.submit {
		display: block;
		width: 100%;
		text-align: center;
		height: 100%;
		border: none;
		color: #FFFFFF;
		background: linear-gradient($gradient);
		font-size: px2rem(36px);
	}
}
</style>