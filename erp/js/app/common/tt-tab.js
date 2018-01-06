function TabsManager(options){
    options.container = options.container || "body";
    var temp = [];
    // temp.push("<div id='ttt_head'><div class='ttt_head_line'></div></div>");
    // temp.push("<div id='ttt_body'></div>")
    // $(options.container).append(temp.join(''))

    temp.push("<div id='ttt_head'>");
    temp.push("     <div id='ttt_head_l_arr'><i class='fa fa-fw fa-chevron-left'></i></div>");
    temp.push("     <div id='ttt_head_r_arr'><i class='fa fa-fw fa-chevron-right'></i></div>");
    temp.push("         <div class='ttt_head_line'></div>");     
    temp.push("     <div id='ttt_head_tabs' style='-webkit-transform:translateX(0px)'>");
    temp.push("     </div>");    
    temp.push("</div>");
    temp.push("<div id='ttt_body'></div>")
    $(options.container).append(temp.join(''))

    var tag, self = this;
    $('#ttt_head').on('click', '.fa-refresh', function(e){
        tag = $(this).parents('.ttt_item_tit').data('tag');
        $(this).addClass("refresh-rotation");
        let _self = $(this);
        self.refreshTab(tag);
        e.stopPropagation();
    });
    $('#ttt_head').on('click', '.fa-close', function(e){
        tag = $(this).parents('.ttt_item_tit').data('tag');
        let the_width=$(this).parents('.ttt_item_tit').outerWidth(true);
        self.removeTab(tag);
        self.checkClose(the_width);//关闭时判断导航栏
        e.stopPropagation();        
    });
    $('#ttt_head').on('click', '.ttt_item_tit', function(){
        tag = $(this).data('tag');
        self.chooseTab(tag);
    });

    var step=100;
    $('#ttt_head_l_arr').on('click', function(){
        var tabsWrapper = $('#ttt_head_tabs');
        var transform = parseFloat(tabsWrapper.get(0).style.transform.match(/[^\d\-]*(\-?\d+)[^\d]*/i)[1]);
        var twW = tabsWrapper.width();
        var twPw = tabsWrapper.parent().width();
        var btnW = 23.2 || $('#ttt_head_r_arr').width();
        if(-(transform-step) > twW-twPw+btnW){
            tabsWrapper.get(0).style.transform = 'translateX('+(-(twW-twPw+btnW))+'px)';
        }else{
            tabsWrapper.get(0).style.transform = 'translateX('+(transform-step)+'px)';
        }
    });
    $('#ttt_head_r_arr').on('click', function(){
        var tabsWrapper = $('#ttt_head_tabs');
        var transform = parseFloat(tabsWrapper.get(0).style.transform.match(/[^\d\-]*(\-?\d+)[^\d]*/i)[1]);
        var btnW = 23.2 || $('#ttt_head_l_arr').width();        
        if( (transform+step) > btnW){
            tabsWrapper.get(0).style.transform = 'translateX(0px)';            
        } else {
            tabsWrapper.get(0).style.transform = 'translateX('+(transform+30)+'px)';            
        }
    });
	$('#ttt_body').css({
    	height : $('#page-wrapper').height() - 40,
    });
    var timer, self = this;
    window.onresize = function(){       //动态调整ttt_body的高度，这样才能完全展现iframe
        clearTimeout(timer);
        timer = setTimeout(function(){
        	//实时计算屏幕宽高，并设置到body中
        	var heightNum = ($('#page-wrapper').height() - 40);
        	var widthNum = ($('#page-wrapper').width());
            $('#ttt_body').css({
		    	height : heightNum,
		    });

            self.shouldShowTabsW();
        },500);
    }
    
    
}

var tabMap = [];

function getTagId(params){
	var tagId = "";
	$(tabMap).each(function(i,e) {
		if(e.params == params){
			tagId = e.tagId;
		}
	});
	return tagId;
}

function removeTagId(tagId){
	$(tabMap).each(function(i,e) {
		if(e.tagId == tagId){
			tabMap.splice(i, 1);
		}
	});
	return tagId;
}

/**
 * 计算左右滑块出现时机
 */
TabsManager.prototype.shouldShowTabsW = function(){
    var tabsWrapper = $('#ttt_head_tabs');
    if(tabsWrapper.width() > tabsWrapper.parent().width()){
        $('#ttt_head_l_arr').addClass('show')
        $('#ttt_head_r_arr').addClass('show')           
    } else {
        $('#ttt_head_l_arr').removeClass('show');
        $('#ttt_head_r_arr').removeClass('show');
        tabsWrapper.get(0).style.transform = 'translateX(0px)';
    }
}
/**
 * 如果link整个相同，直接切换已存在的tab
 * 如果path相同，但参数不同，选中并重新加载
 * 如果path不同，重新创建
 */
TabsManager.prototype.addTab = function(title,link,options){
//	console.info('addTab come in options:' + JSON.stringify(options));
	var params = title + link +  JSON.stringify(options);
	var existTagId = getTagId(params);
	let link_origin=link;
	var radomId = "";
	if(existTagId != ""){
		// 已经打开这个标签
		this.chooseTab(existTagId);
		this.getLeft(link_origin);
		return false;
	}else{
		// 未打开过这个标签 放入map中 
		radomId = "tag"+(new Date().getTime());
		var tag_item = {params:params,tagId:radomId};
		tabMap.push(tag_item);
	}
//    var existName;
//    if( (existName = $('.ttt_item_tit[data-url="'+link+'"]')).length>0 ){           //整个url重复
//        this.chooseTab(existName.data("tag"));
//        return;
//    }
    var pathName;
    if(link.indexOf('?')==-1)  
        pathName = link;
    else
        pathName = link.split('?')[0];
//    if( (existName = $('.ttt_item_tit[data-path="'+pathName+'"]')).length>0 ){      //仅仅path重复
//    	console.info("zzzzzzzzzz");
//        this.chooseTab(existName.data("tag"));
//        existName.find('.tit_item_font').text(title);
//        this.changeTabUrl(existName.data("tag"), link);
//        return;
//    }
    
    var nowTime = new Date().getTime();     //link加时间戳，去iframe缓存
    if(link.indexOf('?')==-1){
        link += '?timestamp='+nowTime;
    } else {
        if(link.indexOf('timestamp')==-1){
            link += '&timestamp='+nowTime;
        } else {
            link = link.replace(/timestamp\s*=\s*\d*/i, 'timestamp='+nowTime);
        }
    }
    //link参数追加
	if(options){
//		console.info('options is not null');
		for(var key in options){
			if(pathName.indexOf('?') != -1){
				pathName += "&" + key + '=' + options[key];
			}else{
				pathName += "?" + key + '=' + options[key];
			}
		}
	}
//	console.info('pathName :' + pathName);
    
    //不存在，创建，但先去掉其他的selected
    $('.ttt_item_tit.selected').removeClass('selected');
    $('.ttt_item_body.selected').removeClass('selected');
    var item = [];
    item.push('<div class="ttt_item_tit selected"  data-tag="', radomId, '" data-url="', link, '" data-path="', pathName, '">');
    item.push(' <div class="ttt_item_tit_body">');
    item.push('         <i class="fa fa-refresh fa-fw"></i>');
    item.push('         <span class="tit_item_font">', title, '</span>')
    if(title!='管理工作台'){
    	item.push('         <i class="fa fa-close fa-fw"></i>');
    }
    item.push(' </div>');    
    item.push('</div>');
    // $('#ttt_head').append(item.join(''));
    $('#ttt_head_tabs').append(item.join(''));    
    item = [];
    item.push('<iframe name="', radomId, '" id="', radomId, '" class="ttt_item_body selected" frameborder="0" style="width:100%; height:100%;" src="', link, '"></iframe>');
    $('#ttt_body').append(item.join(''));
    this.shouldShowTabsW();
    this.getLeft(link_origin);
}
TabsManager.prototype.getLeft = function(str){
	for(let i =0;i<$('.ttt_item_tit').length;i++){
		if($('.ttt_item_tit').eq(i).attr('data-path')==str){
			if($('#ttt_head_l_arr').hasClass('show')){
				this.checkDis();
			}
			break;
		}
	}
}
TabsManager.prototype.checkClose=function(str){
	//导航栏是否有x偏移
	let box_trans=$('#ttt_head_tabs').get(0).style.transform.match(/[^\d\-]*(\-?\d+)[^\d]*/i)[1];
	if(box_trans<0&&$('#ttt_head_l_arr').hasClass('show')){//有左右滑块
		if(box_trans-0+str<=0){
			$('#ttt_head_tabs').css({
				'transform':'translateX('+(box_trans-0+str)+'px)',
			});	
		}
	}
}
//矫正导航栏的位置
TabsManager.prototype.checkDis=function(){
	//左右键的宽度
	let left_dis=$('#ttt_head_l_arr').offset().left;
	//左边滑块的宽度
	let left_width=$('#ttt_head_l_arr').outerWidth(true);
	let right_dis=$('#ttt_head_r_arr').offset().left;
	//当前块的位置
	let curr_dis=$('.ttt_item_tit.selected').offset().left;
	//获取content+padding+border+margin的宽度
	let curr_width=$('.ttt_item_tit.selected').outerWidth(true);
	//在右边超出时
	if(curr_dis<=right_dis&&curr_dis+curr_width>right_dis||curr_dis>right_dis){
		let the_width=curr_dis+curr_width-right_dis;
		let box_trans=$('#ttt_head_tabs').get(0).style.transform.match(/[^\d\-]*(\-?\d+)[^\d]*/i)[1];
//		console.log(box_trans,the_width);
		$('#ttt_head_tabs').css({
			'transform':'translateX('+(box_trans-the_width)+'px)'
		});
	}
	//左边超出时
	if(curr_dis<=left_dis){
		let the_width=left_dis-curr_dis+left_width+6;
		let box_trans=$('#ttt_head_tabs').get(0).style.transform.match(/[^\d\-]*(\-?\d+)[^\d]*/i)[1];
		$('#ttt_head_tabs').css({
			'transform':'translateX('+(box_trans-0+the_width)+'px)'
		});
	}
}
TabsManager.prototype.chooseTab = function(tag){
    $('.ttt_item_tit.selected').removeClass('selected');
    $('.ttt_item_body.selected').removeClass('selected');
    $('.ttt_item_tit[data-tag="'+tag+'"]').addClass('selected');
    $('#'+tag).addClass('selected');
}

TabsManager.prototype.removeTab = function(tag){
	removeTagId(tag);
    var deleteItem = $('.ttt_item_tit[data-tag="'+tag+'"]');
    if(deleteItem.hasClass('selected')){
        var nextTag;
        if(deleteItem.next(".ttt_item_tit").length>0){
            nextTag = deleteItem.next(".ttt_item_tit").data('tag');
        } else {
            nextTag = deleteItem.prev(".ttt_item_tit").data('tag');
        }
        if(nextTag)
            this.chooseTab(nextTag);
    }
    deleteItem.remove();
    $('#'+tag).remove();

    this.shouldShowTabsW();
}

TabsManager.prototype.refreshTab = function(tag) {
    $('#'+tag)[0].contentWindow.location.reload();
}

TabsManager.prototype.changeTabUrl = function(tag, link){
    $('#'+tag)[0].src = link;
}