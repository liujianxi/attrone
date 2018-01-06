var rp_addnursePanelHtml = '<div id="panel_add_nurse" class="r_panel">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">护士信息</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="nurse_input_form">' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">基本信息</p>' +
	'              </div>' +

	'               <div class="form-group">' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-nurseIdcard" id="js-upload-nurseIdcard" wrapperEl="nurseIdcard_wrapper">' +
	'                         <div id="nurseIdcard_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-nurseIdcard">+上传身份证正面照</a>' +
	'					  </div>' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-nurseIdcard2" id="js-upload-nurseIdcard2" wrapperEl="nurseIdcard2_wrapper">' +
	'                         <div id="nurseIdcard2_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'						  <input type="hidden" id="nurse_idcardExpiredDate">' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-nurseIdcard2">+上传身份证反面照</a>' +
	'					  </div>' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-nurseIdcard3" id="js-upload-nurseIdcard3" wrapperEl="nurseIdcard3_wrapper">' +
	'                         <div id="nurseIdcard3_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-nurseIdcard3">+上传手持身份证照</a>' +
	'					  </div>' +
	'               </div>' +
	
	'               <div class="form-group">' +
	'                     <div class="col-sm-6" style="color: red;">图片最大3M，支持的格式有 jpg, png, jpeg, bmp</div>' +
	'               </div>' +
	
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>姓名:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入姓名"  class="form-control js-input-nurseFullname">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>性别:</label>' +
	'                     <div class="radio-list">' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-nurseSex" value="1"> 男</div></label>' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-nurseSex" value="2"> 女</div></label>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">民族:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="nurse_nation" class="js-select-nation">请选择民族</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">籍贯:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入籍贯"  class="form-control js-input-nurseNativePlace">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>手机号:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入电话"  class="form-control js-input-nursePhone" >' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">居住地址:</label>' +
	'                     <div class="col-sm-5">' +
	'						<input type="hidden" name=lng id="nurseInfo_lng" />' +
	'                       <input type="hidden" name="lat" id="nurseInfo_lat" />' +
	'                       <input type="hidden" name="adcode" id="nurseInfo_adcode" />' +
	'                       <input type="hidden" name="provinceID" id="nurseInfo_provinceID" />' +
	'                       <input type="hidden" name="cityID" id="nurseInfo_cityID" />' +
	'                       <input type="hidden" name="district" id="nurseInfo_district" />' +
	'                       <input type="hidden" name="district" id="nurseInfo_address" />' +
	'                       <input type="hidden" name="province" id="nurseInfo_province" />' +
	'                       <input type="hidden" name="city" id="nurseInfo_city" />' +
	'                       <input type="hidden" name="county" id="nurseInfo_county" />' +
	'                        <input placeholder="请输入居住地址" id="nurseInfo_building"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                    <label class="col-sm-3 control-label">通晓语言:</label>' +
	'                    <div class="col-sm-7 js-checkboxgroup-language">' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="nurseLanguage" value="1">普通话</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="nurseLanguage" value="2">粤语</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="nurseLanguage" value="3">客家</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="nurseLanguage" value="4">潮汕</label>' +
	'                    </div>' +
	'                </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">身份证:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入身份证号"  class="form-control js-input-nurseIdcard" >' +
	'                     </div>' +
	'               </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">个人照片:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-nursePic" id="js-upload-nursePic" wrapperEl="nursePic_wrapper">' +
	'                         <div id="nursePic_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-nursePic">上传个人照片</a>' +
	'                     </div>' +
	'                 </div>' +

	'              <div class="form-group">' +
	'                  <p class="rp_subtit">工作信息</p>' +
	'              </div>' +
	'            	<div class="form-group">' +
	'                    <label class="col-sm-3 control-label"><span class="form-required">*</span>工号:</label>' +
	'                    <div class="col-sm-5">' +
	'                        <input type="text" class="form-control js-input-nurseno" placeholder="请输入员工工号">' +
	'                    </div>' +
	'               </div>' +
	
//	'              <div class="form-group">' +
//	'                     <label class="col-sm-3 control-label">关联科室:</label>' +
//	'                     <div class="col-sm-5" style="padding-top:6px;">' +
//	'                         <a href="#" id="nurse_select_branch" class="js-select-branch">请选择科室</a>' +
//	'                     </div>' +
//	'               </div>' +
					
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">直属上级:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="nurse_superior" class="js-select-superior_nurse">请选择上级</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group hidden">' +
	'                     <label class="col-sm-3 control-label">护士类型:</label>' +
	'                     <div class="radio-list">' +
	'                      <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-nurseType" value="2" checked > 护士</div></label> ' +
	'                     		<!--<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-nurseType" value="1" checked> 护工</div></label>-->' +
	'                     </div>' +
	'               </div>' +
//	'               <div class="form-group">' +
//	'                     <label class="col-sm-3 control-label">服务类型:</label>' +
//	'                     <div class="col-sm-5">' +
//	'                        <label class="checkbox-inline"><input type="checkbox" name="js-radio-workType" value="1">多陪</label>' +
//	'                        <label class="checkbox-inline"><input type="checkbox" name="js-radio-workType" value="2">专陪</label>' +
//	'                     </div>' +
//	'               </div>' +
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
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>健康证:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-healthCertificate" id="js-upload-healthCertificate" wrapperEl="healthCertificate_wrapper">' +
	'                         <div id="healthCertificate_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-healthCertificate">上传健康证照片</a>' +
	'                     </div>' +
	'                 </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>从业资格证:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-nursingCertificate" id="js-upload-nursingCertificate" wrapperEl="nursingCertificate_wrapper">' +
	'                         <div id="nursingCertificate_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-nursingCertificate">上传从业资格证照片</a>' +
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
	'                   <button type="button" class="btn btn-sm btn-success js-btn-savenurseInfo">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';

var ids;
var dtd = $.Deferred();
function G_Fun_shownurseInfoPanel(id) {
	dtd = $.Deferred();
	ids = id;
	doHttp({
		id: id
		}, '/adminjson/SAASGetHGInfo').then(function(result) {
		var data = result.body;
		$('input[name=js-radio-nurseSex][value=' + data.sex + ']').prop('checked', true);
		//		hgType : $('input[name=js-radio-hgType]:checked').val(),
		$('#js-upload-nurseIdcard').attr('imgid', data.idcardpic);
		$('#js-upload-nurseIdcard2').attr('imgid', data.idcardpic2);
		$('#js-upload-nurseIdcard3').attr('imgid', data.idcardpic3);
		$('#nurse__nation').attr('nation', data.nation);
		$('#nurse_nation').html(data.nation);
		$('#nurseInfo_adcode').val(data.adcode);
		$('#nurseInfo_building').val(data.building);
		$('#nurseInfo_address').val(data.address);
		$('#js-upload-nursePic').attr('imgid', data.pic);
		$('#js-upload-healthCertificate').attr('imgid', data.healthCertificate);
		$('#js-upload-nursingCertificate').attr('imgid', data.nursingCertificate);
		$('.js-input-nurseFullname').val(data.fullName);
		$('.js-input-nurseNativePlace').val(data.nativeplace);
		$('.js-input-nursePhone').val(data.phone);
		$('.js-input-nurseIdcard').val(data.idcard);
		$('.js-input-nurseno').val(data.hgno);
		$('.js-input-careerStartTime').val(data.careerStartTime);
		$('.js-input-joinTime').val(data.joinTime);
		$('.js-input-emergencyContact').val(data.emergencyContact);
		$('.js-input-emergencyContactPhone').val(data.emergencyContactPhone);
		$("#nurse_idcardExpiredDate").val(data.idcardExpiredDate);
		$("#nurseInfo_province").val(data.province);
		$("#nurseInfo_city").val(data.city);
		$("#nurseInfo_county").val(data.district);
		$("#nurse_select_branch").html(data.branchStr);
		$("#nurse_select_branch").attr("branch",JSON.stringify(branchsz(data.branchIds,data.branchStr)));
		if(data.superiorFullName){
			$("#nurse_superior").html(data.superiorFullName);
		}
		if(data.superiorId.length){
			$("#nurse_superior").attr("hgId",data.superiorId);
		}
		$(data.language).each(function(i, e) {
			$("input[name=nurseLanguage][value="+e+"]").prop('checked', true);
		});
		if(data.workType <= 2) {
			$("input[name=js-radio-workType][value=" + data.workType + "]").prop('checked', true);
		} else {
			$("input[name=js-radio-workType]").prop('checked', true);
		}
		if(data.idcardPicUrl){
			$("#js-upload-nurseIdcard").siblings('div').html(insertImgintoDiv(data.idcardPicUrl));
			hideA_DivClickable($("#js-upload-nurseIdcard"));
		}
		if(data.idcardPic2Url) {
			$("#js-upload-nurseIdcard2").siblings('div').html(insertImgintoDiv(data.idcardPic2Url));
			hideA_DivClickable($("#js-upload-nurseIdcard2"));
		}
		if(data.idcardPic3Url){
			$("#js-upload-nurseIdcard3").siblings('div').html(insertImgintoDiv(data.idcardPic3Url));
			hideA_DivClickable($("#js-upload-nurseIdcard3"));
		}
		if(data.picUrl) {
			$("#js-upload-nursePic").siblings('div').html(insertImgintoDiv(data.picUrl));
			hideA_DivClickable($("#js-upload-nursePic"));
		}
		
		if(data.healthCertificateUrl) {
			$('#js-upload-healthCertificate').siblings('div').html(insertImgintoDiv(data.healthCertificateUrl));
			hideA_DivClickable($("#js-upload-healthCertificate"));
		}
		
		if(data.nursingCertificateUrl) {
			$('#js-upload-nursingCertificate').siblings('div').html(insertImgintoDiv(data.nursingCertificateUrl));
			hideA_DivClickable($("#js-upload-nursingCertificate"));
		}
		
	});
	initShowPanel_nurse();
	
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
		sex: $('input[name=js-radio-nurseSex]:checked').val(),
		hgType: $('input[name=js-radio-nurseType]:checked').val(),
		idcardpic: $('#js-upload-nurseIdcard').attr('imgid'),
		idcardpic2: $('#js-upload-nurseIdcard2').attr('imgid'),
		idcardpic3: $('#js-upload-nurseIdcard3').attr('imgid'),
		nation: $('#nurse_nation').attr('nation'),
		adcode: $('#nurseInfo_adcode').val(),
		building: $('#nurseInfo_building').val(),
		address: $('#nurseInfo_address').val(),
		pic: $('#js-upload-nursePic').attr('imgid'),
		healthCertificate: $('#js-upload-healthCertificate').attr('imgid'),
		nursingCertificate: $('#js-upload-nursingCertificate').attr('imgid'),
		fullName: $('.js-input-nurseFullname').val(),
		nativeplace: $('.js-input-nurseNativePlace').val(),
		phone: $('.js-input-nursePhone').val(),
		idcard: $('.js-input-nurseIdcard').val(),
		hgno: $('.js-input-nurseno').val(),
		careerStartTime: $('.js-input-careerStartTime').val(),
		joinTime: $('.js-input-joinTime').val(),
		emergencyContact: $('.js-input-emergencyContact').val(),
		emergencyContactPhone: $('.js-input-emergencyContactPhone').val(),
		idcardExpiredDate: $("#nurse_idcardExpiredDate").val(),
		province: $("#nurseInfo_province").val(),
		city: $("#nurseInfo_city").val(),
		county: $("#nurseInfo_county").val()
	};
	if(ids >0){
		param.id = ids;
	}
	param.superiorId = [];
	var superiorStr = $('#nurse_superior').attr('hgId');
	param.superiorId.push(superiorStr);
//	param.branchIds = [];
//	var branchArrayStr = $('#nurse_select_branch').attr('branch');
//	$(eval(branchArrayStr)).each(function(i, e) {
//		param.branchIds.push(e.branchId);
//	});
	param.language = [];
	$('input[name=nurseLanguage]:checked').each(function(i, e) {
		param.language.push($(e).val());
	});
	param.workType = 0;
	var eleSelector = $('input[name=js-radio-workType]:checked');
	if(eleSelector.length > 1)
		param.workType = 3;
	else param.workType = $('input[name=js-radio-workType]:checked').val();
	$(param).each(function(i, e){
		if(e == undefined || e == ''){
			Toast.error('请填写完整信息!');
			return;			
		}
	});	
	return param;
};

function G_Fun_showAddnursePanel() {
	dtd = $.Deferred();
	ids = 0;
	initShowPanel_nurse();
	
	return dtd.promise();
}

function initShowPanel_nurse() {
	console.log('nurse+.......');
	$("#panel_add_nurse").remove();
	var panel = new RPModalPanel("panel_add_nurse", rp_addnursePanelHtml);
	panel.show();
	$(".datetimepicker").remove();
	$(".amap-sug-result").remove();
	
	panel.find(".form_date").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});

	G_Util.initMapUtil('nurseInfo_');
	panel.find(".js-btn-savenurseInfo").off('click').on('click', function() {
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
					$(' .js-input-nurseFullname').val(dd.fullName);
					$('input[name=js-radio-nurseSex][value=' + dd.sex + ']').prop('checked', true);
					$('.js-input-nurseIdcard').val(dd.idcard);
					$('.js-input-nurseNativePlace').val(dd.nativeplace);
					$('#nurse_nation').attr('nation', dd.nation + '族');
					$('#nurse_nation').html(dd.nation + '族');
				} else if(dd.idcardExpiredDate) { //反面
					$("#nurse_idcardExpiredDate").val(dd.idcardExpiredDate);
				}
			}
		} else {
			Toast.error("身份证识别异常请重新上传");
		}
	});
}

//图片上传逻辑处理
$('body').off('click','#panel_add_nurse .js-upload-file-input').on('click', '#panel_add_nurse .js-upload-file-input', function() {
	var inputEl = $(this);
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
		if(elName == 'js-upload-nurseIdcard' || elName == 'js-upload-nurseIdcard2') {
			var side = 1;
			if(elName == 'js-upload-nurseIdcard2') {
				side = 2;
			}
			parseIdCardInfo(imgId, side);
		}
		inputEl.siblings('a').addClass('hidden');
	});
});

$('body').on('click', '#panel_add_nurse .js-btn-uploadpic', function() {
	var item = $(this);
	item.siblings('div').find('.uimg_item').off('click');
	item.siblings('div').on('click', '.uimg_item', function() {
		var uploadInputId = item.attr("uploadfor");
		$('#' + uploadInputId).click();
	});
	var uploadInputId = item.attr("uploadfor");
	$('#' + uploadInputId).click();
});





//绑定，选择直属上级
$("body").on('click',"#panel_add_nurse .js-select-superior_nurse", function(){
	top.importOnceJS('js-select-superior_nurse',"js/app/modal/select_superior.js");
	var elem = $(this);
	var branchIds = $("#panel_add_nurse .js-select-branch").attr("branch");
	var param = {};
	console.log($("#panel_add_nurse .js-select-branch"));
	param["roleId"] = 10004;
//	param.branchIds = [];
//	var branchArrayStr = $('#nurse_select_branch').attr('branch');
//	$(eval(branchArrayStr)).each(function(i, e) {
//		param.branchIds.push(e.branchId);
//	});
	top.G_Fun_showSuperiorHandlePanel(param).then(function(data){
		console.log("data:" + JSON.stringify(data));
		elem.html(data.hgName);
		elem.attr('hgId',data.hgId);
	});
});



function branchsz(branchId ,branchName){
	var branchArray = [];
	var Name = branchName.split(",");
	$.each(branchId,function(index,obj){
		var objs = {};
		objs['branchId'] = obj;
		objs['branchName'] = Name[index];
		branchArray.push(objs);
	});
	
	return branchArray;
}