<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<span id="loginBtn" @mouseenter="loginMouse()" @mouseleave="loginLeave()" class="login-btn">登录</span>
		<p id="qq_login_btn" @mouseenter="loginMouse()" @mouseleave="loginLeave()" :class="login_flag?'':'not-select'"></p>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data(){
			return{
				login_flag:false,
			}
		},
		created() {
			let self=this;
			QC.Login({ //按默认样式插入QQ登录按钮
				btnId: "qq_login_btn" //插入按钮的节点id
			},function(reqData, opts){
				//根据返回数据，更换按钮显示状态方法
		       	var dom = document.getElementById(opts['btnId']),
		       	_logoutTemplate=[
		            //头像
		            '<span><img src="{figureurl}" class="{size_key}"/></span>',
		            //昵称
		            '<span>{nickname}</span>',
		            //退出
		            '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'    
		       	].join("");
		       	dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
		           	nickname : QC.String.escHTML(reqData.nickname), //做xss过滤
		          	figureurl : reqData.figureurl
		       	}));
		       	if(QC.Login.check()){//如果已登录
					QC.Login.getMe(function(openId, accessToken){
						console.log(openId,accessToken);
					});
					//这里可以调用自己的保存接口
					//...
				}
			},function(){
				
			});
		},
		methods: {
			loginMouse(){
				this.login_flag=true;
			},
			loginLeave(){
				this.login_flag=false;
			},
		}
	}
</script>

<style>
	.login-btn,#qq_login_btn{
		position: absolute;
		right: 100px;
	}
	.login-btn{
		top: 20px;
	}
	#qq_login_btn{
		top: 40px;
	}
	.not-select{
		opacity: 0;
	}
	#app {
		font-family: -apple-system, "Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
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
	
	#app {
		width: 100%;
		height: 100%;
	}
</style>