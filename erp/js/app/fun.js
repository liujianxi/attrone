var doHttp = function(param, httpurl) {
	var httpUtilObj = new HttpUtil();
	return httpUtilObj.ajax({
		url: httpurl,
		params: param
	});
}

//机构管理
var G_orgModule = {};
G_orgModule.getOrgListData = function(companyId, orgName, pageNo, pageSize) {
	var param = {
		orgName: orgName,
		pageNo: pageNo, //请求页
		pageSize: pageSize, //每页记录数
		companyId: companyId
	}
	var url = '/adminjson/SAASGetOrgBranchList';
	return doHttp(param, url);
}

//护工管理
G_HGModule = {};
G_HGModule.getHGListData = function(companyId, orgId, hgType, pageNo, pageSize){
	var param = {
		companyId : companyId,
		hgType : hgType,
		orgId: orgId,
		pageNo: pageNo,
		pageSize: pageSize
	}
	var url = '/adminjson/SAASGetHGList';
	return doHttp(param, url);
}

//角色管理
var G_RoleModule = {};
G_RoleModule.addRole = function(roleName) {
	var param = {
		roleName: roleName
	}
	var url = '/adminjson/SAASSaveOrUpdateRole';
	return doHttp(param, url);
}

G_RoleModule.delRole = function(roleId) {
	var param = {
		id: roleId
	}
	var url = '/adminjson/SAASDelRole';
	return doHttp(param, url);
}
G_orgModule.getRoleListData = function(pageNo, pageSize) {
	var param = {
		pageNo: pageNo, //请求页
		pageSize: pageSize //每页记录数
	}
	var url = '/adminjson/SAASGetRoleList';
	return doHttp(param, url);
}
G_orgModule.getRoleListData2 = function(roleId,pageNo, pageSize) {

	var param = {
		roleId:roleId,
		pageNo: pageNo, //请求页
		pageSize: pageSize //每页记录数
	}
	var url = '/adminjson/SAASGetHGListByRoleId';
	return doHttp(param, url);
}

//长护险
var G_InsureModule = {};
G_InsureModule.getInsureList = function(status, key, orderStatus, pageNo, pageSize) {
	var param = {
			status: status,
			key : key,
			orderStatus : orderStatus,
			pageNo: pageNo, //请求页
			pageSize: pageSize //每页记录数
	}
	var url = '/adminjson/SAASGetInsureList';
	return doHttp(param, url);
}
G_InsureModule.getInsureDetail = function(insureNO){
	var param = {
			insureNO: insureNO
	}
	var url = '/adminjson/SAASGetInsureDetailNew';
	return doHttp(param, url);
}
G_InsureModule.insureProcess = function(param){
//	aassessType     1-初审 2-是指派护士 3-护士复审 4-提交终审 5-终审 6-指派健康经理
//	审核统一参数：insureNO, status(1-通过 2-驳回), remark, rejectDesc(驳回原因)
//	复审：isForce-是否强制申请 是否强制申请 0-否 1-是
//	终审：startDate- 资质发放日期
	var url = '/adminjson/SAASInsureAssessNew';
	return doHttp(param, url);
}

//获取护士项目经理列表
G_InsureModule.getInsureHushiList = function(nurseType,orderInsureId,hsType,type){
	if(nurseType === '10005' || nurseType === '10008'){
		nurseType = '10003';
	} else if(nurseType === '10007'){
		nurseType = '10004';
	}
	console.log(hsType);
	var param = {
		staffType : nurseType,
		orderInsureId : orderInsureId,
		hsType:hsType,
		type:type,
	};
	var url = '/adminjson/SAASGetInsureHushiList';
	return doHttp(param, url);
}
//获取客户联系记录
G_InsureModule.getContactRecordList = function(insureNO){
	var param = {
			insureNO:insureNO
	};
	var url = '/adminjson/SAASGetKFContactRecord';
	return doHttp(param, url);
}
   
//获取护护工列表
G_InsureModule.getOrderHgList = function(orderId){
	var param = {
			orderId:orderId
	};
	var url = '/adminjson/SAASGetServeHGList';
	return doHttp(param, url);
}

//健康经理业绩
G_InsureModule.getperformanceList = function(key, startTime, endTime, pageNo, pageSize) {
	var param = {
			key : key,
			startTime : startTime,
			endTime : endTime,
			pageNo: pageNo, //请求页
			pageSize: pageSize //每页记录数
	}
	var url = '/adminjson/SAASGetInsurePerformanceList';
	return doHttp(param, url);
}

//门禁卡统计
G_InsureModule.getentranceGuardList = function(orgName, startDate, endDate, pageNo, pageSize) {
	var param = {
			orgName : orgName,
			startDate : startDate,
			endDate : endDate,
			pageNo: pageNo, //请求页
			pageSize: pageSize //每页记录数
	}
	var url = '/adminjson/SAASTjOrgExtra';
	return doHttp(param, url);
}

//上传
function UploadPic(inputEl, succCall, errCall){        //inputEl:原dom中的激发输入的值
    succCall = succCall || function(){};
    errCall = errCall || function(){};    
    var wrapperElId = inputEl.attr("wrapperEl");
    var self = this;
    var id = "form"+new Date().getTime();
    console.log(inputEl);
    var form = $('<form id="'+id+'" action="#"  method="post" enctype="multipart/form-data" style="display:none;"></form>');
    inputEl.clone().appendTo(form);
    $('body').append(form);

    var formData = new FormData(form[0]);
    console.log('pcicccc--------');
    console.log(formData);
    return $.ajax({
        type: "POST",
        data: formData,
//      url: '/excelupload?type=excel',
        url: '/imageupload?type=pic',
        contentType: false,
        processData: false,
    }).done(function (data) {
        data = JSON.parse(data);
        if(data.errCode == 0) {
        	if(wrapperElId){
        		self.generateImg($("#"+wrapperElId), data);
        	}
            succCall(data);
        } else {
            errCall();
        }
    }).fail(function (data) {
        errCall(data);
    }).always(function(){
//      form.remove();
    });
}
UploadPic.prototype.generateImg = function(wrapperEl, obj){
	if(wrapperEl && obj){
		wrapperEl.children('.uimg_item').remove();
		var tmp = [];
	    tmp.push("<div class='uimg_item' style='display:inline-block;'>");
	    tmp.push(" <img class='upload_img' src='" + obj.imgUrl + "' ");
	    if(wrapperEl.attr("imgwidth")){
	    	 tmp.push(" width='" + wrapperEl.attr("imgwidth") + "'");
	    }
	    if(wrapperEl.attr("imgheight")){
	    	 tmp.push(" height='" + wrapperEl.attr("imgheight") + "'");
	    }
	    
	    tmp.push(" '>");
//	    tmp.push(' <div style="display:-webkit-box; text-align: center;">');
//	    tmp.push('     <div class="uimg_del" style="-webkit-box-flex:1; cursor:pointer;">删除</div>')       
//	    tmp.push(' </div>');
	    tmp.push("</div>");
	    wrapperEl.append(tmp.join(''));
		
	    wrapperEl.on('click', '.uimg_del', function(){
	    	wrapperEl.siblings(".js-upload-file-input").removeAttr('imgid');
	        $(this).parents('.uimg_item').remove();
	    });
	}
    
}

$('body').on('click', '.js-addTab-link', function(){
    top.tm.addTab($(this).attr('title'), $(this).attr('link'));
});

//绑定，选择科室按钮
$("body").on('click',".js-select-branch", function(){
	top.importOnceJS('js-select-branch',"js/app/modal/select_branch.js");
	var elem = $(this);
	top.G_OpenSelectBranchWin().then(function(data){
		console.log("data:" + JSON.stringify(data));
		var branchNameArr = [];
		$.each(data, function(index,val) {
			branchNameArr.push(val.branchName);
		});
		elem.html(branchNameArr.join(","));
		elem.attr('branch',JSON.stringify(data));
	});
});
//绑定，选择民族按钮
$("body").on('click',".js-select-nation", function(){
	top.importOnceJS('js-select-nation',"js/app/modal/select_nation.js");
	var elem = $(this);
	top.G_OpenSelectNationWin().then(function(data){
		console.log("nation:" + data);
		elem.html(data);
		elem.attr('nation',data);
	});
});
//绑定，选择护士按钮
$("body").on('click','.js-select-insureHandleNure, .js-select-insureHandleNureManager', function(){
	top.importOnceJS('js-select-nation',"js/app/modal/select_insure_handle_nure.js");
	var elem = $(this);
	var nurseType = elem.attr("nurseType");
	var insureOrderNO = elem.attr("insureOrderNO");
	let hsType=elem.attr('hstype');
	console.log("insureNO----------------------------------"+insureOrderNO);
	top.G_OpenSelectInsureHandleNureWin(nurseType, insureOrderNO,hsType).then(function(data){
		console.log("hs:" + JSON.stringify(data));
		elem.html(data["hgName"]);
		elem.attr('hgId',data.hgId);
	});
});

//绑定，ADL评分按钮按钮
$("body").off('click','.js-grade-barthel').on('click',".js-grade-barthel", function(){
	top.importOnceJS('js-grade-nation',"js/app/modal/barthel.js");
	var elem = $(this);
	var insureNO = elem.attr("insureNO");
	top.G_OpenGradeBarthelWin(insureNO).then(function(data){
//		console.log("hs:" + JSON.stringify(data));
		var grade_adl_html="<a score="+data+" href='javascript:void(0);' insureNO ='"+insureNO+"' typeGrade = '1' class='js-grade-barthel-self'> "+data+"分</a>";		
//		var adl_insureNO_html1="<a href='javascript:void(0);' insureNO ='"+insureNO+"'  class='js-grade-barthel'>重新评估</a>";
		var adl_insureNO_html_download = '<a href="' + location.protocol + '//' + location.host + '/getAdlAssessResultPDF?insureNO=' + insureNO + '" download>下载pdf</a>';
		$(".adl_insureNO_html_a").html("<span class='js-adl-res'>" + grade_adl_html + "</span>" +"　　" +adl_insureNO_html_download);
		elem.html(data);
		elem.attr('barthelScore',data);
	});
});

//MMSE评估
$("body").on('click',".js-add-mmse-btn", function(){
	top.importOnceJS('js-script-mmse',"js/app/rp/mmse.js");
	var elem = $(this);
	console.log("hspg:" + JSON.stringify(elem));
	var insureNO = elem.attr("insureNO");
	top.G_Fun_showMMSEHandlePanel(insureNO).then(function(data){
		var mmse_insureNO_html1="<a href='javascript:void(0);' insureNO ='"+insureNO+"'  class='js-add-mmse-btn'>重新评估</a>";
		var grade_mmse_html="<a href='javascript:void(0);' insureNO ='"+insureNO+"' typeGrade = '2' class='js-grade-barthel-self'> "+data+"分</a>";
		$(".mmse_insureNO_html_a").html("<span class='js-mmse-res'>" + grade_mmse_html + "</span>" +'&nbsp;&nbsp;&nbsp;&nbsp;'+ mmse_insureNO_html1);
		elem.html(data);
		elem.attr('barthelScore',data);
	});
});

//添加病史描述
$("body").on('click',".js-medical-barthel", function(){
	top.importOnceJS('js-script-medical',"js/app/rp/medical_history.js");
	var elem = $(this);
	console.log("hspg:" + elem.attr("insureNO"));
	var insureNO = elem.attr("insureNO");
	top.G_Fun_showmedicalHandlePanel(insureNO).then(function(data){
		elem.html(data);
		console.log("medicaldata:" + elem.attr(data));
	});
	
});



//客户联系记录
$("body").on('click',".js-insure_relation", function(){
	top.importOnceJS('js-script-medical',"js/app/rp/insure_relation.js");
	var elem = $(this);
	console.log("hspg:" + elem.attr("insureNO"));
	var insureNO = elem.attr("insureNO");
	top.G_Fun_showRelationHandlePanel(insureNO)
});

//自评+adl反显
//typeGrade  0 : 用户自评  ，1 : adl评分  ,2 : MMSE评分
$("body").off('click','.js-grade-barthel-self').on('click',".js-grade-barthel-self", function(){
	top.importOnceJS('js-script-medical_grade_personage',"js/app/modal/select_grade_personage.js");
	var elem = $(this);
	var insureNO = elem.attr("insureNO");
	var typeGrade = elem.attr("typeGrade")
	top.G_OpenSelectGradeWin(insureNO,typeGrade).then(function(data){
	});
});




//微信二维码
$("body").on('click',".js-btn-WX-url", function(){
	top.importOnceJS('js-script-WX-url',"js/app/modal/select_wx.js");
	var elem = $(this);
	var wxType = elem.attr("wxType");
	var hgId = elem.attr("hgId");
	var branchId = elem.attr("branchId");
	var companyOrgId = elem.attr("companyOrgId");
	top.G_Fun_showWxPanel(hgId,branchId,companyOrgId,wxType).then(function(data){
//		elem.html(data);
	});
});

//获取mmse信息反显
G_InsureModule.getInsureMMSE = function(insureNO, id){
	var param = {
		insureNO: insureNO,
		id: id
	}
	var url = '/adminjson/SAASGetInsureMMSE';
	return doHttp(param, url);
}

//获取adl信息反显
G_InsureModule.getInsureADL = function(insureNO, id,assessType){
	var param = {
		insureNO: insureNO,
		id: id,
		assessType:assessType,
	}
	var url = '/adminjson/SAASGetInsureADL';
	return doHttp(param, url);
}


G_InsureModule.getInsureSubsidyList = function(param) {
	var url = '/adminjson/SAASGetInsureSubsidyList';
	return doHttp(param, url);
}


//获取病史描述
G_InsureModule.getMedicalInfo = function(insureNO){
	var param = {
			insureNO: insureNO
	}
	var url = '/adminjson/SAASGetInsureAgainAssess';
	return doHttp(param, url);
}

var G_OrderModule = {};
G_OrderModule.GuideStaff = function(param) {
	console.log(param);
	var url = '/adminjson/SAASGuideStaffNew';
	return doHttp(param, url);
}

G_OrderModule.AllotHG = function(param) {
	var url = '/adminjson/SAASAllotHG';
	return doHttp(param, url);
}

//修改订单信息
G_OrderModule.UpdateOrder = function(param) {
	var url = '/adminjson/SAASSaveOrUpdateOrder';
	return doHttp(param, url);
}

//续交费用
G_OrderModule.doPay = function(param) {
	var url = '/adminjson/DoPay';
	return doHttp(param, url);
}

//跳过评估
G_OrderModule.skipAssess = function(param) {
	var url = '/adminjson/SAASSkipAssessOrder';
	return doHttp(param, url);
}

//自照申请
var G_ApplyModule = {};
G_ApplyModule.getStaffApplyList = function(param) {
	var url = '/adminjson/SAASGetStaffApplyList';
	return doHttp(param, url);
}

G_ApplyModule.getStaffApplyDetail = function(applyId) {
	var param = {
		applyId : applyId
	}
	var url = '/adminjson/SAASGetStaffApplyDetail';
	return doHttp(param, url);
}

G_ApplyModule.checkStaffApply = function(param) {
	var url = '/adminjson/SAASCheckStaffApply';
	return doHttp(param, url);
}

//图片上传部分
function uploadImg(ele,str){
	let dtd = $.Deferred();
	//图片上传逻辑
	$('body').find(ele).off('change').on('change',function(){//
		var fileName=$(this).val();
		console.log(fileName);
		if(fileName==''){
			return false;
		}
		let allowList = ['png','jpg','webp','bmp','svg','gif','jpeg'];
		let name_flag=fileName.split('.');
		let allow_name=name_flag[name_flag.length-1];
		allow_name=allow_name.toLowerCase();
		let t_flag=true;
		for(let i=0;i<allowList.length;i++){
			if(allow_name.indexOf(allowList[i])!=-1){//是图片
				t_flag=false;
				break;
			}
		}
		if(t_flag){
			Toast.error('请选择正确格式的图片进行上传！');
			return false;
		}
		let self=$(this);
		let t_size=self.context.files[0].size;
		if(t_size>2*1000*1024){
			Toast.error('上传图片过大,请选择2M以下的图片！');
			self.val('');
			return false;
		}
		var id = "form"+new Date().getTime();
		var form = $('<form id="'+id+'" name="'+id+'" action="#"  method="post" enctype="multipart/form-data" style="display:none;"></form>');
	    self.clone().appendTo(form);
	    $('body').append(form);
	    var formData = new FormData(form[0]);
	    $('#cam-upload',parent.document).addClass('order-show');
		$('#cam-upload-mask',parent.document).addClass('order-show');
	    $.ajax({
	        type: "post",
	        data: formData,
	        url: '/imageupload?type=pic',
	        contentType: false,
	        processData: false,
	        dataType:'json',
	        xhr: function(){ //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
				myXhr = $.ajaxSettings.xhr();
				if(myXhr.upload){ //检查upload属性是否存在
				//绑定progress事件的回调函数
				myXhr.upload.addEventListener('progress',progressHandlingFunction, false);
				}
				return myXhr; //xhr对象返回给jQuery使用
			},
	    }).done(function (data) {
	    	if(data.errCode==0){
	    		Toast.success('上传成功！');
	    		$('#cam-upload',parent.document).removeClass('order-show');
				$('#cam-upload-mask',parent.document).removeClass('order-show');
	    		dtd.resolve(data);
	    		return dtd.promise();
	    	}else{
	    		self.val('');
	    		Toast.error('上传失败1！');
		        $('#cam-upload',parent.document).removeClass('order-show');
				$('#cam-upload-mask',parent.document).removeClass('order-show');
	    	}
	    }).fail(function (data) {
	    	self.val('');
	    	Toast.error('上传失败2！');
	        $('#cam-upload',parent.document).removeClass('order-show');
			$('#cam-upload-mask',parent.document).removeClass('order-show');
	    }).always(function(){
	      	form.remove();
	    });
	})
	//上传进度回调函数：
	function progressHandlingFunction(e) {
		if (e.lengthComputable) {
			var percent = e.loaded/e.total*100;
			if(str!='show'){
				$('#cam-upload i.progress-icon',parent.document).css('display','none');
			}else{
				$('#cam-upload i.progress-icon',parent.document).css('display','inline').html(percent.toFixed(1) + "%");
			}
		}
	}
	return dtd.promise();
}
