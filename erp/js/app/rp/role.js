
var rp_addRolePanelHtml = '<div id="panel_add_role" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title">新增角色</h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" id="role_input_form">'+

'              <div class="form-group">'+
'                  <p class="rp_subtit">基本信息</p>'+
'              </div>'+
'            	<div class="form-group">'+
'                    <label class="col-sm-3 control-label"><span class="form-required">*</span>角色名:</label>'+
'                    <div class="col-sm-5">'+
'                        <input type="text" class="form-control" id="addRole_roleName" placeholder="请输入角色名">'+
'                    </div>'+
'               </div>'+

'            </form>'+
'        </div>'+
'    </div>'+
'    <div class="panel-footer">'+
'         <div class="form-group">'+
'              <div class="col-sm-12" style="text-align:center">'+
'                   <button type="button" class="btn btn-sm btn-success js-btn-saveRole">保存</button>'+    
'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
'              </div>'+
'          </div>'+
'     </div>'+    
'</div>';
	
function G_Fun_showAddRolePanel(){
	var panel = new RPModalPanel("panel_add_role", rp_addRolePanelHtml);
	panel.show();
	$('#addRole_roleName').val('');
	
	var dtd = $.Deferred();
	var saveRole = function() {
		var roleName = panel.find("#addRole_roleName").val();
		G_RoleModule.addRole(roleName).then(function(result) {
			if(result.errorCode == 0) {
				$.toast({
					heading: '系统消息',
					text: '操作成功！',
					position: 'top-right',
					icon: 'success',
					loaderBg: '#9EC600',
					stack: false
				});
				panel.hide();
				dtd.resolve(result);
			}
		});
	}
	
	panel.find(".js-btn-saveRole").off('click').on('click',function(){
		saveRole();
	})
	return dtd.promise();
}

