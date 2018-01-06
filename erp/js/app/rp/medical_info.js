var rp_medical_info_Html = '<div id="medical_info_panel" class="r_panel">'+
	'    <div class="panel-header">'+
	'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
	'        <h4 class="medical-title"></h4>'+
	'    </div>'+
	'    <div class="panel-body">'+
	'        <div class="container-fluid">'+
	'            <form class="form-horizontal" role="form" id="u_add_input_form">'+
	
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">自理能力:</label>'+
	'                     <span class="independent_show_number"></span>' +
	'                     <span class="independent_show_status"></span>' +
	'               </div>' +
	'               <div class="form-group">'+
	'                     <label class="col-sm-3 control-label">智力水平:</label>'+
	'                     <span class="intelligence_show_number"></span>' +
	'                     <span class="intelligence_show_status"></span>' +
	'               </div>'+
	'               <div class="form-group medical_language">'+

	'               </div>'+
	'            </form>'+
	'        </div>'+
	'    </div>'+
	'    <div class="panel-footer">'+
	'         <div class="form-group">'+
	'              <div class="col-sm-12" style="text-align:center">'+

	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">返回</button>'+
	'              </div>'+
	'          </div>'+
	'     </div>'+    
	'</div>';

var medical_list_tpl = 
	'      <label class="col-sm-3 control-label">疾病护理指导：</label><br/>'+
	'{{each guide as QAArry i}}'+
	'<div class="col-sm-7">'+
	'	<label style="font-weight:bold; "  >{{QAArry.illness}}：</label><br/>'+
	'	{{each QAArry.guideDesc as items s }}'+
	'		<label >{{items.desc}}</label><br/>'+
	'	{{/each}}'+
	'</div>'+
	'{{/each}}';


var getMedicalHtml = function(data){

	var render = template.compile(medical_list_tpl);
	var html = render(data);
	return html;
}
var dtd = $.Deferred();
function G_Fun_Medical_info(insureNO){
	$("#panel_add_nurse").remove();
	var panel = new RPModalPanel("medical_info_panel", rp_medical_info_Html);
	panel.show();
	
	G_InsureModule.getMedicalInfo(insureNO).then(function (data) {
		if (data && data.errorCode == 0 && data.body) {
			var dataBody = data.body;
			$(".medical-title").html(dataBody.kinsName+"————长护险评估报告");
			$(".independent_show_number").html(dataBody.scoreADL+"分&nbsp;&nbsp;");
			$(".independent_show_status").html(independent(dataBody.scoreADL));
			$(".intelligence_show_number").html(dataBody.scoreMMSE+"分&nbsp;&nbsp;");
			$(".intelligence_show_status").html(independent(dataBody.scoreMMSE));
			
			var guide = {'guide' : dataBody.guide};
			var tableHtml = getMedicalHtml(guide);
			$(".medical_language").html("").append(tableHtml);
		}
	});
	//mmse
	function intelligence(number){
		var explain = "正常水平";
		if(number <= 24){
			explain = "中学程度";
		} else if(number < 20){
			explain = "小学程度";
		} else if(number < 17){
			explain = "文盲程度";
		}
		
		return explain;
		
	}

	//adl
	function independent(number){
		var explain = "基本自理";
		if(40 <= number <= 60){
			explain = "中度功能障碍";
		} else if(number < 40){
			explain = "重度功能障碍";
		}
		return explain;
	}
	return dtd.promise();
	
}
