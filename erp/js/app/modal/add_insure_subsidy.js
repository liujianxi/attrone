
/***********选择护士 begin******************************/
var add_insure_subsidy_modal_html = '<div class="modal fade" id="js-modal-add_insure_subsidy-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top: 250px">'+
'	<div class="modal-dialog" role="document"  style="width: 500px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >发放长护险补贴</h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'           	<form class="form-horizontal" role="form" id="hg_input_form">' +
'				<div class="form-group control-fee"  >' +
'                     <label class="col-sm-4 control-label">消费金额：</label>' +
'                     <div class="col-sm-5">' +
'                         <label class="col-sm-4 " id="control-label-fee"></label>' +
'                     </div>' +
'               </div>' +
'               <div class="form-group control-type-0" style="display:none;" id="control-type-0">' +
'                     <label class="col-sm-4 control-label">居家照护补贴：</label>' +
'                     <div class="col-sm-5">' +
'                         <input type="text" placeholder="" class="form-control js-input-subsidy-money1">' +
'                     </div>&nbsp;&nbsp;元' +
'               </div>' +
'               <div class="form-group control-type-1" style="display:none;" id="control-type-1">' +
'                     <label class="col-sm-4 control-label c">医疗照护补贴：</label>' +
'                     <div class="col-sm-5">' +
'                         <input type="text" placeholder=""  class="form-control js-input-subsidy-money2">' +
'                     </div>&nbsp;&nbsp;元' +
'               </div>' +
'      			</form>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

var G_OpenAddInsureSubsidyWin = function(orderId,type,id,fee){
	
	if($('#js-modal-add_insure_subsidy-win').length > 0 ){
	}else{
		$("body").append(add_insure_subsidy_modal_html);
	}
	$('#js-modal-add_insure_subsidy-win').modal('show');
	var OKBtn = $("#js-modal-add_insure_subsidy-win .js-btn-ok");
	OKBtn.unbind("click");
	
	
	var money1 = $('#js-modal-add_insure_subsidy-win .js-input-subsidy-money1').val("");
	var money2 = $('#js-modal-add_insure_subsidy-win .js-input-subsidy-money2').val("");
	
	$(".form_date").datetimepicker({
		language: 'zh-CN',
		minView: "month",
		format: 'yyyy-mm-dd',
		autoclose: 1
	});
	
	var getInsureSubidyObj = function(){
		var money1 = $('#js-modal-add_insure_subsidy-win .js-input-subsidy-money1').val();
		var money2 = $('#js-modal-add_insure_subsidy-win .js-input-subsidy-money2').val();
		var hgName = $('input[name=js-chk-hsId]:checked').attr("hgName");
		
		
		var obj = {};
		obj['orderId'] = orderId;
		obj['type'] = type;
		obj['id'] = id;
		obj['money1'] = money1;
		obj['money2'] = money2;
		
		return obj;

	}
	
	var dtd = $.Deferred();
	OKBtn.on('click',function(){
		var data = getInsureSubidyObj();
		bootbox.confirm({
			title: "系统提示",
			message: "是否发放补贴金额"+(type == 0?data.money1 : data.money2)+"元",
			buttons: {
				confirm: {
					label: '确定',
//					className: 'btn-success'
				},
				cancel: {
					label: '取消',
//					className: 'btn-danger'
				}
			},
			callback: function(isConfirm) {
				if(isConfirm) {
					var money1 = data.money1;
					var money2 = data.money2;
					var feeNum = fee.replace(',', '');
					if(money1 > feeNum || money2 > feeNum){
						Toast.error("金额不可超过应补贴金额！");
						return false;
					}
					sumitHandle_0(data)
					OKBtn.unbind("click");
					$('#js-modal-add_insure_subsidy-win').modal('hide');
				}
			}
		});
	
	});
	function sumitHandle_0(data){ //提交补贴
	
		doHttp(data, '/adminjson/SAASSaveOrUpdateInsureSubsidy').then(function(data){
			if(data && data.errorCode==0 && data.body){
					Toast.success("操作成功");
						dtd.resolve("1");
					
				}
		});
		
	}
	
	
	
	if(type == 1){
		$("#control-type-1").show();
		$("#control-type-0").hide();
	}
	else {
		$("#control-type-1").hide();
		$("#control-type-0").show();
	}
	$("#control-label-fee").html(fee);
	return dtd.promise();
}
/***********选择护士 end******************************/