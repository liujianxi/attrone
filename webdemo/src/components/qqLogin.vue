<template>
	<div id="qq-login">
		<div>
			<div class="login-btn" v-if="showLoginBtn">
				<a class="a-btn" href="javascript:;" onclick="return window.open('https://graph.qq.com/oauth2.0/authorize?client_id=101441867&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.attrone.com%2Fqqconn%2F', 'oauth2Login_10677' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');">立即登录</a>
			</div>
			<div class="has-login" @click="outFlag=!outFlag" v-if="showImgBtn">
				<p><img :src="qqImg"/></p>
				<ul v-if="outFlag">
					<li @click="logOut()">
						<svg class="icon icon-tuichu" aria-hidden="true">
							<use xlink:href="#icon-tuichu"></use>
						</svg>
						<span>退出</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Notification } from 'element-ui';
	export default {
		data(){
			return{
				login_flag:false,
				qqMes:{},//qq登录的信息
				qqImg:'',
				outFlag:false,//显示退出登录按钮
				showLoginBtn:false,//显示登录按钮
				showImgBtn:false,//显示已登录
			}
		},
		created() {
			let self=this;
			QC.Login({},function(reqData, opts){
				//根据返回数据，更换按钮显示状态方法
		       	var dom = document.getElementById(opts['btnId']),
		       	_logoutTemplate=[
		            //头像
		            '<span><img src="{figureurl}" class="{size_key}"/></span>',
		            //昵称
		            '<span>{nickname}</span>',
		            //退出
		            '<span><a href="javascript:QC.Login.signOut();">退出1</a></span>'    
		       	].join("");
		       	dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
		           	nickname : QC.String.escHTML(reqData.nickname), //做xss过滤
		          	figureurl : reqData.figureurl
		       	}));
		       	if(QC.Login.check()){//如果已登录
					QC.api("get_user_info")
					//指定接口访问成功的接收函数，s为成功返回Response对象
					.success(function(s){
						//成功回调，通过s.data获取OpenAPI的返回数据
						window.qqMes=s.data;
						self.qqImg=s.data.figureurl;
						self.showLoginBtn=false;
						self.showImgBtn=true;
					})
					.error(function(f){
						//失败回调
						console.log("获取用户信息失败！");
					})
					//指定接口完成请求后的接收函数，c为完成请求返回Response对象
					.complete(function(c){
						//完成请求回调
						console.log("获取用户信息完成！");
					});
				}else{
					//消除qq登录
					window.qqMes={};
					self.showLoginBtn=true;
					self.showImgBtn=false;
				}
			},function(){
				//消除qq登录
				window.qqMes={};
				self.showLoginBtn=true;
				self.showImgBtn=false;
			});
		},
		activated(){
			let self=this;
			self.outFlag=false;
			if(!QC.Login.check()){//如果已登录
				self.showLoginBtn=true;//显示登录按钮
			}
		},
		methods:{
			logOut(){
				MessageBox.confirm('是否退出登录？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	QC.Login.signOut();
		          	setTimeout((res)=>{
		          		window.history.go(0);
		          	},50)
		        }).catch(() => {
		        	
		        });
			},
			qqLoginBtn(){
				//默认是flase，由子元素向上冒泡----当我们设置为true的时候就会由父元素向下冒泡
				document.querySelector('#qq_login_btn a').addEventListener("click", function(){
				    console.log('1111');
				},false);
			},
			loginMouse(){
				this.login_flag=true;
			},
			loginLeave(){
				this.login_flag=false;
			},
		}
	}
</script>

<style scoped lang='scss'>
@import "../assets/global.scss";
	#qq-login{
		top: -30px;
		position: absolute;
		right: 0;
	}
	.login-btn{
		top: 20px;
		font-size: 14px;
		a{
			border-radius: 4px;
			display: inline-block;
			padding: 5px 13px;
			background:#009a61;
			color:#fff; 
			&:hover{
				background: #006741;
				text-decoration: none;
			}
		}
	}
	.has-login{
		position: relative;
		img{
			cursor: pointer;
			display: block;
			border-radius: 50%;
			width: 40px;
			height: 40px;
		}
		ul{
			position: absolute;
			right: 0;
			padding: 12px 0;
		    border: 1px solid hsla(217,5%,71%,.45);
		    border-radius: 4px;
		    background-color: #fff;
		    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
		    li{
		    	>svg{
		    		transform-origin: 0px 0px 0px;
		    		font-size: 20px;
		    		position: relative;
		    		top: 2px;
		    		color: #b2bac2;
		    		width: 20px;
		    		height: 20px;
		    	}
		    	text-align: left;
		    	width: 80px;
		    	cursor: pointer;
		    	padding: 0 10px;
		    	&:hover{
		    		background-color: hsla(0,0%,95%,.5);
		    	}
		    }
		}
	}
	#qq_login_btn{
		top: 40px;
	}
	.not-select{
		opacity: 0;
	}
</style>