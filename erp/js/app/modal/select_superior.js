
/***********选择角色 begin******************************/
var insure_Superior_modal_html = '<div class="modal fade" id="js-modal-select_Superior-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title"></h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'      			<div id="js-div-hgList">'+
'      			</div>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-hg">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

/***********护工列表 begin*******************************/
var hglist_tpl = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>ID</th>'+
'      		<th>姓名</th>'+
'      		<th>性别</th>'+
'      		<th>电话</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each hgListByName as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-hgIds" class="checkboxes" value="{{item.id}}" hgName="{{item.fullName}}"></td>'+
'			<td>{{item.id}}</td>'+
'			<td>{{item.fullName}}</td>'+
'			<td>{{item.sex == 1?"男":"女"}}</td>'+
'			<td>{{item.emergencyContactPhone}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getHgListHtml = function(data){
	var render = template.compile(hglist_tpl);
	var html = render(data);
	return html;
}
/**********护工列表 end*********************************/


/***********督导列表 begin*******************************/
var dudaolist_tpl = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>ID</th>'+
'      		<th>姓名</th>'+
'      		<th>性别</th>'+
'      		<th>电话</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each hgListByName as item i}}'+
'		<tr>'+
'			<td><input type="checkbox" name="js-chk-hgIdss" class="checkboxess" value="{{item.id}}" hgName="{{item.fullName}}"></td>'+
'			<td>{{item.id}}</td>'+
'			<td>{{item.fullName}}</td>'+
'			<td>{{item.sex == 1?"男":"女"}}</td>'+
'			<td>{{item.emergencyContactPhone}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getdudaoListHtml = function(data){
	var render = template.compile(dudaolist_tpl);
	var html = render(data);
	return html;
}
/**********督导列表 end*********************************/





var G_Fun_showSuperiorHandlePanel = function(param){
	if($('#js-modal-select_Superior-win').length > 0 ){
	}else{
		$("body").append(insure_Superior_modal_html);
	}
	$('#js-modal-select_Superior-win').modal('show');
	var title = "";
	var titleDiv = $('#js-modal-select_Superior-win .modal-title');
	if (titleDiv != undefined){
		if(param.roleId === 10003){
			titleDiv.html("指派健康经理");
			title = "健康经理";
		}else if(param.roleId === 10004){
			titleDiv.html("选择护士长");
			title = "护士长";
		}else if(param.roleId === 10006){
			titleDiv.html("指派督导");
			title = "督导";
		}
	}
	var roleId = param.roleId;
	
	var params = {
			roleId:param.roleId,
			branchIds:param.branchIds
		};

	doHttp(param, '/adminjson/SAASGetHGRoleList').then(function(data){
		if(data && data.errorCode==0 && data.body){
			console.log(data.body);
			var tableHtml = "";
			if(param.roleId === 10003){
				titleDiv.html("指派健康经理");
				title = "健康经理";
				tableHtml = getHgListHtml(data.body);
			}else if(param.roleId === 10004){
				titleDiv.html("选择护士长");
				title = "护士长";
				var tableHtml = getHgListHtml(data.body);
			}else if(param.roleId === 10006){
				titleDiv.html("指派督导");
				title = "督导";
				tableHtml = getdudaoListHtml(data.body);
			}
			$('#js-div-hgList').empty().html(tableHtml);
		}
		
	});
		
		
	var dtd = $.Deferred();
	var OKBtn = $("#js-modal-select_Superior-win .js-btn-hg");
	
	OKBtn.on('click',function(){
		var hgArray = [];
		var hgNameList = [];
		var hgIdList = [];
		var param = {};
		if(roleId === 10003 || roleId === 10004){
			var hgId = $('input[name=js-chk-hgIds]:checked');
			if (hgId.val() === undefined){
				Toast.error("请选择"+title);
				return;
			}
			param["hgName"] = hgId.attr("hgName"); 
			param["hgId"] = hgId.val();
//			hgArray.push(param);
			hgNameList.push(hgId.attr("hgName"));
			hgIdList.push(hgId.val());
		} else if(roleId === 10006){
			var hgIds = $("input:checkbox[name=js-chk-hgIdss]:checked");
			if(hgIds.length <= 0){
				Toast.error("请选择"+title);
				return;
			}
			$.each(hgIds ,function(){
				param["hgName"] = $(this).attr("hgName"); 
				param["hgId"] = $(this).val();
				hgNameList.push($(this).attr("hgName"));
				hgIdList.push($(this).val());
			});
		}
		var params = {};
		params["hgName"] = hgNameList.join(","); 
		params["hgId"] = hgIdList.join(',');
		OKBtn.unbind("click");
		$('#js-modal-select_Superior-win').modal('hide');
		dtd.resolve(params);
		return dtd.promise();
	});

	return dtd.promise();
}
