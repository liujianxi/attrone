
var rp_addHGPanelHtml = '<div id="kinsfolk_panel" class="r_panel" style="z-index:3;">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">新增亲属</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="kinsfolk_input_form">' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">基本信息</p>' +
	'              </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>姓名:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入姓名" id="kinsfolk_fullName"  class="form-control js-input-fullname">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>身份证:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_idcard" placeholder="请输入身份证号"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">关系:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input placeholder="请输入关系" id="kinsfolk_relation"  class="form-control js-input-relation">' +
	'                     </div>' +
	'               </div>' +
//	'               <div class="form-group">' +
//	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>性别:</label>' +
//	'                     <div class="radio-list">' +
//	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinsfolk_sex" value="1" checked> 男</div></label>' +
//	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinsfolk_sex" value="2"> 女</div></label>' +
//	'                     </div>' +
//	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">体重(kg):</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_weight" placeholder="请输入体重"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">身高(cm):</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_height" placeholder="请输入身高"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
//	'               <div class="form-group">' +
//	'                     <label class="col-sm-3 control-label">生日:</label>' +
//	'                     <div class="col-sm-5">' +
//	'                        <input type="text" class="form-control dpd1 m-bot15" name="kinsfolk_birthday" id="kinsfolk_birthday">' +
//	'                     </div>' +
//	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">民族:</label>' +
	'                     <div class="col-sm-5">' +
	'                        <a href="#" class="js-select-nation" id="kinsfolk_nation" style="padding-top:3px">请选择民族</a>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">宗教:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_religion" placeholder="请输入宗教"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">籍贯:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_nativeplace" placeholder="请输入籍贯"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">电话:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_phone" placeholder="请输入电话"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">居住地址:</label>' +
	'                     <div class="col-sm-5">' +
	'						<input type="hidden" name=lng id="kinsfolk_lng" />' +
	'                       <input type="hidden" name="lat" id="kinsfolk_lat" />' +
	'                       <input type="hidden" name="adcode" id="kinsfolk_adcode" />' +
	'                       <input type="hidden" name="provinceID" id="kinsfolk_provinceID" />' +
	'                       <input type="hidden" name="cityID" id="kinsfolk_cityID" />' +
	'                       <input type="hidden" name="district" id="kinsfolk_district" />' +
	'                       <input type="hidden" name="district" id="kinsfolk_address" />' +
	'                       <input id="kinsfolk_building" placeholder="请输入居住地址"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                    <label class="col-sm-3 control-label"><span class="form-required">*</span>通晓语言：</label>' +
	'                    <div class="col-sm-7">' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="1">普通话</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="2">粤语</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="3">客家</label>' +
	'                        <label class="checkbox-inline"><input type="checkbox" name="kinsfolk_language" value="4">潮汕</label>' +
	'                    </div>' +
	'                </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">医院就诊卡号:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_medicalNum" placeholder="医院就诊卡号"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label"><span class="form-required">*</span>医保类型:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <select id="kinsfolk_medicalType">' +
	'								<option value="0">请选择</option>' +
	'								<option value="1">广州市职工医保</option>' +
	'								<option value="2">城镇医保</option>' +
	'								<option value="3">工费医疗</option>' +
	'								<option value="4">新农合医保</option>' +
	'								<option value="5">其它类型</option>' +
	'						  </select>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">医保卡号:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_healthCareNO" placeholder="医保卡号"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">健康信息</p>' +
	'              </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">身体状况描述:</label>' +
	'                     <div class="col-sm-5">' +
	'                     		<textarea class="form-control" rows="" cols="" placeholder="身体状况描述" id="kinsfolk_physicalState"></textarea>' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">行动能力:</label>' +
	'                     <div class="col-sm-5">' +
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="1" checked> 自理</div></label>' +
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="2"> 半失能</div></label>' +
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="3"> 失能</div></label>' +
	'                     </div>' +
	'               </div>' +
	'                <div class="form-group">' +
	'                  <p class="rp_subtit">其他信息</p>' +
	'                </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">个人照片：</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" name="js-upload-kinsfolkpic" id="js-upload-kinsfolkpic" wrapperEl="kinsfolkpic_wrapper">' +
	'                         <div id="kinsfolkpic_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-kinsfolkpic">上传个人照片</a>' +
	'                     </div>' +
	'                 </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">身份证正面照：</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" name="js-upload-kinsfolkidcardpic" id="js-upload-kinsfolkidcardpic" wrapperEl="kinsfolkidcardpic_wrapper">' +
	'                         <div id="kinsfolkidcardpic_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-kinsfolkidcardpic">上传身份证正面照</a>' +
	'                     </div>' +
	'                 </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">身份证反面照：</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" name="js-upload-kinsfolkidcardpic2" id="js-upload-kinsfolkidcardpic2" wrapperEl="kinsfolkidcardpic2_wrapper">' +
	'                         <input type="hidden" id="kinsfolk_idcardExpiredDate">' +
	'                         <div id="kinsfolkidcardpic2_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-kinsfolkidcardpic2">上传身份证反面照</a>' +
	'                     </div>' +
	'                 </div>' +
	'                 <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">手持身份证照：</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input type="file" class="form-control hidden js-upload-file-input" name="js-upload-kinsfolkidcardpic3" id="js-upload-kinsfolkidcardpic3" wrapperEl="kinsfolkidcardpic3_wrapper">' +
	'                         <div id="kinsfolkidcardpic3_wrapper" imgwidth="100px" imgheight="100px" ></div>' +
	'                         <a href="#" class="js-btn-uploadpic" uploadfor="js-upload-kinsfolkidcardpic3">上传手持身份证照</a>' +
	'                     </div>' +
	'                 </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">联系人1:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_contacts" placeholder="联系人1"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">联系人1电话:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_contactsPhone" placeholder="联系人1电话"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">联系人1关系:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_contactsRelation" placeholder="联系人1关系"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">联系人2:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_contacts2" placeholder="联系人2"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">联系人2电话:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_contacts2Phone" placeholder="联系人2电话"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">联系人2关系:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="kinsfolk_contacts2Relation" placeholder="联系人2关系"  class="form-control">' +
	'                     </div>' +
	'               </div>' +

	'            </form>' +
	'        </div>' +
	'    </div>' +
	'    <div class="panel-footer">' +
	'         <div class="form-group">' +
	'              <div class="col-sm-12" style="text-align:center">' +
	'                   <button type="button" class="btn btn-sm btn-success modal_save js-btn-saveKinsfolk">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';
function G_Fun_showAddKinsfolkPanel(id, node) {
	var kinsfolk_panel = new RPModalPanel("kinsfolk_panel", rp_addHGPanelHtml);
	G_Util.initMapUtil('kinsfolk_');
	//初始化时间控件
//	$("#kinsfolk_birthday").datetimepicker({
//		language: 'zh-CN',
//		minView: "month",
//		format: 'yyyy-mm-dd',
//		autoclose: 1,
//		weekStart: 1
//	});
	kinsfolk_panel.show();
	$("#kinsfolk_input_form")[0].reset();
	$("#kinsfolk_nation").attr('nation', '');
	$("#kinsfolk_nation").html('请选择民族');
	$("#kinsfolk_panel img").remove();
	$("#kinsfolk_panel .uimg_item").remove();
	$("#kinsfolk_panel input[type=hidden]").val('');
	$("#kinsfolk_panel input[type=file]").attr('imgid', '');
	$("body").off('click', '.js-btn-saveKinsfolk');
	$('body').on('click', '.js-btn-saveKinsfolk', function () {
		var lang = '';
		var langArray = [];
		$("input[name=kinsfolk_language]:checked").each(function (i, e) {
			langArray.push($(e).val());
		});
		lang = langArray.join(';');
		var params = {
			userId: G_Util.getObjIdByName(idArray, 'userId'),
			fullName: $("#kinsfolk_fullName").val(),
			sex: $("input[name=kinsfolk_sex]:checked").val(),
			language: lang,
			idCard: $("#kinsfolk_idcard").val(),
			relation: $("#kinsfolk_relation").val(),
			contacts: $("#kinsfolk_contacts").val(),
			contacts2: $("#kinsfolk_contacts2").val(),
			contactsPhone: $("#kinsfolk_contactsPhone").val(),
			contacts2Phone: $("#kinsfolk_contacts2Phone").val(),
			contactsRelation: $("#kinsfolk_contactsRelation").val(),
			contacts2Relation: $("#kinsfolk_contacts2Relation").val(),
			physicalState: $("#kinsfolk_physicalState").val(),
			actAbility: $("input[name=kinskfolk_actAbility]:checked").val(),
			medicalNum: $("#kinsfolk_medicalNum").val(),
			healthCareNO: $("#kinsfolk_healthCareNO").val(),
			medicalType:$("#kinsfolk_medicalType").val(),
			birthday: $("#kinsfolk_birthday").val(),
			adcode: $("#kinsfolk_adcode").val(),
			phone: $("#kinsfolk_phone").val(),
			address: $("#kinsfolk_address").val(),
			nation: $("#kinsfolk_nation").attr('nation'),
			idcardExpiredDate: $("#kinsfolk_idcardExpiredDate").val(),
			pic: $("#js-upload-kinsfolkpic").attr('imgid'),
			idcardpic: $("#js-upload-kinsfolkidcardpic").attr('imgid'),
			idcardpic2: $("#js-upload-kinsfolkidcardpic2").attr('imgid'),
			idcardpic3: $("#js-upload-kinsfolkidcardpic3").attr('imgid'),
			height: $("#kinsfolk_height").val(),
			weight: $("#kinsfolk_weight").val()
		};
		doHttp(params, '/adminjson/SAASAddKinsfolk').then(function (result) {
			Toast.success('操作成功!');
			if (id == undefined) {
				$(window.parent.document).contents().find("iframe.selected")[0].contentWindow.showUserInfo();
			} else {
				orderManage_getKinsfolk(id, node);
			}
			kinsfolk_panel.hide();
		});
	});
}

//图片上传逻辑处理
$('body').off('click', '#kinsfolk_panel .js-upload-file-input').on('click', '#kinsfolk_panel .js-upload-file-input', function () {
	var inputEl = $(this);
	var wrapperElId = inputEl.attr("wrapperEl");
	top.importOnceJS('js-script-hg',"js/app/fun.js");
	uploadImg($('input.js-upload-file-input'),'show').then(function (data) {
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
	    //判断是否是身份证
		inputEl.attr("imgId", data["imageId"]);
		var eleId = inputEl.attr('id');
		var idc1 = eleId == 'js-upload-kinsfolkidcardpic';
		var idc2 = eleId == 'js-upload-kinsfolkidcardpic2';
		if (idc1 || idc2) {
			var side = 0;
			if (idc1)
				side = 1;
			else if (idc2)
				side = 2;
			// 是身份证正面照, 设置身份证信息
			G_Util.getIdCardInfo(data["imageId"], side).then(function (result) {
				var kins_data = result.body;
				console.info(kins_data);
				if (idc1) {
					$("#kinsfolk_idcard").val(kins_data.idcard);
					$("#kinsfolk_birthday").val(kins_data.birthday);
					$("#kinsfolk_fullName").val(kins_data.fullName);
					$("input[name=kinsfolk_sex][value='" + kins_data.sex + "']").prop("checked", true);
				} else if (idc2) {
					$("#kinsfolk_idcardExpiredDate").val(kins_data.idcardExpiredDate);
				}
			});
		}
	});
});

$('body').on('click', '.js-btn-uploadpic', function () {
	var uploadInputId = $(this).attr("uploadfor");
	$('#' + uploadInputId).click();
});	