(function(){
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//获取二维码的请求地址
		GET_LOGIN_QRCODE_URL : '/adminjson/GetQRCode', 
		//查询登录状态的请求地址
		GET_LOGIN_STATE_URL : '/adminjson/SAASCheckLoginState',
		//获取登录验证码的请求地址
		GET_SMSCODE_URL : '/json/GetSMSCode',
		//用户登录的请求地址
		USER_LOGIN_URL : '/json/Login'
	}
	
	/**
	 * 私有变量：二维码数据模型
	 */
	var qrcodeModule = {
		QRCodeURI : '',	//二维码图片路径
		token : '',//二维码的唯一凭证
		worker : {}	//轮询计时器
	};
	
	/*
	 * 私有变量：登录数据模型
	 */
	var loginFormData = {
		count : 60,	//倒计时
		codeBtnTxt : "获取验证码"	//验证码按钮文字
	}
	
	var toastUtil = new Toast();
	
	/**************************私有方法集合 Start***************************************/
	
	/**
	 * 获取cookie数据项
	 * @param {Object} c_name
	 */
	function getCookie(c_name){
		if (document.cookie.length>0){　
　　　　　　	c_start=document.cookie.indexOf(c_name + "=")
      	　　	
	　　　　　　if (c_start!=-1){ 
	　　　　　　　　c_start=c_start + c_name.length+1　　
	　　　　　　　　c_end=document.cookie.indexOf(";",c_start)　　
	　　　　　　　　if (c_end==-1) c_end=document.cookie.length
	　　　　　　　　return unescape(document.cookie.substring(c_start,c_end))　　
	　　　　　　} 
　　　　	}
　　　　return "";
　　	}
	
	/**
	 * 私有方法：手机号码或验证码验证
	 * @param {Object} value
	 * @param {Object} type
	 */
	function valid(value,type){
		var phoneReg = /^1[34578]\d{9}$/;//手机号校验正则
		var codeReg = /^[\d|\D]{4,}$/;	//验证码及密码验证正则
		if("phone" == type){
			return (phoneReg.test(value) && value != undefined)?true:false;
		}else{
			return (codeReg.test(value) && value != undefined)?true:false;
		}
	};
	
	/**
	 * 私有方法：构建显示二维码图片
	 * @param {Object} base64str
	 */
	function buildPic(qrcodeModule){
		$("#qrcodeModal img").attr('src',qrcodeModule.QRCodeURI).removeClass('loadBefor');
	}
	
	/**
	 * 私有方法：登录请求成功的处理
	 * @param {Object} result
	 * @param {Object} type
	 */
	function successFn(result,type){
		if(result.errorCode == 0){
			var mgrName = result.body.mgrName;
			var mgrSid = encodeURIComponent(result.body.mgrSid);
			var mgrPic = result.body.mgrPic;
			var hasDiffno=result.body.hasDiffno;
			console.log(result);
			killQrWorker();
			//登录成功
			setCookie('hasDiffno',(hasDiffno!=undefined)?hasDiffno:'');
			setCookie('mgrName',(mgrName!=undefined)?mgrName:'');
			if(getCookie('mgrSid') == undefined){
				setCookie('mgrSid',(mgrSid!=undefined) ? mgrSid :'');
			}
			setCookieUrl('mgrSid',(mgrSid!=undefined) ? mgrSid :'');
			console.log(document.cookie);
			setCookie('mgrPic',(mgrPic!=undefined)?mgrPic:'');
			window.location.href = "/erp/index.html";
		}else if(result.errorCode == 1001){
			//二维码过期
			killQrWorker();
			$("#qrcodeStateTxt").append('<hr><a onclick="showQrcode()">重新加载</a>')
		}else if(result.errorCode == 1003 || result.errorCode == 1004){
			//二维码等待扫码
			$("#qrcodeStateTxt").html(result.msg);			
		}else{
			toastUtil.error('登录失败!' + result.msg);
			if(type == 'qrcodeLogin'){
				clearTimeout(qrcodeModule.worker);
			}
			$("#qrcodeStateTxt").html('<b>' + result.msg + '</b>');
		}			
	}	
	
	/**
	 * 私有方法:设置cookie
	 */
	function setCookie(itemName,itemValue){
		document.cookie = ( itemName + '=' + itemValue + ';expires=' + (new Date(new Date().getTime()+2592000000)));
	}
	
	
	/**
	 * 私有方法:设置cookie
	 */
	function setCookieUrl(itemName,itemValue){
		document.cookie = ( itemName + '=' + itemValue + ';expires=' + (new Date(new Date().getTime()+2592000000)) + ";path=/;");
	}
	
	/**
	 * 私有方法:获取验证码或者密码
	 */
	function getCode(){
		var code = $("#code").val();
		if(code.length <= 4){
			return code;
		}else{
			return md5(code);
		}
	}
	
	/**
	 * 私有方法：轮询检测登录状态
	 * @param {Object} token
	 */
	function checkLoginState(token){
		qrcodeModule.worker = setInterval(function(){
			$.ajax({
				url: CONSTANT.GET_LOGIN_STATE_URL,
				dataType : 'JSON',
				method : 'POST',
				data : JSON.stringify({ accessToken : token}),
			}).done(function(result){
				successFn(result,'qrcodeLogin');
			});
		},1000);
	}
	
	/**
	 * 私有方法：停止二维码轮询
	 */
	function killQrWorker(){
		clearInterval(qrcodeModule.worker);
	}
	
	/**
	 * 私有方法：用户登录
	 */
	function userLogin(){
		//获取表单数据
		var phone = $("#phone").val();
		var code = getCode();
		var data = {
			'phone' : phone,
			'code'  : code,
			'source': 1
		}
		//发起请求
		$.ajax({
			url : CONSTANT.USER_LOGIN_URL,
			dataType : 'JSON',
			method : 'POST',
			data : JSON.stringify(data)
		}).success(function(result){
			successFn(result,'codeLogin');
		}).error(function(result){
//			console.info(JSON.stringify(result));
			toastUtil.error('登录失败');
		});
	}
	
	/**
	 * 私有方法：获取手机验证码
	 */
	function getSMSCode(){
		//获取表单数据
		var phone = $("#phone").val();
		var data = {
			'phone' : phone,
			'purpose'  : 'Login',
			'source': 0
		}
		//发送请求
		$.ajax({
			url : CONSTANT.GET_SMSCODE_URL,
			dataType : 'JSON',
			method : 'POST',
			data : JSON.stringify(data)
		}).success(function(result){
			if(result.errorCode == 0){
				Ticktock.start();
			}else{
				toastUtil.error("获取验证码请求失败！");
			}
		}).error(function(result){
			toastUtil.error("获取验证码请求失败！");
		});
	}
	
	/**
	 * 私有方法：倒计时工具
	 */
	var Ticktock = (function(){
		var counterIsWorking = false;//计时器是否运行中
		//启动定时器
		var launch = function(){
			//启动的判断以及设置
			if(counterIsWorking){
				return false;
			}
			counterIsWorking = true;
			//启动倒计时
			var counter = setInterval(function(){
				loginFormData.count -= 1; 
				loginFormData.codeBtnTxt = "剩" + loginFormData.count + "s";
				$("#codeBtn").val(loginFormData.codeBtnTxt).addClass('disabled');
				if(loginFormData.count == 0){
					clearInterval(counter);
					resetTicktock();
				}
			},1000);
		};
		//重置倒计时
		var resetTicktock = function(){
			loginFormData.codeBtnTxt = "获取验证码";
			loginFormData.count = 60;
			$("#codeBtn").val(loginFormData.codeBtnTxt).removeClass('disabled');
			counterIsWorking = false;
		}
		//向外暴露的公共方法
		return {
			start : launch
		}
	})();	
	
	/**
	 * 私有方法：读取二维码
	 */
	function showQrcode(){
		$('#qrcodeStateTxt').html('二维码读取中...');	
		var paramStr = JSON.stringify({
			width : '200',	//二维码图片宽
			height: '200',	//二维码图片高
			format: 'png',	//二维码图片格式
			purpose: 'LoginQR'//二维码用途
		});
		
		$.ajax({
			url: CONSTANT.GET_LOGIN_QRCODE_URL,
			dataType : 'JSON',
			method : 'POST',
			data : paramStr
		}).success(function(result){
			if(result.errorCode == 0){
				$('#qrcodeStateTxt').html('');
				//操作成功
				qrcodeModule.QRCodeURI = result.body.QRCodeURI;
				qrcodeModule.token = result.body.accessToken; 
				//构建二维码
				buildPic(qrcodeModule);
				//轮询检查登录状态
				checkLoginState(result.body.accessToken);
			}else{
				//操作出错
				toastUtil.error('请求二维码出错！' + result.msg);
				$("#qrcodeStateTxt").empty().append('请求二维码出错！<hr><a onclick="showQrcode()">重新加载</a>')
			}
		}).error(function(result){
			toastUtil.error('读取二维码请求出错!');
			$("#qrcodeStateTxt").empty().append('读取二维码请求出错!<hr><a onclick="showQrcode()">重新加载</a>')
		});
	}	
	
	/**************************私有方法集合 End***************************************/
	
	/*
	 * 通过AngularJS进行表单验证的控制
	 */
	var loginApp = angular.module('loginApp',[]);
	loginApp.controller('loginCtrl',function($scope){
		//验证码按钮是否可用
		$scope.codeBtnDisabled = true;
		//登录按钮是否可用
		$scope.loginBtnDisabled = true;
		//表单数据
		$scope.formParams = {
			phone : "",	//手机号
			codeAndPwd : ""	//验证码和密码
		};
		//监听页面
		$scope.$watch('formParams',function(newVal,oldVal){
		 	var phone = $scope.formParams.phone;
			var code = $scope.formParams.codeAndPwd;
			$scope.codeBtnDisabled = valid(phone,"phone")?false:true;
			$scope.loginBtnDisabled = (valid(phone,"phone")&&valid(code,"code"))?false:true;
		},true);
		
		/**
		 * 监听回车事件
		 * @param {Object} e
		 */
		$scope.enterListen = function(e){
			var keyCode = window.event?e.keyCode:e.which;
			//回车或确定按钮则执行登录
			if([13].indexOf(keyCode) >= 0){
				userLogin();
			}
		}
	});
	
	/**
	 * 事件监听
	 */
	$(document).ready(function(){
		//暴露公共方法
		window.showQrcode = showQrcode;

		//当关闭二维码弹窗时，停止轮询
		$("#modalCloseBtn").click(function(){
			killQrWorker();
		});
		//显示二维码登录
		$("#showQrcodeBtn").click(function(){
			showQrcode();
		});
		//登录
		$("#loginBtn").click(function(){
			userLogin();
		});
		//获取验证码
		$("#codeBtn").click(function(){
			getSMSCode();
		})
	});
})();