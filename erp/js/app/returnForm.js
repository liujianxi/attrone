/**
 * banner管理模块
 */
//banner管理模块的数据对象
var returnFormModule = {
	bannerList : [],	//banner数据列表
	//分页参数
	paginationParam : {
		pageSize : 10,	//每页展示的数据条目
		isInit : false,	//是否已初始化
		pageNo : 1 //当前页，默认为1
	}
};

function initTime() {
	var d1, d2;
	function dateString(dt){
	    var dy = dt.getFullYear();
	    var dm = dt.getMonth()+1;
	    var dd = dt.getDate();
	   return dy+'-'+(dm<10?'0'+dm:dm)+'-'+dd;
	}
	var dt = new Date();
	dt.setDate(dt.getDate());
	d2 = dateString(dt);
	dt.setDate(dt.getDate()-30);
	d1 = dateString(dt);
	$("#finance-regBeginTime").val(d1);
	$("#finance-regEndTime").val(d2);
    $('input[name="daterange-widthdraw-form"]').daterangepicker({
		"autoApply": true,
		"locale": {
			"format": "YYYY-MM-DD",
			"separator": " 至 ",
			"applyLabel": "确定",
			"cancelLabel": "取消",
			"fromLabel": "开始",
			"toLabel": "结束",
			"customRangeLabel": "Custom",
			"weekLabel": "W",
			"daysOfWeek": [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			],
			"monthNames": [
				"一月",
				"二月",
				"三月",
				"四月",
				"五月",
				"六月",
				"七月",
				"八月",
				"九月",
				"十月",
				"十一月",
				"十二月"
			],
			"firstDay": 1
		},
		"startDate": d1,
		"endDate": d2
	}, function(start, end, label) {
		$("#startTime").val(start.format('YYYY-MM-DD'));
		$("#endTime").val(end.format('YYYY-MM-DD'));
	});
}

$(document).ready(function(){
	initTime();
	
	/**
	 * 私有常量集合
	 */
	var CONSTANT = {
		//处理请求前缀
		URL_PREFIX : '/adminjson/',
		//获取banner列表数据
		GET_FORMRECORD_LISG_URL : 'SAASGetFormRecordList',
		BANNER_TYPE : [
			{ name:'全部',id:0},
			{ name:'微信h5',id:1},
			{ name:'用户app',id:2}
		],
	};
	
	//将加载数据的方法绑定到公共对象
	returnFormModule.loadFormList = loadFormList;
	
	//实例化请求帮助类
	var httpUtilObj = new HttpUtil();
	//默认载入数据
	loadFormList(true,1);
	
	/**
	 * 初始化分页控件
	 * @param {Object} count
	 */
	function initPagination(nowPage,count){
//		console.info('nowPage:'+nowPage+',count:'+count);
		//如果记录条目为0则隐藏分页控件
		if(count <=returnFormModule.paginationParam.pageSize){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
		//如果已初始化控件，则不再		
		$("#pagination").pagination(count, {
            'items_per_page'      : returnFormModule.paginationParam.pageSize,
            'num_display_entries' : 5,
            'num_edge_entries'    : 5,
            'prev_text'           : "上一页",
            'next_text'           : "下一页",
            'callback'            : function(page_index){
            	
            	page_index = page_index + 1;
            	//只有在翻页的时候才加载，默认查询和按条件查询page_index不会改变，则不会重新加载
            	if(returnFormModule.paginationParam.pageNo != page_index){
            		//重新赋值当前页数
            		returnFormModule.paginationParam.pageNo = page_index;
            		//重新载入数据
            		loadFormList(false);
            	}
            },
            'current_page'        : (nowPage<=1)?0:(nowPage-1)
        });
	}
	
	/**
	 * @param {Object} isAll (是否全部加载，如果是true才初始化分页控件，分页加载数据就是false的情况)
	 */
	function loadFormList(isAll){
		//1-提现 2-损坏 3-过期
		//收集查询控件的参数值
		returnFormModule.searchParam = {
			key : $("#fileName").val(),
			startTime : $("#startTime").val(),
			endTime : $("#endTime").val(),
			type : 6,
			pageNo : returnFormModule.paginationParam.pageNo,	//请求页
			pageSize : returnFormModule.paginationParam.pageSize	//每页记录数
		}
		//返回请求的promise对象
		httpUtilObj.ajax({
			url : CONSTANT.URL_PREFIX + CONSTANT.GET_FORMRECORD_LISG_URL,
			params : returnFormModule.searchParam
		}).then(function(data){
			//刷新列表
			refreshFormReocrdList(data.body);
			
			//初始化分页控件
			if(isAll){
				initPagination(0,data.body.count);
			}
		});
	}
	
	/**
	 * @param {Object} data
	 */
	function refreshFormReocrdList(data){
		template.config("escape", false);//识别html标签
		var formreturnListHtml = template('formreturnListTemplate',data);
		$("#formListContent").empty().html(formreturnListHtml);
		$('.with-input').off('click').on('click',function(){
			if($(this).find('input').prop('checked')){
				$(this).find('input').prop('checked',false);
			}else{
				$(this).find('input').prop('checked',true);
			}
		})
		$('.with-input input').off('click').on('click',function(){
			if($(this).prop('checked')){
				$(this).prop('checked',false);
			}else{
				$(this).prop('checked',true);
			}
		})
	}
	
	$('body').on('click', "#returnDownload",function(){
		var triggerDelay = 100;
        var removeDelay = 1000;
        var url_arr=[];
        if(!$('input[name="filePath"]:checked').length){
        	Toast.error('请选择需要下载的报表！');
        	return false;
        }
		$('input[name="filePath"]:checked').each(function(){
			url_arr.push($(this).val());
//			location.href = $(this).val();
//			window.open($(this).val(),"navTab");
//			StartGETRequest($(this).val(), function(){});
		});
		url_arr.forEach(function(item,index){
			_returnIFrame(item, index * triggerDelay, removeDelay);
		})
	});
    function _returnIFrame(url, triggerDelay, removeDelay) {
        //动态添加iframe，设置src，然后删除
        setTimeout(function() {
            var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
            frame.attr('src', url);
            $(document.body).after(frame);
            setTimeout(function() {
                frame.remove();
            }, removeDelay);
        }, triggerDelay);
    }
});
