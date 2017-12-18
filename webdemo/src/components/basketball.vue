<template>
	<div class="home">
		<div id="pageContain">
			<div class="page grey-back" v-for="(item,index) in urlList">
				<img :src="item.src"/>
			</div>
		</div>
		<div id="back-music" :class="['back-music',musicFlag0||musicFlag1?'active':'']" @click="updateMusic()"></div>
		<video id="music_mp3_1" controls="controls" preload="auto">
            <source src="http://www.attrone.com/images/basketball/Breath-and-Life.mp3" type="video/mp3" >
            <source src="http://www.attrone.com/images/basketball/Breath-and-Life.ogg" type="video/ogg" >
            Your browser does not support HTML5 video.
        </video>
        <video id="music_mp3_0" controls="controls" preload="auto">
            <source src="http://www.attrone.com/images/basketball/number24.mp3" type="video/mp3" >
            <source src="http://www.attrone.com/images/basketball/number24.ogg" type="video/ogg" >
            Your browser does not support HTML5 video.
        </video>
        <div :class="current==fullPageSize-1?'down-arrow':'arrow'"></div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				urlList:[{
					src:'http://www.attrone.com/images/basketball/begin1.jpg',
				},{
					src:'http://www.attrone.com/images/basketball/81.jpg'
				},{
					src:'http://www.attrone.com/images/basketball/dunk.png'
				},{
					src:'http://www.attrone.com/images/basketball/winner.png'
				},{
					src:'http://www.attrone.com/images/basketball/finger.jpg'
				},{
					src:'http://www.attrone.com/images/basketball/world.jpg'
				},{
					src:'http://www.attrone.com/images/basketball/cup.png'
				},{
					src:'http://www.attrone.com/images/basketball/24-8-data.png'
				},{
					src:'http://www.attrone.com/images/basketball/24-8.png'
				},{
					src:'http://www.attrone.com/images/basketball/header.png'
				}
				],
				fullPageSize: 10,
				current: 0,
				wHeight: '',
				resiezeFlag: true,
				picSize:2,
				musicFlag0:true,
				musicFlag1:false,
				checkFlag:false,
			}
		},
		activated() {
			this.getSize();
			let oDiv = document.getElementById('pageContain');
			this.addEvent(oDiv, 'mousewheel', this.onMouseWheel);
			this.addEvent(oDiv, 'DOMMouseScroll', this.onMouseWheel);
			this.getTouchEvent(oDiv);
			this.checkMusicEnd();
			document.querySelector('#music_mp3_0').play();
		},
		methods: {
			checkMusicEnd(){
				let self=this;
				let musicEle0=document.querySelector('#music_mp3_0');
				let musicEle1=document.querySelector('#music_mp3_1');
				musicEle0.addEventListener('ended',function(){
					self.musicFlag0=false;
					self.musicFlag1=true;
					self.checkFlag=true;//来到第二首的标记
					musicEle1.play();
			    });
			},
			updateMusic(){
				let self=this;
				let musicEle0=document.querySelector('#music_mp3_0');
				let musicEle1=document.querySelector('#music_mp3_1');
				if(!self.checkFlag){//第一首
					self.musicFlag0=!self.musicFlag0;
				}else{//第二首
					self.musicFlag1=!self.musicFlag1;
				}
				var el = document.getElementById("back-music");
				var st = window.getComputedStyle(el, null);
				var tr = st.getPropertyValue("-webkit-transform") ||
				st.getPropertyValue("-moz-transform") ||
				st.getPropertyValue("-ms-transform") ||
				st.getPropertyValue("-o-transform") ||
				st.getPropertyValue("transform") ||
				"FAIL";
				var values = tr.split('(')[1].split(')')[0].split(',');
				var a = values[0];
				var b = values[1];
				var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
				el.style.transform="rotate("+angle+"deg)";
				if(!self.checkFlag){//第一首
					if(self.musicFlag0){
						musicEle0.play();
					}else{
						musicEle0.pause();
					}
				}else{//第二首
					if(self.musicFlag1){
						musicEle1.play();
					}else{
						musicEle1.pause();
					}	
				}
			},
			getTouchEvent(oDiv) {
				let self=this;
				let YStart = 0;
            	let disY=0;
            	let winH = window.innerHeight;
				//手指拖动事件（去除默认动作）
				document.addEventListener("touchmove", function(e) {
					e.preventDefault();
				});
				//手指按下
	            oDiv.addEventListener("touchstart",function(e){
	                YStart = e.changedTouches[0].clientY;
	            });
	            //手指移动
	            oDiv.addEventListener("touchmove",function(e){
	                disY = e.changedTouches[0].clientY-YStart; //向下滑正，向上滑负
	            });
	            //手指离开
            	oDiv.addEventListener("touchend",function(e){
                disY = e.changedTouches[0].clientY-YStart; //向下滑正，向上滑负
	                if(Math.abs(disY)>winH/20){  //只有当滑动距离大于了一定值得时候，才执行切换
	                    if(disY<0){
	                        self.doSlide();
	                    }else{
	                        self.doSlide("up");
	                    }
	                }
	            });
			},
			doSlide(upflag){
				let self=this;
                if(upflag){
                	if(self.current) {
						self.current = self.current - 1;
					}
                }else{
                	if(self.current != self.fullPageSize - 1) {
						self.current = self.current + 1;
					}
                }
                if(this.resiezeFlag) {
					this.wHeight = document.body.clientHeight;
				}
                self.getTransform();
            },
			getSize() {
				let self = this;
				window.onresize = function() {
					self.resiezeFlag = false;
					self.wHeight = document.body.clientHeight;
					self.getTransform();
				}
			},
			getTransform() {
				let self = this;
				document.getElementById("pageContain").style.transform = "translateY(" + (-self.wHeight) * self.current + "px)";
				/* Opera、Chrome 和 Safari */
				// document.getElementById("pageContain").style.WebkitTransform = "translateY(" + (-self.wHeight) * self.current + "px)";
				/* IE 9 */
				// document.getElementById("pageContain").style.msTransform = "translateY(" + (-self.wHeight) * self.current + "px)";
			},
			onMouseWheel(ev) { /*当鼠标滚轮事件发生时，执行一些操作*/
				let self = this;
				var ev = ev || window.event;
				var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作  
				down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
				if(down) {
					if(self.current != self.fullPageSize - 1) {
						self.current = self.current + 1;
					}
				} else {
					if(self.current) {
						self.current = self.current - 1;
					}
				}
				if(this.resiezeFlag) {
					this.wHeight = document.body.clientHeight;
				}
				self.getTransform();
				if(ev.preventDefault) { /*FF 和 Chrome*/
					ev.preventDefault(); // 阻止默认事件  
				}
				return false;
			},
			addEvent(obj, xEvent, fn) {
				if(obj.attachEvent) {
					obj.attachEvent('on' + xEvent, fn);
				} else {
					obj.addEventListener(xEvent, fn, false);
				}
			}
		},
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	@import "../assets/global.scss";
	@keyframes music_move{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.back-music{
		width: 50px;
		height: 50px;
		position:absolute;
		top:10px;
		right:10px;
		background-image: url('http://www.attrone.com/images/basketball/music-1.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		-webkit-background–size: cover;
		-moz-background–size: cover;
		-o-background–size: cover;
	}
	.back-music.active{
		animation:music_move 5s linear infinite;
		background-image: url('http://www.attrone.com/images/basketball/music-0.png');
	}
	@keyframes arrow_move{
		0% {
			bottom: 10px;
		}
		50%{
			bottom: 20px;
		}
		100% {
			bottom: 10px;
		}
	}
	@keyframes down_arrow_move{
		0% {
			top: 30px;
		}
		50%{
			top: 40px;
		}
		100% {
			top: 30px;
		}
	}
	.down-arrow{
		animation:down_arrow_move 1s linear infinite;
		transition: all 1s linear;
		width: 37px;
		height: 24px;
		position: absolute;
		top: 10px;
		left: 50%;
		transform: rotate(180deg) translateX(-50%);
		transform-origin: 0 0;
		background-image: url('http://www.attrone.com/images/basketball/arrow.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		-webkit-background–size: cover;
		-moz-background–size: cover;
		-o-background–size: cover;
	}
	.arrow{
		animation:arrow_move 1s linear infinite;
		transition: all 1s linear;
		width: 37px;
		height: 24px;
		position: absolute;
		left: 50%;
		bottom: 10px;
		transform: translateX(-50%);
		background-image: url('http://www.attrone.com/images/basketball/arrow.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		-webkit-background–size: cover;
		-moz-background–size: cover;
		-o-background–size: cover;
	}
	body,
	div,
	p,
	h1 {
		margin: 0;
		padding: 0;
	}
	
	ul {
		list-style: none;
	}
	
	h1 {
		padding-top: 100px;
	}
	
	.home {
		width: 100%;
		height: 100%;
		position: relative;
		overflow-y: hidden;
	}
	
	#pageContain {
		width: 100%;
		height: 100%;
		transition: all .5s linear;
		.page {
			overflow: hidden;
			position: relative;
			width: 100%;
			height: 100%;
			img{
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
				width: 100%;
			}
		}
	}
	
	@keyframes moveBox {
		0% {
			height: 0px;
		}
		100% {
			height: 120px;
		}
	}
	
	@keyframes moveKeys {
		0% {
			opacity: 0;
			filter: Alpha(opacity=0);
		}
		100% {
			opacity: 1;
			filter: Alpha(opacity=100);
		}
	}
</style>