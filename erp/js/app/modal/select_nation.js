/***********选择民族 begin******************************/

var selectnation_modal_html = '<div class="modal fade" id="js-modal-selectnation-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 500px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >选择民族</h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'<button type="button" class="btn btn-default btn-sm">汉族</button>'+
'<button type="button" class="btn btn-default btn-sm">壮族</button>'+
'<button type="button" class="btn btn-default btn-sm">满族</button>'+
'<button type="button" class="btn btn-default btn-sm">回族</button>'+
'<button type="button" class="btn btn-default btn-sm">苗族</button>'+
'<button type="button" class="btn btn-default btn-sm">维吾尔族</button>'+
'<button type="button" class="btn btn-default btn-sm">土家族</button>'+
'<button type="button" class="btn btn-default btn-sm">彝族</button>'+
'<button type="button" class="btn btn-default btn-sm">蒙古族</button>'+
'<button type="button" class="btn btn-default btn-sm">藏族</button>'+
'<button type="button" class="btn btn-default btn-sm">布依族</button>'+
'<button type="button" class="btn btn-default btn-sm">侗族</button>'+
'<button type="button" class="btn btn-default btn-sm">瑶族</button>'+
'<button type="button" class="btn btn-default btn-sm">朝鲜族</button>'+
'<button type="button" class="btn btn-default btn-sm">白族</button>'+
'<button type="button" class="btn btn-default btn-sm">哈尼族</button>'+
'<button type="button" class="btn btn-default btn-sm">哈萨克族</button>'+
'<button type="button" class="btn btn-default btn-sm">黎族</button>'+
'<button type="button" class="btn btn-default btn-sm">傣族</button>'+
'<button type="button" class="btn btn-default btn-sm">畲族</button>'+
'<button type="button" class="btn btn-default btn-sm">傈僳族</button>'+
'<button type="button" class="btn btn-default btn-sm">仡佬族</button>'+
'<button type="button" class="btn btn-default btn-sm">东乡族</button>'+
'<button type="button" class="btn btn-default btn-sm">高山族</button>'+
'<button type="button" class="btn btn-default btn-sm">拉祜族</button>'+
'<button type="button" class="btn btn-default btn-sm">水族</button>'+
'<button type="button" class="btn btn-default btn-sm">佤族</button>'+
'<button type="button" class="btn btn-default btn-sm">纳西族</button>'+
'<button type="button" class="btn btn-default btn-sm">羌族</button>'+
'<button type="button" class="btn btn-default btn-sm">土族</button>'+
'<button type="button" class="btn btn-default btn-sm">仫佬族</button>'+
'<button type="button" class="btn btn-default btn-sm">锡伯族</button>'+
'<button type="button" class="btn btn-default btn-sm">柯尔克孜族</button>'+
'<button type="button" class="btn btn-default btn-sm">达斡尔族</button>'+
'<button type="button" class="btn btn-default btn-sm">景颇族</button>'+
'<button type="button" class="btn btn-default btn-sm">毛南族</button>'+
'<button type="button" class="btn btn-default btn-sm">撒拉族</button>'+
'<button type="button" class="btn btn-default btn-sm">布朗族</button>'+
'<button type="button" class="btn btn-default btn-sm">塔吉克族</button>'+
'<button type="button" class="btn btn-default btn-sm">阿昌族</button>'+
'<button type="button" class="btn btn-default btn-sm">普米族</button>'+
'<button type="button" class="btn btn-default btn-sm">鄂温克族</button>'+
'<button type="button" class="btn btn-default btn-sm">怒族</button>'+
'<button type="button" class="btn btn-default btn-sm">京族</button>'+
'<button type="button" class="btn btn-default btn-sm">基诺族</button>'+
'<button type="button" class="btn btn-default btn-sm">德昂族</button>'+
'<button type="button" class="btn btn-default btn-sm">保安族</button>'+
'<button type="button" class="btn btn-default btn-sm">俄罗斯族</button>'+
'<button type="button" class="btn btn-default btn-sm">裕固族</button>'+
'<button type="button" class="btn btn-default btn-sm">乌孜别克族</button>'+
'<button type="button" class="btn btn-default btn-sm">门巴族</button>'+
'<button type="button" class="btn btn-default btn-sm">鄂伦春族</button>'+
'<button type="button" class="btn btn-default btn-sm">独龙族</button>'+
'<button type="button" class="btn btn-default btn-sm">塔塔尔族</button>'+
'<button type="button" class="btn btn-default btn-sm">赫哲族</button>'+
'<button type="button" class="btn btn-default btn-sm">珞巴族</button>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-ok">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';


var G_OpenSelectNationWin = function(phone){
	if($('#js-modal-selectnation-win').length > 0 ){
	}else{
		$("body").append(selectnation_modal_html);
	}
	$('#js-modal-selectnation-win').modal('show');
	$("#js-modal-selectnation-win .modal-body button").css("margin","3px");
	//清空所有的选择
	$("#js-modal-selectnation-win .modal-body button").removeClass("btn-success");
	
	$("#js-modal-selectnation-win .modal-body button").off('click').on('click',function(){
		$("#js-modal-selectnation-win .modal-body button").removeClass("btn-success");
		$(this).addClass("btn-success");
	});
	
	var getVal = function(){
		var obj = $("#js-modal-selectnation-win .modal-body .btn-success");
		if(obj.length>0){
			return obj.html();
		}
	}
	
	var OKBtn = $("#js-modal-selectnation-win .js-btn-ok");
	var dtd = $.Deferred();
	OKBtn.off('click').on('click',function(){
		var data = getVal();
		if(data){
			dtd.resolve(data);
			$('#js-modal-selectnation-win').modal('hide');
		}else{
			Toast.error("请选择民族");
		}
	});
	return dtd.promise();
}
