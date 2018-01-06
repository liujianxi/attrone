
/***********选择护士 begin******************************/
var insure_handle_nure_modal_html = '<div class="modal fade" id="js-modal-select_insure_handle_nure-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" ></h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'      			<div id="js-div-nureList">'+
'      			</div>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

/***********护士列表 begin*******************************/
var insureHushilist_tpl = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>ID</th>'+
'      		<th>姓名</th>'+
'      		<th>性别</th>'+
'      		<th>待评估单</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each hsList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-hsId" class="checkboxes" value="{{item.hgId}}" hgName="{{item.hgName}}"></td>'+
'			<td>{{item.hgId}}</td>'+
'			<td>{{item.hgName}}</td>'+
'			<td>{{item.sexStr}}</td>'+
'			<td>{{item.num}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getInsureHushilistHtml = function(data){
	var render = template.compile(insureHushilist_tpl);
	var html = render(data);
	return html;
}
/***********护士列表 end*********************************/

var G_OpenSelectInsureHandleNureWin = function(nurseType, insureOrderNO,hsType,type,str){
	let dtd = $.Deferred();
	if($('#js-modal-select_insure_handle_nure-win').length > 0 ){
	}else{
		$("body").append(insure_handle_nure_modal_html);
	}
	$('#js-modal-select_insure_handle_nure-win').modal('show');
	var titleDiv = $('#js-modal-select_insure_handle_nure-win .modal-title');
	if (titleDiv != undefined){
		if (nurseType === '10004') {
			titleDiv.html("分配护士长");		//长护险初审评估时不需要直接指派
		} else if (nurseType === '10002') {
			titleDiv.html("分配护士");
		} else if (nurseType === '10003') {
			titleDiv.html("指派健康经理");		//长护险联系客户时不需要直接指派
		} else if (nurseType === '10005') {
			titleDiv.html("指派健康经理");		//订单指派健康经理
		} else if (nurseType === '10006') {
			titleDiv.html("指派督导");			//订单指派督导
		} else if (nurseType === '10007') {
			titleDiv.html("分配护士长");		//长护险直接指派护士长
		} else if (nurseType === '10008') {
			titleDiv.html("指派健康经理");		//长护险指派健康经理
		}
	}
	if(insureOrderNO=='pgcreate'){
		insureOrderNO='';
	}
	G_InsureModule.getInsureHushiList(nurseType, insureOrderNO,hsType,type).then(function(data){
		if(data && data.errorCode==0 && data.body){
			var tableHtml = getInsureHushilistHtml(data.body);
			$('#js-modal-select_insure_handle_nure-win #js-div-nureList').html(tableHtml);
			$('#js-modal-select_insure_handle_nure-win #js-div-nureList tbody tr').css('cursor','pointer');
			$('#js-modal-select_insure_handle_nure-win #js-div-nureList tbody tr').off('click').on('click',function(){
				$('#js-modal-select_insure_handle_nure-win #js-div-nureList tbody tr td input').prop('checked',false);
				$(this).find('td input[type=radio]').prop('checked',true);
			})
			$('#js-modal-select_insure_handle_nure-win #js-div-nureList tbody tr td input[type=radio]').off('click').on('click',function(){
				$('#js-modal-select_insure_handle_nure-win #js-div-nureList tbody tr td input').prop('checked',false);
				$(this).prop('checked',true);
			})
		}
	});
	
	var OKBtn = $("#js-modal-select_insure_handle_nure-win .js-btn-ok");
	OKBtn.unbind("click").on('click',function(){
		getSelectHgInfo(nurseType, insureOrderNO,hsType,type,str).then((res)=>{
			$('#js-modal-select_insure_handle_nure-win').modal('hide');
			dtd.resolve(res);
			return dtd.promise();
		})
	});
	return dtd.promise();
}
var getSelectHgInfo = function(nurseType, insureOrderNO,hsType,type,str){
	let dtd = $.Deferred();
	var hgId = $('input[name=js-chk-hsId]:checked').val();
	var hgName = $('input[name=js-chk-hsId]:checked').attr("hgName");
	console.log(nurseType,hgId);
	if (hgId === undefined || hgId == 0){
		if (nurseType === '10002') {
			Toast.error("请选择护士");
		} else if (nurseType === '10005') {
			Toast.error("请选择健康经理");
		} else if (nurseType === '10006') {
			Toast.error("请选择督导");
		} else if (nurseType === '10007') {
			Toast.error("请选择护士长");
		} else if (nurseType === '10008') {
			Toast.error("请选择健康经理");
		}
	} else {
		var obj = {};
		obj['hgId'] = hgId;
		obj['hgName'] = hgName;
		if(nurseType === '10002'){
			var param = {};
			param["insureNO"] = insureOrderNO; 
			param["hgId"] = hgId;
			param["hgName"] = hgName;
			param["guideType"] = 1;
			if(insureOrderNO&&str!='status5'){//复审中无需调用GuideStaff
				G_OrderModule.GuideStaff(param).then(function(result) {
					if(result.errorCode == 0) {
						Toast.success("操作成功");
						dtd.resolve(obj);
						return dtd.promise();
					}
				});
			}else{
				dtd.resolve(obj);
				return dtd.promise();
			}
		}else if(nurseType === '10005' || nurseType === '10006'){
			var param = {};
			param["orderId"] = insureOrderNO; 
			param["managerId"] = hgId;
			param["managerName"] = hgName;
			param["orderstatus"] = 5;
			//发送请求
			G_OrderModule.UpdateOrder(param).then(function(result) {
				if(result.errorCode == 0) {
					Toast.success("操作成功");
					dtd.resolve(obj);
					return dtd.promise();
				}
			});
		} else if(nurseType === '10007'){
			var param = {};
			param["insureNO"] = insureOrderNO; 
			param["hgId"] = hgId;
			param["hgName"] = hgName;
			param["guideType"] = 0;
			G_OrderModule.GuideStaff(param).then(function(result) {
				if(result.errorCode == 0) {
					Toast.success("操作成功");
					dtd.resolve(obj);
					return dtd.promise();
				}
			});
		} else if(nurseType === '10008'){
			var param = {};
			param["insureNO"] = insureOrderNO; 
			param["hgId"] = hgId;
			param["hgName"] = hgName;
			param["guideType"] = 2;
			G_OrderModule.GuideStaff(param).then(function(result) {
				if(result.errorCode == 0) {
					Toast.success("操作成功");
					dtd.resolve(obj);
					return dtd.promise();
				}
			});
		}else{
			dtd.resolve(obj);
			return dtd.promise();
		}
	}
	return dtd.promise();
}
/***********选择护士 end******************************/