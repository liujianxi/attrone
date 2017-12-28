<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<div class="top-btn" v-if="topFlag" @click="backTop()">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-dingbu1"></use>
			</svg>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
				topFlag:false,
			}
		},
		created(){
			this.getScroll();
		},
		methods:{
			getScroll(){
				let self=this;
				window.onscroll=function(){
					let e =e || window.event;
					let scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
					if(scrolltop>100){
						self.topFlag=true;
					}else{
						self.topFlag=false;
					}
				};
			},
			backTop(){
//				document.documentElement.scrollTop=0;
//				document.body.scrollTop=0;
				let ele=document.documentElement||document.body;
				let self=this;
				self.animate(ele,{scrollTop:0},10, 0.01);
			},
			animate(obj, json, interval, sp, fn){
				clearInterval(obj.timer);
			    function getStyle(obj, arr) {
			    	console.log(window.getComputedStyle(obj,null));
			        if(window.getComputedStyle){
						return getComputedStyle(obj,null)[arr];
					}
					return obj.currentStyle[arr];
			    }
			    obj.timer = setInterval(function(){
			        var flag = true;
			        for(var arr in json) {
			            var icur = 0;
			            if(arr == "opacity") {
			                icur = Math.round(parseFloat(getStyle(obj, arr))*100);
			            } else {
			                icur = parseInt(getStyle(obj, arr));
			            }
			            var speed = (json[arr] - icur) * sp;
			            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
			            if(icur != json[arr]){
			                flag = false;
			            } 
			            if(arr == "opacity"){
			                obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
			                obj.style.opacity = (icur + speed)/100;
			            }else {
			                obj.style[arr] = icur + speed + "px";
			            }
			        }
			
			        if(flag){
			            clearInterval(obj.timer);
			            if(fn){
			                fn();
			            }
			        }
			    },interval);
			},
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: -apple-system, "Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 100%;
		height: 100%;
	}
	.top-btn{
		transition: all .3s ease-in-out;
		position: fixed;
		right: 5%;
		bottom: 50px;
		width: 40px;
		height: 40px;
		box-shadow: 0 0 5px rgba(0,0,0,.05);
		border: 1px solid #f1f1f1;
		border-radius: 50%;
		cursor: pointer;
		svg{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			fill: #9a4b4b;
			width: 30px;
			height: 30px;
		}
	}
	.top-btn:hover{
		box-shadow: 0 0 5px #ddd;
	}
	p,
	body,
	ul,
	dl,
	li {
		margin: 0;
		padding: 0;
	}
	
	html {
		width: 100%;
		height: 100%;
	}
	
	body {
		width: 100%;
		height: 100%;
		*cursor: default;
		overflow-x: hidden;
		font: 16px/1.5 "Microsoft YaHei", Helvetica, STHeiti STXihei, Microsoft JhengHei, Arial;
	}
	a{
		text-decoration: none;
	}
</style>