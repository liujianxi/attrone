<template>
	<div id="assess">
		<s-header type="0" title="评价"></s-header>
		<div class="main">
			<div class="star-block">
				<img :src="imgsrc" />
				<div class="rs-block">
					<p>服务评分</p>
					<p>
						<i class="star" v-for="(item,index) in 5" @click="type?'':getStar(index)" :key="index"></i>
					</p>
				</div>
			</div>
			<ta-editor place="写下真实服务评价，我们将根据您的一键不断升级优化，为您提供更优质的服务" />
		</div>
		<button class="btn_fix_bot" @click="sendStar()" v-if="type==0">提交评价</button>
		<button class="btn_fix_bot" @click="goback()" v-if="type==1">确定</button>
	</div>
</template>
<script>
import SHeader from './SHeader.vue'
import TaEditor from './TaEditor.vue'
import http from '../service/api.js'
import { Toast } from 'mint-ui'
export default {
	components: { SHeader, TaEditor },
	data() {
		return {
			imgsrc: 'https://s.1-1dr.com/static/mobile/img/orderimg.png',
			orderId: '',
			type: 0,
		}
	},
	activated() {
		let self = this;
		this.orderId = this.$route.query.orderid;
		this.type = this.$route.query.type;//0为未评价，1已经评价
		console.log('type:' + this.type);
		var starNode = document.querySelectorAll(".star");
		var textNode = document.querySelector("textarea");
		if (!this.type) {
			for (var j = 0; j < starNode.length; j++) {
				starNode[j].className = 'star select';
			}
			textNode.removeAttribute('disabled');
			textNode.value = '';
		} else {
			self.getAssess();
			textNode.setAttribute('disabled', 'disabled');
		}


	},
	methods: {
		getAssess() {
			let self = this;
			http.post('/json/GetOrderPraise', {
				orderId: self.orderId
			}).then((res) => {
				let textNode = document.querySelector("textarea");
				textNode.value = res.body.praise.content == undefined ? ' ' : res.body.praise.content;
				self.getStar(res.body.praise.grade1 ? res.body.praise.grade1 - 1 : '4');
			})
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
		sendStar() {
			//handleresult
			//  		this.$router.push({path:'/handleresult',query:{type:2}});
			var self = this;
			var textNode = document.querySelector("textarea");
			var starNode = document.querySelectorAll(".select.star");

			if (starNode.length) {
				if (textNode.value != '') {
					http.post('/json/SaveOrderPraise', {
						orderId: self.orderId,
						grade1: starNode.length,
						content: textNode.value,
						version: 1
					})
						.then((dt) => {
							Toast({ message: '评价成功' });
							self.$router.go(-1);
						})
				} else {
					Toast({ message: '评价不能为空' });
				}
			} else {
				Toast({ message: '请给服务评分' });
			}
		},
		goback() {
			this.$router.go(-1);
		}
	}

}
</script>
<style scoped lang="scss">
@import "../assets/css/global.scss";

.main {
	background-color: #fff;
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

.star-block {
	text-align: left;
	padding: px2rem(100px) px2rem(40px);
	background-color: #fff;

	img {
		height: px2rem(105px);
		width: px2rem(105px);
		margin-right: px2rem(40px);
	}
}

.rs-block {
	font-size: px2rem(32px);
	display: inline-block;

	>p:first-child {
		margin-bottom: px2rem(15px);
	}
}
</style>