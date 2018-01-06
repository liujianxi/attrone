
/***********选择护工 begin******************************/
var insure_handle_nure_modal_html = '<div class="modal fade" id="js-modal-select-order-hg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >分配护工</h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'      			<div id="js-div-nureList-hg">'+
'      			</div>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+

'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

/***********护工列表 一对一 begin*******************************/
var institutionHushilist_One = 
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
'			<td><input type="radio" name="js-chk-HG-hsId" class="checkboxes" value="{{item.hgId}}"></td>'+
'			<td>{{item.hgName}}</td>'+
'			<td>{{item.sex}}</td>'+
'			<td>{{item.nursingCertificate}}</td>'+
'			<td>{{item.lastCompleteTime}}</td>'+
'			<td>{{item.isBusy}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getInsureHushilistHtml_One = function(data){
	var render = template.compile(institutionHushilist_One);
	var html = render(data);
	return html;
}
/***********护工列表 一对一 end*********************************/




/***********护工列表 一对多 begin*******************************/
var institutionHushilist_More = 
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
'			<td><input type="radio" name="js-chk-HG-hsId" class="checkboxes" value="{{item.hgId}}"></td>'+
'			<td>{{item.hgName}}</td>'+
'			<td>{{item.sex}}</td>'+
'			<td>{{item.nursingCertificate}}</td>'+
'			<td>{{item.orderCount}}</td>'+
'		</tr>'+
'{{/each}}'+
'	</tbody>'+
'</table>';

var getInsureHushilistHtml_More = function(data){
	var render = template.compile(institutionHushilist_More);
	var html = render(data);
	return html;
}
/***********护工列表 一对多 end*********************************/


var G_OpenSelectOrderHgWin = function(orderId){
	if($('#js-modal-select-order-hg').length > 0 ){
	}else{
		$("body").append(insure_handle_nure_modal_html);
	}
	$('#js-modal-select-order-hg').modal('show');
	$('#js-div-nureList-hg').empty();

	
	G_InsureModule.getOrderHgList(orderId).then(function(data){
		if(data && data.errorCode==0 && data.body){
			var HG=JSON.stringify(data.body);
			if(HG == null || HG == undefined || HG == '' || HG =='{}'){
				return ;
			}
			var sear=new RegExp('isBusy');
			if(sear.test(HG)){
				var tableHtml = getInsureHushilistHtml_One(data.body);
				$('#js-div-nureList-hg').empty().append(tableHtml);
			}else{
				var tableHtmls = getInsureHushilistHtml_More(data.body);
				$('#js-div-nureList-hg').empty().append(tableHtmls);
			}
			
		}
	});
	
	var OKBtn = $("#js-modal-select-order-hg .js-btn-ok");
	
	var getSelectHgInfo = function(){
		var data ;
		var hgId = $('input[name=js-chk-HG-hsId]:checked').val();
		if (hgId === undefined){
			Toast.error("请选择护工！");
			return;
		}else{
			var param = {};
			param["orderId"] = orderId; 
			param["hgId"] = hgId;
			G_OrderModule.AllotHG(param).then(function(result) {
				if(result.errorCode == 0) {
					Toast.success("操作成功");
					OKBtn.unbind("click");
					dtd.resolve(result);
				}
			});
		}
		return {};
	}
	
	var dtd = $.Deferred();
	OKBtn.on('click',function(){
		getSelectHgInfo();
		$('#js-modal-select-order-hg').modal('hide');
	});
	return dtd.promise();
}
/***********选择护工 end******************************/