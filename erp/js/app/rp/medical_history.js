var selectmedical_modal_html = '<div class="modal fade" id="js-modal-selectmedical-win" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 500px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" >病史描述</h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'				<div class="js-medical-item">'+
'			   </div>'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
'        		<button type="button" class="btn btn-success js-btn-medical">确定</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';


var medical_list_tpl = 
'{{each QAArry as item i}}'+
'	<label>'+
'			{{if medicalList.indexOf(item)!=-1}}'+
'				<input type="checkbox" style="display:none;" name="medicalbox" class="toggle" value="{{item}}" checked="checked"><span class="btn btn-default btn-sm js-medicalselect-style btn-success">{{item}}</span>'+
'			{{else}}'+
'				<input type="checkbox" style="display:none;" name="medicalbox" class="toggle" value="{{item}}"><span class="btn btn-default btn-sm js-medicalselect-style">{{item}}</span>'+
'			{{/if}}'+
'	</label>'+
'{{/each}}<br/>'+
'<label>其它</lable><input type="text" id="medicalother">';


var getmedicalQustion1Html = function(data){
	var render = template.compile(medical_list_tpl);
	var html = render(data);
//	var array = data.QAArry;
//	var array1 = data.medicalList;
	
	return html;
}


function G_Fun_showmedicalHandlePanel(insureNO){

	if($('#js-modal-selectmedical-win').length > 0 ){
	}else{
		$("body").append(selectmedical_modal_html);
	}
	$('#js-modal-selectmedical-win').modal('show');
	$("#js-modal-selectmedical-win .modal-body button").css("margin","3px");
	//清空所有的选择
	$("#js-modal-selectmedical-win .modal-body button").removeClass("btn-success");
	

	var getVal = function(){
		var obj = $("#js-modal-selectmedical-win .modal-body .btn-success");
		if(obj.length>0){
			return obj.html();
		}
	}
	
	var dtd = $.Deferred();
	var medical = {'QAArry' : ['支气管哮喘','老年心里衰竭','骨质疏松','慢性支气管炎','老年性骨性关节炎','骨折','老年痴呆症','心率失常','帕金森氏症','肾衰'
	                           ,'痛风','高血脂','肿瘤','白内障','颈椎病','忧郁症','脑中风','肺心病','肺气肿','冠心病','糖尿病','高血压']};
	
	if(insureNO=='pgcreate'){
		medical["medicalList"] = [];
		var tableHtml_1 = getmedicalQustion1Html(medical);
		$(".js-medical-item").html("").append(tableHtml_1);
		$("#js-modal-selectmedical-win .modal-body .js-medicalselect-style").off('click').on('click',function(){
			$(this).toggleClass("btn-success");
		});
	}else{
		G_InsureModule.getInsureDetail(insureNO).then(function(result) {
			if(result.errorCode == 0) {
				insure = result.body.insure;
				console.log(insure);
				medical["medicalList"] = insure.medicalList;
				console.log(medical);
				var tableHtml = getmedicalQustion1Html(medical);
				$(".js-medical-item").html("").append(tableHtml);
				$("#js-modal-selectmedical-win .modal-body .js-medicalselect-style").off('click').on('click',function(){
					$(this).toggleClass("btn-success");
				});
			}
		});
	}
	
	
	
	$(".js-btn-medical").on("click",function(){
		var medicalList = [];
		if(insureNO != null){
			var medicalvalue = $("input[name = 'medicalbox']");
			medicalvalue.each(function(){
				if($(this).is(':checked')){
					medicalList.push($(this).val());  
				}
			});
			if($("#medicalother").val())
			medicalList.push($("#medicalother").val());
		}
		var param = {
			insureNO:insureNO,
			medicalList:medicalList
		};
		console.log("medicalList:" + medicalList);
		if(insureNO!='pgcreate'){
			doHttp(param, '/adminjson/SAASAddInsureMedical').then(function(data){
				if(data && data.errorCode==0 && data.body){
					Toast.success("操作成功");
					$('#js-modal-selectmedical-win').modal('hide');
					$(".js-medical-res").html("");
					dtd.resolve(data.body.medicalList);
				}
			});
		}else{
			$('#js-modal-selectmedical-win').modal('hide');
			dtd.resolve(medicalList);
		}
		
	});
	
	return dtd.promise();
}