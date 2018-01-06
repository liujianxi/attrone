var rp_showRelationHandlePanelHtml = '<div id="panel_relation_handle" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title">客户联系记录</h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" >'+
'				<div class="js-relation-item">'+

'			   </div>'+

'            </form>'+
'        </div>'+
'    </div>'+
'    <div class="panel-footer">'+
'         <div class="form-group">'+
'              <div class="col-sm-12" style="text-align:center">'+
'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">关闭</button>'+
//'                   <button type="button" class="btn btn-sm btn-success js-btn-mmse-submit">提交</button>'+   
'              </div>'+
'          </div>'+
'     </div>'+    
'</div>';


var relation_question1_list_tpl = 
'{{each insure as item i}}'+
'	<div class="form-group">'+
'		<label class=" " sty>{{item.createTime}}&nbsp;&nbsp;&nbsp;[{{item.createStaffName}}]———{{item.content}}</label><br/>'+
'</div>'+
'{{/each}}';


var getRelationQustion1Html = function(data){

	var render = template.compile(relation_question1_list_tpl);
	var html = render(data);
	return html;
}


function G_Fun_showRelationHandlePanel(insureNO){
	var panel = new RPModalPanel("panel_relation_handle", rp_showRelationHandlePanelHtml);
	panel.show();
	
	G_InsureModule.getContactRecordList(insureNO).then(function(data){
		
		if(data && data.errorCode==0 && data.body){
			console.log(data.body);
			var tableHtml = getRelationQustion1Html(data.body);
			$(".js-relation-item").html("").append(tableHtml);
		}
	});
	
	
//	
//	
//
//	
//	
//	var isCommit=0;
//	
//	panel.find(".js-btn-mmse-submit").off('click').on('click',function(){
//			isCommit = 2;
//			sumitHandle_0();
//	})
//	
//	panel.find(".js-btn-mmse-save").off('click').on('click',function(){
//			isCommit = 1;
//			sumitHandle_0();
//	})
	var dtd = $.Deferred();
//	function sumitHandle_0(){ //保存mmse评估
//			
//			var widgets = $('input:radio:checked');
//			if(isCommit === 2){
//				if(widgets.length <= 9){
//					Toast.error("请选择完整定向力部分");
//					return;
//				}
//			}
//			var composureRadio = [];
//			$.each(widgets,function(index,item){
//				composureRadio.push(item.value);
//			});
//			var composure=composureRadio.join();
//			var isMemory = $('#isMemory').val();
//			var isMind = $('#isMind').val();
//			var isRecall = $('#isRecall').val();
//			var isRename = $('#isRename').val();
//			var isRetell = $('#isRetell').val();
//			var isThree = $('#isThree').val();
//			var isRead = $('#isRead').val();
//			var isWrite = $('#isWrite').val();
//			var isStruct = $('#isStruct').val();
//			
//			
//			var memoryRemark = $('#memoryRemark').val();
//			var mindRemark = $('#mindRemark').val();
//			var recallRemark = $('#recallRemark').val();
//			var renameRemark = $('#renameRemark').val();
//			var retellRemark = $('#retellRemark').val();
//			var threeRemark = $('#threeRemark').val();
//			var readRemark = $('#readRemark').val();
//			var writeRemark = $('#writeRemark').val();
//			var structRemark = $('#structRemark').val();
//			console.log("status:" + structRemark);
//			
//			var param = {};
//			param["insureNO"] = insureNO;
//			param["composure"] = composure;
//			param["isCommit"] = isCommit;
//			
//			param["memory"] = {"id" : isMemory, "remark" : memoryRemark};
//			param["mind"] = {"id" : isMind, "remark" : mindRemark};
//			param["recall"] = {"id" : isRecall, "remark" : recallRemark};
//			param["rename"] = {"id" : isRename, "remark" : renameRemark};
//			param["retell"] = {"id" : isRetell, "remark" : retellRemark};
//			param["three"] = {"id" : isThree, "remark" : threeRemark};
//			param["read"] = {"id" : isRead, "remark" : readRemark};
//			param["write"] = {"id" : isWrite, "remark" : writeRemark};
//			param["struct"] = {"id" : isStruct, "remark" : structRemark};
//
//			
//			doHttp(param, '/adminjson/SAASSaveOrUpdateAssessMmse').then(function(data){
//				if(data && data.errorCode==0 && data.body){
//					Toast.success("操作成功");
//					if(isCommit === 2){
//						var score = data.body.score;
//						$(".js-mmse-res").html("");
//						dtd.resolve(score);
//					}
//					
//				}
//				panel.hide();
//			});
//			
//		}
//	
//	G_InsureModule.getInsureMMSE(insureNO).then(function(data){
//		if(data && data.errorCode==0 && data.body){
//			MMSEFormData(data.body);
//		}
//	});
//	
//	function MMSEFormData(data){
//		var insureMmse = data.insureMmse;
//		if(insureMmse){
//				var composures=insureMmse.composure;
//				console.log("composures:" + composures);
//				if(composures !== null || composures !== undefined || composures !== ''){
//				var composureArrays=composures.split(",");
//				
//				for (var i=0;i<composureArrays.length;i++){
//					console.log("composureArrays[i] :" + composureArrays[i] );
//					$(":radio[name='composure_"+i+"'][value='" + composureArrays[i] + "']").prop("checked", "checked");
//				}
//				
//				 $("#isMemory option[value='"+insureMmse.isMemory+"']").attr("selected",true);isMemory
//				 $("#isMind option[value='"+insureMmse.isMind+"']").attr("selected",true);
//				 $("#isRecall option[value='"+insureMmse.isRecall+"']").attr("selected",true);
//				 $("#isRename option[value='"+insureMmse.isRename+"']").attr("selected",true);
//				 $("#isRetell option[value='"+insureMmse.isRetell+"']").attr("selected",true);
//				 $("#isThree option[value='"+insureMmse.isThree+"']").attr("selected",true);
//				 $("#isWrite option[value='"+insureMmse.isWrite+"']").attr("selected",true);
//				 $("#isRead option[value='"+insureMmse.isRead+"']").attr("selected",true);
//				 $("#isStruct option[value='"+insureMmse.isStruct+"']").attr("selected",true);
//				 $("#memoryRemark").val(insureMmse.memoryRemark); 
//				 $("#mindRemark").val(insureMmse.mindRemark); 
//				  
//				 $("#recallRemark").val(insureMmse.recallRemark); 
//				 $("#renameRemark").val(insureMmse.renameRemark); 
//				 $("#retellRemark").val(insureMmse.retellRemark); 
//				 $("#threeRemark").val(insureMmse.threeRemark); 
//				 $("#writeRemark").val(insureMmse.writeRemark); 
//				 $("#readRemark").val(insureMmse.readRemark); 
//				 $("#structRemark").val(insureMmse.structRemark); 
//			}
//		}
//	}
	

	return dtd.promise();
}

