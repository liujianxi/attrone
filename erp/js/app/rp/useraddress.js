
var rp_addUserAddressPanelHtml = '<div id="userAddress_panel" class="r_panel" style="z-index:3;">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">新增地址</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="u_add_input_form">' +

	'              <div class="form-group">' +
	'                  <p class="rp_subtit">地址信息</p>' +
	'              </div>' +
	'               <div class="form-group userAddress_panel_username">' +
	'                     <label class="col-sm-3 control-label">姓名:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="userAddress_name" placeholder="请输入姓名"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group userAddress_panel_phone">' +
	'                     <label class="col-sm-3 control-label">电话:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="userAddress_phone" placeholder="请输入电话"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">地址:</label>' +
	'						<input type="hidden" name=lng id="userAddress_lng" />' +
	'                       <input type="hidden" name="lat" id="userAddress_lat" />' +
	'                       <input type="hidden" name="adcode" id="userAddress_adcode" />' +
	'                       <input type="hidden" name="provinceID" id="userAddress_provinceID" />' +
	'                       <input type="hidden" name="cityID" id="userAddress_cityID" />' +
	'                       <input type="hidden" name="district" id="userAddress_district" />' +
	'                       <input type="hidden" name="district" id="userAddress_address" />' +
	'                     <div class="col-sm-5">' +
	'                         <input id="userAddress_building" placeholder="请输入地址"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'               <div class="form-group">' +
	'                     <label class="col-sm-3 control-label">门牌号:</label>' +
	'                     <div class="col-sm-5">' +
	'                         <input id="userAddress_addrDetail" placeholder="请输入门牌号"  class="form-control">' +
	'                     </div>' +
	'               </div>' +
	'            </form>' +
	'        </div>' +
	'    </div>' +
	'    <div class="panel-footer">' +
	'         <div class="form-group">' +
	'              <div class="col-sm-12" style="text-align:center">' +
	'                   <button type="button" class="btn btn-sm btn-success modal_save js-btn-saveUserAddress">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';
function G_Fun_showAddUserAddressPanel(id, str) {
	let dtd = $.Deferred();
	var useraddress_panel = new RPModalPanel("userAddress_panel", rp_addUserAddressPanelHtml);
	if (str == 'change_addr') {
		G_Util.initMapUtil('userAddress_');
		useraddress_panel.show();
		$("#userAddress_building").val('');
		$("#userAddress_addrDetail").val('');
		$('#userAddress_panel .modal-title').html('修改地址');
		$('#userAddress_panel .userAddress_panel_username').hide();
		$('#userAddress_panel .userAddress_panel_phone').hide();
		$("body").off('click', '.js-btn-saveUserAddress').on('click', '.js-btn-saveUserAddress', function () {
			var params = {
				insureNO: id,
				building: $("#userAddress_building").val(),
				addrDetail: $("#userAddress_addrDetail").val(),
				adCode: $("#userAddress_adcode").val()
			};
			doHttp(params, '/adminjson/SAASUpdateInsureInfo').then(function (result) {
				Toast.success('操作成功!');
				useraddress_panel.hide();
				dtd.resolve(result.body.addrDetail);
				return dtd.promise();
			});
		});
	} else {
		$("#userAddress_building").val('');
		$('#userAddress_panel .modal-title').html('新增地址');
		$("#u_add_input_form")[0].reset();
		useraddress_panel.show();
		$('#userAddress_panel .userAddress_panel_username').show();
		$('#userAddress_panel .userAddress_panel_phone').show();
		G_Util.initMapUtil('userAddress_');
		$("body").off('click', '.js-btn-saveUserAddress');
		$("body").on('click', '.js-btn-saveUserAddress', function () {
			var params = {
				building: $("#userAddress_building").val(),
				userId: G_Util.getObjIdByName(idArray, 'userId'),
				contacts: $("#userAddress_name").val(),
				phone: $("#userAddress_phone").val(),
				address: $("#userAddress_address").val(),
				addrDetail: $("#userAddress_addrDetail").val(),
				adCode: $("#userAddress_adcode").val()
			};
			doHttp(params, '/adminjson/SAASAddUserAddress').then(function (result) {
				Toast.success('操作成功!');
				useraddress_panel.hide();
				if (id == undefined && str == undefined) {
					$(window.parent.document).contents().find("iframe.selected")[0].contentWindow.showUserInfo();
				}
				dtd.resolve();
				return dtd.promise();
			});
		});
	}
	return dtd.promise();
}

$('.js-addUserAddr').on('click', function () {
	// G_Fun_showAddHGPanel();
});

//var buildingEle = $('#' + widgetPrefix + 'building');
//buildingEle.keydown(function() {
//	var offset1 = $(".amap-sug-result").offset().left;
//	var targetoffset = buildingEle.offset().left;
//	if(offset1 != targetoffset){
//		console.info('offset1:' +offset1);
//		console.info('targetoffset:' +targetoffset);
//		console.info('changechangefuckfuck');				
//		$(".amap-sug-result").css('left', targetoffset);
//		$(".amap-sug-result").css('visibility', 'visible');
//	}
//});