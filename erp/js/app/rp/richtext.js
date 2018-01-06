var rp_richtext = '<div id="panel_rich_text" class="r_panel" style="width:840px;">' +
	'    <div class="panel-body">' +
	'        <div class="container-fluid">' +
	'            <form class="form-horizontal" role="form" id="role_input_form">' +
	'            	<div class="form-group">' +
	'                   <scr' + 'ipt type="text/plain" id="myEditor" style="width:750px;height:240px;"><p>这里我可以写一些输入提示</p></scr' + 'ipt>' +
	'               </div>' +

	'            </form>' +
	'        </div>' +
	'    </div>' +
	'    <div class="panel-footer">' +
	'         <div class="form-group">' +
	'              <div class="col-sm-12" style="text-align:center">' +
	'                   <button type="button" class="btn btn-sm btn-success js-btn-getRichTextContent">保存</button>' +
	'                   <button type="button" class="btn btn-sm btn-default rp_close" data-dismiss="modal">取消</button>' +
	'              </div>' +
	'          </div>' +
	'     </div>' +
	'</div>';

function G_Fun_showRichTextPanel(desc) {
	console.log('editor...');
	var panel = new RPModalPanel("panel_rich_text", rp_richtext);
	panel.show();
	// $("#myEditor").css('width', $("#panel_rich_text").css('width'));
	var um = UM.getEditor('myEditor');
	UM.getEditor('myEditor').ready(function () {
		this.setContent(desc, false);
		$('#panel_rich_text img').css('width','auto');
	})
	if ($('#myEditor-mask').length <= 0) {
		$('body').append("<div id='myEditor-mask' style='position: fixed;z-index: 1031;top: 0;right: 0;bottom: 0;left: 0;display: none;'></div>");
	}
	$('#myEditor-mask').css('display', 'block');
	var dtd = $.Deferred();

	$("body").off('click', '.js-btn-getRichTextContent').on('click', '.js-btn-getRichTextContent', function () {
		$('#panel_rich_text img').css('width','100%');
		var data = UM.getEditor('myEditor').getContent();
		console.log('richtext:' + data);
		dtd.resolve(data);
		panel.hide();
		$('#panel_rich_text').remove();
		UM.getEditor('myEditor').destroy();
		$('#myEditor-mask').css('display', 'none');
	}).off('click', '#panel_rich_text .rp_close').on('click', '#panel_rich_text .rp_close', function () {
		$('#panel_rich_text').remove();
		UM.getEditor('myEditor').destroy();
		$('#myEditor-mask').css('display', 'none');
	}).off('click', '#myEditor-mask').on('click', '#myEditor-mask', function () {
		$('#panel_rich_text').remove();
		UM.getEditor('myEditor').destroy();
		$(this).css('display', 'none');
	})
	return dtd.promise();
}

