
var rp_addReplyPanelHtml = '<div id="panel_add_reply" class="r_panel">'+
'    <div class="panel-header">'+
'        <button type="button" class="close rp_close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title">反馈处理</h4>'+
'    </div>'+
'    <div class="panel-body">'+
'        <div class="container-fluid">'+
'            <form class="form-horizontal" role="form" id="role_input_form">'+
'            	<div class="form-group">'+
'                    <label class="col-sm-3 control-label"><span class="form-required">*</span>处理内容:</label>'+
'                    <div class="col-sm-5">'+
'                        <textarea rows="5" cols="" class="form-control"  name="feedback_reply" placeholder="请输入处理内容"  id="feedback_reply"></textarea>'+
'                        <input type="hidden" id="feedback_id">'+
'                    </div>'+
'               </div>'+

'            </form>'+
'        </div>'+
'    </div>'+
'    <div class="panel-footer">'+
'         <div class="form-group">'+
'              <div class="col-sm-12" style="text-align:center">'+
'                   <button type="button" class="btn btn-sm btn-success js-btn-saveReply">保存</button>'+    
'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>'+
'              </div>'+
'          </div>'+
'     </div>'+    
'</div>';
	
function G_Fun_showReplyPanel(id){
	var panel = new RPModalPanel("panel_add_reply", rp_addReplyPanelHtml);
	panel.show();
	$("#feedback_id").val(id);
	$('#feedback_reply').val('');
	
	var dtd = $.Deferred();
	
	panel.find(".js-btn-saveReply").off('click').on('click',function(){
		var reply = panel.find("#feedback_reply").val();
		var param = {
			id : id,
			reply : $('#feedback_reply').val()
		}
		if($('#feedback_reply').val() == undefined || $('#feedback_reply').val() == '') {
			Toast.error($('#feedback_reply').attr('placeholder'));
		}
		doHttp(param, '/adminjson/SAASReplyFeedback').then(function(result){
			Toast.success('操作成功!');
			$(window.parent.document).contents().find("iframe.selected")[0].contentWindow.loadFeedbackList(false);
			panel.hide();
		});
	})
}

