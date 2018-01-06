
/***********微信二维码 begin******************************/
var insure_Superior_modal_html = '<div class="modal fade" id="js-modal-wx-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 500px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title"></h4>'+
'      		</div>'+
'      		<div class="modal-body" style="width: 500px;height: 500px;">'+
'				<img src="" style="width:100%; height:100%;" class = "js-wx-img-url" id="js-wx-img-url" >'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';


/**********微信二维码 end*********************************/





var G_Fun_showWxPanel = function(hgId,branchId,companyOrgId,wxType){
	if($('#js-modal-wx-win').length > 0 ){
	}else{
		$("body").append(insure_Superior_modal_html);
	}
	$("#js-wx-img-url").attr('src',""); 
	$('#js-modal-wx-win').modal('show');
	var title = "";
	var titleDiv = $('#js-modal-wx-win .modal-title');
	if (titleDiv != undefined){
		if(wxType == "hg"){
			titleDiv.html("护工二维码");
		}else if(wxType == "nurse"){
			titleDiv.html("护士二维码");
		}else if(wxType == "staff"){
			titleDiv.html("员工二维码");
		}else if(wxType == "branch"){
			titleDiv.html("科室二维码");
		}else if(wxType == "companyOrg"){
			titleDiv.html("项目点二维码");
		}
	}
	
	
	var param = {
			hgId:hgId,
			branchId:branchId,
			companyOrgId: companyOrgId
		};

	doHttp(param, '/adminjson/SAASGetMPQRCode').then(function(data){
		if(data && data.errorCode==0 && data.body){
			console.log(data.body);
			$("#js-wx-img-url").attr('src',data.body.mpqrcode); 
//			var tableHtml = getHgListHtml(data.body);
//			$('#js-div-hgList').empty().html(tableHtml);
		}
		
	});
		
		
		var dtd = $.Deferred();
//		var OKBtn = $("#js-modal-select_Superior-win .js-btn-hg");
//		
//		OKBtn.on('click',function(){
//			var hgId = $('input[name=js-chk-hgIds]:checked');
//			if (hgId.val() === undefined){
//				Toast.error("请选择"+title);
//				return;
//			}else{
//				var param = {};
//				param["hgName"] = hgId.attr("hgName"); 
//				param["hgId"] = hgId.val();
//				OKBtn.unbind("click");
//				dtd.resolve(param);
//				$('#js-modal-wx-win').modal('hide');
//			}
//
//		});

	return dtd.promise();
}
