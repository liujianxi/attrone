
var rp_UpdateAlterationHtmls = '<div id="panel_update_price" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title"></h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" id="role_input_form">'+

'              <div class="form-group Update_price">'+


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
'			<td><input type="radio" name="js-chk-price-Id" class="checkboxes"  priceStr="{{item.priceStr}}" bedName="{{item.serviceItem}}" serviceType="{{item.serviceType}}" value="{{item.priceId}}"></td>'+
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




function G_Fun_showUpdatepriveations(param){
	var panels = new RPModalPanel("panel_update_price", rp_UpdateAlterationHtmls);
	panels.show();
	var orgId = param.orgId;
	var orderId = param.orderId;
	var OKBtn = $("#panel_update_price .js-btn-confirm").unbind("click");
	var titleDiv = $('#panel_update_price .modal-title');
	titleDiv.html("选择服务");
	var params = {};
	params["orgId"] = orgId; 
	params["branchId"] = param.branchId;
	params["orderType"] = param.orderType;
	params["orderId"] = param.orderId;
	params["servicesType"] = 1;
	doHttp(params, '/adminjson/SAASGetPriceList').then(function(data){
		if(data && data.errorCode==0 && data.body){
			var priceLists = data.body.priceList;
			if(priceLists != undefined){
				var priceo2oList = priceLists[0].o2oPriceList;
				var priceo2nList = priceLists[0].o2nPriceList;
				console.log(priceo2oList);
				console.log(priceo2nList);
				if(priceo2oList != undefined || priceo2nList != undefined){
					var priceList = [];
					var priceListss = [];
					if(priceo2nList != undefined){
						priceLists = priceo2oList.concat(priceo2nList);
					}
					
					if(priceLists.length > 0){
						priceList = priceLists;
					}else {
						priceList = priceo2oList;
					}
					console.log(priceo2oList);
					console.log(priceo2nList);
					console.log(priceLists);
					console.log(priceList);
					for(var i = 0; i < priceList.length; i++) {
						if(priceList[i].state == "-1" || priceList[i].serviceType == 199 || priceList[i].serviceType == 99){
							priceList.splice(i, 1);
						}
					}
					var priceListitem = {"priceList":priceList};
					var tableHtml = getUpdatePriceIdHushilistHtml(priceListitem);
					$('.Update_price').empty().html(tableHtml);
				}else{
					var tableHtml = getUpdatePriceIdHushilistHtml(data.body);
					$('.Update_price').empty().html(tableHtml);
				}
			}
		}
	});
	
	var dtd = $.Deferred();
	OKBtn.on('click',function(){
			var branchId = $('input[name=js-chk-price-Id]:checked');
			if (branchId.length <= 0){
				Toast.error("请选择服务！");
				return;
			}else{
				var data ={};
				data["branchName"] = branchId.attr("bedName");
				data["branchId"] = branchId.val();
				data["priceStr"] = branchId.attr("priceStr");
				data["serviceType"] = branchId.attr("serviceType");
				dtd.resolve(data);
				panels.hide();
			}
	});
	
	return dtd.promise();
}
