
	var rp_addHGPanelHtml = '<div id="kf_insure_access" class="r_panel">'+
	'    <div class="panel-header">'+
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
	'        <h4 class="modal-title">客服评估</h4>'+
	'    </div>'+
	'    <div class="panel-body">'+
	'        <div class="container-fluid">'+
	'            <form class="form-horizontal" role="form" id="kinsfolk_input_form">'+
	'              <div class="form-group">'+
	'                  <p class="rp_subtit">申请人信息</p>'+
	'              </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">姓名:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input placeholder="请输入姓名" id="kinsfolk_fullName"  class="form-control js-input-fullname">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">身份证:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kinsfolk_idcard" placeholder="请输入身份证号"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">性别:</label>'+
	'                     <div class="radio-list">'+
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinsfolk_sex" value="1" checked> 男</div></label>'+
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinsfolk_sex" value="2"> 女</div></label>'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">体重(kg):</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kinsfolk_weight" placeholder="请输入体重"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">身高(cm):</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kinsfolk_height" placeholder="请输入身高"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">电话:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kinsfolk_phone" placeholder="请输入电话"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                    <label class="col-sm-3 control-label">通晓语言：</label>'+
	'                    <div class="col-sm-7">'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="1">普通话</label>'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="2">粤语</label>'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="3">客家</label>'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="4">潮汕</label>'+
	'                    </div>'+
	'                </div>'+
	'              <div class="form-group">'+
	'                  <p class="rp_subtit">健康信息</p>'+
	'              </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">身体状况描述:</label>'+
	'                     <div class="col-sm-5">'+
	'                     		<textarea class="form-control" rows="" cols="" placeholder="身体状况描述" id="kinsfolk_physicalState"></textarea>'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">行动能力:</label>'+
	'                     <div class="col-sm-5">'+
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="1" checked> 自理</div></label>'+
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="2"> 半失能</div></label>'+
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="3"> 失能</div></label>'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">医院就诊卡号:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kinsfolk_medicalNum" placeholder="医院就诊卡号"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'              <div class="form-group">'+
	'                  <p class="rp_subtit">申请信息</p>'+
	'              </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">申请编号:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kf_insure_no" class="form-control" disabled>'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">申请时间:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="kf_insure_createTime" disabled class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">' +
	'                     <div class="col-sm-5">' +
	'                       <input type="radio" id="radio-1" name="rcs_opt" value="0"> <label for="radio-1">通过：</label>' +
	'						<span>指派护士</span><a>选择护士</a>' +
	'                       <input type="radio" id="radio-1" name="rcs_opt" value="0"> <label for="radio-1">不通过：</label>' +
	'						<input type="text" class="form-control input-sm js-recharge-fee" placeholder="请输入不通过的原因"  style="width:100px;display: inline" >' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">客服备注:</label>'+
	'                     <div class="col-sm-5">'+
	'                     		<textarea class="form-control" rows="" cols="" placeholder="客服备注" id="kinsfolk_physicalState"></textarea>'+
	'                     </div>'+
	'               </div>'+
	'            </form>'+
	'        </div>'+
	'    </div>'+
	'    <div class="panel-footer">'+
	'         <div class="form-group">'+
	'              <div class="col-sm-12" style="text-align:center">'+
	'                   <button type="button" class="btn btn-sm btn-success modal_save js-btn-saveKinsfolk">保存</button>'+    
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
	'              </div>'+
	'          </div>'+
	'     </div>'+    
	'</div>';

var kinsfolk_panel = new RPModalPanel("kinsfolk_panel", rp_addHGPanelHtml);
function G_Fun_showAddKinsfolkPanel(){
	G_Util.initMapUtil('kinsfolk_');
	//初始化时间控件
	$("#kinsfolk_birthday").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1,
		weekStart : 1
	});
	kinsfolk_panel.show();
	$("#kinsfolk_input_form")[0].reset();
	$("#kinsfolk_nation").attr('nation','');
	$("#kinsfolk_nation").html('请选择民族');
	$("#kinsfolk_panel img").remove();
	$("#kinsfolk_panel .uimg_item").remove();
	$("#kinsfolk_panel input[type=hidden]").val('');
	$("#kinsfolk_panel input[type=file]").attr('imgid','');
}

//图片上传逻辑处理
$('body').on('change', '#kf_insure_access .js-upload-file-input', function(){
	var inputEl = $(this);
	
	new UploadPic(inputEl).then(function(data){
		data = JSON.parse(data);
		inputEl.attr("imgId",data["imageId"]);
		var eleId = inputEl.attr('id');
		var idc1 = eleId == 'js-upload-kinsfolkidcardpic';
		var idc2 = eleId == 'js-upload-kinsfolkidcardpic2';
		if(idc1 || idc2) {
			var side = 0;
			if(idc1)
				side = 1;
			else if(idc2)
				side = 2;
			// 是身份证正面照, 设置身份证信息
			G_Util.getIdCardInfo(data["imageId"], side).then(function(result){
				var data = result.body;
				console.info(data);
				if(idc1) {
					$("#kinsfolk_idcard").val(data.idcard);
					$("#kinsfolk_birthday").val(data.birthday);
					$("#kinsfolk_fullName").val(data.fullName);
					$("input[name=kinsfolk_sex][value='" + data.sex + "']").prop("checked", true);
				}else if(idc2) {
					$("#kinsfolk_idcardExpiredDate").val(data.idcardExpiredDate);
				}
			});
		}
	});
});

$('body').on('click', '.js-btn-uploadpic', function(){
	var uploadInputId = $(this).attr("uploadfor");
	$('#' + uploadInputId).click();
});	

$('body').on('click', '.js-btn-saveKinsfolk', function(){
	var lang = '';
	var langArray = [];
	$("input[name=kinsfolk_language]:checked").each(function(i,e){
		langArray.push($(e).val());
	});
	lang = langArray.join(';');
	var params = {
		userId : G_Util.getObjIdByName(idArray, 'userId'),
		fullName : $("#kinsfolk_fullName").val(),
		sex : $("input[name=kinsfolk_sex]:checked").val(),
		language : lang,
		idCard : $("#kinsfolk_idcard").val(),
		relation : $("#kinsfolk_relation").val(),
		contacts : $("#kinsfolk_contacts").val(),
		contacts2 : $("#kinsfolk_contacts2").val(),
		contactsPhone : $("#kinsfolk_contactsPhone").val(),
		contacts2Phone : $("#kinsfolk_contacts2Phone").val(),
		contactsRelation : $("#kinsfolk_contactsRelation").val(),
		contacts2Relation : $("#kinsfolk_contacts2Relation").val(),
		physicalState : $("#kinsfolk_physicalState").val(),
		actAbility : $("input[name=kinskfolk_actAbility]:checked").val(),
		medicalNum : $("#kinsfolk_medicalNum").val(),
		birthday : $("#kinsfolk_birthday").val(),
		adcode : $("#kinsfolk_adcode").val(),
		phone : $("#kinsfolk_phone").val(),
		address : $("#kinsfolk_address").val(),
		nation : $("#kinsfolk_nation").attr('nation'),
		idcardExpiredDate : $("#kinsfolk_idcardExpiredDate").val(),
		pic : $("#js-upload-kinsfolkpic").attr('imgid'),
		idcardpic : $("#js-upload-kinsfolkidcardpic").attr('imgid'),
		idcardpic2 : $("#js-upload-kinsfolkidcardpic2").attr('imgid'),
		idcardpic3 : $("#js-upload-kinsfolkidcardpic3").attr('imgid'),
		height : $("#kinsfolk_height").val(),
		weight : $("#kinsfolk_weight").val()
	};
	doHttp(params, '/adminjson/SAASAddKinsfolk').then(function(result){
		Toast.success('操作成功!');
		$(window.parent.document).contents().find("iframe.selected")[0].contentWindow.showUserInfo();
		kinsfolk_panel.hide();
	});
});