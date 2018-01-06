var rp_addstaffPanelHtml = '<div id="panel_add_staff" class="r_panel">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">员工信息</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="staff_input_form">' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">基本信息</p>' +
	'              </div>' +

	'               <div class="form-group">' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-staffIdcard" id="js-upload-staffIdcard" wrapperEl="staffIdcard_wrapper">' +
	'                         <div id="staffIdcard_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-staffIdcard">+上传身份证正面照</a>' +
	'					  </div>' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-staffIdcard2" id="js-upload-staffIdcard2" wrapperEl="staffIdcard2_wrapper">' +
	'                         <div id="staffIdcard2_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'						  <input type="hidden" id="staff_idcardExpiredDate">' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-staffIdcard2">+上传身份证反面照</a>' +
	'					  </div>' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-staffIdcard3" id="js-upload-staffIdcard3" wrapperEl="staffIdcard3_wrapper">' +
	'                         <div id="staffIdcard3_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-staffIdcard3">+上传手持身份证照</a>' +
	'					  </div>' +
	'               </div>' +
	
	'               <div class="form-group">' +
	'                     <div class="col-sm-6" style="color: red;">图片最大3M，支持的格式有 jpg, png, jpeg, bmp</div>' +
	'               </div>' +
	
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>姓名:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入姓名"  class="form-control js-input-staffFullname">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>性别:</label>' +
	'                     <div class="radio-list">' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-staffSex" value="1"> 男</div></label>' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-staffSex" value="2"> 女</div></label>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">民族:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="staff_nation" class="js-select-nation">请选择民族</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">籍贯:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入籍贯"  class="form-control js-input-staffNativePlace">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>手机号:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入电话"  class="form-control js-input-staffPhone" >' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">居住地址:</label>' +
	'                     <div class="col-sm-5">' +
	'						<input type="hidden" name=lng id="staffInfo_lng" />' +
	'                       <input type="hidden" name="lat" id="staffInfo_lat" />' +
	'                       <input type="hidden" name="adcode" id="staffInfo_adcode" />' +
	'                       <input type="hidden" name="provinceID" id="staffInfo_provinceID" />' +
	'                       <input type="hidden" name="cityID" id="staffInfo_cityID" />' +
	'                       <input type="hidden" name="district" id="staffInfo_district" />' +
	'                       <input type="hidden" name="district" id="staffInfo_address" />' +
	'                       <input type="hidden" name="province" id="staffInfo_province" />' +
	'                       <input type="hidden" name="city" id="staffInfo_city" />' +
	'                       <input type="hidden" name="county" id="staffInfo_county" />' +
	'                        <input placeholder="请输入居住地址" id="staffInfo_building"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                    <label class="col-sm-3 control-label">通晓语言:</label>' +
	'                    <div class="col-sm-7 js-checkboxgroup-language">' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="staffLanguage" value="1">普通话</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="staffLanguage" value="2">粤语</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="staffLanguage" value="3">客家</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="staffLanguage" value="4">潮汕</label>' +
	'                    </div>' +
	'                </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>身份证:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入身份证号"  class="form-control js-input-staffIdcard" >' +
	'                     </div>' +
	'               </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">个人照片:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-staffPic" id="js-upload-staffPic" wrapperEl="staffPic_wrapper">' +
	'                         <div id="staffPic_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-staffPic">上传个人照片</a>' +
	'                     </div>' +
	'                 </div>' +

	'              <div class="form-group">' +
	'                  <p class="rp_subtit">工作信息</p>' +
	'              </div>' +
	'            	<div class="form-group" >' +
	'                    <label class="col-sm-3 control-label"><span class="form-required">*</span>工号:</label>' +
	'                    <div class="col-sm-5">' +
	'                        <input type="text" class="form-control js-input-staffno" placeholder="请输入员工工号">' +
	'                    </div>' +
	'               </div>' +
	'               <div class="form-group" style="display:none;">' +
	'                     <label class="col-sm-3 control-label">关联科室:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="staff_select_branch" class="js-select-branch">请选择科室</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group" style="display:none;">' +
	'                     <label class="col-sm-3 control-label">直属上级:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="staff_superior" class="js-select-superior">请选择上级</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group" >' +
	'                     <label class="col-sm-3 control-label">服务类型:</label>' +
	'                     <div class="col-sm-5">' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="js-staff-radio-workType" value="1">多陪</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="js-staff-radio-workType" value="2">专陪</label>' +
	'                     </div>' +
	'               </div>' +
    '				<div class="form-group">' +
	'					<label class="col-sm-3 control-label">员工类型:</label>' +
	
	'					<label class="col-sm-5" style="display:none; margin-top: 7px;" id="existRole">' +
	'					</label>' +
	
	'					<div class="col-sm-5">' +
	'				  		<select class="form-control m-bot5" id="showstaffInfo_staffTypes" style="height: 32px;">' +
//	'							<option value="1" selected>护工</option>' +
//	'				   			<option value="2">护士</option>' +
	'				   			<option value="0" >请选择</option>' +
	'				   			<option value="3" >督导</option>' +
	'				   			<option value="4">项目点主任</option>' +
	'				  			<option value="5">护士长</option>' +
	'				  			<option value="6">健康经理</option>' +
	'				  			<option value="7">评估员</option>' +
	'				   		</select>' +
	'					</div>' +
	'				</div>' +
	'				<div class="form-group" id="staff_org" style="display: none">' +
	'					<label class="col-sm-3 control-label">机构:</label>' +
	'					<div class="col-sm-5">' +
	'				  		<select class="form-control m-bot15" style="height: 32px;" name = "staff_org_sel" id="staff_org_sel">' +
	'							<option value="0">请选择机构</option>' +
	'						</select>' +
	
	'					</div>' +
	'				</div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">入行时间:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请选择入行时间"  class="form-control form_date js-input-careerStartTime">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label for="gongsi" class="col-sm-3 control-label">入职时间:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请选择入职时间"  class="form-control form_date js-input-joinTime">' +
	'                     </div>' +
	'               </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">健康证:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-healthCertificate" id="js-upload-healthCertificate" wrapperEl="healthCertificate_wrapper">' +
	'                         <div id="healthCertificate_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-healthCertificate">上传健康证照片</a>' +
	'                     </div>' +
	'                 </div>' +


	'                <div class="form-group">' +
	'                  <p class="rp_subtit">其他信息</p>' +
	'                </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">紧急联系人:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入紧急联系人"  class="form-control js-input-emergencyContact">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">紧急联系电话:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入紧急联系人电话"  class="form-control js-input-emergencyContactPhone">' +
	'                     </div>' +
	'               </div>' +

	'            </form>' +
	'        </div>' +
	'    </div>' +
	'    <div class="panel-footer">' +
	'         <div class="form-group">' +
	'              <div class="col-sm-12" style="text-align:center">' +
	'                   <button type="button" class="btn btn-sm btn-success js-btn-savestaffInfo">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';

var ids;
var dtd = $.Deferred();
function G_Fun_showstaffInfoPanel(id) {
	dtd = $.Deferred();
	ids = id;
	console.log("正在获取数据");
	doHttp({
		id: id
		}, '/adminjson/SAASGetHGInfo').then(function(result) {
		var data = result.body;
		console.log("正在获取数据-返回");
		$('input[name=js-radio-staffSex][value=' + data.sex + ']').prop('checked', true);
		//		hgType : $('input[name=js-radio-hgType]:checked').val(),
		$('#js-upload-staffIdcard').attr('imgid', data.idcardpic);
		$('#js-upload-staffIdcard2').attr('imgid', data.idcardpic2);
		$('#js-upload-staffIdcard3').attr('imgid', data.idcardpic3);
		$('#staff__nation').attr('nation', data.nation);
		$('#staff_nation').html(data.nation);
		$('#staffInfo_adcode').val(data.adcode);
		$('#staffInfo_building').val(data.building);
		$('#staffInfo_address').val(data.address);
		$('#js-upload-staffPic').attr('imgid', data.pic);
		$("#showstaffInfo_staffTypes option[value='" + data.roleId + "']").prop("selected", true);
		$('#js-upload-healthCertificate').attr('imgid', data.healthCertificate);
		$('#js-upload-nursingCertificate').attr('imgid', data.nursingCertificate);
		$('.js-input-staffFullname').val(data.fullName);
		$('.js-input-staffNativePlace').val(data.nativeplace);
		$('.js-input-staffPhone').val(data.phone);
		$('.js-input-staffIdcard').val(data.idcard);
		$('.js-input-staffno').val(data.hgno);
		$('.js-input-careerStartTime').val(data.careerStartTime);
		$('.js-input-joinTime').val(data.joinTime);
		$('.js-input-emergencyContact').val(data.emergencyContact);
		$('.js-input-emergencyContactPhone').val(data.emergencyContactPhone);
		$("#staff_idcardExpiredDate").val(data.idcardExpiredDate);
		$("#staffInfo_province").val(data.province);
		$("#staffInfo_city").val(data.city);
		$("#staffInfo_county").val(data.district);
		$("#staff_select_branch").html(data.branchStr);
		$("#staff_superior").html(data.superiorFullName);
		$("#staff_superior").attr("hgId",data.superiorId);
		$("#staff_select_branch").attr("branch",JSON.stringify(branchsz(data.branchIds,data.branchStr)));
		
		$(data.language).each(function(i, e) {
			$("input[name=staffLanguage][value="+e+"]").prop('checked', true);
		});
		
		if(data.workType <= 2) {
			$("input[name=js-staff-radio-workType][value=" + data.workType + "]").prop('checked', true);
		} else {
			$("input[name=js-staff-radio-workType]").prop('checked', true);
		}
		
		if(data.idcardPicUrl){
			$("#js-upload-staffIdcard").siblings('div').html(insertImgintoDiv(data.idcardPicUrl));
			hideA_DivClickable($("#js-upload-staffIdcard"));
		}
		if(data.idcardPic2Url) {
			$("#js-upload-staffIdcard2").siblings('div').html(insertImgintoDiv(data.idcardPic2Url));
			hideA_DivClickable($("#js-upload-staffIdcard2"));
		}
		
		if(data.idcardPic3Url){
			$("#js-upload-staffIdcard3").siblings('div').html(insertImgintoDiv(data.idcardPic3Url));
			hideA_DivClickable($("#js-upload-staffIdcard3"));
		}
		if(data.picUrl) {
			$("#js-upload-staffPic").siblings('div').html(insertImgintoDiv(data.picUrl));
			hideA_DivClickable($("#js-upload-staffPic"));
		}
		
		if(data.healthCertificateUrl) {
			$('#js-upload-healthCertificate').siblings('div').html(insertImgintoDiv(data.healthCertificateUrl));
			hideA_DivClickable($("#js-upload-healthCertificate"));
		}
		
		if(data.nursingCertificateUrl) {
			$('#js-upload-nursingCertificate').siblings('div').html(insertImgintoDiv(data.nursingCertificateUrl));
			hideA_DivClickable($("#js-upload-nursingCertificate"));
		}
		if(data.roleList != undefined && data.roleList.length >0){
			$("#existRole").text(data.existRole);
			$("#existRole").show();
			var roleId = data.roleList[0].roleId;
			if(roleId == 10068){
				$("#staff_org").show();
				
			} else {
				$("#staff_org").hide();
			}
			
//			$("#showstaffInfo_staffTypes").find("option[text='"+roleIdCardInfo(data.roleList[0].roleId)+"']").attr("selected",true);
		} else {
			$("#existRole").text("");
			$("#existRole").show();
		}
		$("#showstaffInfo_staffTypes").hide();
		var param = {
		};
		//查询参数
		doHttp(param, '/adminjson/SAASGetCompanyOrgList').then(function(datas){
			var render = template.compile(list_tpl);
			var html = render(datas.body);
			$("#staff_org_sel").empty().append(html);
			$("#staff_org_sel option[value='"+data.orgId+"']").attr("selected",true); 
			
		});
		
		
	});
	initShowPanel_staff();
	
	return dtd.promise();
}

function hideA_DivClickable(element) {
	element.siblings('div').find('.uimg_item').off('click');
	element.siblings('div').on('click', '.uimg_item', function() {
		var uploadInputId = element.siblings('a').attr("uploadfor");
		$('#' + uploadInputId).click();
	});
	element.siblings('a').addClass('hidden');
}

function insertImgintoDiv(imgUrl) {
	return '<div class="uimg_item" style="display:inline-block;"> <img class="upload_img" src="' + imgUrl + '" width="200px" height="120px"></div>';
}

var getFormData = function() {
	var param = {
		//护士基本信息
		roleId: $("#showstaffInfo_staffTypes").val(),
		hgType: $("#showstaffInfo_staffTypes").val(),
		sex: $('input[name=js-radio-staffSex]:checked').val(),
		idcardpic: $('#js-upload-staffIdcard').attr('imgid'),
		idcardpic2: $('#js-upload-staffIdcard2').attr('imgid'),
		idcardpic3: $('#js-upload-staffIdcard3').attr('imgid'),
		nation: $('#staff_nation').attr('nation'),
		adcode: $('#staffInfo_adcode').val(),
		building: $('#staffInfo_building').val(),
		address: $('#staffInfo_address').val(),
		pic: $('#js-upload-staffPic').attr('imgid'),
		healthCertificate: $('#js-upload-healthCertificate').attr('imgid'),
		nursingCertificate: $('#js-upload-nursingCertificate').attr('imgid'),
		fullName: $('.js-input-staffFullname').val(),
		nativeplace: $('.js-input-staffNativePlace').val(),
		phone: $('.js-input-staffPhone').val(),
		idcard: $('.js-input-staffIdcard').val(),
		hgno: $('.js-input-staffno').val(),
		careerStartTime: $('.js-input-careerStartTime').val(),
		joinTime: $('.js-input-joinTime').val(),
		emergencyContact: $('.js-input-emergencyContact').val(),
		emergencyContactPhone: $('.js-input-emergencyContactPhone').val(),
		idcardExpiredDate: $("#staff_idcardExpiredDate").val(),
		province: $("#staffInfo_province").val(),
		city: $("#staffInfo_city").val(),
		county: $("#staffInfo_county").val(),
		superiorId : $("#staff_superior").attr("hgId"),
		orgId : $("#staff_org_sel").val()
	};
	if(ids >0){
		param.id = ids;
	}
	param.branchIds = [];
	var branchArrayStr = $('#staff_select_branch').attr('branch');
	$(eval(branchArrayStr)).each(function(i, e) {
		param.branchIds.push(e.branchId);
	});
	param.language = [];
	$('input[name=staffLanguage]:checked').each(function(i, e) {
		param.language.push($(e).val());
	});
	param.workType = 0;
	var eleSelector = $('input[name=js-staff-radio-workType]:checked');
	console.log(333);
	if(eleSelector.length > 1)
		param.workType = 3;
	else param.workType = $('input[name=js-staff-radio-workType]:checked').val();
	$(param).each(function(i, e){
		if(e == undefined || e == ''){
			Toast.error('请填写完整信息!');
			return;			
		}
	});	
	return param;
};

function G_Fun_showAddstaffPanel() {
	dtd = $.Deferred();
	ids = 0;
	initShowPanel_staff();
	getRoleList();
	buildOrgList();
	return dtd.promise();
}

var getRoleListHtml = function (data) {
	var detailList = data.roleList;
	var result = "<option value='0'>请选择员工类型</option>";
	for (var i = 0; i < detailList.length; i++) {
		var content = detailList[i].content;
		if(detailList[i].roleId!=10000){
			result += "<option value='" + detailList[i].roleId + "'>" + detailList[i].roleName + "</option>";
		}
	}
	return result;
}

function getRoleList() {
	doHttp({pageSize:999}, '/adminjson/SAASGetRoleList').then(function(result){
		var roleListHtml = getRoleListHtml(result.body);
		$("#showstaffInfo_staffTypes").empty().html(roleListHtml);
	});
}

function initShowPanel_staff() {
	$("#panel_add_staff").remove();
	var panel = new RPModalPanel("panel_add_staff", rp_addstaffPanelHtml);
	panel.show();
	$(".datetimepicker").remove();
	$(".amap-sug-result").remove();
	
	panel.find(".form_date").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

	G_Util.initMapUtil('staffInfo_');
	panel.find(".js-btn-savestaffInfo").off('click').on('click', function() {
		doHttp(getFormData(), '/adminjson/SAASSaveOrUpdateHGInfo').then(function(result) {
			Toast.success('操作成功!');
			dtd.resolve(result);
			panel.hide();
		});
	})
}

//处理身份证信息
var parseIdCardInfo = function(imgId, side) {
	G_Util.getIdCardInfo(imgId, side).then(function(result) {
		if(result.errorCode == 0) {
			if(result.body) {
				var dd = result.body;
				if(dd.idcard) { //正面
					$(' .js-input-staffFullname').val(dd.fullName);
					$('input[name=js-radio-staffSex][value=' + dd.sex + ']').prop('checked', true);
					$('.js-input-staffIdcard').val(dd.idcard);
					$('.js-input-staffNativePlace').val(dd.nativeplace);
					$('#staff_nation').attr('nation', dd.nation + '族');
					$('#staff_nation').html(dd.nation + '族');
				} else if(dd.idcardExpiredDate) { //反面
					$("#staff_idcardExpiredDate").val(dd.idcardExpiredDate);
				}
			}
		} else {
			Toast.error("身份证识别异常请重新上传");
		}
	});
}

//图片上传逻辑处理
$('body').off('click','#panel_add_staff .js-upload-file-input').on('click', '#panel_add_staff .js-upload-file-input', function() {
	var inputEl = $(this);
	var elementId = $(this).attr("id");
	var wrapperElId = inputEl.attr("wrapperEl");
	top.importOnceJS('js-script-hg',"js/app/fun.js");
	uploadImg($('input.js-upload-file-input'),'show').then(function(data) {
		//添加图片
		let wrapperEl=$("#"+wrapperElId);
		wrapperEl.children('.uimg_item').remove();
		var tmp = [];
	    tmp.push("<div class='uimg_item' style='display:inline-block;'>");
	    tmp.push(" <img class='upload_img' src='" + data.imgUrl + "' ");
	    if(wrapperEl.attr("imgwidth")){
	    	 tmp.push(" width='" + wrapperEl.attr("imgwidth") + "'");
	    }
	    if(wrapperEl.attr("imgheight")){
	    	 tmp.push(" height='" + wrapperEl.attr("imgheight") + "'");
	    }
	    tmp.push(" '>");
	    tmp.push("</div>");
	    wrapperEl.append(tmp.join(''));
		var imgId = data["imageId"];
		inputEl.attr("imgId", data["imageId"]);
		var elName = inputEl.attr('name');
		if(elName == 'js-upload-staffIdcard' || elName == 'js-upload-staffIdcard2') {
			var side = 1;
			if(elName == 'js-upload-staffIdcard2') {
				side = 2;
			}
			parseIdCardInfo(imgId, side);
		}
		inputEl.siblings('a').addClass('hidden');
	});
});

$('body').on('click', '#panel_add_staff .js-btn-uploadpic', function() {
	var item = $(this);
	item.siblings('div').find('.uimg_item').off('click');
	item.siblings('div').on('click', '.uimg_item', function() {
		var uploadInputId = item.attr("uploadfor");
		$('#' + uploadInputId).click();
	});
	var uploadInputId = item.attr("uploadfor");
	$('#' + uploadInputId).click();
});
$('body').on("change", "#showstaffInfo_staffTypes", function(){
	if($(this).val() == 10068){
		$("#staff_org").show();
	}else {
		$("#staff_org").hide();
	}
});


var roleIdCardInfo = function(roleId) {
	var roleReturn = 3;
	if (roleId == 10001) {
		roleReturn = 1;
	} else if (roleId == 10002) {
		roleReturn = 2;
	} else if (roleId == 10003) {
		roleReturn = 3;
	} else if (roleId == 10007) {
		roleReturn = 4;
	} else if (roleId == 10004) {
		roleReturn = 5;
	} else if (roleId == 10003) {
		roleReturn = 6;
	} else if (roleId == 10005) {
		roleReturn = 7;
	}
	return roleReturn;
}

function branchsz(branchId ,branchName){
	var branchArray = [];
	console.log("branchName:" + branchName);
	var name = branchName.split(",");
	$.each(name, function(index,obj){
		var objs = {};
		objs['branchId'] = obj;
		objs['branchName'] = name[index];
		branchArray.push(objs);
	});
	console.log(666);
	return branchArray;
}
var list_tpl = "{{if orgList.length > 0}}"+ 
"<option value=''>请选择项目点</option>"+ 
"{{each orgList as item i}}"+ 
"<option value='{{item.id}}'>{{item.orgName}}</option>"+ 
"{{/each}} {{/if}} {{if orgList.length == 0}}"+ 
"<option value=''>无项目点</option>"+ 
"{{/if}}";

function buildOrgList() {
	console.log("sssssssssss");
	var param = {
	};
	//查询参数
	
	doHttp(param, '/adminjson/SAASGetCompanyOrgList').then(function(data){
		var render = template.compile(list_tpl);
		var html = render(data.body);
		$("#staff_org_sel").empty().append(html);
		console.log("sssssssssss1");
	});
	
	
}

