
function initRechargeList() {
	doHttp({}, '/adminjson/GetRechargeSetting').then(function(result) {
		var data = result.body;
		var templateHtml = template('rechargeSettingTemplate', result.body);
		// 填充列表
		$("#rcListContainer").html(templateHtml);
	});
}
var user_rc_panel ;
function G_Fun_showUserRechargePanel(userId,accout) {
	var panelHtml = '<div id="userrecharge_panel" class="r_panel">' +
	'    <div class="panel-header">' +
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'        <h4 class="modal-title">用户充值</h4>' +
	'    </div>' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="rc_input_form">' +
	'              <input type="hidden" value="' + userId + '" id = "recharge_userId">' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">套餐列表</p>' +
	'              </div>' +
	'               <div class="form-group">' +
	'                     <div class="col-sm-8" id="rcListContainer">' +
	'                     </div>' +
	'               </div>' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">其他金额</p>' +
	'              </div>' +
	'               <div class="form-group">' +
	'               	<div class="col-sm-5">' +
	'                      <input type="radio" rcid="0" id="radio-1" name="rcs_opt" value="0"> <label for="radio-1">其它金额：</label>' +
	'						<input type="number" class="form-control input-sm js-recharge-fee" autofocus="autofocus" placeholder="单位（元）" id="rechargeFee" style="width:170px;display: inline;height: 50px;font-size: 20px;font-weight: 700;" disabled="disabled">' +
	'                   </div>' +
	'               </div>' +
	'              <div class="form-group recharge-remark">' +
	'               	<div class="col-sm-5">' +
	'                 		<span>备注：</span><textarea></textarea>' +
	'                   </div>' +
	'              </div>' +
	'              <div class="form-group">' +
	'                  <p class="rp_subtit">附加信息</p>' +
	'              </div>' +
	'			<div class="payments">' +
	'				<ul>' +
	'					<li typeid="5" class="selected">现金支付</li>' +
	'					<li>POS机收款</li>' +
	'				</ul>' +
	'				<div class="payCash show">' +
	'					<div class="payCash-left"><img src="images/paycash.png"/></div>' +
	'					<div class="payCash-right">' +
	'						<ul>' +
//	'							<li><span>收到：</span><i><input class="getmoney" type="number" placeholder="请输入金额"/>元</i></li>' +
//	'							<li class="return-changes"><span>找零：</span><i>-<em>0.00</em>元</i></li>' +
	'							<li></li>' +
	'							<li class="return-changes"></li>' +
	'						</ul>' +
	'					</div>' +
	'				</div>' +
	'				<div class="payCards">' +
	'					<div class="payCash-left"><img src="images/bankcard.png"/></div>' +
	'					<div class="payCash-right">' +
	'						<ul>' +
	'							<li class="selected" typeid="41"><i><img src="images/alipay.png" /></i><span>支付宝</span><em><img src="images/branch-ok.png" /></em></li>' +
	'							<li typeid="42"><i><img src="images/unionpay.png" /></i><span>银联储蓄卡</span><em><img src="images/branch-ok.png" /></em></li>' +
	'							<li typeid="44"><i><img src="images/creditcard.png" /></i><span>银联信用卡</span><em><img src="images/branch-ok.png" /></em></li>' +
	'							<li typeid="43"><i><img src="images/qq.png" /></i><span>QQ钱包</span><em><img src="images/branch-ok.png" /></em></li>' +
	'							<li typeid="40"><i><img src="images/wechat.png" /></i><span>微信</span><em><img src="images/branch-ok.png" /></em></li>' +
	'						</ul>' +
	'					</div>' +
	'				</div>' +
	'			</div>' +
//	'               <div class="form-group">' +
//	'                    <label class="col-sm-1" for="rc_payType">支付方式:</label>' +
//	'                    <div class="col-sm-3" style="padding-left:0px;">' +
//	'                        <select class="form-control input-sm" id="rc_payType" >' +
//	'								<option value="5" selected>现金</option>' +
//	'								<option value="4">POS</option>' +
//	'						</select>' +
//	'                     </div>' +
//	'               </div>' +
	'            </form>' +
	'        </div>' +
	'    </div>' +
	'    <div class="panel-footer">' +
	'         <div class="form-group">' +
	'              <div class="col-sm-12" style="text-align:center">' +
	'                   <button type="button" class="btn btn-sm btn-success modal_save js-btn-userRecharge">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';
	user_rc_panel = new RPModalPanel("userrecharge_panel", panelHtml);
	user_rc_panel.show();
	let dtd = $.Deferred();
	$("#rc_input_form")[0].reset();
	$('#userrecharge_panel').on('change','input[name=rcs_opt]', function() {
		var rcid = $(this).attr('rcid');
		if(rcid == 0) {
			$("#rechargeFee").prop('disabled', false);
		}else{
			$("#rechargeFee").prop('disabled', true);
			$("#rechargeFee").val('');
		}
	});
	initRechargeList();
	$('#userrecharge_panel .payments>ul li').off('click').on('click',function(){
		for(let i=0;i<$('#userrecharge_panel .payments>ul li').length;i++){
			$('#userrecharge_panel .payments>ul li').eq(i).removeClass('selected');
		};
		$(this).addClass('selected');
		if($('#userrecharge_panel .payments>ul li').eq(0).hasClass('selected')){
			$('#userrecharge_panel .payments .payCards').removeClass('show');
			$('#userrecharge_panel .payments .payCash').addClass('show');
		}else{
			$('#userrecharge_panel .payments .payCards').addClass('show');
			$('#userrecharge_panel .payments .payCash').removeClass('show');
		}
	});
	$('#userrecharge_panel .payments .payCards .payCash-right ul li').off('click').on('click',function(){
		for(let i=0;i<$('#userrecharge_panel .payments .payCards .payCash-right ul li').length;i++){
			$('#userrecharge_panel .payments .payCards .payCash-right ul li').eq(i).removeClass('selected');
		};
		$(this).addClass('selected');
	});
	let click_flag=true;
	$("body").off('click','.js-btn-userRecharge').on('click', '.js-btn-userRecharge', function() {
		if($("input[name=rcs_opt]:checked").length == 0){
			Toast.error("请选择套餐或输入金额");
			return false;
		}
		let recharge_remark=$('.recharge-remark textarea').val();
		if(parseFloat($("#rechargeFee").val()) <0){
			let curr_count=$("#rechargeFee").val().replace('-','');
			if(curr_count>accout){//充值金额比总金额大
				Toast.error("提现金额大于充值金额，充值失败");
				return false;
			}
			if(recharge_remark==''){
				Toast.error("请输入充值备注");
				return false;
			}
		}
		var params = {
			remark:recharge_remark,
			userId: $("#recharge_userId").val(),
			rcId : $("input[name=rcs_opt]:checked").attr('rcid'),
			fee : $("#rechargeFee").val()		
		};
		if($('#userrecharge_panel .payments>ul li:nth-child(1)').hasClass('selected')){
			params['payType']=$('#userrecharge_panel .payments>ul li:nth-child(1)').attr('typeid');
		}else{
			params['payType']=$('#userrecharge_panel .payments .payCards .payCash-right ul li.selected').attr('typeid');
		}
		console.log(params);
		if(!click_flag){
			return false;
		}
		click_flag=false;
		doHttp(params, '/adminjson/SAASRechargeforUser').then(function(result) {
			Toast.success('操作成功!');
			user_rc_panel.hide();
			setTimeout(function(){
				click_flag=true;
			},500);
			dtd.resolve();
			return dtd.promise();
		},(res)=>{
			setTimeout(function(){
				click_flag=true;
			},500);
		});
	});
	return dtd.promise();
}