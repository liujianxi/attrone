/**
 * 模态框(右侧弹出)
 * @param {Object} selector
 */
function ModalPanel(selector){
	this.elem = $(selector);
	var self = this;
	//绑定关闭事件
	this.elem.find('.rp_close').on('click', function(){
        self.hide();
    });
    //监听body点击事件，如果不是从rightPanel内部发出，就收起rightPanel   
    var selectorID = selector.replace('#', '');
    $('body').on('click', '#'+selectorID+'backdrop', function(e){
        self.hide();
        e.stopPropagation();
    })
    //遮罩层
    this.backdrop = $("<div id='"+selectorID+"backdrop"+"' style='position:fixed; top:0; left:0; bottom:0; right:0; background-color:rgba(0,0,0,0.5); z-index:1; '></div>");
}

/**
 * 显示模态框 
 */
ModalPanel.prototype.show = function(str){
    this.elem.addClass('show');
    $('body').append(this.backdrop);
    this.elem.attr('pagenum',str);
};

/**
 * 隐藏模态框 
 */
ModalPanel.prototype.hide = function(){
    this.elem.removeClass('show');
    this.backdrop.remove();
};




function ModalPanel_pg_create(selector){
	this.elem = $(selector,window.parent.document);
	var self = ($(this),window.parent.document);
	//绑定关闭事件
	this.elem.find('.rp_close').on('click', function(){
        self.hide();
    });
    //监听body点击事件，如果不是从rightPanel内部发出，就收起rightPanel   
    var selectorID = selector.replace('#', '');
    $('body').on('click', '#'+selectorID+'backdrop', function(e){
        self.hide();
        e.stopPropagation();
    })
    //遮罩层
    this.backdrop = $("<div id='"+selectorID+"backdrop"+"' style='position:fixed; top:0; left:0; bottom:0; right:0; background-color:rgba(0,0,0,0.5); z-index:1; '></div>");
}

/**
 * 显示模态框 
 */
ModalPanel_pg_create.prototype.show = function(){
    this.elem.addClass('show');
    $('body').append(this.backdrop);
};

/**
 * 隐藏模态框 
 */
ModalPanel_pg_create.prototype.hide = function(){
    this.elem.removeClass('show');
    this.backdrop.remove();
};