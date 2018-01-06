/**
 * 模态框(右侧弹出)
 * @param {Object} selector
 */
function RPModalPanel(id, html) {
	if ($('#rp-wrapper').length <= 0) {
		$('body').append("<div id='rp-wrapper'></div>");
	}
	if(id!='panel_rich_text'){//&&id!='orderPicLook'
		if ($('#transparent-mask').length <= 0) { 
			$('body').append("<div id='transparent-mask'></div>"); 
		}
	}
	

	if ($('#' + id).length <= 0) {
		$('#rp-wrapper').append(html); 
	}else{
		$('#' + id).remove();
		$('#rp-wrapper').append(html);
	}

	this.elem = $('#' + id);
	var self = this;
	self.show();

	//绑定关闭事件
	this.elem.find('.rp_close').on('click', function () {
		self.hide();
	});
}
/**
 * 隐藏模态框 
 */
RPModalPanel.prototype.find = function (obj) {
	return this.elem.find(obj);
};
/**
 * 显示模态框 
 */
RPModalPanel.prototype.show = function () {
	this.elem.addClass('rpshow');
	$('#transparent-mask').css('display', 'block');
};

/**
 * 隐藏模态框 
 */
RPModalPanel.prototype.hide = function () {
	this.elem.removeClass('rpshow');
	if ($('.r_panel.rpshow').length == 0) {
		$('#transparent-mask').css('display', 'none');
	}
};


//点击空白处收起
$('body').on('click', '.r_panel', function (e) {
	// e.stopPropagation();
});

$('body').on('click', '#transparent-mask', function () {
	//去掉r_panel中的阻止事件传递的代码，实际不会影响到transparent-mask，因为他们是兄弟组件。

	$('.r_panel.rpshow:last').removeClass('rpshow');//点击一次隐藏最顶部的rpanel
	if ($('.r_panel.rpshow').length == 0) {
		$(this).css('display', 'none');
	}
})