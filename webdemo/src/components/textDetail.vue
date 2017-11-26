<template>
	<div class="text-detail grey-back">
		<s-header></s-header>
		<div class="container-fluid main-content">
			<article>
				<i class="icon-time">{{textDetail.textCreateTime | timeFilter}}</i>
				<div class="text-title">
					{{textDetail.textTitle}}
				</div>
				<section v-html="textDetail.textDesc"></section>
			</article>
		</div>
	</div>
</template>

<script>
import sHeader from './sHeader.vue'
import http from '../service/api.js';
import { Notification, Loading } from 'element-ui';
export default {
	components: {sHeader},
	name: 'richtext',
	data() {
		return {
			textDetail:[],
			textId:'',
		}
	},
	activated() {
		this.textId=this.$route.query.id;
		this.getData();
	},
	methods: {
		getData() {
			let self=this;
			let data={
				textId:self.textId
			}
			http.post('getTextDetail.php',data)
			.then((res) => {
				self.textDetail=res.body.textDetail[0];
				self.textFilter();
			})
		},
		textFilter(){
			let self=this;
			self.textDetail.textDesc=decodeURIComponent(self.textDetail.textDesc);
		},
	},
}
</script>
<style scoped lang='scss'>
@import "../assets/global.scss";
article{
	position: relative;
    padding: 20px;
    margin: 0 auto;
    max-width: 1024px;
    background: #fff;
    text-align: center;
    section{
    	max-width:80%;
    	margin: 0 auto;
    	overflow-x: hidden;
    }
    span{
    	word-break: break-word;
    	white-space: pre-wrap;
    }
}
.main-content{
	padding-bottom: 40px;
}
</style>
