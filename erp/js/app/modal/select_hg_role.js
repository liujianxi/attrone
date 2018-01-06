
/***********选择角色 begin******************************/
var insure_hg_role_modal_html = '<div class="modal fade" id="js-modal-select_hg_role-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >分配角色</h4>'+
'					<input type="text" style="width: 220px; display: inline-block;" placeholder="搜索员工姓名" id="selecthgName" class="form-control">'+
'						<button type="button" class="btn btn-primary btn-sm js-btn-showhgListByName">'+
'					    	<i class="fa fa-search"></i>&nbsp;&nbsp;查询'+
'					    </button>'+
'      		</div>'+
'      		<div class="modal-body">'+
'      			<div id="js-div-hgNotList">'+
'      			</div>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-hgNot">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

/***********角色列表 begin*******************************/
var hgNotInlist_tpl = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>ID</th>'+
'      		<th>姓名</th>'+
'      		<th>性别</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each hgNotList as item i}}'+
'		<tr>'+
'			<td><input type="checkbox" name="js-chk-hgIds" class="checkboxes" value="{{item.id}}" hgName="{{item.hgName}}"></td>'+
'			<td>{{item.id}}</td>'+
'			<td>{{item.fullName}}</td>'+
'			{{if item.sex == 1}}'+
'			<td>男</td>'+
'			{{else}}'+
'			<td>女</td>'+
'			{{/if}}'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getHgListNotInHtml = function(data){
	var render = template.compile(hgNotInlist_tpl);
	var html = render(data);
	return html;
}
/**********角色列表 end*********************************/



//实例化请求帮助类
var httpUtilObj = new HttpUtil();

$('body').on('click','.assignroleBtn', function(){
	var roleId = $("#add_role_id").val();
	console.log("roleId:----------------" + roleId);
	$('#selecthgName').val("");
	G_Fun_showHgNotHandlePanel(roleId);
});

//弹窗模糊查询
$('body').on('click','.js-btn-showhgListByName', function(){
		var roleId = $("#add_role_id").val();
		var hgName2 = $("#selecthgName").val();
		var param = {
				roleId:roleId,
				hgName2:hgName2
			};
		httpUtilObj.ajax({
			url:'/adminjson/SAASGetHGListNotInRoleId',
			type: "POST",
			dataType: 'json',
			params: param
			}).then(function(data){
				if(data && data.errorCode==0){
					var tableHtml = getHgListNotInHtml(data.body);
					$('#js-modal-select_hg_role-win #js-div-hgNotList').html(tableHtml);
				}
				
			});
});


//模糊查询
$('body').on('click','#searchhgBut', function(){
	var roleId = $("#add_role_id").val();
	var hgnamemh = $("#findhgName").val();
	console.log(roleId,hgnamemh);
	var param = {
			roleId:roleId,
			hgNamemh:hgnamemh
		};
	httpUtilObj.ajax({
		url:'/adminjson/SAASGetHGListNotInRoleId',
		type: "POST",
		dataType: 'json',
		params: param
	}).then(function(data){
			if(data && data.errorCode==0){
				var getHgListByIdHtml =template('hgListTemplate',{"hg":data.body.hgListByName});
				$("#hgListContent").empty().html(getHgListByIdHtml);
			}
		});

});


var G_Fun_showHgNotHandlePanel = function(roleId){
		if($('#js-modal-select_hg_role-win').length > 0 ){
		}else{
			$("body").append(insure_hg_role_modal_html);
		}
		
		$('#js-modal-select_hg_role-win').modal('show');
		$('.js-btn-hgNot').unbind("click"); 
		
		var param = {
			roleId:roleId
		};
		doHttp(param, '/adminjson/SAASGetHGListNotInRoleId').then(function(data){
			if(data && data.errorCode==0 && data.body){
				var tableHtml = getHgListNotInHtml(data.body);
				$('#js-modal-select_hg_role-win #js-div-hgNotList').html(tableHtml);
			}
			
		});
		
		
		var dtd = $.Deferred();

		$(".js-btn-hgNot").on("click",function(){
			var hgIds = [];
			if(roleId != null){
				var hgIdvalue = $("input[type = 'checkbox']");
				hgIdvalue.each(function(){
					if($(this).is(':checked')){
						hgIds.push($(this).val());  
					}
				});
			}
			var param = {
				roleId:roleId,
				hgIds:hgIds
			};
			doHttp(param, '/adminjson/SAASSaveHGRole').then(function(data){
				if(data && data.errorCode==0){
					Toast.success("操作成功");
					$('#js-modal-select_hg_role-win').modal('hide');
					var params = {
						roleId : roleId
					}
					httpUtilObj.ajax({
						url:'/adminjson/SAASGetHGListByRoleId',
						type: "POST",
						dataType: 'json',
						params: params
					}).then(function(rsult) {
						if(rsult.errorCode == 0) {
							// 初始化数据...
							var getHgListByIdHtml =template('hgListTemplate',{"hg":rsult.body.hgList});
							$("#hgListContent").empty().html(getHgListByIdHtml);
						}
					});
					
				}
			});
		});

	return dtd.promise();
}
