var rp_addUserPanelHtml = '<div id="adduser_panel" class="r_panel">'+
	'    <div class="panel-header">'+
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
	'        <h4 class="modal-title">新增用户</h4>'+
	'    </div>'+
	'    <div class="panel-body">'+
	'        <div class="container-fluid">'+
	'            <form class="form-horizontal" role="form" id="u_add_input_form">'+
	
	'              <div class="form-group">'+
	'                  <p class="rp_subtit">用户信息</p>'+
	'              </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">姓名:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="addUser_name" placeholder="请输入姓名"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">性别:</label>'+
	'                     <div class="radio-list">'+
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="addUser_sex" value="1" checked> 男</div></label>'+
	'                     	<label class="radio-inline" style="padding-top:0px;"><div class="radio"><input type="radio" name="addUser_sex" value="2"> 女</div></label>'+
	'                     </div>'+
	'               </div>'+
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">电话:</label>'+
	'                     <div class="col-sm-5">'+
	'                         <input id="addUser_phone" placeholder="请输入电话"  class="form-control">'+
	'                     </div>'+
	'               </div>'+
//	'               <div class="form-group">'+
//	'                     <label class="col-sm-3 control-label">地址:</label>'+
//	'						<input type="hidden" name=lng id="addUser_lng" />'+
//	'                       <input type="hidden" name="lat" id="addUser_lat" />'+
//	'                       <input type="hidden" name="adcode" id="addUser_adcode" />'+
//	'                       <input type="hidden" name="provinceID" id="addUser_provinceID" />'+
//	'                       <input type="hidden" name="cityID" id="addUser_cityID" />'+
//	'                       <input type="hidden" name="district" id="addUser_district" />'+
//	'                       <input type="hidden" name="district" id="addUser_address" />'+
//	'                     <div class="col-sm-5">'+
//	'                         <input id="addUser_building" placeholder="请输入地址"  class="form-control">'+
//	'                     </div>'+
//	'               </div>'+
	'            </form>'+
	'        </div>'+
	'    </div>'+
	'    <div class="panel-footer">'+
	'         <div class="form-group">'+
	'              <div class="col-sm-12" style="text-align:center">'+
	'                   <button type="button" class="btn btn-sm btn-success modal_save js-btn-saveUser">保存</button>'+    
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
	'              </div>'+
	'          </div>'+
	'     </div>'+    
	'</div>';

function checkMobile(s){  
    var length = s.length;  
    if(length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s) )  
    {  
        return true;  
    }else{  
        return false;  
    }  
}

function G_Fun_showAddUserPanel(keyword,str){
	let dtd = $.Deferred();
	$("#adduser_panel").remove();
	let addUserPanel = new RPModalPanel("adduser_panel", rp_addUserPanelHtml);
	addUserPanel.show();
	G_Util.initMapUtil('addUser_');
	if(checkMobile(keyword)) {
		$("#addUser_phone").val(keyword);
	}
	$("#adduser_panel").off('click').on('click','.js-btn-saveUser', function(){
		var params = {
			name : $("#addUser_name").val(),
			phone : $("#addUser_phone").val(),
			address : $("#addUser_address").val(),
			adcode : $("#addUser_adcode").val(),
			sex : $("input[name=addUser_sex]:checked").val()
		};
		doHttp(params, '/adminjson/SAASSaveOrUpdateUser').then(function(result){
			Toast.success('操作成功!');
			var userId = result.body.id;
			if(str!='home'&&str!='hospital'&&str!='addInsure'){
				$(window.parent.document).contents().find("iframe.selected")[0].contentWindow.loadUserInfoAll(userId);
			}else if(str=='home'){
				orderManage_homeDetail(str,userId,keyword);
			}
			addUserPanel.hide();
			dtd.resolve(result);
			return dtd.promise();
		});
	});
	return dtd.promise();
}
