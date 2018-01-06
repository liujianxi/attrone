/***********个人评分反显 begin******************************/
var selectgrade_modal_html = '<div class="modal fade" id="js-modal-grade_barthel-selfs" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
'	<div class="modal-dialog" role="document"  style="width: 700px;">'+
'		<div class="modal-content">'+
'			<div class="modal-header">'+
'        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        		<h4 class="modal-title" ></h4>'+
'      		</div>'+
'      		<div class="modal-body">'+
'      		</div>'+
'      		<div class="modal-footer">'+
'        		<button type="button" class="btn btn-default" data-dismiss="modal">退出</button>'+
'      		</div>'+
'    	</div>'+
'  	</div>'+
'</div>';

var grade_questionIs_list_tpl = 
	'<form class="form-horizontal js-form-barthel-question">'+
	'<table class=" display table table-bordered table-striped col-sm-14" style="margin:0px;">'+
	'	<thead>'+
	'<tr><th>项目</th><th>得分</th><th>备注</th></tr>'+
	'	</thead>'+
	'	<tbody>'+
	'{{each assessList as item i}}'+
	'		<tr>'+
	'			<td>{{item.project}}</td>'+
	'			<td>{{item.score}}</td>'+
	'			<td>{{item.remark}}</td>'+
	'		</tr>'+
	'{{/each}}'+
	'	</tbody>'+
	'</table>'+
'</form>';

var getGradeHtml = function(data){

	var render = template.compile(grade_questionIs_list_tpl);
	var html = render(data);
	return html;
}


var G_OpenSelectGradeWin = function(insureNO, typeGrade, id, assessType){
	$("#js-modal-grade_barthel-selfs").remove();
	if($('#js-modal-grade_barthel-selfs').length > 0 ){
	}else{
		$("body").append(selectgrade_modal_html);
	}
	$('#js-modal-grade_barthel-selfs').modal('show');
	var title = $(".modal-header .modal-title");
	if(typeGrade == 1 && assessType == 0){
		title.html("用户自评");
	}else if(typeGrade == 1){
		title.html("ADL评分");
	}else if(typeGrade == 2){
		title.html("MMSE评分");
	}
	if(typeGrade == 1){	// adl评估
		G_InsureModule.getInsureADL(insureNO, id,assessType).then(function(data){
			if(data && data.errorCode==0 && data.body){
				gradeDispose(data.body.insure);
			}
		});
	}else if(typeGrade == 2){	// mmse评估
		G_InsureModule.getInsureMMSE(insureNO, id).then(function(data){
			if(data && data.errorCode==0 && data.body){
				gradeDisposeMMSE(data.body.insureMmse);
			}
		});
	}
	
	
	
	function gradeDispose(data){
		if(JSON.stringify(data) == null || JSON.stringify(data) == undefined || JSON.stringify(data) == '{}'){
//			alert("该数据错误。请重新评分");
			return ;
		}
		var assess = data;
		var assessList = {
			'assessList' : [ assess.eat, assess.water, assess.face,
					assess.wear, assess.faec, assess.pee,
					assess.toilet, assess.carry, assess.walk,
					assess.stair ]
		};
		var tableHtml = getGradeHtml(assessList);
		$('#js-modal-grade_barthel-selfs').find(".modal-body").html("").append(tableHtml);
	}
	
	function gradeDisposeMMSE(data){
		var assess = data;
		var composure = data.composure;
		var MMSEType = {};
		if(composure !== null && composure !== undefined && composure !== ''){
			var composures = composure.split(",");
			if(composures.length >0){
				var MMSEType = {
						'assessList' : [
				           {"project":'询问今天日期',"score":composures[0],"remark":""},
				           {"project":'询问今天几号',"score":composures[1],"remark":""},
				           {"project":'询问今天几月',"score":composures[2],"remark":""},
				           {"project":'询问现在什么季节',"score":composures[3],"remark":""},
				           {"project":'询问今天哪一年',"score":composures[4],"remark":""},
				           {"project":'询问居住省市',"score":composures[5],"remark":""},
				           {"project":'询问居住区县',"score":composures[6],"remark":""},
				           {"project":'询问居住街道或乡',"score":composures[7],"remark":""},
				           {"project":'询问居住什么地方',"score":composures[8],"remark":""},
				           {"project":'询问居住第几层楼',"score":composures[9],"remark":""},
				           {"project":"记忆能力","score":data.isMemory,"remark":data.memoryRemark},
				           {"project":"注意力和计算力","score":data.isMind,"remark":data.mindRemark},
				           {"project":"回忆能力","score":data.isRecall,"remark":data.recallRemark},
						   {"project":"命名能力","score":data.isRename,"remark":data.renameRemark},
				           {"project":"复述能力","score":data.isRetell,"remark":data.retellRemark},
				           {"project":"三步命令","score":data.isThree,"remark":data.threeRemark},
				           {"project":"阅读能力","score":data.isRead,"remark":data.readRemark},
				           {"project":"书写能力","score":data.isWrite,"remark":data.writeRemark},
				           {"project":"结构能力","score":data.isStruct,"remark":data.structRemark}]};
				var tableHtml = getGradeHtml(MMSEType);
				$(".modal-body").html("").append(tableHtml);
				
			
		}
		
		
	}
	}
	var dtd = $.Deferred();
	
	return dtd.promise();
}
/***********个人评分反显 end******************************/