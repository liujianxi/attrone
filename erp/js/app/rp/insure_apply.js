
	var rp_addHGPanelHtml = '<div id="insureApply_panel" class="r_panel">'+
	'    <div class="panel-header">'+
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
	'        <h4 class="modal-title">新增申请单</h4>'+
	'    </div>'+
	'    <div class="panel-body">'+
	'        <div class="container-fluid">'+
	'            <form class="form-horizontal" role="form" id="insureApply_input_form">'+
	'              <div class="form-group">'+
	'                  <p class="rp_subtit">基本信息</p>'+
	'              </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">代申请人:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input placeholder="请输入姓名" id="insureApply_name"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">手机号码:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input placeholder="请输入姓名" id="insureApply_phoneNumber"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">联系地址:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input placeholder="请输入姓名" id="insureApply_building"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'				<hr />'+
	'				<div class="row"><a href="javascript:void(0);" style="margin-bottom: 30px;  height: 30px; line-height: 30px;" class="js-select-kinsfolk-btn" userId="">+从家庭成员列表添加</a></div>'+
	'				<div class="row"><a href="javascript:void(0);" style="margin-bottom: 30px;  height: 30px; line-height: 40px;" class="js-adl-assess-btn" userId="">++添加ADL自理能力评估</a></div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">姓名:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input placeholder="请输入姓名" id="insureApply_fullName"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">身份证:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="insureApply_idcard" placeholder="请输入身份证号"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">体重(kg):</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="insureApply_weight" placeholder="请输入体重"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">身高(cm):</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="insureApply_height" placeholder="请输入身高"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">电话:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="insureApply_phone" placeholder="请输入电话"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                    <label class="col-sm-3 control-label">通晓语言：</label>'+
	'                    <div class="col-sm-7">'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="insureApply_language" value="1">普通话</label>'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="insureApply_language" value="2">粤语</label>'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="insureApply_language" value="3">客家</label>'+
	'                        <label class="checkbox-inline"><input type="checkbox" name="insureApply_language" value="4">潮汕</label>'+
	'                    </div>'+
	'                </div>'+
	'              <div class="form-group">'+
	'                  <p class="rp_subtit">健康信息</p>'+
	'              </div>'+
	'              <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">身体状况描述:</label>'+
	'                     <div class="col-sm-5">'+
	'                     		<textarea class="form-control" rows="" cols="" placeholder="身体状况描述" id="insureApply_physicalState"></textarea>'+
	'                     </div>'+
	'              </div>'+
	'              <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">行动能力:</label>'+
	'                     <div class="col-sm-5">'+
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="1" checked> 自理</div></label>'+
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="2"> 半失能</div></label>'+
	'                        <label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="kinskfolk_actAbility" value="3"> 失能</div></label>'+
	'                     </div>'+
	'              </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">医院就诊卡号:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="insureApply_medicalNum" placeholder="医院就诊卡号"  class="form-control">'+
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

var insureApply_panel = new RPModalPanel("insureApply_panel", rp_addHGPanelHtml);
function G_Fun_showAddInsureApplyPanel(){
	insureApply_panel.show();
}

//图片上传逻辑处理
$('body').on('change', '#insureApply_panel .js-upload-file-input', function(){
	var inputEl = $(this);
	
	new UploadPic(inputEl).then(function(data){
		data = JSON.parse(data);
		inputEl.attr("imgId",data["imageId"]);
		var eleId = inputEl.attr('id');
		var idc1 = eleId == 'js-upload-insureApplyidcardpic';
		var idc2 = eleId == 'js-upload-insureApplyidcardpic2';
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
					$("#insureApply_idcard").val(data.idcard);
					$("#insureApply_birthday").val(data.birthday);
					$("#insureApply_fullName").val(data.fullName);
					$("input[name=insureApply_sex][value='" + data.sex + "']").prop("checked", true);
				}else if(idc2) {
					$("#insureApply_idcardExpiredDate").val(data.idcardExpiredDate);
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
	$("input[name=insureApply_language]:checked").each(function(i,e){
		langArray.push($(e).val());
	});
	lang = langArray.join(';');
	var params = {
		userId : G_Util.getObjIdByName(idArray, 'userId'),
		fullName : $("#insureApply_fullName").val(),
		sex : $("input[name=insureApply_sex]:checked").val(),
		language : lang,
		idCard : $("#insureApply_idcard").val(),
		relation : $("#insureApply_relation").val(),
		contacts : $("#insureApply_contacts").val(),
		contacts2 : $("#insureApply_contacts2").val(),
		contactsPhone : $("#insureApply_contactsPhone").val(),
		contacts2Phone : $("#insureApply_contacts2Phone").val(),
		contactsRelation : $("#insureApply_contactsRelation").val(),
		contacts2Relation : $("#insureApply_contacts2Relation").val(),
		physicalState : $("#insureApply_physicalState").val(),
		actAbility : $("input[name=kinskfolk_actAbility]:checked").val(),
		medicalNum : $("#insureApply_medicalNum").val(),
		birthday : $("#insureApply_birthday").val(),
		adcode : $("#insureApply_adcode").val(),
		phone : $("#insureApply_phone").val(),
		address : $("#insureApply_address").val(),
		nation : $("#insureApply_nation").attr('nation'),
		idcardExpiredDate : $("#insureApply_idcardExpiredDate").val(),
		pic : $("#js-upload-insureApplypic").attr('imgid'),
		idcardpic : $("#js-upload-insureApplyidcardpic").attr('imgid'),
		idcardpic2 : $("#js-upload-insureApplyidcardpic2").attr('imgid'),
		idcardpic3 : $("#js-upload-insureApplyidcardpic3").attr('imgid'),
		height : $("#insureApply_height").val(),
		weight : $("#insureApply_weight").val()
	};
	doHttp(params, '/adminjson/SAASAddKinsfolk').then(function(result){
		Toast.success('操作成功!');
		$(window.parent.document).contents().find("iframe.selected")[0].contentWindow.showUserInfo();
		insureApply_panel.hide();
	});
});

//新增长护险
function addInsure(){
	let addInsure_Html=`<div id="addInsure" class="r_panel end-order">
		<div class="panel-header">
			<button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title">新增长护险</h4>
		</div>
		<div class="panel-center">
			<ul>
				<li>
					<span>机构：　　　　<i>*</i></span>
					<select class="orgService form-control"></select>
				</li>
				<li>
					<span>科室：　　　　<i>*</i></span>
					<select class="form-control selectpicker" id="branchService" data-live-search="true"></select>
				</li>
				<li>
					<span>门禁卡号：　　<i>*</i></span>
					<input type="number" class="form-control extraNO" placeholder="请输入门禁卡号">
				</li>
				<li>
					<span>门禁卡自编号：</span>
					<input class="form-control serialNumber" placeholder="请输入门禁卡自编号">
				</li>
				<li>
					<span>门禁卡状态：　<i>*</i></span>
					<select class="form-control extra-status">
						<option value="1">已归还</option>
					</select>
				</li>
			</ul>
		</div>
		<div class="panel-footer">
			<div class="footer-content edit-text"><span class="rp_close">取消</span><span class="footer-sure">保存</span></div>
			<div class="footer-content disable-text nosure"><span>编辑</span></div>
		</div>
		`;
	let extraManageAdd_panel = new RPModalPanel('extraManageAdd', extraManageAdd_Html);
	extraManageAdd_panel.show();
}
