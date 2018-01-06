$(document).ready(function() {

	var count = 60;
	var codeBtnTxt = "获取验证码";
	var counterIsWorking = false; //计时器是否运行中
	//启动定时器
	function launch() {
		//启动的判断以及设置
		if(counterIsWorking) {
			return false;
		}
		counterIsWorking = true;
		$("#getSMSCodeBtn").prop("disabled", true);
		//启动倒计时
		var t = setInterval(function() {
			count -= 1;
			codeBtnTxt = "剩" + count + "s";
			$("#getSMSCodeBtn").html(codeBtnTxt);
			if(count == 0) {
				clearInterval(t);
				$("#getSMSCodeBtn").prop("disabled", false);
				$("#getSMSCodeBtn").html('获取验证码');
				counterIsWorking = false;
				count = 60;
			}
		}, 1000);
	};

	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//发送请求
	function loadCompanyInfo() {
		httpUtilObj.ajax({
			url: '/adminjson/SAASGetCompany',
			params: {}
		}).then(function(result) {
			if(result.errorCode == 0) {
				var data = result.body.company;
				$("#adminName").html(data.adminName);
				$("#adminPhone").val(data.adminPhone);
				$("#companyIdInput").val(data.id);
			}
		});
	}
	loadCompanyInfo();

	$("#getSMSCodeBtn").click(function() {
		var phoneNum = $("#adminPhone").val();

		httpUtilObj.ajax({
			url: '/json/GetSMSCode',
			params: {
				phone: phoneNum,
				source: 0,
				purpose: "setAdmin"
			}
		}).then(function(result) {
			if(result.errorCode == 0) {
				launch();
			}
		});
	});
	$("#confirmButton").click(function() {
		httpUtilObj.ajax({
			url: '/adminjson/SAASSetCompanyAdmin',
			params: {
				phone: $("#adminPhoneNew").val(),
				oldPhone: $("#adminPhone").val(),
				code: $("#checkCodeInput").val(),
				companyId: $("#companyIdInput").val()
			}
		}).then(function(result) {
			if(result.errorCode == 0) {
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				loadCompanyInfo();
				$("#getSMSCodeBtn").prop("disabled", false);
				$("#getSMSCodeBtn").html('获取验证码');
				phone: $("#adminPhoneNew").val('');
			}
		});
	});
});