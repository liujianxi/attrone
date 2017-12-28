<template>
	<div id="applysucc">
		<div id="orderHead">
			<!--<s-header 
									        type="0"
									        title="护理申请成功"
									        :hasBack='true'
									    ></s-header>-->
			<section class="content">
				<div class="content-txt">
					<p>恭喜您！申请提交成功</p>
					<div>我们将在5个工作日内与您联系，请耐心等待</div>
				</div>
				<div class="content-close" @click="closeSucc()">
					<p>关闭</p>
					<img src="http://s.1-1dr.com/static/mobile/img/applysucc-close.png"></img>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import SHeader from './SHeader.vue';
export default {
	components: { SHeader },
	data() {
		return {
			applyId: '',
		}
	},
	activated() {
		this.applyId = this.$route.query.applyId;
	},
	methods: {
		closeSucc() {
			let self = this;
			//      		self.$router.push({path:'/applyListDetail',query:{applyId:self.applyId,preway:'getapply'}});
			self.$router.push({ path: '/applyListDetail', query: { applyId: self.applyId } });
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
	display: flex;
	flex-direction: column;
	color: #fff;
	.header-w {
		height: px2rem(80px);
	}
	.content {
		flex: 1;
		width: 100%;
		-webkit-flex: 1;
		background-image: url('https://s.1-1dr.com/static/mobile/img/wechat/applysuccback.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		.content-txt {
			text-align: left;
			padding: pxrem(120px) 0 pxrem(90px) pxrem(43px);
			p {
				font-size: pxrem(26px);
				letter-spacing: pxrem(2px);
			}
			>div {
				margin-top: pxrem(12px);
				font-size: pxrem(14px);
			}
		}
		.content-close {
			text-align: center;
			position: relative;
			p {
				width: 100%;
				text-align: center;
				font-size: pxrem(12px);
				position: absolute;
				letter-spacing: pxrem(2px);
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>