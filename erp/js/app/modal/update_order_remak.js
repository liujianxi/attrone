/***********订单备注修改 begin******************************/
var selectgrade_modal_html = '<div class="modal fade" id="js-modal-order-remark" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >订单备注</h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'					<label class="col-sm-2 control-label"><span class="form-required">*</span>备注内容:</label>'+
'                    <div class="col-sm-10">'+
'                        <textarea rows="5" cols="" class="form-control"  name="feedback_reply" placeholder="请输入备注内容"  id="feedback_reply_remark"></textarea>'+
'                        <input type="hidden" id="feedback_id">'+
'                    </div>'+
'				<br/>'+	
'				<br/>'+
'				<br/>'+
'				<br/>'+
'				<br/>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success btn-default-remark-submit">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';






var G_OpenUpdateOrderRemark = function(orderId,orderstatus){
	$("body").remove("#js-modal-order-remark");
	if($('#js-modal-order-remark').length > 0 ){
	}else{
		$("body").append(selectgrade_modal_html);
	}
	$('#js-modal-order-remark').modal('show');
	
	$('#feedback_reply_remark').val("");
	
	$(".btn-default-remark-submit").off('click').on('click',function(){
		var remark = $("#feedback_reply_remark").val();
		sumitHandle_0(remark);
	})
	
	var dtd = $.Deferred();
	function sumitHandle_0(remark){ //保存订单备注
		var param = {};
		param["orderId"] = orderId;
		param["orderstatus"] = orderstatus;
		param["remark"] = remark;
		G_OrderModule.UpdateOrder(param).then(function(data){
			if(data && data.errorCode==0 && data.body){
				Toast.success("操作成功");
					var body = data.body;
					dtd.resolve(body);
			}
			$('#js-modal-order-remark').modal('hide');
		});
		
	}
	
	
	

	
	

	

	
	var dtd = $.Deferred();
	
	return dtd.promise();
}
/***********订单备注修改 end******************************/