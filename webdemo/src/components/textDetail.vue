<template>
	<div class="text-detail grey-back">
		<s-header></s-header>
		<div class="container-fluid main-content">
			<article>
				<i class="icon-time">{{textDetail.textCreateTime | timeFilter}}</i>
				<div class="text-title">
					{{textDetail.textTitle}}
				</div>
				<section v-html="textDetail.textDesc" id="detail-content"></section>
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
	mounted() {
		document.querySelector('body').scrollTop = 0;		//还原滚动条位置
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
				setTimeout((res)=>{
					self.lazyLoadImg();
				},500);
			})
		},
		textFilter(){
			let self=this;
			self.textDetail.textDesc=decodeURIComponent(self.textDetail.textDesc);
			document.title=self.textDetail.textTitle
		},
		lazyLoadImg(){
			let self=this;
			let sec_box=document.querySelector('#detail-content');
			if(document.querySelectorAll('#detail-content img').length){
				document.querySelectorAll('#detail-content img').forEach((item)=>{
					let isBigScreen=sec_box.clientWidth-item.getAttribute('curr_width');
					if(isBigScreen>0){//屏幕的宽度比curr_width原尺寸大
						item.style.width=item.getAttribute('curr_width')+'px';
						item.style.minHeight=item.getAttribute('curr_height')+'px';
					}else{//屏幕的宽度小于原尺寸--等比缩小CW/CH=BOXW/XH
						item.style.width=sec_box.clientWidth+'px';
						item.style.minHeight=((item.getAttribute('curr_height')*sec_box.clientWidth)/(item.getAttribute('curr_width')*1)).toFixed(2)+'px';
					}
					item.style.display='block';
					item.style.margin='0 auto';
					item.style.backgroundColor='#eeedeb';
					item.style.backgroundPosition='center center';
					item.style.backgroundSize='22px';
					item.style.backgroundRepeat='no-repeat';
					item.style.backgroundImage="url(http://www.attrone.com/images/loading_circle.gif)";
				})
			}
			self.imgLoaded();
		},
		imgLoaded(){
			var imgLoad = imagesLoaded( document.querySelector('#detail-content') );
			imgLoad.on( 'progress', function( instance, image ) {
				image.img.style.minHeight='auto';
			});
		}
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
.is-loading {
	display: block;
	margin: 0 auto;
  	background-color: black;
  	background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/loading.gif');
  	background-position: center center;
  	background-repeat: no-repeat;
}
/*移动端*/
@media screen and (max-width: 765px){
	article{
		padding: 0;
		padding-top: 20px;
		section{
			max-width: 90%;
		}
	}
}
</style>
