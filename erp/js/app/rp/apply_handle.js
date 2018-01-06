var rp_showapplyHandlePanelHtml = '<div id="panel_apply_handle" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title">自照护理员申请详情</h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" >'+
'              <div class="form-group" style="margin-bottom: 0px">'+
'                  <p class="rp_subtit">申请编号：<span class="js-span-applyId"></span>   【<span class="js-span-applyCreateTime"></span>】【<span class="js-panel-status"></span>】</p>'+
'              </div>'+
'               <div class="form-group">' +
'                     <table class=" display table table-bordered table-striped col-sm-12">' +
'                     		<tr><td colspan=2 align="center">申请人信息</td></tr>' +
'                     		<tr><td rowspan=3><img src=""></td><td>申请人姓名：<span class="js-panel-applyName"></span></td></tr>' +
'                     		<tr><td>手机号：<span class="js-panel-applyPhone"></span></td></tr>' +
'                     		<tr><td>身份证号：<span class="js-panel-idcard"></span></td></tr>' +
'                     		<tr><td colspan=2>地址：<span class="js-panel-addr"></span></td></tr>' +
'                     		<tr><td colspan=2>是否有健康证：<span class="js-panel-health"></span></td></tr>' +
'                     		<tr><td colspan=2>是否护理员资格证：<span class="js-panel-nurse"></span></td></tr>' +
'                     		<tr><td colspan=2>推荐人手机号:<span class="js-panel-referrerPhone"></span></td></tr>' +
'                     		<tr><td colspan=2 class="js-panel-apply-detail-list"></td></tr>' +
'                     </table>' +
'               </div>' +

'              <div class="form-group js-tr-process js-tr-status-1"  style="display:none">' +
'                   <table class=" display table table-bordered table-striped col-sm-12">' +
'                     		<tr>' +
'                     			<td>' +
'                     				<label class="col-sm-2 control-label"><span class="form-required">*</span>审核结果:</label>' +
'                     				<div class="col-sm-10">' +
'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js_radio_checkHandler" value="2"> 通知培训（缴纳培训费）</label></div>' +
'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js_radio_checkHandler" value="50"> 不通过</label></div>' +
'                     					<textarea class="form-control js-apply-rejectDesc" style="display:none" rows="3" placeholder="请输入不通过原因"></textarea>' +
'                     					<div class="radio"><label style="padding-top:0px;"><input type="radio" name="js_radio_checkHandler" value="5"> 通过（直接入职）</label> <span class="js-span-choseNurse" style="display:none;">指派护士：<a href="javascript:void(0);" class="js-select-insureHandleNure" nurseType=10004>选择领班护士</a></span></div>' +
'                     				</div>' +
'                     			</td>' +
'                     		</tr>' +
'                    </table>' +
'               </div>' +

'            </form>'+
'        </div>'+

'    </div>'+
'    <div class="panel-footer">'+
'         <div class="form-group">'+
'              <div class="col-sm-12" style="text-align:center">'+
'                   <button type="button" class="btn btn-sm btn-success js-btn-submit">提交</button>'+    
'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
'              </div>'+
'          </div>'+
'     </div>'+    
'</div>';

var getApplyDetailListHtml = function(data){
	var detailList = data.detailList;
	var result = '<span>处理过程：</span></br>';
	for(var i=0;i<detailList.length;i++){
		result += detailList[i].createTime1 + " 【" + detailList[i].createStaffName + "】 —— " + detailList[i].content + "<br>";
	}
	return result;
}


function G_Fun_showApplyHandlePanel(applyId, type){
	var dtd = $.Deferred();
	var panel = new RPModalPanel("panel_apply_handle", rp_showapplyHandlePanelHtml);
	panel.show();
	
	G_ApplyModule.getStaffApplyDetail(applyId).then(function(data){
		if(data && data.errorCode==0 && data.body){
			fillFormData(data.body);
		}
	});
	
	$('input[name=js_radio_checkHandler]').on("click", function(){
		var handleCode = $('input[name=js_radio_checkHandler]:checked').val();
		if(handleCode==5 || handleCode==2){ //审核通过
			$(".js-apply-rejectDesc").hide();
		}else{
			$(".js-apply-rejectDesc").val("");
			$(".js-apply-rejectDesc").show();
		}
		console.log("govHandleCode:" + handleCode);
	});
	
	panel.find(".js-btn-submit").off('click').on('click',function(){
		sumitHandle();
	});
	
	function sumitHandle(){ //提交结果
		var handleRet = $('input[name=js_radio_checkHandler]:checked').val();
		var rejectDesc = $(".js-apply-rejectDesc").val();
		
		var param = {};
		param["status"] = handleRet;
		param["rejectDesc"] = rejectDesc;
		param["applyId"] = applyId; 
		console.log("insureProcess param:" + JSON.stringify(param))
		G_ApplyModule.checkStaffApply(param).then(function(result) {
			if(result.errorCode == 0) {
				Toast.success("操作成功");
				panel.hide();
				dtd.resolve(result);
			}
		});
	}
	
	
	function fillFormData(data){
		var applyDetail = data.apply;
		if(applyDetail){
			$("#panel_apply_handle .js-span-applyId").html(applyDetail.applyId);
			$("#panel_apply_handle .js-span-applyCreateTime").html(applyDetail.createTime);
			$("#panel_apply_handle .js-panel-status").html(applyDetail.statusStr);
			
			$("#panel_apply_handle .js-panel-applyName").html(applyDetail.applyName);
			$("#panel_apply_handle .js-panel-applyPhone").html(applyDetail.applyPhone);
			$("#panel_apply_handle .js-panel-idcard").html(applyDetail.idcard);
			$("#panel_apply_handle .js-panel-addr").html(applyDetail.province+applyDetail.city+applyDetail.district+applyDetail.building+applyDetail.addrDetail);
			$("#panel_apply_handle .js-panel-health").html(applyDetail.isHealth == 1 ? "是" : "否");
			$("#panel_apply_handle .js-panel-nurse").html(applyDetail.isNurse == 1 ? "是" : "否");
			$("#panel_apply_handle .js-panel-referrerPhone").html(applyDetail.province + applyDetail.city + applyDetail.district + applyDetail.building + applyDetail.addrDetail);
			$("#panel_apply_handle .js-panel-referrerPhone").html(applyDetail.referrerPhone);
			
			$("#panel_apply_handle .js-panel-apply-detail-list").html(getApplyDetailListHtml(applyDetail));
			
			//填充已完成流程的进度类容
			status = applyDetail.status;
			console.log("status:" + status);
			if(status == 1){//填充ADL 结果
				$(".js-tr-status-1").show();
				$(".js-btn-submit").show();
			} else {
				$(".js-tr-status-1").hide();
				$(".js-btn-submit").hide();
			}
		}
	}
	
	return dtd.promise();
}

