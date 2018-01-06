var rp_addHGPanelHtml = '<div id="panel_add_hg" class="r_panel">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">护工信息</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="hg_input_form">' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">基本信息</p>' +
	'              </div>' +

	'               <div class="form-group">' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-hgIdcard" id="js-upload-hgIdcard" wrapperEl="hgIdcard_wrapper">' +
	'                         <div id="hgIdcard_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-hgIdcard">+上传身份证正面照</a>' +
	'					  </div>' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-hgIdcard2" id="js-upload-hgIdcard2" wrapperEl="hgIdcard2_wrapper">' +
	'                         <div id="hgIdcard2_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'						  <input type="hidden" id="hg_idcardExpiredDate">' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-hgIdcard2">+上传身份证反面照</a>' +
	'					  </div>' +
	'                     <div style="border:1px solid #ccc;width: 200px;height: 120px;line-height:120px;float: left;margin-left:10px;text-align:center">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-hgIdcard3" id="js-upload-hgIdcard3" wrapperEl="hgIdcard3_wrapper">' +
	'                         <div id="hgIdcard3_wrapper" imgwidth="200px" imgheight="120px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-hgIdcard3">+上传手持身份证照</a>' +
	'					  </div>' +
	'               </div>' +
	
	'               <div class="form-group">' +
	'                     <div class="col-sm-6" style="color: red;">图片最大3M，支持的格式有 jpg, png, jpeg, bmp</div>' +
	'               </div>' +
	
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>姓名:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入姓名"  class="form-control js-input-hgFullname">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>性别:</label>' +
	'                     <div class="radio-list">' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-hgSex" value="1"> 男</div></label>' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-hgSex" value="2"> 女</div></label>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">民族:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="hg_nation" class="js-select-nation">请选择民族</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">籍贯:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入籍贯"  class="form-control js-input-hgNativePlace">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>手机号:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入电话"  class="form-control js-input-hgPhone" >' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">居住地址:</label>' +
	'                     <div class="col-sm-5">' +
	'						<input type="hidden" name=lng id="hgInfo_lng" />' +
	'                       <input type="hidden" name="lat" id="hgInfo_lat" />' +
	'                       <input type="hidden" name="adcode" id="hgInfo_adcode" />' +
	'                       <input type="hidden" name="provinceID" id="hgInfo_provinceID" />' +
	'                       <input type="hidden" name="cityID" id="hgInfo_cityID" />' +
	'                       <input type="hidden" name="district" id="hgInfo_district" />' +
	'                       <input type="hidden" name="district" id="hgInfo_address" />' +
	'                       <input type="hidden" name="province" id="hgInfo_province" />' +
	'                       <input type="hidden" name="city" id="hgInfo_city" />' +
	'                       <input type="hidden" name="county" id="hgInfo_county" />' +
	'                        <input placeholder="请输入居住地址" id="hgInfo_building"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                    <label class="col-sm-3 control-label">通晓语言:</label>' +
	'                    <div class="col-sm-7 js-checkboxgroup-language">' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="hgLanguage" value="1">普通话</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="hgLanguage" value="2">粤语</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="hgLanguage" value="3">客家</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="hgLanguage" value="4">潮汕</label>' +
	'                    </div>' +
	'                </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>身份证:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入身份证号"  class="form-control js-input-hgIdcard" >' +
	'                     </div>' +
	'               </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">个人照片:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-hgPic" id="js-upload-hgPic" wrapperEl="hgPic_wrapper">' +
	'                         <div id="hgPic_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-hgPic">上传个人照片</a>' +
	'                     </div>' +
	'                 </div>' +

	'              <div class="form-group">' +
	'                  <p class="rp_subtit">工作信息</p>' +
	'              </div>' +
	'            	<div class="form-group">' +
	'                    <label class="col-sm-3 control-label"><span class="form-required">*</span>工号:</label>' +
	'                    <div class="col-sm-5">' +
	'                        <input type="text" class="form-control js-input-hgno" placeholder="请输入员工工号">' +
	'                    </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">关联科室:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="hg_select_branch" class="js-select-branch">请选择科室</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">直属上级:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <a href="#" id="hg_superior" class="js-select-superior_hg">请选择上级</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group hidden">' +
	'                     <label class="col-sm-3 control-label">护工类型:</label>' +
	'                     <div class="radio-list">' +
	'                     	<!-- <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-hgType" value="2"> 护士</div></label> -->' +
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="js-radio-hgType" value="1" checked> 护工</div></label>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">服务类型:</label>' +
	'                     <div class="col-sm-6">' +
	'                        <label class="checkbox-inline"><input type="radio" name="js-radio-workType" value="0">居家护工</label>' +
	'                        <label class="checkbox-inline"><input type="radio" name="js-radio-workType" value="1">机构多陪</label>' +
	'                        <label class="checkbox-inline"><input type="radio" name="js-radio-workType" value="2">机构专陪</label>' +
	'                     </div>' +
	'               </div>' +
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
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>护理证:</label>' +
	'                     <div class="col-sm-5" style="padding-top:6px;">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" multiple="multiple" name="js-upload-nursingCertificate" id="js-upload-nursingCertificate" wrapperEl="nursingCertificate_wrapper">' +
	'                         <div id="nursingCertificate_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-nursingCertificate">上传护理证照片</a>' +
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
	'                   <button type="button" class="btn btn-sm btn-success js-btn-saveHGInfo">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';



var ids;
var dtd = $.Deferred();
function G_Fun_showHGInfoPanel(id) {
	dtd = $.Deferred();
	ids = id;
	doHttp({
		id: id
	}, '/adminjson/SAASGetHGInfo').then(function(result) {
		var data = result.body;
		$('input[name=js-radio-hgSex][value=' + data.sex + ']').prop('checked', true);
		//		hgType : $('input[name=js-radio-hgType]:checked').val(),
		$('#js-upload-hgIdcard').attr('imgid', data.idcardpic);
		$('#js-upload-hgIdcard2').attr('imgid', data.idcardpic2);
		$('#js-upload-hgIdcard3').attr('imgid', data.idcardpic3);
		$('#hg_nation').attr('nation', data.nation);
		$('#hg_nation').html(data.nation);
		$('#hgInfo_adcode').val(data.adcode);
		$('#hgInfo_building').val(data.building);
		$('#hgInfo_address').val(data.address);
		$('#js-upload-hgPic').attr('imgid', data.pic);
		$('#js-upload-healthCertificate').attr('imgid', data.healthCertificate);
		$('#js-upload-nursingCertificate').attr('imgid', data.nursingCertificate);
		$('.js-input-hgFullname').val(data.fullName);
		$('.js-input-hgNativePlace').val(data.nativeplace);
		$('.js-input-hgPhone').val(data.phone);
		$('.js-input-hgIdcard').val(data.idcard);
		$('.js-input-hgno').val(data.hgno);
		$('.js-input-careerStartTime').val(data.careerStartTime);
		$('.js-input-joinTime').val(data.joinTime);
		$('.js-input-emergencyContact').val(data.emergencyContact);
		$('.js-input-emergencyContactPhone').val(data.emergencyContactPhone);
		$("#hg_idcardExpiredDate").val(data.idcardExpiredDate);
		$("#hgInfo_province").val(data.province);
		$("#hgInfo_city").val(data.city);
		$("#hgInfo_county").val(data.district);
		$("#hg_select_branch").html(data.branchStr);
		$("#hg_select_branch").attr("branch",JSON.stringify(branchsz(data.branchIds,data.branchStr)));
		if(data.superiorFullName!=''){
			$("#hg_superior").html(data.superiorFullName);
		}
		$("#hg_superior").attr("hgId",data.superiorId);
		$(data.language).each(function(i, e) {
			$("input[name=hgLanguage][value="+e+"]").prop('checked', true);
		});
		if(data.workType <= 2) {
			$("input[name=js-radio-workType][value=" + data.workType + "]").prop('checked', true);
		} else {
			$("input[name=js-radio-workType]").prop('checked', true);
		}
		if(data.idcardPicUrl){
			$("#js-upload-hgIdcard").siblings('div').html(insertImgintoDiv(data.idcardPicUrl));
			hideA_DivClickable($("#js-upload-hgIdcard"));
		}
		if(data.idcardPic2Url) {
			$("#js-upload-hgIdcard2").siblings('div').html(insertImgintoDiv(data.idcardPic2Url));
			hideA_DivClickable($("#js-upload-hgIdcard2"));
		}
		if(data.idcardPic3Url){
			$("#js-upload-hgIdcard3").siblings('div').html(insertImgintoDiv(data.idcardPic3Url));
			hideA_DivClickable($("#js-upload-hgIdcard3"));
		}
		if(data.picUrl) {
			$("#js-upload-hgPic").siblings('div').html(insertImgintoDiv(data.picUrl));
			hideA_DivClickable($("#js-upload-hgPic"));
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
	initShowPanel_hg();
	
	
	return dtd.promise();
}
var ids;
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
		//护工基本信息
		sex: $('input[name=js-radio-hgSex]:checked').val(),
		hgType: $('input[name=js-radio-hgType]:checked').val(),
		idcardpic: $('#js-upload-hgIdcard').attr('imgid'),
		idcardpic2: $('#js-upload-hgIdcard2').attr('imgid'),
		idcardpic3: $('#js-upload-hgIdcard3').attr('imgid'),
		nation: $('#hg_nation').attr('nation'),
		adcode: $('#hgInfo_adcode').val(),
		building: $('#hgInfo_building').val(),
		address: $('#hgInfo_address').val(),
		pic: $('#js-upload-hgPic').attr('imgid'),
		healthCertificate: $('#js-upload-healthCertificate').attr('imgid'),
		nursingCertificate: $('#js-upload-nursingCertificate').attr('imgid'),
		fullName: $('.js-input-hgFullname').val(),
		nativeplace: $('.js-input-hgNativePlace').val(),
		phone: $('.js-input-hgPhone').val(),
		idcard: $('.js-input-hgIdcard').val(),
		hgno: $('.js-input-hgno').val(),
		careerStartTime: $('.js-input-careerStartTime').val(),
		joinTime: $('.js-input-joinTime').val(),
		emergencyContact: $('.js-input-emergencyContact').val(),
		emergencyContactPhone: $('.js-input-emergencyContactPhone').val(),
		idcardExpiredDate: $("#hg_idcardExpiredDate").val(),
		province: $("#hgInfo_province").val(),
		city: $("#hgInfo_city").val(),
		county: $("#hgInfo_county").val()
//		superiorId : $("#hg_superior").attr("hgId")
	};
	if(ids >0){
		param.id = ids;
	}
	param.branchIds = [];
	var branchArrayStr = $('#hg_select_branch').attr('branch');
	$(eval(branchArrayStr)).each(function(i, e) {
		param.branchIds.push(e.branchId);
	});
	param.language = [];
	$('input[name=hgLanguage]:checked').each(function(i, e) {
		param.language.push($(e).val());
	});
	param.superiorId = [];
	var superiorStr = $('#hg_superior').attr('hgId').split(',');
	superiorStr.forEach((item,index)=>{
		param.superiorId.push(item);
	})
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

function G_Fun_showAddHGPanel() {
	dtd = $.Deferred();
	ids = 0;
	initShowPanel_hg();

	return dtd.promise();
}

function initShowPanel_hg() {
	$("#panel_add_hg").remove();
	var panels = new RPModalPanel("panel_add_hg", rp_addHGPanelHtml);
	panels.show();
	$(".datetimepicker").remove();
	$(".amap-sug-result").remove();
	
	panels.find(".form_date").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});
	console.log('hg+.......');
	G_Util.initMapUtil('hgInfo_');
	panels.find(".js-btn-saveHGInfo").off('click').on('click', function() {
		doHttp(getFormData(), '/adminjson/SAASSaveOrUpdateHGInfo').then(function(result) {
			Toast.success('操作成功!');
			dtd.resolve(result);
			panels.hide();
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
					$('.js-input-hgFullname').val(dd.fullName);
					$('input[name=js-radio-hgSex][value=' + dd.sex + ']').prop('checked', true);
					$('.js-input-hgIdcard').val(dd.idcard);
					$('.js-input-hgNativePlace').val(dd.nativeplace);
					$('#hg_nation').attr('nation', dd.nation + '族');
					$('#hg_nation').html(dd.nation + '族');
				} else if(dd.idcardExpiredDate) { //反面
					$("#hg_idcardExpiredDate").val(dd.idcardExpiredDate);
				}
			}
		} else {
			Toast.error("身份证识别异常请重新上传");
		}
	});
}

//图片上传逻辑处理
$('body').off('click','#panel_add_hg .js-upload-file-input').on('click', '#panel_add_hg .js-upload-file-input', function() {
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
		if(elName == 'js-upload-hgIdcard' || elName == 'js-upload-hgIdcard2') {
			var side = 1;
			if(elName == 'js-upload-hgIdcard2') {
				side = 2;
			}
			parseIdCardInfo(imgId, side);
		}
		inputEl.siblings('a').addClass('hidden');
	});
});

$('body').on('click', '#panel_add_hg .js-btn-uploadpic', function() {
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
$("body").on('click',".js-select-superior_hg", function(){
	top.importOnceJS('js-select-superior_hg',"js/app/modal/select_superior.js");
	var elem = $(this);
	var branchIds = $("#panel_add_hg .js-select-branch").attr("branch");
	var workType = $("input[name='js-radio-workType']:checked").val();
	var param = {};
	console.log($("#panel_add_hg .js-select-branch"));
	console.log("workType:" + workType);
	if((branchIds == undefined || branchIds == '' || branchIds == null || branchIds == '[]') && workType == 0){
		param["roleId"] = 10003;
	}else{
		param["roleId"] = 10006;
	}
	param.branchIds = [];
	var branchArrayStr = $('#hg_select_branch').attr('branch');
	$(eval(branchArrayStr)).each(function(i, e) {
		param.branchIds.push(e.branchId);
	});
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

function superiorsz(superiorId ,superiorName){
	var superiorArray = [];
	var Name = superiorName.split(",");
	$.each(superiorId,function(index,obj){
		var objs = {};
		objs['hgId'] = obj;
		objs['hgName'] = Name[index];
		superiorArray.push(objs);
	});
	return superiorArray;
}