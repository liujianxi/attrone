<template>
	<div class="text-list grey-back">
		<s-header></s-header>
		<div class="container abs">
			<qq-login></qq-login>
		</div>
		<div class="container-fluid">
			<article v-for="item in textList">
				<i class="icon-time">{{item.textCreateTime | timeFilter}}</i>
				<div class="text-title">
					{{item.textTitle}}
				</div>
				<div class="text-mes">
					{{item.textMes}}
				</div>
				<el-button type="primary" @click="linkDetail(item.id)">查看更多<i class="el-icon-arrow-right"></i></el-button>
				<ul class="tag-list">
					<svg class="icon icon-tag" aria-hidden="true">
						<use xlink:href="#icon-tag"></use>
					</svg>
					<li v-for="tag in item.tagName.split(',')"><el-button type="text">{{tag}}</el-button></li>
				</ul>
			</article>
		</div>
	</div>
</template>

<script>
import sHeader from './sHeader.vue'
import http from '../service/api.js';
import { Notification, Loading } from 'element-ui';
import qqLogin from './qqLogin.vue'
export default {
	components: {sHeader,qqLogin},
	name: 'richtext',
	data() {
		return {
			textList:[],
			textMes:[{
				'textContent':'DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。'
			},{
				'textContent':'通过使用webpack-bundle-analyzer可以看到项目各模块的大小，可以按需优化…'
			},{
				'textContent':'首先放入一张效果图： 平时正常的border：1px dashed #0DD2AB，效果如下图 要达成上图的要求，如下： 1、没有ui帮的情况下，自己动手切图，就拿有加号的那张下手，切成如下图 2、使用css3，以此小图作为border-image,代码如下： border:2px solid #000;//没有border-…',
			},],
			realList:[],
		}
	},
	activated() {
		this.getData();
	},
	methods: {
		getData() {
			let self = this;
			http.post('getTextList.php')
			.then((res) => {
				self.textList =res.body.textList;
				self.textList = self.textList.sort((a, b)=>{
				    return b.id - a.id;
				})
				self.textList.forEach((item,index)=>{
					item['textMes']=self.textMes[index]['textContent'];
				})
			})
		},
		linkDetail(id){
			this.$router.push({ path: '/textDetail',query:{id:id}});
		},
	},
}
</script>
<style scoped lang='scss'>
@import "../assets/global.scss";
.text-list{
	min-height: 100%;
	height: auto;
}
.container-fluid{
	padding-bottom: 40px;
	article:nth-last-child(1){
		margin-bottom: 0;
	}
}
article{
	background: #fff;
	position: relative;
	max-width: 984px;
	margin: 0 auto;
	text-align: center;
	/*box-shadow: 5px 5px 25px #dadada;*/
	box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1), 0 4px 8px 0 rgba(0,0,0,0.2);
	padding: 20px;
	padding-bottom: 0;
	margin-bottom: 20px;
	.text-mes{
		text-align: left;
		color: #8391a5;
		padding: 20px 10px;
		padding-top: 0;
	}
	.tag-list{
		position: relative;
		display: flex;
		display: -webkit-flex;
		padding: 10px;
		padding-left: 20px;
		li{
			padding:0 10px;
		}
		.icon-tag{
			color: #9a4b4b;
			position: absolute;
			left: 10px;
			top: 50%;
			transform: translateY(-40%);
		}
	}
	pre{
		margin: 10px 0;
	    padding: 10px;
	    overflow: auto;
	    font-family: Menlo,Monaco,Consolas,Andale Mono,lucida console,Courier New,monospace;
	    font-size: 14px;
	    word-wrap: normal;
	    background: #f6f6f6;
	    border-radius: 4px;
	}
	&:hover{
		box-shadow: 5px 5px 25px #97a8be;
	}
}
</style>
