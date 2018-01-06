
var rp_UpdateAlterationHtml = '<div id="panel_update_alteration" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title"></h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" id="role_input_form">'+

'              <div class="form-group Update_Alteration">'+


'              </div>'+


'            </form>'+
'        </div>'+
'    </div>'+
'    <div class="panel-footer">'+
'         <div class="form-group">'+
'              <div class="col-sm-12" style="text-align:center">'+
'                   <button type="button" class="btn btn-sm btn-success js-btn-confirm">确定</button>'+    
'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
'              </div>'+
'          </div>'+
'     </div>'+    
'</div>';
	


/***********列表  begin*******************************/
var UpdateAlterationHushilist = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>科室</th>'+
'			<th>机构名</th>'+
'			<th>所在城市</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each branchList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-branch-Id" class="checkboxes_branch" branchName="{{item.branchName}}" value="{{item.id}}"></td>'+
'			<td>{{item.branchName}}</td>'+
'			<td>{{item.orgName}}</td>'+
'			<td>{{item.city}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';


var getUpdateAlterationHushilistHtml = function(data){
	var render = template.compile(UpdateAlterationHushilist);
	var html = render(data);
	return html;
}
/***********机构列表  end*********************************/



/***********房间  begin*******************************/
var UpdateRoomIdHushilist = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>房间</th>'+
'			<th>科室</th>'+
'			<th>机构</th>'+
'			<th>所在城市</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each roomList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-room-Id"  class="checkboxes" roomName="{{item.roomNo}}" value="{{item.roomId}}"></td>'+
'			<td>{{item.roomNo}}</td>'+
'			<td>{{item.branchName}}</td>'+
'			<td>{{item.orgName}}</td>'+
'			<td>{{item.city}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';


var getUpdateroomIdHushilistHtml = function(data){
	var render = template.compile(UpdateRoomIdHushilist);
	var html = render(data);
	return html;
}
/***********房间  end*********************************/


/***********床位  begin*******************************/
var UpdateBedIdHushilist = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>床位</th>'+
'			<th>创建时间</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each bedList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-bed-Id" class="checkboxes" bedName="{{item.bedNo}}" value="{{item.bedId}}"></td>'+
'			<td>{{item.bedNo}}</td>'+
'			<td>{{item.createTime}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';


var getUpdateBedIdHushilistHtml = function(data){
	var render = template.compile(UpdateBedIdHushilist);
	var html = render(data);
	return html;
}
/***********床位  end*********************************/

/***********服务  begin*******************************/
var UpdatePriceIdHushilist = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>服务项</th>'+
'			<th>类型</th>'+
'			<th>价格</th>'+
'			<th>时间</th>'+
'			<th>套餐</th>'+
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each priceList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-price-Id" class="checkboxes"  priceStr="{{item.priceStr}}" bedName="{{item.serviceItem}}" value="{{item.priceId}}"></td>'+
'			<td>{{item.serviceItem}}</td>'+
'			<td>{{item.serviceTypeStr}}</td>'+
'			<td>{{item.priceStr}}</td>'+
'			<td>{{item.serviceUnitStr}}</td>'+
'			<td>{{item.serviceItem}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';


var getUpdatePriceIdHushilistHtml = function(data){
	var render = template.compile(UpdatePriceIdHushilist);
	var html = render(data);
	return html;
}
/***********服务  end*********************************/



/***********护工列表 一对一 begin*******************************/
var UpdateHgIdHushilist_One = 
'<table class="table table-striped">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>姓名</th>'+
'      		<th>性别</th>'+
'      		<th>是否有护理证</th>'+
'      		<th>最近一单护理时间</th>'+
'           <th>是否空闲</th>'+				
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each hgList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-HG-hsId" class="checkboxes" bedName="{{item.hgName}}"  value="{{item.hgId}}"></td>'+
'			<td>{{item.hgName}}</td>'+
'			<td>{{item.sex}}</td>'+
'			<td>{{item.nursingCertificate}}</td>'+
'			<td>{{item.lastCompleteTime}}</td>'+
'			<td>{{item.isBusy}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getUpdateHgIdHushilistHtml_One = function(data){
	var render = template.compile(UpdateHgIdHushilist_One);
	var html = render(data);
	return html;
}
/***********护工列表 一对一 end*********************************/




/***********护工列表 一对多 begin*******************************/
var UpdateHgIdHushilist_More = 
'<table class="table table-stripeds">'+
'	<thead>'+
'		<tr>'+
'			<th>#</th>'+
'			<th>姓名</th>'+
'      		<th>性别</th>'+
'      		<th>是否有护理证</th>'+
'           <th>已服务数量</th>'+				
'      	</tr>'+
'	</thead>'+
'	<tbody>'+
'{{each hgList as item i}}'+
'		<tr>'+
'			<td><input type="radio" name="js-chk-HG-hsId" class="checkboxes" bedName="{{item.hgName}}" value="{{item.hgId}}"></td>'+
'			<td>{{item.hgName}}</td>'+
'			<td>{{item.sex}}</td>'+
'			<td>{{item.nursingCertificate}}</td>'+
'			<td>{{item.orderCount}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getUpdateHgIdHushilistHtml_More = function(data){
	var render = template.compile(UpdateHgIdHushilist_More);
	var html = render(data);
	return html;
}
/***********护工列表 一对多 end*********************************/


/***********预付金-订单支付 start*********************************/

function G_fun_showPrepay_order(obj){
	let prepay_panellHtml='<div id=prepay_panel class="r_panel">'+
		'<div class="panel-header">'+
			'<p>订单收款</p>'+
		'</div>'+
		'<div class="prepay-panel-content">'+
		'	<div class=pay-detail>'+
		'		<div class=detail-left>'+
		'			<ul>'+
		'				<li><span>订单编号：</span><i>'+obj.orderId+'</i></li>'+
		'				<li class=contact-person><span>被服务人：</span><i></i></li>'+
		'				<li class=order-status><span>订单状态：</span><i></i></li>'+
		'				<li><span>备注：</span><i></i></li>'+
		'			</ul>'+
		'		</div>'+
		'		<div class=detail-right>'+
		'			<dl>'+
//		'				<dd><span>预付款总额/已抵扣：</span><i>0.00</i>/<i>0.00</i></dd>'+
		'				<dd class=pay-entranceFee><span>押金：</span><i></i>元</dd>'+
//		'				<dd><span>累计服务费用/已支付：</span><i>0.00</i>/<i>0.00</i></dd>'+
		'			</dl>'+
		'			<div class=unpaid-fee><span>待支付费用：</span><i>300.00</i>元</div>'+
		'			<p><span>（预付款：</span><i  class=pay-preRealFee>300.00</i>元<span>+押金：</span><i class=pay-entranceFee>100.00</i>元）</p>'+
		'		</div>'+
		'	</div>'+
		'</div>'+
		'<div class="panel-footer">'+
		'	<div class=pay-footer>'+
		'		<div class=footer-left>'+
		'			<ul>'+
		'				<li keyvalue=5 class=selected>现金支付</li>'+
		'				<li keyvalue=4>POS</li>'+
//		'				<li keyvalue=2>支付宝扫码</li>'+
//		'				<li keyvalue=3>微信扫码</li>'+
		'			</ul>'+
		'		</div>'+
		'		<div class=footer-right>'+
		'			<dl>'+
		'				<dd class="pay-money"><span>金额：</span><i></i>元</dd>'+
		'				<dd class="pay-code"><span>支付码：</span><input type=text placeholder="请输入支付码"/>  </dd>'+
		'				<dd class="pay-cash pay-cashin"><span>收到：</span><input type=text placeholder="请输入金额"/> 元</dd>'+
		'				<dd class="pay-cash pay-change"><span>找零：</span>-<i>0.00</i> 元</dd>'+
		'				<dd class="sure-money"><i>确定收款</i></dd>'+
		'			</dl>'+
		'		</div>'+
		'	</div>'+
		'</div>'+
'</div>';
	let prepay_modal = new RPModalPanel("prepay_panel", prepay_panellHtml);
	prepay_modal.show();
	if(obj.type=='prepay'){//支付预交金
		$('#prepay_panel .detail-right p').css({
			'display':'block',
		});
		let param = {
		orderId:obj.orderId,
		};
		doHttp(param, '/adminjson/SAASPrePayAmountDetail').then((res)=>{
			let pre_body=res.body;
			let pre_order=res.body.order[0];
			//被服务人
			$('#prepay_panel .contact-person i').html(pre_order.kinsName||'');
			//订单状态
			$('#prepay_panel .order-status i').html(pre_order.statusStr||'');
			//备注
			$('#prepay_panel .detail-left ul li:nth-last-child(1) i').html(pre_order.locationMinute||'');
			//押金
			$('#prepay_panel .detail-right dd.pay-entranceFee i').html(pre_body.entranceFee||0.00);
			//待支付费用
			$('#prepay_panel .detail-right .unpaid-fee i').html(pre_body.needPay||0.00);
			$('#prepay_panel .detail-right p .pay-preRealFee').html(pre_order.preRealFee||0.00);
			$('#prepay_panel .detail-right p .pay-entranceFee').html(pre_body.entranceFee||0.00);
			//支付金额
			$('#prepay_panel .footer-right .pay-money i').html(pre_body.needPay||0.00);
		})
	}else{//中间支付
		$('#prepay_panel .detail-right p').css({
			'display':'none',
		});
		let param = {
			orderId:obj.orderId,
			settIds:obj.months,
		};
		doHttp(param, '/adminjson/SAASSettlPayDetail').then((res)=>{
			let pre_body=res.body;
			let pre_order=res.body.order[0];
			//被服务人
			$('#prepay_panel .contact-person i').html(pre_order.kinsName||'');
			//订单状态
			$('#prepay_panel .order-status i').html(pre_order.statusStr||'');
			//备注
			$('#prepay_panel .detail-left ul li:nth-last-child(1) i').html(pre_order.locationMinute||'');
			//押金
			$('#prepay_panel .detail-right dd.pay-entranceFee i').html(pre_body.entranceFee||0.00);
			//待支付费用
			$('#prepay_panel .detail-right .unpaid-fee i').html(pre_body.needPay||0.00);
			$('#prepay_panel .detail-right p .pay-preRealFee').html(pre_order.preRealFee||0.00);
			$('#prepay_panel .detail-right p .pay-entranceFee').html(pre_body.entranceFee||0.00);
			//支付金额
			$('#prepay_panel .footer-right .pay-money i').html(pre_body.needPay||0.00);
		})
	}
	
	$('body').off('click','#prepay_panel .footer-left ul li').on('click','#prepay_panel .footer-left ul li',function(){
		for(let i=0;i<$('#prepay_panel .footer-left ul li').length;i++){
			$('#prepay_panel .footer-left ul li').eq(i).removeClass('selected');
		}
		$(this).addClass('selected');
	});
	$('#prepay_panel .footer-right .pay-cashin input').keyup(function(){
		let inputValue=$('#prepay_panel .footer-right .pay-cashin input').val();
		if(parseFloat(inputValue)>parseFloat($('#prepay_panel .footer-right .pay-money i').html())){
			let num=parseFloat(inputValue)-parseFloat($('#prepay_panel .footer-right .pay-money i').html());
			num = num.toFixed(2);
			$('#prepay_panel .footer-right .pay-change i').html(num);
		}else{
			$('#prepay_panel .footer-right .pay-change i').html('0.00');
		}
	});
	$('#prepay_panel .footer-right .sure-money').off('click').on('click',function(){
		let prepay_payType;
		if($('#prepay_panel .footer-left ul li').eq(0).hasClass('selected')){
			prepay_payType=5;//现金
		}else{
			prepay_payType=4;//POS
		}
		let httpUtilObj = new HttpUtil();
		let data = {
			userId: obj.userId,
			orderId: obj.orderId,
			payType: prepay_payType,
			operation: obj.type=='prepay'?'PAY_PREAMOUNT':'PAY_ORDERSETTLE',
			months:obj.months||'',
		}
		console.log(data);
		let inputValue=$('#prepay_panel .footer-right .pay-cashin input').val();
		if(inputValue==''){
			Toast.error("请输入收款金额");
			return;
		}
		let curr_money=$('#prepay_panel .footer-right .pay-money i').html();
		curr_money=curr_money.replace(',','');
		if((parseFloat(inputValue)<parseFloat(curr_money))&&inputValue!=''){
			Toast.error("收款不足,请重试");
			return;
		}
		httpUtilObj.ajax({
			url: '/adminjson/DoPay',
			params: data
		}).then((res)=>{
			$(window.parent.document).contents().find('iframe.selected')[0].contentWindow.location.reload();
			$('#rp-wrapper').empty();
			$('#transparent-mask').hide();
			Toast.success("创建成功");
		}, (res) => {
			if (res.errorCode == 8) {
				$('#rp-wrapper').empty();
				$('#transparent-mask').hide();
			}
		});
	})
}

/***********预付金-订单支付 end*********************************/
function G_Fun_showUpdateAlteration(param){
	$("#panel_update_alteration .checkboxes_branch").off("click");
	var panel = new RPModalPanel("panel_update_alteration", rp_UpdateAlterationHtml);
	panel.show();
	var orgId = param.orgId;
	var typeName = param.typeName;
	var orderId = param.orderId;
	var OKBtn = $("#panel_update_alteration .js-btn-confirm").unbind("click");
	var titleDiv = $('#panel_update_alteration .modal-title');
	if (titleDiv != undefined){
		if(typeName === 'branchName'){
			
			titleDiv.html("选择科室");
			var param = {};
			param["orgId"] = orgId; 
			doHttp(param, '/adminjson/SAASGetBranchpriceList').then(function(data){
				if(data && data.errorCode==0 && data.body){
					var tableHtml = getUpdateAlterationHushilistHtml(data.body);
					$('.Update_Alteration').empty().html(tableHtml);
					$("#panel_update_alteration .checkboxes_branch").unbind("click");
					 
				}
			});
			
		}else if(typeName === 'roomNo'){
			titleDiv.html("选择房间");
		
			var params = {};
			params["orgId"] = orgId; 
			params["branchId"] = param.branchId;
			doHttp(params, '/adminjson/SAASGetRoomListInfo').then(function(data){
				if(data && data.errorCode==0 && data.body){
					var tableHtml = getUpdateroomIdHushilistHtml(data.body);
					$('.Update_Alteration').empty().html(tableHtml);
				}
			});
			
			
		}else if(typeName === 'bedNo'){
			titleDiv.html("选择床位");
			var params = {};
			params["orgId"] = orgId; 
			params["branchId"] = param.branchId;
			params["roomId"] = param.roomId;
			doHttp(params, '/adminjson/SAASGetBedBranchList').then(function(data){
				if(data && data.errorCode==0 && data.body){
					var tableHtml = getUpdateBedIdHushilistHtml(data.body);
					$('.Update_Alteration').empty().html(tableHtml);

				}
			});
		}
		else if(typeName === 'hgName'){
			titleDiv.html("选择护工");
			var params = {};
			params["orgId"] = orgId; 
			params["orderId"] = orderId; 
			params["branchId"] = param.branchId;
			params["priceId"] = param.priceId;
			doHttp(params, '/adminjson/SAASGetServeHGList').then(function(data){
				if(data && data.errorCode==0 && data.body){
					var HG=JSON.stringify(data.body);
					if(HG == null || HG == undefined || HG == '' || HG =='{}'){
						return ;
					}
					var sear=new RegExp('isBusy');
					if(sear.test(HG)){
						var tableHtml = getUpdateHgIdHushilistHtml_One(data.body);
						$('.Update_Alteration').empty().append(tableHtml);
					}else{
						var tableHtmls = getUpdateHgIdHushilistHtml_More(data.body);
						$('.Update_Alteration').empty().append(tableHtmls);
					}
				}
			});
		}
		else if(typeName === 'serviceItem'){
			titleDiv.html("选择服务");
			var params = {};
			params["orgId"] = orgId; 
			params["branchId"] = param.branchId;
			doHttp(params, '/adminjson/SAASGetPriceList').then(function(data){
				if(data && data.errorCode==0 && data.body){
					var priceLists = data.body.priceList;
					if(priceLists != undefined){
						var priceo2oList = priceLists[0].o2oPriceList;
						var priceo2nList = priceLists[0].o2nPriceList;
						var priceList = priceo2oList.concat(priceo2nList)
						var priceListitem = {"priceList":priceList};
						var tableHtml = getUpdatePriceIdHushilistHtml(priceListitem);
						$('.Update_Alteration').empty().html(tableHtml);
					}
				}
			});
		}
	}
	
	
	
	

	
	var dtd = $.Deferred();
	OKBtn.on('click',function(){
		if (titleDiv != undefined){
			if(typeName === 'branchName'){
				var branchId = $('input[name=js-chk-branch-Id]:checked');
				if (branchId.length <= 0){
					Toast.error("请选择科室！");
					return;
				}else{
					if(priceId === 0 || priceName === "" || priceStr === ""){
						Toast.error("请选择服务");
						return;
					}
					var data ={};
					data["branchName"] = branchId.attr("branchName");
					data["branchId"] = branchId.val();
					data["priceId"] =  priceId;
					data["priceName"] = priceName;
					data["priceStr"] = priceStr;
					dtd.resolve(data);
					panel.hide();
				}
			}else if(typeName === 'roomNo'){
				var branchId = $('input[name=js-chk-room-Id]:checked');
				if (branchId.length <= 0){
					Toast.error("请选择房间号！");
					return;
				}else{
					var data ={};
					data["branchName"] = branchId.attr("roomName");
					data["branchId"] = branchId.val();
					
					dtd.resolve(data);
					panel.hide();
				}
				
				
			}else if(typeName === 'bedNo'){
				var branchId = $('input[name=js-chk-bed-Id]:checked');
				if (branchId.length <= 0){
					Toast.error("请选择床位！");
					return;
				}else{
					var data ={};
					data["branchName"] = branchId.attr("bedName");
					data["branchId"] = branchId.val();
					
					dtd.resolve(data);
					panel.hide();
				}
			}
			else if(typeName === 'hgName'){
				var branchId = $('input[name=js-chk-HG-hsId]:checked');
				if (branchId.length <= 0){
					Toast.error("请选择护士！");
					return;
				}else{
					var data ={};
					data["branchName"] = branchId.attr("bedName");
					data["branchId"] = branchId.val();
					
					dtd.resolve(data);
					panel.hide();
				}
			}
			else if(typeName === 'serviceItem'){
				var branchId = $('input[name=js-chk-price-Id]:checked');
				if (branchId.length <= 0){
					Toast.error("请选择服务！");
					return;
				}else{
					var data ={};
					data["branchName"] = branchId.attr("bedName");
					data["branchId"] = branchId.val();
					data["priceStr"] = branchId.attr("priceStr");
					
					dtd.resolve(data);
					panel.hide();
				}
			}
		}
		
	});
	var priceId = 0 ;
	var priceName = "";
	var priceStr = "";
	 $("#panel_update_alteration").on('click',".checkboxes_branch", function(){
		 var clickBox = $(this).val();
		 	top.importOnceJS('js-script-panel-update-price',"js/app/rp/select_price.js");
			var param = {};
			param["branchId"] = clickBox;
			param["orgId"] = orgId;
			param["orderId"] = orderId;
			param["orderType"] = 1;
			top.G_Fun_showUpdatepriveation(param).then(function(data){
				priceId = data.branchId;
				priceName = data.branchName;
				priceStr = data.priceStr;
			});
	 });
	
	
	return dtd.promise();
}

