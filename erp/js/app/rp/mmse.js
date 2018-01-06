
var rp_showMMSEHandlePanelHtml = '<div id="panel_mmse_handle" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title">MMSE评估</h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" >'+
'              <div class="form-group">'+
'                  <p class="rp_subtit">定向力部分（最高10分）</p>'+
'              </div>'+
'				<div class="js-mmse-item">'+

'			   </div>'+
'              <div class="form-group">'+
'                  <p class="rp_subtit">记忆力部分（最高3分）</p>'+
'              </div>'+
'				<div style="margin:10px">'+
'					记录得分：'+	
'					<select style="width: 150px;margin : 10px;" id="isMemory">'+
'						<option selected value="0">0分</option>'+
'						<option  value="1">1分</option>'+
'						<option  value="2">2分</option>'+
'						<option  value="3">3分</option>'+

'					</select>'+	
'               	<div class="form-group">'+
'               	      <div class="col-sm-5">'+
'                	     		<textarea class="form-control" style="margin : 10px 10px 0px 0px;width:400px;height:50px;" rows="" cols="" placeholder="备注" id="memoryRemark"></textarea>'+
'                	     </div>'+
'              		 </div>'+
'				</div>'+
'              	<div class="form-group">'+
'                  <p class="rp_subtit">注意力和计算力（最高5分）</p>'+
'              	</div>'+
'				<div style="margin:10px">'+

'					记录得分：'+	
'					<select style="width: 150px;margin : 10px;" id="isMind">'+
'						<option selected value="0">0分</option>'+
'						<option  value="1">1分</option>'+
'						<option  value="2">2分</option>'+
'						<option  value="3">3分</option>'+
'						<option  value="4">4分</option>'+
'						<option  value="5">5分</option>'+

'					</select>'+	
'               	<div class="form-group">'+
'               	      <div class="col-sm-5">'+
'                	     		<textarea class="form-control" style="margin : 10px 10px 0px 0px;width:400px;height:50px;" rows="" cols="" placeholder="备注" id="mindRemark"></textarea>'+
'                	     </div>'+
'              		 </div>'+
'				</div>'+

'				<div class="form-group">'+
'                  <p class="rp_subtit">回忆能力（最高3分）</p>'+
'              	</div>'+
'				<div style="margin:10px">'+
'					记录得分：'+	
'					<select style="width: 150px;margin : 10px;" id="isRecall">'+
'						<option selected value="0">0分</option>'+
'						<option  value="1">1分</option>'+
'						<option  value="2">2分</option>'+
'						<option  value="3">3分</option>'+


'					</select>'+	
'               	<div class="form-group">'+
'               	      <div class="col-sm-5">'+
'                	     		<textarea class="form-control" style="margin : 10px 10px 0px 0px;width:400px;height:50px;" rows="" cols="" placeholder="备注" id="recallRemark"></textarea>'+
'                	     </div>'+
'              		 </div>'+
'				</div>'+

'				<div class="form-group">'+
'                  <p class="rp_subtit">语言能力（最高3分）</p>'+
'              	</div>'+
'				<div style="margin:10px" class="mmse_language">'+

'				</div>'+


'            </form>'+
'        </div>'+
'    </div>'+
'    <div class="panel-footer">'+
'         <div class="form-group">'+
'              <div class="col-sm-12" style="text-align:center">'+
'                   <button type="button" class="btn btn-sm btn-success js-btn-mmse-submit">提交</button>'+ 
'                   <button type="button" class="btn btn-sm btn-default rp_close js-btn-mmse-save" data-dismiss="modal">保存草稿</button>'+  
'        			<button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
'              </div>'+
'          </div>'+
'     </div>'+    
'</div>';


var mmse_question1_list_tpl = 
'{{each QAArry as item i}}'+
'	<div class="form-group">'+
'		<label class=" " sty>{{i+1}}：{{item}}：</label><br/>'+
'		<label style="padding-top:0px;"><input type="radio" style="margin-left:20px;" name="composure_{{i}}" class="toggle" id="composure_{{i}}" value="1"> 回答正确</label>'+
'		<label style="padding-top:0px;"><input type="radio" style="margin-left:30px;" name="composure_{{i}}" class="toggle" id="composure_{{i}}" value="0"> 回答错误</label>'+
'</div>'+
'{{/each}}';

var mmse_questionIs_list_tpl = 
	'{{each QAArryIs as item i}}'+
	'		{{item.isName}}：'+	
	'		<select style="width: 150px;margin : 10px;" id="{{item.identifying}}">'+
	'			<option selected value="0">0分</option>'+
	'			{{each item.each as items s }}'+
	'				{{if s+1<=item.score}}'+
	'					<option  value="{{s+1}}">{{s+1}}分</option>'+
	'				{{/if}}'+
	'			{{/each}}'+
	'		</select>'+	
	'               	<div class="form-group">'+
	'               	      <div class="col-sm-5">'+
	'                	     		<textarea class="form-control" style="margin : 10px 10px 0px 0px;width:400px;height:50px;" rows="" cols="" placeholder="备注" id="{{item.remark}}" class="{{item.remark}}"></textarea>'+
	'                	     </div>'+
	'              		 </div>'+
	'{{/each}}';

var getMMSEQustion1Html = function(data){

	var render = template.compile(mmse_question1_list_tpl);
	var html = render(data);
	return html;
}
var getMMSEQustionIsHtml = function(data){

	var render = template.compile(mmse_questionIs_list_tpl);
	var html = render(data);
	return html;
}

function G_Fun_showMMSEHandlePanel(insureNO){
	var panel = new RPModalPanel("panel_mmse_handle", rp_showMMSEHandlePanelHtml);
	panel.show();
	
	var MMSEQA1 = {'QAArry' : ['询问今天日期','询问今天几号','询问今天几月','询问现在什么季节','询问今天哪一年','询问居住省市','询问居住区县','询问居住街道或乡','询问居住什么地方','询问居住第几层楼']};
	var MMSEQAIs = {'QAArryIs' : [
		               {"isName":"命名能力","score":2,"identifying":"isRename","each":["1","2"],"remark":"renameRemark"},
		               {"isName":"复述能力","score":1,"identifying":"isRetell","each":["1"],"remark":"retellRemark"},
		               {"isName":"三步命令","score":3,"identifying":"isThree","each":["1","2","3"],"remark":"threeRemark"},
		               {"isName":"阅读能力","score":1,"identifying":"isRead","each":["1"],"remark":"readRemark"},
		               {"isName":"书写能力","score":1,"identifying":"isWrite","each":["1"],"remark":"writeRemark"},
		               {"isName":"结构能力","score":1,"identifying":"isStruct","each":["1"],"remark":"structRemark"}
	               ]};
	var tableHtml = getMMSEQustion1Html(MMSEQA1);
	$(".js-mmse-item").html("").append(tableHtml);
	var tableIsHtml = getMMSEQustionIsHtml(MMSEQAIs);
	$(".mmse_language").html("").append(tableIsHtml);
	
	
	var isCommit=0;
	
	panel.find(".js-btn-mmse-submit").off('click').on('click',function(){
			isCommit = 2;
			sumitHandle_0();
	})
	
	panel.find(".js-btn-mmse-save").off('click').on('click',function(){
			isCommit = 1;
			sumitHandle_0();
	})
	var dtd = $.Deferred();
	function sumitHandle_0(){ //保存mmse评估
			
			var widgets = $('#panel_mmse_handle :radio:checked');
			console.log($('#panel_mmse_handle :radio:checked'));
			var composureRadio = [];
			if(isCommit === 2){
				if(widgets.length <= 9){
					Toast.error("请选择完整定向力部分");
					return;
				}
				$.each(widgets,function(index,item){
					var composure = "composure_"+i;
					composureRadio.push(item.value);
				});
			}else if(isCommit == 1 ){
				
				for(var i = 0 ; i < 10 ;i++){
					var composure = "composure_"+i;
					var redio = $("#panel_mmse_handle :radio[name='"+composure+"']:checked").val();
					if(redio == "" || redio == null || redio == undefined){
						composureRadio.push(3)
					}else{
						composureRadio.push(redio);
					}
					
				}
			}
	
			
			
			
			var composure=composureRadio.join();
			var isMemory = $('#isMemory').val();
			var isMind = $('#isMind').val();
			var isRecall = $('#isRecall').val();
			var isRename = $('#isRename').val();
			var isRetell = $('#isRetell').val();
			var isThree = $('#isThree').val();
			var isRead = $('#isRead').val();
			var isWrite = $('#isWrite').val();
			var isStruct = $('#isStruct').val();
			
			
			var memoryRemark = $('#memoryRemark').val();
			var mindRemark = $('#mindRemark').val();
			var recallRemark = $('#recallRemark').val();
			var renameRemark = $('#renameRemark').val();
			var retellRemark = $('#retellRemark').val();
			var threeRemark = $('#threeRemark').val();
			var readRemark = $('#readRemark').val();
			var writeRemark = $('#writeRemark').val();
			var structRemark = $('#structRemark').val();
			console.log("status:" + structRemark);
			
			var param = {};
			param["insureNO"] = insureNO;
			param["composure"] = composure;
			param["isCommit"] = isCommit;
			
			param["memory"] = {"id" : isMemory, "remark" : memoryRemark};
			param["mind"] = {"id" : isMind, "remark" : mindRemark};
			param["recall"] = {"id" : isRecall, "remark" : recallRemark};
			param["rename"] = {"id" : isRename, "remark" : renameRemark};
			param["retell"] = {"id" : isRetell, "remark" : retellRemark};
			param["three"] = {"id" : isThree, "remark" : threeRemark};
			param["read"] = {"id" : isRead, "remark" : readRemark};
			param["write"] = {"id" : isWrite, "remark" : writeRemark};
			param["struct"] = {"id" : isStruct, "remark" : structRemark};

			
			doHttp(param, '/adminjson/SAASSaveOrUpdateAssessMmse').then(function(data){
				if(data && data.errorCode==0 && data.body){
					Toast.success("操作成功");
					if(isCommit === 2){
						var score = data.body.score;
						$(".js-mmse-res").html("");
						dtd.resolve(score);
					}
					
				}
				panel.hide();
			});
			
		}
	
	G_InsureModule.getInsureMMSE(insureNO).then(function(data){
		if(data && data.errorCode==0 && data.body){
			MMSEFormData(data.body);
		}
	});
	
	function MMSEFormData(data){
		var insureMmse = data.insureMmse;
		if(insureMmse){
				var composures=insureMmse.composure;
				console.log("composures:" + composures);
				if(composures !== null && composures !== undefined && composures !== ''){
				var composureArrays=composures.split(",");
				
				for (var i=0;i<composureArrays.length;i++){
					$(":radio[name='composure_"+i+"'][value='" + composureArrays[i] + "']").prop("checked", "checked");
				}
				
				 $("#isMemory option[value='"+insureMmse.isMemory+"']").attr("selected",true);isMemory
				 $("#isMind option[value='"+insureMmse.isMind+"']").attr("selected",true);
				 $("#isRecall option[value='"+insureMmse.isRecall+"']").attr("selected",true);
				 $("#isRename option[value='"+insureMmse.isRename+"']").attr("selected",true);
				 $("#isRetell option[value='"+insureMmse.isRetell+"']").attr("selected",true);
				 $("#isThree option[value='"+insureMmse.isThree+"']").attr("selected",true);
				 $("#isWrite option[value='"+insureMmse.isWrite+"']").attr("selected",true);
				 $("#isRead option[value='"+insureMmse.isRead+"']").attr("selected",true);
				 $("#isStruct option[value='"+insureMmse.isStruct+"']").attr("selected",true);
				 $("#memoryRemark").val(insureMmse.memoryRemark); 
				 $("#mindRemark").val(insureMmse.mindRemark); 
				  
				 $("#recallRemark").val(insureMmse.recallRemark); 
				 $("#renameRemark").val(insureMmse.renameRemark); 
				 $("#retellRemark").val(insureMmse.retellRemark); 
				 $("#threeRemark").val(insureMmse.threeRemark); 
				 $("#writeRemark").val(insureMmse.writeRemark); 
				 $("#readRemark").val(insureMmse.readRemark); 
				 $("#structRemark").val(insureMmse.structRemark); 
			}
		}
	}
	

	return dtd.promise();
}

